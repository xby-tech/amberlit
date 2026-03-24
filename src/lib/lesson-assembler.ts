// AmberLit: Lesson Assembler
// Dynamically assembles a lesson from curriculum nodes based on student progress.
// Each lesson has 5 phases: warmup, newContent, practice, application, wrapup.

import type { Activity, AssembledLesson, CurriculumNode, TimeAllocation, TIME_ALLOCATIONS } from '@/types/curriculum';
import type { YearLevel, SessionMode } from '@/lib/supabase/types';
import { getAllCurriculumNodes, getNodeById, getNodesForYear } from '@/content/curriculum-map';
import { isDueForReview, sortByReviewPriority } from './spaced-repetition';
import { checkMastery, shouldUnlock } from './progress-calculator';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface StudentProgressRecord {
  curriculum_node_id: string;
  domain: string;
  strand: string;
  mastery_level: number;
  attempts: number;
  correct: number;
  last_practiced: string | null;
  next_review: string | null;
  unlocked: boolean;
}

// ─── Time Allocations ────────────────────────────────────────────────────────

const TIME_ALLOC: Record<SessionMode, TimeAllocation> = {
  parent: { warmup: 3, newContent: 7, practice: 7, application: 3, wrapup: 0 },
  aide: { warmup: 5, newContent: 15, practice: 15, application: 8, wrapup: 2 },
};

// ─── Main Assembly Function ──────────────────────────────────────────────────

/**
 * Assemble a lesson for a student based on their current progress.
 *
 * @param studentId - The student's ID
 * @param yearLevel - The student's year level
 * @param progress - All progress records for this student
 * @param mode - Parent or aide mode (affects timing and instructions)
 * @returns A fully assembled lesson ready for the session runner
 */
export function assembleLesson(
  studentId: string,
  yearLevel: YearLevel,
  progress: StudentProgressRecord[],
  mode: SessionMode,
): AssembledLesson {
  const allocation = TIME_ALLOC[mode];
  const allNodes = getNodesForYear(yearLevel);

  // 1. Build the review queue (items due for spaced repetition)
  const reviewQueue = getReviewQueue(progress);

  // 2. Find the next unlocked, unmastered nodes to teach
  const nextNodes = getNextNewNodes(allNodes, progress);

  // 3. Find recent errors to reinforce
  const recentErrors = getRecentErrors(progress);

  // 4. Assemble each phase
  const warmup = selectWarmupActivities(reviewQueue, allNodes, allocation.warmup);
  const newContent = selectNewContentActivities(nextNodes, allocation.newContent);
  const practice = selectPracticeActivities(nextNodes, recentErrors, allNodes, allocation.practice);
  const application = selectApplicationActivities(nextNodes, yearLevel, allocation.application);
  const wrapup = selectWrapupActivities(mode, allocation.wrapup);

  const allActivities = [...warmup, ...newContent, ...practice, ...application, ...wrapup];
  const nodeIds = [...new Set(allActivities.map((a) => {
    // Extract node ID from activity ID (e.g. 'F.phonics.01.intro' → 'F.phonics.01')
    const parts = a.id.split('.');
    return parts.slice(0, -1).join('.');
  }).filter(Boolean))];

  const totalMinutes = allocation.warmup + allocation.newContent + allocation.practice + allocation.application + allocation.wrapup;

  return {
    id: `lesson_${studentId}_${Date.now()}`,
    studentId,
    yearLevel,
    warmup,
    newContent,
    practice,
    application,
    wrapup,
    estimatedMinutes: totalMinutes,
    nodeIds,
  };
}

// ─── Phase Selection Functions ───────────────────────────────────────────────

/**
 * Get items that are due for spaced repetition review.
 */
function getReviewQueue(progress: StudentProgressRecord[]): StudentProgressRecord[] {
  const dueItems = progress.filter(
    (p) => p.unlocked && p.mastery_level > 0 && isDueForReview(p.next_review),
  );
  return sortByReviewPriority(dueItems);
}

/**
 * Get the next new nodes the student should learn.
 * These are unlocked but not yet mastered nodes.
 * Picks across all 4 domains to ensure variety.
 */
function getNextNewNodes(
  allNodes: CurriculumNode[],
  progress: StudentProgressRecord[],
): CurriculumNode[] {
  // Collect one candidate per domain
  const domainCandidates = new Map<string, CurriculumNode>();

  for (const node of allNodes) {
    // Already have a candidate for this domain? Skip.
    if (domainCandidates.has(node.domain)) continue;

    const prog = progress.find((p) => p.curriculum_node_id === node.id);

    // Skip mastered nodes
    if (prog && prog.mastery_level >= node.masteryThreshold && prog.attempts >= node.assessmentCriteria.minimumAttempts) {
      continue;
    }

    // Check if unlocked (either explicitly or via prerequisites)
    const isUnlocked = prog?.unlocked || shouldUnlock(
      node.id,
      progress.map((p) => ({
        curriculum_node_id: p.curriculum_node_id,
        mastery_level: p.mastery_level,
        attempts: p.attempts,
        correct: p.correct,
        unlocked: p.unlocked,
      })),
    );

    if (isUnlocked) {
      domainCandidates.set(node.domain, node);
    }

    // Stop once we have candidates from all 4 domains (or checked everything)
    if (domainCandidates.size >= 4) break;
  }

  return Array.from(domainCandidates.values());
}

/**
 * Get progress records for recently incorrect items.
 */
function getRecentErrors(progress: StudentProgressRecord[]): StudentProgressRecord[] {
  return progress
    .filter((p) => p.unlocked && p.mastery_level < 0.6 && p.attempts > 0)
    .sort((a, b) => {
      // Most recently practiced first
      const aDate = a.last_practiced ? new Date(a.last_practiced).getTime() : 0;
      const bDate = b.last_practiced ? new Date(b.last_practiced).getTime() : 0;
      return bDate - aDate;
    })
    .slice(0, 5);
}

/**
 * Select warmup activities from the review queue.
 * Picks 2-3 review activities from mastered content due for spaced repetition.
 */
function selectWarmupActivities(
  reviewQueue: StudentProgressRecord[],
  allNodes: CurriculumNode[],
  targetMinutes: number,
): Activity[] {
  if (targetMinutes <= 0 || reviewQueue.length === 0) return [];

  const activities: Activity[] = [];
  let minutes = 0;

  for (const item of reviewQueue) {
    if (minutes >= targetMinutes) break;

    const node = allNodes.find((n) => n.id === item.curriculum_node_id);
    if (!node || node.activities.length === 0) continue;

    // Pick a practice-style activity from the node
    const practiceActivity = node.activities.find(
      (a) => a.type === 'sound_practice' || a.type === 'maths_fluency',
    ) ?? node.activities[0];

    activities.push(practiceActivity);
    minutes += node.estimatedMinutes;
  }

  return activities;
}

/**
 * Select activities for teaching new content.
 * Picks introduction + practice activities from the next unmastered nodes.
 */
function selectNewContentActivities(
  nextNodes: CurriculumNode[],
  targetMinutes: number,
): Activity[] {
  if (targetMinutes <= 0 || nextNodes.length === 0) return [];

  const activities: Activity[] = [];

  // First pass: one intro activity per domain (ensures all domains represented)
  for (const node of nextNodes) {
    const intro = node.activities[0]; // first activity is always the intro/explore
    if (intro) {
      activities.push(intro);
    }
  }

  // Second pass: add follow-up activities if time allows
  let minutes = activities.length * 3; // ~3 min per intro
  for (const node of nextNodes) {
    if (minutes >= targetMinutes) break;
    const followUp = node.activities[1]; // second activity
    if (followUp) {
      activities.push(followUp);
      minutes += 3;
    }
  }

  return activities;
}

/**
 * Select practice activities — focused on reinforcing current and recent content.
 */
function selectPracticeActivities(
  nextNodes: CurriculumNode[],
  recentErrors: StudentProgressRecord[],
  allNodes: CurriculumNode[],
  targetMinutes: number,
): Activity[] {
  if (targetMinutes <= 0) return [];

  const activities: Activity[] = [];
  let minutes = 0;

  // First, add word building / fluency from current nodes
  for (const node of nextNodes) {
    if (minutes >= targetMinutes) break;

    const practice = node.activities.find(
      (a) => a.type === 'word_building' || a.type === 'maths_fluency' || a.type === 'tricky_word_flash',
    );
    if (practice) {
      activities.push(practice);
      minutes += 3;
    }
  }

  // Then, add activities targeting recent errors
  for (const error of recentErrors) {
    if (minutes >= targetMinutes) break;

    const node = allNodes.find((n) => n.id === error.curriculum_node_id);
    if (!node) continue;

    const practice = node.activities.find(
      (a) => a.type === 'sound_practice' || a.type === 'maths_fluency',
    );
    if (practice && !activities.some((a) => a.id === practice.id)) {
      activities.push(practice);
      minutes += 3;
    }
  }

  return activities;
}

/**
 * Select an application/integration activity.
 * For literacy: decodable reading or word problem.
 * For maths: word problem.
 */
function selectApplicationActivities(
  nextNodes: CurriculumNode[],
  yearLevel: YearLevel,
  targetMinutes: number,
): Activity[] {
  if (targetMinutes <= 0 || nextNodes.length === 0) return [];

  const activities: Activity[] = [];

  // Look for AI-enhanced activities (decodable reading, word problems)
  for (const node of nextNodes) {
    const aiActivity = node.activities.find((a) => a.aiEnhanced);
    if (aiActivity) {
      activities.push(aiActivity);
      break;
    }
  }

  // If no AI activities, use a word building or concept activity
  if (activities.length === 0 && nextNodes[0]?.activities.length) {
    activities.push(nextNodes[0].activities[nextNodes[0].activities.length - 1]);
  }

  return activities;
}

/**
 * Generate wrapup activities (aide mode only).
 */
function selectWrapupActivities(mode: SessionMode, targetMinutes: number): Activity[] {
  if (targetMinutes <= 0 || mode !== 'aide') return [];

  // Return a summary prompt activity
  return [{
    id: 'wrapup.summary',
    type: 'oral_language',
    title: 'Session wrap-up',
    instructions: {
      parent: '',
      aide: 'Review what was learned today. Ask each student to share one thing they learned. Note any observations.',
    },
    content: {
      type: 'oral_language',
      prompt: 'What did we learn today?',
      modelSentences: ['Today I learned the sound...', 'I can now read the word...', 'I got better at...'],
      targetStructures: ['I learned...', 'I can...', 'Next time I want to...'],
    },
    aiEnhanced: false,
  }];
}

// ─── Exported Helpers ────────────────────────────────────────────────────────

/**
 * Get the total number of activities in a lesson.
 */
export function getLessonActivityCount(lesson: AssembledLesson): number {
  return lesson.warmup.length + lesson.newContent.length + lesson.practice.length + lesson.application.length + lesson.wrapup.length;
}

/**
 * Get all activities in a lesson as a flat array in phase order.
 */
export function flattenLessonActivities(lesson: AssembledLesson): Activity[] {
  return [...lesson.warmup, ...lesson.newContent, ...lesson.practice, ...lesson.application, ...lesson.wrapup];
}
