// AmberLit: Spaced Repetition Scheduler
// Modified SM-2 algorithm adapted for young learners (ages 5-8).
// Key differences from standard SM-2:
// - Shorter maximum interval (30 days vs unlimited)
// - Slower ease factor increase (young learners benefit from more review)
// - "Prompted" result sits between correct and incorrect

export interface ReviewSchedule {
  /** Days until next review */
  interval: number;
  /** Ease multiplier (starts at 2.5, min 1.3) */
  easeFactor: number;
  /** Consecutive correct reviews */
  repetitions: number;
}

export type ReviewResult = 'correct' | 'incorrect' | 'prompted';

/** Maximum interval in days — young learners need more frequent review */
const MAX_INTERVAL_DAYS = 30;

/** Minimum ease factor — never let it drop below this */
const MIN_EASE_FACTOR = 1.3;

/** Starting ease factor for new items */
export const INITIAL_EASE_FACTOR = 2.5;

/** Default schedule for a brand new item */
export const INITIAL_SCHEDULE: ReviewSchedule = {
  interval: 0,
  easeFactor: INITIAL_EASE_FACTOR,
  repetitions: 0,
};

/**
 * Calculate the next review schedule based on the student's result.
 *
 * @param current - The current review schedule
 * @param result - How the student performed
 * @returns Updated review schedule
 */
export function calculateNextReview(
  current: ReviewSchedule,
  result: ReviewResult,
): ReviewSchedule {
  switch (result) {
    case 'incorrect': {
      // Reset to short interval, decrease ease factor
      return {
        interval: 1,
        easeFactor: Math.max(MIN_EASE_FACTOR, current.easeFactor - 0.2),
        repetitions: 0,
      };
    }

    case 'prompted': {
      // Shorter interval than correct, but don't fully reset
      return {
        interval: Math.max(1, Math.floor(current.interval * 0.5)),
        easeFactor: current.easeFactor, // no change
        repetitions: current.repetitions, // don't reset streak
      };
    }

    case 'correct': {
      const newReps = current.repetitions + 1;
      let newInterval: number;

      if (newReps === 1) {
        newInterval = 1;
      } else if (newReps === 2) {
        newInterval = 3;
      } else {
        newInterval = Math.round(current.interval * current.easeFactor);
      }

      return {
        interval: Math.min(newInterval, MAX_INTERVAL_DAYS),
        easeFactor: current.easeFactor + 0.1,
        repetitions: newReps,
      };
    }
  }
}

/**
 * Calculate the next review date from a schedule.
 *
 * @param schedule - The review schedule
 * @param fromDate - The date to calculate from (defaults to now)
 * @returns The next review date as an ISO string
 */
export function getNextReviewDate(schedule: ReviewSchedule, fromDate?: Date): string {
  const from = fromDate ?? new Date();
  const next = new Date(from);
  next.setDate(next.getDate() + schedule.interval);
  return next.toISOString();
}

/**
 * Check if a curriculum node is due for review.
 *
 * @param nextReviewDate - ISO string of the scheduled review date
 * @param now - Current date (defaults to now)
 * @returns true if the item is due for review
 */
export function isDueForReview(nextReviewDate: string | null, now?: Date): boolean {
  if (!nextReviewDate) return false;
  const reviewDate = new Date(nextReviewDate);
  const currentDate = now ?? new Date();
  return reviewDate <= currentDate;
}

/**
 * Sort progress items by review priority.
 * Items that are most overdue come first.
 */
export function sortByReviewPriority<T extends { next_review: string | null; mastery_level: number }>(
  items: T[],
  now?: Date,
): T[] {
  const currentDate = now ?? new Date();
  return [...items]
    .filter((item) => item.next_review !== null)
    .sort((a, b) => {
      const aDate = new Date(a.next_review!);
      const bDate = new Date(b.next_review!);
      // Most overdue first
      const aOverdue = currentDate.getTime() - aDate.getTime();
      const bOverdue = currentDate.getTime() - bDate.getTime();
      // If both overdue, sort by how overdue they are
      if (aOverdue > 0 && bOverdue > 0) return bOverdue - aOverdue;
      // Overdue items come before non-overdue
      if (aOverdue > 0) return -1;
      if (bOverdue > 0) return 1;
      // Neither overdue, sort by mastery (lower mastery = higher priority)
      return a.mastery_level - b.mastery_level;
    });
}
