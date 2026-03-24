// AmberLit: Tricky Words (High-Frequency Irregular Words)
// Sequenced per year level and term, introduced progressively alongside phonics.
// These words cannot be fully decoded with current phonics knowledge.

import type { YearLevel } from '@/lib/supabase/types';

export interface TrickyWordSet {
  term1: string[];
  term2: string[];
  term3: string[];
  term4: string[];
}

export const TRICKY_WORDS: Record<YearLevel, TrickyWordSet> = {
  F: {
    term1: ['I', 'the', 'to', 'no', 'go', 'is', 'my', 'a'],
    term2: ['he', 'she', 'we', 'me', 'be', 'was', 'you', 'they', 'are', 'all', 'her'],
    term3: ['said', 'have', 'like', 'so', 'do', 'some', 'come', 'were', 'there', 'little', 'one'],
    term4: ['when', 'what', 'out', 'could', 'would', 'should', 'their', 'people', 'oh', 'Mr', 'Mrs'],
  },
  '1': {
    term1: ['asked', 'called', 'could', 'looked', 'where', 'who', 'again', 'thought'],
    term2: ['through', 'many', 'laughed', 'because', 'different', 'any', 'eyes', 'friends'],
    term3: ['once', 'please', 'turned', 'great', 'every', 'know', 'write', 'right'],
    term4: ['brought', 'caught', 'bought', 'eight', 'weight', 'weird', 'ceiling', 'receive'],
  },
  '2': {
    term1: ['island', 'answer', 'beautiful', 'continue', 'describe', 'enough', 'guard', 'heard'],
    term2: ['imagine', 'knowledge', 'library', 'material', 'noticed', 'occasion', 'perhaps', 'question'],
    term3: ['recent', 'sentence', 'separate', 'special', 'strength', 'suppose', 'surprise', 'though'],
    term4: ['through', 'tomorrow', 'various', 'weight', 'whether', 'women', 'accident', 'believe'],
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Get all tricky words for a year level up to a given term */
export function getTrickyWordsUpToTerm(yearLevel: YearLevel, term: 1 | 2 | 3 | 4): string[] {
  const set = TRICKY_WORDS[yearLevel];
  const words: string[] = [];
  if (term >= 1) words.push(...set.term1);
  if (term >= 2) words.push(...set.term2);
  if (term >= 3) words.push(...set.term3);
  if (term >= 4) words.push(...set.term4);
  return words;
}

/** Get all tricky words a student would know up to a given year level */
export function getAllTrickyWordsUpToYear(yearLevel: YearLevel): string[] {
  const words: string[] = [];
  const levels: YearLevel[] = ['F', '1', '2'];
  for (const level of levels) {
    words.push(...getTrickyWordsUpToTerm(level, 4));
    if (level === yearLevel) break;
  }
  return words;
}

/** Get the total number of tricky words for a year level */
export function getTrickyWordCount(yearLevel: YearLevel): number {
  const set = TRICKY_WORDS[yearLevel];
  return set.term1.length + set.term2.length + set.term3.length + set.term4.length;
}
