// AmberLit: Placement Assessment
// Adaptive test to determine starting position in the curriculum.
// Uses mid-point branching: start in the middle, go harder on correct, easier on incorrect.

import type { YearLevel } from '@/lib/supabase/types';

export interface PlacementQuestion {
  id: string;
  domain: 'literacy' | 'maths';
  strand: string;
  level: number; // 1-10 difficulty scale
  stimulus: string;
  correctAnswer: string;
  options?: string[]; // for multiple choice
  type: 'identify_sound' | 'blend_word' | 'read_word' | 'count' | 'numeral' | 'addition' | 'subtraction';
}

export interface PlacementResult {
  literacy: {
    phonicsStartNode: string;
    level: number;
    accuracy: number;
  };
  maths: {
    startNode: string;
    level: number;
    accuracy: number;
  };
}

// ─── Question Bank ───────────────────────────────────────────────────────────

const LITERACY_QUESTIONS: PlacementQuestion[] = [
  // Level 1-2: Single letter sounds (early Foundation)
  { id: 'L1', domain: 'literacy', strand: 'phonics', level: 1, stimulus: 'What sound does "s" make?', correctAnswer: '/s/', type: 'identify_sound' },
  { id: 'L2', domain: 'literacy', strand: 'phonics', level: 1, stimulus: 'What sound does "a" make?', correctAnswer: '/a/', type: 'identify_sound' },
  { id: 'L3', domain: 'literacy', strand: 'phonics', level: 2, stimulus: 'What sound does "m" make?', correctAnswer: '/m/', type: 'identify_sound' },
  { id: 'L4', domain: 'literacy', strand: 'phonics', level: 2, stimulus: 'What sound does "t" make?', correctAnswer: '/t/', type: 'identify_sound' },
  // Level 3-4: CVC blending (mid Foundation)
  { id: 'L5', domain: 'literacy', strand: 'phonics', level: 3, stimulus: 'Can you read this word: "sat"?', correctAnswer: 'sat', type: 'read_word' },
  { id: 'L6', domain: 'literacy', strand: 'phonics', level: 3, stimulus: 'Can you read this word: "pin"?', correctAnswer: 'pin', type: 'read_word' },
  { id: 'L7', domain: 'literacy', strand: 'phonics', level: 4, stimulus: 'Can you read this word: "dog"?', correctAnswer: 'dog', type: 'read_word' },
  { id: 'L8', domain: 'literacy', strand: 'phonics', level: 4, stimulus: 'Can you read this word: "cup"?', correctAnswer: 'cup', type: 'read_word' },
  // Level 5-6: Digraphs (late Foundation)
  { id: 'L9', domain: 'literacy', strand: 'phonics', level: 5, stimulus: 'What sound do "sh" make together?', correctAnswer: '/sh/', type: 'identify_sound' },
  { id: 'L10', domain: 'literacy', strand: 'phonics', level: 5, stimulus: 'Can you read this word: "ship"?', correctAnswer: 'ship', type: 'read_word' },
  { id: 'L11', domain: 'literacy', strand: 'phonics', level: 6, stimulus: 'Can you read this word: "ring"?', correctAnswer: 'ring', type: 'read_word' },
  { id: 'L12', domain: 'literacy', strand: 'phonics', level: 6, stimulus: 'Can you read this word: "black"?', correctAnswer: 'black', type: 'read_word' },
  // Level 7-8: Vowel digraphs (Year 1)
  { id: 'L13', domain: 'literacy', strand: 'phonics', level: 7, stimulus: 'Can you read this word: "rain"?', correctAnswer: 'rain', type: 'read_word' },
  { id: 'L14', domain: 'literacy', strand: 'phonics', level: 7, stimulus: 'Can you read this word: "boat"?', correctAnswer: 'boat', type: 'read_word' },
  { id: 'L15', domain: 'literacy', strand: 'phonics', level: 8, stimulus: 'Can you read this word: "night"?', correctAnswer: 'night', type: 'read_word' },
  // Level 9-10: Advanced code (Year 2)
  { id: 'L16', domain: 'literacy', strand: 'phonics', level: 9, stimulus: 'Can you read this word: "cake"?', correctAnswer: 'cake', type: 'read_word' },
  { id: 'L17', domain: 'literacy', strand: 'phonics', level: 10, stimulus: 'Can you read this word: "station"?', correctAnswer: 'station', type: 'read_word' },
];

const MATHS_QUESTIONS: PlacementQuestion[] = [
  // Level 1-2: Counting (early Foundation)
  { id: 'M1', domain: 'maths', strand: 'number', level: 1, stimulus: 'Count to 5', correctAnswer: '5', type: 'count' },
  { id: 'M2', domain: 'maths', strand: 'number', level: 2, stimulus: 'What number is this? (show 7)', correctAnswer: '7', type: 'numeral' },
  { id: 'M3', domain: 'maths', strand: 'number', level: 2, stimulus: 'Count to 10', correctAnswer: '10', type: 'count' },
  // Level 3-4: Counting to 20, simple addition (mid Foundation)
  { id: 'M4', domain: 'maths', strand: 'number', level: 3, stimulus: 'What number is this? (show 15)', correctAnswer: '15', type: 'numeral' },
  { id: 'M5', domain: 'maths', strand: 'number', level: 3, stimulus: 'Count to 20', correctAnswer: '20', type: 'count' },
  { id: 'M6', domain: 'maths', strand: 'number', level: 4, stimulus: '2 + 3 = ?', correctAnswer: '5', type: 'addition' },
  { id: 'M7', domain: 'maths', strand: 'number', level: 4, stimulus: '4 + 1 = ?', correctAnswer: '5', type: 'addition' },
  // Level 5-6: Addition/subtraction within 10 (late Foundation)
  { id: 'M8', domain: 'maths', strand: 'number', level: 5, stimulus: '6 + 3 = ?', correctAnswer: '9', type: 'addition' },
  { id: 'M9', domain: 'maths', strand: 'number', level: 5, stimulus: '8 - 3 = ?', correctAnswer: '5', type: 'subtraction' },
  { id: 'M10', domain: 'maths', strand: 'number', level: 6, stimulus: '7 + 5 = ?', correctAnswer: '12', type: 'addition' },
  // Level 7-8: Year 1
  { id: 'M11', domain: 'maths', strand: 'number', level: 7, stimulus: '14 + 6 = ?', correctAnswer: '20', type: 'addition' },
  { id: 'M12', domain: 'maths', strand: 'number', level: 7, stimulus: '18 - 9 = ?', correctAnswer: '9', type: 'subtraction' },
  { id: 'M13', domain: 'maths', strand: 'number', level: 8, stimulus: '25 + 17 = ?', correctAnswer: '42', type: 'addition' },
  // Level 9-10: Year 2
  { id: 'M14', domain: 'maths', strand: 'number', level: 9, stimulus: '48 + 35 = ?', correctAnswer: '83', type: 'addition' },
  { id: 'M15', domain: 'maths', strand: 'number', level: 10, stimulus: '5 × 4 = ?', correctAnswer: '20', type: 'addition' },
];

// ─── Adaptive Algorithm ──────────────────────────────────────────────────────

export interface PlacementState {
  domain: 'literacy' | 'maths';
  currentLevel: number;
  answered: Array<{ questionId: string; correct: boolean; level: number }>;
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
  done: boolean;
}

export function initPlacement(yearLevel: YearLevel): { literacy: PlacementState; maths: PlacementState } {
  // Start at mid-point for the year level
  const startLevel = yearLevel === 'F' ? 3 : yearLevel === '1' ? 6 : 8;
  return {
    literacy: { domain: 'literacy', currentLevel: startLevel, answered: [], consecutiveCorrect: 0, consecutiveIncorrect: 0, done: false },
    maths: { domain: 'maths', currentLevel: startLevel, answered: [], consecutiveCorrect: 0, consecutiveIncorrect: 0, done: false },
  };
}

export function getNextQuestion(state: PlacementState): PlacementQuestion | null {
  if (state.done) return null;

  const bank = state.domain === 'literacy' ? LITERACY_QUESTIONS : MATHS_QUESTIONS;
  const answeredIds = new Set(state.answered.map((a) => a.questionId));

  // Find a question at the current level (or closest)
  const candidates = bank
    .filter((q) => !answeredIds.has(q.id))
    .sort((a, b) => Math.abs(a.level - state.currentLevel) - Math.abs(b.level - state.currentLevel));

  return candidates[0] ?? null;
}

export function recordPlacementAnswer(state: PlacementState, questionId: string, correct: boolean): PlacementState {
  const question = [...LITERACY_QUESTIONS, ...MATHS_QUESTIONS].find((q) => q.id === questionId);
  if (!question) return state;

  const answered = [...state.answered, { questionId, correct, level: question.level }];
  const consecutiveCorrect = correct ? state.consecutiveCorrect + 1 : 0;
  const consecutiveIncorrect = correct ? 0 : state.consecutiveIncorrect + 1;

  // Stop conditions: 3 consecutive correct or incorrect at same level, or 15+ questions
  const done = consecutiveCorrect >= 3 || consecutiveIncorrect >= 3 || answered.length >= 15;

  // Adjust level
  let newLevel = state.currentLevel;
  if (correct) newLevel = Math.min(10, state.currentLevel + 1);
  else newLevel = Math.max(1, state.currentLevel - 1);

  return { ...state, currentLevel: newLevel, answered, consecutiveCorrect, consecutiveIncorrect, done };
}

export function calculatePlacementResult(
  literacy: PlacementState,
  maths: PlacementState,
  yearLevel: YearLevel,
): PlacementResult {
  const litCorrect = literacy.answered.filter((a) => a.correct).length;
  const litAccuracy = literacy.answered.length > 0 ? litCorrect / literacy.answered.length : 0;
  const litLevel = literacy.currentLevel;

  const mathCorrect = maths.answered.filter((a) => a.correct).length;
  const mathAccuracy = maths.answered.length > 0 ? mathCorrect / maths.answered.length : 0;
  const mathLevel = maths.currentLevel;

  return {
    literacy: {
      phonicsStartNode: mapLevelToPhonicsNode(litLevel, yearLevel),
      level: litLevel,
      accuracy: litAccuracy,
    },
    maths: {
      startNode: mapLevelToMathsNode(mathLevel, yearLevel),
      level: mathLevel,
      accuracy: mathAccuracy,
    },
  };
}

function mapLevelToPhonicsNode(level: number, yearLevel: YearLevel): string {
  const prefix = yearLevel === 'F' ? 'F' : yearLevel;
  if (level <= 2) return `${prefix}.phonics.01`;
  if (level <= 4) return `${prefix}.phonics.07`;
  if (level <= 6) return `${prefix}.phonics.27`;
  if (level <= 8) return yearLevel === 'F' ? 'F.phonics.33' : `${prefix}.phonics.01`;
  return `${prefix}.phonics.01`;
}

function mapLevelToMathsNode(level: number, yearLevel: YearLevel): string {
  const prefix = yearLevel === 'F' ? 'F' : yearLevel;
  if (level <= 2) return `${prefix}.maths.num.01`;
  if (level <= 4) return `${prefix}.maths.num.03`;
  if (level <= 6) return `${prefix}.maths.num.04`;
  if (level <= 8) return `${prefix}.maths.num.05`;
  return `${prefix}.maths.num.06`;
}
