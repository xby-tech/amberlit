// AmberLit: Curriculum type definitions
// These types define the structure of all curriculum content (phonics, maths, science, digital tech).
// Content lives as TypeScript files in src/content/, not in the database.

import type { YearLevel } from '@/lib/supabase/types';

// ─── Domains & Strands ───────────────────────────────────────────────────────

export type Domain = 'literacy' | 'maths' | 'science' | 'digital';

export type LiteracyStrand = 'phonics' | 'reading' | 'writing' | 'oral_language';
export type MathsStrand = 'number' | 'algebra' | 'measurement' | 'space' | 'statistics' | 'probability';
export type ScienceStrand = 'biological' | 'chemical' | 'earth_space' | 'physical' | 'inquiry';
export type DigitalStrand = 'digital_systems' | 'data' | 'algorithms' | 'digital_citizenship';
export type Strand = LiteracyStrand | MathsStrand | ScienceStrand | DigitalStrand;

// ─── Activity Types ──────────────────────────────────────────────────────────

export type ActivityType =
  | 'sound_introduction'
  | 'sound_practice'
  | 'word_building'
  | 'tricky_word_flash'
  | 'decodable_reading'
  | 'spelling_dictation'
  | 'writing_prompt'
  | 'maths_fluency'
  | 'maths_concept'
  | 'maths_word_problem'
  | 'science_explore'
  | 'science_investigate'
  | 'digital_activity'
  | 'comprehension_conversation'
  | 'oral_language';

// ─── Curriculum Node ─────────────────────────────────────────────────────────

export interface CurriculumNode {
  /** Unique ID, e.g. 'F.literacy.phonics.letter_s' */
  id: string;
  yearLevel: YearLevel;
  domain: Domain;
  strand: Strand;
  title: string;
  description: string;
  /** Australian Curriculum content descriptor code, e.g. 'AC9EFLY11' */
  acContentDescriptor?: string;
  /** Node IDs that must be mastered before this node unlocks */
  prerequisites: string[];
  /** Mastery threshold (0-1), e.g. 0.8 = 80% accuracy */
  masteryThreshold: number;
  /** Estimated minutes to complete */
  estimatedMinutes: number;
  activities: Activity[];
  assessmentCriteria: AssessmentCriteria;
}

// ─── Activity ────────────────────────────────────────────────────────────────

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  instructions: {
    /** Simplified instructions for parent mode */
    parent: string;
    /** Detailed instructions for teacher aide mode */
    aide: string;
  };
  content: ActivityContent;
  /** Whether this activity calls the AI at runtime */
  aiEnhanced: boolean;
}

// ─── Activity Content (discriminated by activity type) ───────────────────────

export type ActivityContent =
  | SoundIntroductionContent
  | SoundPracticeContent
  | WordBuildingContent
  | TrickyWordFlashContent
  | DecodableReadingContent
  | SpellingDictationContent
  | WritingPromptContent
  | MathsFluencyContent
  | MathsConceptContent
  | MathsWordProblemContent
  | ScienceExploreContent
  | ScienceInvestigateContent
  | DigitalActivityContent
  | ComprehensionContent
  | OralLanguageContent;

export interface SoundIntroductionContent {
  type: 'sound_introduction';
  grapheme: string;
  phoneme: string;
  keywords: string[];
  /** Path to audio file, e.g. '/audio/phonemes/s.mp3' */
  audioPath: string;
  formation?: string; // letter formation description
}

export interface SoundPracticeContent {
  type: 'sound_practice';
  graphemes: string[];
  /** Include previously learned sounds for review */
  includeReview: boolean;
}

export interface WordBuildingContent {
  type: 'word_building';
  words: string[];
  /** Available letters to choose from (includes distractors) */
  availableLetters: string[];
}

export interface TrickyWordFlashContent {
  type: 'tricky_word_flash';
  words: string[];
  /** Seconds to display each word before hiding */
  displaySeconds: number;
}

export interface DecodableReadingContent {
  type: 'decodable_reading';
  /** Patterns the student has mastered — AI uses these to generate text */
  masteredPatterns: string[];
  knownTrickyWords: string[];
  /** Fallback pre-written passage if AI is unavailable */
  fallbackText?: string;
}

export interface SpellingDictationContent {
  type: 'spelling_dictation';
  words: string[];
  /** Audio paths for each word */
  audioPaths: string[];
}

export interface WritingPromptContent {
  type: 'writing_prompt';
  prompt: string;
  wordBank?: string[];
  /** Scaffold hints for struggling students */
  scaffolds?: string[];
}

export interface MathsFluencyContent {
  type: 'maths_fluency';
  operation: 'addition' | 'subtraction' | 'multiplication';
  /** [a, b] pairs */
  facts: [number, number][];
  /** Target seconds per fact for automaticity */
  targetSeconds?: number;
}

export interface MathsConceptContent {
  type: 'maths_concept';
  conceptId: string;
  /** Visual representation type */
  visual: 'number_line' | 'ten_frame' | 'counters' | 'shapes' | 'bar_model';
  steps: string[];
}

export interface MathsWordProblemContent {
  type: 'maths_word_problem';
  operation: 'addition' | 'subtraction' | 'multiplication';
  numberRange: [number, number];
  /** Fallback problem if AI is unavailable */
  fallbackProblem?: { problem: string; answer: number; working: string };
}

export interface ScienceExploreContent {
  type: 'science_explore';
  topic: string;
  observationPrompts: string[];
}

export interface ScienceInvestigateContent {
  type: 'science_investigate';
  question: string;
  steps: string[];
  recordingPrompts: string[];
}

export interface DigitalActivityContent {
  type: 'digital_activity';
  activityId: string;
  instructions: string[];
}

export interface ComprehensionContent {
  type: 'comprehension_conversation';
  /** The passage to discuss (from decodable reader or provided text) */
  passage?: string;
  questionStarters: string[];
}

export interface OralLanguageContent {
  type: 'oral_language';
  prompt: string;
  modelSentences: string[];
  targetStructures: string[];
}

// ─── Assessment Criteria ─────────────────────────────────────────────────────

export interface AssessmentCriteria {
  /** Minimum attempts before mastery can be evaluated */
  minimumAttempts: number;
  /** Accuracy threshold (0-1), e.g. 0.8 = 80% */
  accuracyThreshold: number;
  /** Must be accurate across this many sessions */
  consistencyWindow: number;
  /** Target response time in ms, for automaticity (e.g. maths facts) */
  speedThreshold?: number;
}

// ─── Phonics-specific types ──────────────────────────────────────────────────

export interface PhonicsUnit {
  id: string;
  grapheme?: string;
  phoneme?: string;
  keywords?: string[];
  week: number;
  /** For blend units */
  blends?: 'initial' | 'final';
  patterns?: string[];
}

// ─── Maths-specific types ────────────────────────────────────────────────────

export interface MathsUnit {
  id: string;
  strand: MathsStrand;
  title: string;
  skills: string[];
  acDescriptor: string;
  week: number;
}

// ─── Lesson Assembly ─────────────────────────────────────────────────────────

export interface AssembledLesson {
  id: string;
  studentId: string;
  yearLevel: YearLevel;
  warmup: Activity[];
  newContent: Activity[];
  practice: Activity[];
  application: Activity[];
  wrapup: Activity[];
  /** Total estimated minutes */
  estimatedMinutes: number;
  /** Curriculum nodes covered in this lesson */
  nodeIds: string[];
}

// ─── Time allocations per mode ───────────────────────────────────────────────

export interface TimeAllocation {
  warmup: number;
  newContent: number;
  practice: number;
  application: number;
  wrapup: number;
}

export const TIME_ALLOCATIONS: Record<'parent' | 'aide', TimeAllocation> = {
  parent: { warmup: 3, newContent: 7, practice: 7, application: 3, wrapup: 0 },
  aide: { warmup: 5, newContent: 15, practice: 15, application: 8, wrapup: 2 },
};
