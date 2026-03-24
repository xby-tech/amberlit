'use client';

// AmberLit: Session hook
// Wraps the session state machine in a React-friendly interface.

import { useCallback, useReducer, useRef } from 'react';
import type { AssembledLesson } from '@/types/curriculum';
import type { ResponseData, SessionSummary } from '@/types/session';
import type { ResponseResult } from '@/lib/supabase/types';
import {
  sessionReducer,
  initialSessionState,
  getCurrentActivity,
  getLessonProgress,
  type SessionMachineState,
} from '@/lib/session-state';

export function useSession() {
  const [machine, dispatch] = useReducer(sessionReducer, undefined, initialSessionState);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef(0);

  const loadLesson = useCallback((lesson: AssembledLesson) => {
    dispatch({ type: 'LESSON_LOADED', lesson });
  }, []);

  const recordResponse = useCallback((response: ResponseData) => {
    dispatch({ type: 'RESPONSE_RECORDED', response });
  }, []);

  const completeActivity = useCallback(() => {
    dispatch({ type: 'ACTIVITY_COMPLETE' });
  }, []);

  const skipActivity = useCallback(() => {
    dispatch({ type: 'SKIP_ACTIVITY' });
  }, []);

  const completePhase = useCallback(() => {
    dispatch({ type: 'PHASE_COMPLETE' });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, []);

  const resume = useCallback(() => {
    dispatch({ type: 'RESUME' });
  }, []);

  const endSession = useCallback(() => {
    dispatch({ type: 'END_SESSION' });
  }, []);

  const currentActivity = getCurrentActivity(machine);
  const progress = getLessonProgress(machine);
  const isCompleted = machine.state.phase === 'completed';
  const summary = isCompleted && 'summary' in machine.state ? machine.state.summary : null;

  return {
    // State
    phase: machine.state.phase,
    currentActivity,
    lesson: machine.lesson,
    responses: machine.responses,
    isPaused: machine.isPaused,
    progress,
    isCompleted,
    summary,

    // Actions
    loadLesson,
    recordResponse,
    completeActivity,
    skipActivity,
    completePhase,
    pause,
    resume,
    endSession,
  };
}
