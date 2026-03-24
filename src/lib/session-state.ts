// AmberLit: Session State Machine
// Manages lesson flow through phases: loading → warmup → newContent → practice → application → wrapup → completed

import type { AssembledLesson, Activity } from '@/types/curriculum';
import type { SessionState, SessionEvent, SessionSummary, SessionPhase, ActiveActivityContext, ResponseData } from '@/types/session';
import type { SessionMode } from '@/lib/supabase/types';
import { flattenLessonActivities } from './lesson-assembler';

// ─── Phase ordering ──────────────────────────────────────────────────────────

const PHASE_ORDER: SessionPhase[] = ['warmup', 'newContent', 'practice', 'application', 'wrapup'];

// ─── State machine reducer ───────────────────────────────────────────────────

export interface SessionMachineState {
  state: SessionState;
  lesson: AssembledLesson | null;
  responses: ResponseData[];
  isPaused: boolean;
  startedAt: number;
}

export function initialSessionState(): SessionMachineState {
  return {
    state: { phase: 'loading' },
    lesson: null,
    responses: [],
    isPaused: false,
    startedAt: Date.now(),
  };
}

export function sessionReducer(
  machine: SessionMachineState,
  event: SessionEvent,
): SessionMachineState {
  switch (event.type) {
    case 'LESSON_LOADED': {
      const lesson = event.lesson;
      const firstPhase = findFirstNonEmptyPhase(lesson);
      if (!firstPhase) {
        return {
          ...machine,
          lesson,
          state: { phase: 'completed', summary: buildSummary(machine, lesson) },
        };
      }
      if (firstPhase === 'wrapup') {
        return { ...machine, lesson, state: { phase: 'wrapup' as const } };
      }
      return {
        ...machine,
        lesson,
        state: { phase: firstPhase as 'warmup' | 'newContent' | 'practice' | 'application', activityIndex: 0 },
      };
    }

    case 'RESPONSE_RECORDED': {
      return {
        ...machine,
        responses: [...machine.responses, event.response],
      };
    }

    case 'ACTIVITY_COMPLETE':
    case 'SKIP_ACTIVITY': {
      if (!machine.lesson || machine.state.phase === 'loading' || machine.state.phase === 'completed' || machine.state.phase === 'wrapup') {
        return machine;
      }

      const currentPhase = machine.state.phase;
      const currentIndex = machine.state.activityIndex;
      const phaseActivities = getPhaseActivities(machine.lesson, currentPhase);

      // Move to next activity in current phase
      if (currentIndex < phaseActivities.length - 1) {
        return {
          ...machine,
          state: { phase: currentPhase, activityIndex: currentIndex + 1 },
        };
      }

      // Current phase exhausted — move to next phase
      return advanceToNextPhase(machine, currentPhase);
    }

    case 'PHASE_COMPLETE': {
      if (!machine.lesson || machine.state.phase === 'loading' || machine.state.phase === 'completed') {
        return machine;
      }
      return advanceToNextPhase(machine, machine.state.phase);
    }

    case 'PAUSE': {
      return { ...machine, isPaused: true };
    }

    case 'RESUME': {
      return { ...machine, isPaused: false };
    }

    case 'END_SESSION': {
      if (!machine.lesson) return machine;
      return {
        ...machine,
        state: { phase: 'completed', summary: buildSummary(machine, machine.lesson) },
      };
    }

    default:
      return machine;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function advanceToNextPhase(machine: SessionMachineState, currentPhase: SessionPhase): SessionMachineState {
  if (!machine.lesson) return machine;

  const currentPhaseIndex = PHASE_ORDER.indexOf(currentPhase);

  // Try each subsequent phase
  for (let i = currentPhaseIndex + 1; i < PHASE_ORDER.length; i++) {
    const nextPhase = PHASE_ORDER[i];
    const activities = getPhaseActivities(machine.lesson, nextPhase);
    if (activities.length > 0) {
      if (nextPhase === 'wrapup') {
        return { ...machine, state: { phase: 'wrapup' } };
      }
      return { ...machine, state: { phase: nextPhase as 'warmup' | 'newContent' | 'practice' | 'application', activityIndex: 0 } };
    }
  }

  // All phases exhausted
  return {
    ...machine,
    state: { phase: 'completed', summary: buildSummary(machine, machine.lesson) },
  };
}

function findFirstNonEmptyPhase(lesson: AssembledLesson): SessionPhase | null {
  for (const phase of PHASE_ORDER) {
    if (getPhaseActivities(lesson, phase).length > 0) {
      return phase;
    }
  }
  return null;
}

export function getPhaseActivities(lesson: AssembledLesson, phase: SessionPhase): Activity[] {
  switch (phase) {
    case 'warmup': return lesson.warmup;
    case 'newContent': return lesson.newContent;
    case 'practice': return lesson.practice;
    case 'application': return lesson.application;
    case 'wrapup': return lesson.wrapup;
    default: return [];
  }
}

/**
 * Get the current activity context from the machine state.
 */
export function getCurrentActivity(machine: SessionMachineState): ActiveActivityContext | null {
  if (!machine.lesson) return null;

  const { state } = machine;
  if (state.phase === 'loading' || state.phase === 'completed') return null;

  if (state.phase === 'wrapup') {
    const activities = machine.lesson.wrapup;
    if (activities.length === 0) return null;
    return {
      phase: 'wrapup',
      activity: activities[0],
      phaseIndex: 0,
      totalInPhase: activities.length,
    };
  }

  const activities = getPhaseActivities(machine.lesson, state.phase);
  const index = state.activityIndex;
  if (index >= activities.length) return null;

  return {
    phase: state.phase,
    activity: activities[index],
    phaseIndex: index,
    totalInPhase: activities.length,
  };
}

/**
 * Get total progress through the lesson (0 to 1).
 */
export function getLessonProgress(machine: SessionMachineState): number {
  if (!machine.lesson) return 0;
  if (machine.state.phase === 'completed') return 1;
  if (machine.state.phase === 'loading') return 0;

  const allActivities = flattenLessonActivities(machine.lesson);
  if (allActivities.length === 0) return 0;

  let completedCount = 0;
  for (const phase of PHASE_ORDER) {
    const phaseActivities = getPhaseActivities(machine.lesson, phase);
    if (phase === machine.state.phase) {
      if ('activityIndex' in machine.state) {
        completedCount += machine.state.activityIndex;
      }
      break;
    }
    completedCount += phaseActivities.length;
  }

  return completedCount / allActivities.length;
}

function buildSummary(machine: SessionMachineState, lesson: AssembledLesson): SessionSummary {
  const responses = machine.responses;
  const correct = responses.filter((r) => r.result === 'correct').length;
  const incorrect = responses.filter((r) => r.result === 'incorrect').length;
  const prompted = responses.filter((r) => r.result === 'prompted').length;
  const skipped = responses.filter((r) => r.result === 'skipped').length;
  const scoreable = correct + incorrect + prompted;

  return {
    sessionId: '', // filled in by the API
    studentId: lesson.studentId,
    mode: 'parent', // filled in by caller
    durationSeconds: Math.floor((Date.now() - machine.startedAt) / 1000),
    totalResponses: responses.length,
    correctResponses: correct,
    promptedResponses: prompted,
    incorrectResponses: incorrect,
    skippedResponses: skipped,
    accuracy: scoreable > 0 ? correct / scoreable : 0,
    newlyMastered: [],
    newlyUnlocked: [],
    domainBreakdown: [],
  };
}
