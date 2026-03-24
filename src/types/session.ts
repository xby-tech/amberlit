// AmberLit: Session type definitions
// These types define the session runner state machine and related data structures.

import type { Activity, AssembledLesson, Domain, Strand } from './curriculum';
import type { ResponseResult, SessionMode } from '@/lib/supabase/types';

// ─── Session State Machine ───────────────────────────────────────────────────

export type SessionPhase = 'loading' | 'warmup' | 'newContent' | 'practice' | 'application' | 'wrapup' | 'completed';

export type SessionState =
  | { phase: 'loading' }
  | { phase: 'warmup'; activityIndex: number }
  | { phase: 'newContent'; activityIndex: number }
  | { phase: 'practice'; activityIndex: number }
  | { phase: 'application'; activityIndex: number }
  | { phase: 'wrapup' }
  | { phase: 'completed'; summary: SessionSummary };

export type SessionEvent =
  | { type: 'LESSON_LOADED'; lesson: AssembledLesson }
  | { type: 'RESPONSE_RECORDED'; response: ResponseData }
  | { type: 'ACTIVITY_COMPLETE' }
  | { type: 'PHASE_COMPLETE' }
  | { type: 'SKIP_ACTIVITY' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'END_SESSION' };

// ─── Response Data ───────────────────────────────────────────────────────────

export interface ResponseData {
  activityType: string;
  curriculumNodeId: string;
  stimulus: string;
  expectedResponse: string | null;
  actualResponse: string | null;
  result: ResponseResult;
  responseTimeMs: number | null;
}

// ─── Session Summary ─────────────────────────────────────────────────────────

export interface SessionSummary {
  sessionId: string;
  studentId: string;
  mode: SessionMode;
  durationSeconds: number;
  totalResponses: number;
  correctResponses: number;
  promptedResponses: number;
  incorrectResponses: number;
  skippedResponses: number;
  /** Accuracy as 0-1 (excluding skipped) */
  accuracy: number;
  /** Nodes that reached mastery during this session */
  newlyMastered: string[];
  /** Nodes that were unlocked during this session */
  newlyUnlocked: string[];
  /** Per-domain breakdown */
  domainBreakdown: DomainSummary[];
}

export interface DomainSummary {
  domain: Domain;
  strand: Strand;
  total: number;
  correct: number;
  accuracy: number;
}

// ─── Session Timer ───────────────────────────────────────────────────────────

export interface SessionTimerState {
  targetMinutes: number;
  elapsedSeconds: number;
  isPaused: boolean;
  isOvertime: boolean;
}

// ─── Current Activity Context ────────────────────────────────────────────────

export interface ActiveActivityContext {
  phase: SessionPhase;
  activity: Activity;
  phaseIndex: number;
  totalInPhase: number;
}
