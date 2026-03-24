// AmberLit: Maths Fact Sets
// Pre-built fact pairs for fluency drills, organized by difficulty level.

export type FactPair = [number, number];

// ─── Addition Facts ──────────────────────────────────────────────────────────

export const ADDITION_FACTS: Record<string, FactPair[]> = {
  within_5: [
    [1, 1], [1, 2], [1, 3], [1, 4],
    [2, 1], [2, 2], [2, 3],
    [3, 1], [3, 2],
    [4, 1],
  ],
  within_10: [
    [1, 5], [2, 4], [3, 3], [4, 2], [5, 1],
    [2, 5], [3, 4], [4, 3], [5, 2],
    [1, 6], [2, 6], [3, 5], [4, 4], [5, 3], [6, 1], [6, 2], [6, 3],
    [7, 1], [7, 2],
    [8, 1],
    [1, 7], [1, 8], [1, 9],
    [2, 7], [2, 8],
    [3, 6], [3, 7],
    [4, 5], [4, 6],
    [5, 4], [5, 5],
  ],
  within_20: [
    [9, 2], [8, 3], [7, 4], [6, 5],
    [9, 3], [8, 4], [7, 5], [6, 6],
    [9, 4], [8, 5], [7, 6],
    [9, 5], [8, 6], [7, 7],
    [9, 6], [8, 7],
    [9, 7], [8, 8],
    [9, 8],
    [9, 9],
    [9, 10], [10, 9], [10, 10],
  ],
};

// ─── Subtraction Facts ───────────────────────────────────────────────────────

export const SUBTRACTION_FACTS: Record<string, FactPair[]> = {
  within_5: [
    [2, 1], [3, 1], [3, 2], [4, 1], [4, 2], [4, 3],
    [5, 1], [5, 2], [5, 3], [5, 4],
  ],
  within_10: [
    [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
    [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6],
    [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7],
    [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8],
    [10, 1], [10, 2], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7], [10, 8], [10, 9],
  ],
  within_20: [
    [11, 2], [11, 3], [11, 4], [11, 5],
    [12, 3], [12, 4], [12, 5], [12, 6],
    [13, 4], [13, 5], [13, 6], [13, 7],
    [14, 5], [14, 6], [14, 7], [14, 8],
    [15, 6], [15, 7], [15, 8], [15, 9],
    [16, 7], [16, 8], [16, 9],
    [17, 8], [17, 9],
    [18, 9],
    [20, 10],
  ],
};

// ─── Multiplication Facts (Year 2 introduction) ─────────────────────────────

export const MULTIPLICATION_FACTS: Record<string, FactPair[]> = {
  '2s': [
    [2, 1], [2, 2], [2, 3], [2, 4], [2, 5],
    [2, 6], [2, 7], [2, 8], [2, 9], [2, 10],
  ],
  '5s': [
    [5, 1], [5, 2], [5, 3], [5, 4], [5, 5],
    [5, 6], [5, 7], [5, 8], [5, 9], [5, 10],
  ],
  '10s': [
    [10, 1], [10, 2], [10, 3], [10, 4], [10, 5],
    [10, 6], [10, 7], [10, 8], [10, 9], [10, 10],
  ],
};

// ─── Division Facts (Year 2 introduction) ────────────────────────────────────

export const DIVISION_FACTS: Record<string, FactPair[]> = {
  '2s': [
    [2, 1], [4, 2], [6, 3], [8, 4], [10, 5],
    [12, 6], [14, 7], [16, 8], [18, 9], [20, 10],
  ],
  '5s': [
    [5, 1], [10, 2], [15, 3], [20, 4], [25, 5],
    [30, 6], [35, 7], [40, 8], [45, 9], [50, 10],
  ],
  '10s': [
    [10, 1], [20, 2], [30, 3], [40, 4], [50, 5],
    [60, 6], [70, 7], [80, 8], [90, 9], [100, 10],
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Get a random subset of facts for a drill */
export function getRandomFacts(facts: FactPair[], count: number): FactPair[] {
  const shuffled = [...facts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/** Get the answer for a fact pair given an operation */
export function getFactAnswer(pair: FactPair, operation: 'addition' | 'subtraction' | 'multiplication' | 'division'): number {
  switch (operation) {
    case 'addition': return pair[0] + pair[1];
    case 'subtraction': return pair[0] - pair[1];
    case 'multiplication': return pair[0] * pair[1];
    case 'division': return pair[1] !== 0 ? pair[0] / pair[1] : 0;
  }
}
