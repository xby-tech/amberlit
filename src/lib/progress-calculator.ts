// AmberLit: Progress Calculator
// Updates mastery levels and determines when nodes are unlocked.

import type { AssessmentCriteria } from '@/types/curriculum';
import type { ResponseResult } from '@/lib/supabase/types';
import { getNodeById } from '@/content/curriculum-map';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProgressState {
  curriculum_node_id: string;
  mastery_level: number;
  attempts: number;
  correct: number;
  unlocked: boolean;
}

export interface ProgressUpdate {
  mastery_level: number;
  attempts: number;
  correct: number;
  unlocked: boolean;
  last_practiced: string;
  next_review: string | null;
}

export interface MasteryCheckResult {
  isMastered: boolean;
  masteryLevel: number;
  attemptsNeeded: number;
  currentAccuracy: number;
}

// ─── Mastery Calculation ─────────────────────────────────────────────────────

/**
 * Calculate the updated mastery level after a new response.
 * Uses exponential moving average weighted toward recent performance.
 */
export function calculateMasteryLevel(
  currentMastery: number,
  attempts: number,
  correct: number,
  result: ResponseResult,
): number {
  // Map result to a score
  const score = result === 'correct' ? 1.0
    : result === 'prompted' ? 0.4
    : result === 'skipped' ? 0.0
    : 0.0; // incorrect

  const newAttempts = attempts + 1;
  const newCorrect = correct + (result === 'correct' ? 1 : 0);

  // Raw accuracy
  const rawAccuracy = newAttempts > 0 ? newCorrect / newAttempts : 0;

  // Exponential moving average: weight recent performance more heavily
  // Alpha = 0.3 means 30% weight to new result, 70% to history
  const alpha = 0.3;
  const ema = currentMastery * (1 - alpha) + score * alpha;

  // Blend EMA with raw accuracy (prevents mastery from being too sticky)
  const blended = ema * 0.6 + rawAccuracy * 0.4;

  // Clamp to 0-1
  return Math.max(0, Math.min(1, blended));
}

/**
 * Check whether a curriculum node has been mastered based on its assessment criteria.
 */
export function checkMastery(
  progress: ProgressState,
  criteria: AssessmentCriteria,
): MasteryCheckResult {
  const currentAccuracy = progress.attempts > 0
    ? progress.correct / progress.attempts
    : 0;

  const hasEnoughAttempts = progress.attempts >= criteria.minimumAttempts;
  const meetsAccuracy = currentAccuracy >= criteria.accuracyThreshold;
  const meetsMastery = progress.mastery_level >= criteria.accuracyThreshold;

  return {
    isMastered: hasEnoughAttempts && meetsAccuracy && meetsMastery,
    masteryLevel: progress.mastery_level,
    attemptsNeeded: Math.max(0, criteria.minimumAttempts - progress.attempts),
    currentAccuracy,
  };
}

/**
 * Determine if a curriculum node should be unlocked based on its prerequisites.
 *
 * @param nodeId - The node to check
 * @param allProgress - All progress records for the student
 * @returns true if all prerequisites are mastered (or node has no prerequisites)
 */
export function shouldUnlock(
  nodeId: string,
  allProgress: ProgressState[],
): boolean {
  const node = getNodeById(nodeId);
  if (!node) return false;

  // No prerequisites = always unlocked
  if (node.prerequisites.length === 0) return true;

  // Check each prerequisite is mastered
  return node.prerequisites.every((prereqId) => {
    const prereqProgress = allProgress.find((p) => p.curriculum_node_id === prereqId);
    if (!prereqProgress) return false;

    const prereqNode = getNodeById(prereqId);
    if (!prereqNode) return false;

    const masteryCheck = checkMastery(prereqProgress, prereqNode.assessmentCriteria);
    return masteryCheck.isMastered;
  });
}

/**
 * Get all nodes that should be unlocked for a student but aren't yet.
 * Called after progress updates to unlock the next nodes in sequence.
 */
export function getNewUnlocks(
  allProgress: ProgressState[],
  allNodeIds: string[],
): string[] {
  const newUnlocks: string[] = [];

  for (const nodeId of allNodeIds) {
    const existing = allProgress.find((p) => p.curriculum_node_id === nodeId);

    // Already unlocked? Skip
    if (existing?.unlocked) continue;

    // Check if it should now be unlocked
    if (shouldUnlock(nodeId, allProgress)) {
      newUnlocks.push(nodeId);
    }
  }

  return newUnlocks;
}

/**
 * Determine the starting node for a student based on placement results.
 * Returns the first node that is NOT mastered.
 */
export function findStartingNode(
  domain: 'literacy' | 'maths',
  yearLevel: 'F' | '1' | '2',
  placementAccuracy: number,
  placementLevel: string,
): string {
  // Map placement level to approximate starting node
  if (domain === 'literacy') {
    if (placementAccuracy < 0.3) return `${yearLevel === 'F' ? 'F' : yearLevel}.phonics.01`;
    if (placementAccuracy < 0.6) return `${yearLevel === 'F' ? 'F' : yearLevel}.phonics.10`;
    if (placementAccuracy < 0.8) return `${yearLevel === 'F' ? 'F' : yearLevel}.phonics.20`;
    return `${yearLevel === 'F' ? 'F' : yearLevel}.phonics.27`;
  }

  // Maths
  if (placementAccuracy < 0.3) return `${yearLevel === 'F' ? 'F' : yearLevel}.maths.num.01`;
  if (placementAccuracy < 0.6) return `${yearLevel === 'F' ? 'F' : yearLevel}.maths.num.03`;
  if (placementAccuracy < 0.8) return `${yearLevel === 'F' ? 'F' : yearLevel}.maths.num.05`;
  return `${yearLevel === 'F' ? 'F' : yearLevel}.maths.num.06`;
}
