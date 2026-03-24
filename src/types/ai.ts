// AmberLit: AI layer type definitions
// These types define the AI provider interface and related data structures.

import type { ActivityType, Domain } from './curriculum';
import type { InsightType, ResponseResult, SessionMode, YearLevel } from '@/lib/supabase/types';

// ─── AI Provider Interface ───────────────────────────────────────────────────

export interface AIProvider {
  generateFeedback(context: FeedbackContext): Promise<string>;
  generateDecodableText(params: DecodableTextParams): Promise<string>;
  generateWordProblem(params: WordProblemParams): Promise<WordProblemResult>;
  generateInsight(studentData: StudentAnalysis): Promise<AIInsight>;
  conversationTurn(history: ConversationMessage[], context: LessonContext): Promise<string>;
}

// ─── Feedback ────────────────────────────────────────────────────────────────

export interface FeedbackContext {
  studentName: string;
  yearLevel: YearLevel;
  activityType: ActivityType;
  stimulus: string;
  expectedResponse: string;
  actualResult: ResponseResult;
  /** Last 10 responses for context */
  recentHistory: ResponseSummary[];
  mode: SessionMode;
}

export interface ResponseSummary {
  activityType: string;
  stimulus: string;
  result: ResponseResult;
  responseTimeMs: number | null;
}

// ─── Decodable Text Generation ───────────────────────────────────────────────

export interface DecodableTextParams {
  yearLevel: YearLevel;
  /** Phonics patterns the student has mastered */
  masteredPatterns: string[];
  /** The specific pattern being practiced now */
  targetPattern: string;
  /** Tricky words the student knows */
  knownTrickyWords: string[];
  /** Number of sentences to generate */
  sentenceCount: number;
}

// ─── Word Problem Generation ─────────────────────────────────────────────────

export interface WordProblemParams {
  yearLevel: YearLevel;
  operation: 'addition' | 'subtraction' | 'multiplication';
  numberRange: [number, number];
  /** Whether to generate a multi-step problem */
  multiStep?: boolean;
}

export interface WordProblemResult {
  problem: string;
  answer: number;
  working: string;
}

// ─── AI Insights ─────────────────────────────────────────────────────────────

export interface StudentAnalysis {
  studentName: string;
  yearLevel: YearLevel;
  /** Recent session data (last 3-5 sessions) */
  recentSessions: SessionAnalysis[];
  /** Current progress across domains */
  progressSnapshot: ProgressSnapshot[];
}

export interface SessionAnalysis {
  sessionId: string;
  date: string;
  totalResponses: number;
  correctResponses: number;
  /** Per-strand accuracy */
  strandAccuracy: Record<string, number>;
}

export interface ProgressSnapshot {
  curriculumNodeId: string;
  domain: Domain;
  strand: string;
  masteryLevel: number;
  attempts: number;
  lastPracticed: string | null;
}

export interface AIInsight {
  insightType: InsightType;
  title: string;
  body: string;
  domain: Domain | null;
  priority: number;
}

// ─── Conversation ────────────────────────────────────────────────────────────

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface LessonContext {
  studentName: string;
  yearLevel: YearLevel;
  activityType: ActivityType;
  /** The text being discussed (for comprehension) */
  passage?: string;
  /** Question starters to guide conversation */
  questionStarters?: string[];
}

// ─── AI Safety Config ────────────────────────────────────────────────────────

export interface AISafetyConfig {
  maxTokensStudentFeedback: number;
  maxTokensDecodableText: number;
  maxTokensInsight: number;
  maxTokensWordProblem: number;
  blockedTopics: string[];
  maxAICallsPerSession: number;
  maxAICallsPerMinute: number;
  fallbackEnabled: boolean;
}

export const DEFAULT_SAFETY_CONFIG: AISafetyConfig = {
  maxTokensStudentFeedback: 100,
  maxTokensDecodableText: 300,
  maxTokensInsight: 200,
  maxTokensWordProblem: 150,
  blockedTopics: ['violence', 'death', 'divorce', 'illness', 'politics', 'religion'],
  maxAICallsPerSession: 30,
  maxAICallsPerMinute: 5,
  fallbackEnabled: true,
};
