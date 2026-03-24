import { describe, it, expect } from 'vitest';
import {
  calculateNextReview,
  getNextReviewDate,
  isDueForReview,
  sortByReviewPriority,
  INITIAL_SCHEDULE,
  INITIAL_EASE_FACTOR,
} from '@/lib/spaced-repetition';

describe('calculateNextReview', () => {
  it('should set interval to 1 day after first correct answer', () => {
    const result = calculateNextReview(INITIAL_SCHEDULE, 'correct');
    expect(result.interval).toBe(1);
    expect(result.repetitions).toBe(1);
    expect(result.easeFactor).toBeCloseTo(INITIAL_EASE_FACTOR + 0.1);
  });

  it('should set interval to 3 days after second consecutive correct', () => {
    const afterFirst = calculateNextReview(INITIAL_SCHEDULE, 'correct');
    const afterSecond = calculateNextReview(afterFirst, 'correct');
    expect(afterSecond.interval).toBe(3);
    expect(afterSecond.repetitions).toBe(2);
  });

  it('should increase interval with ease factor after third correct', () => {
    let schedule = INITIAL_SCHEDULE;
    schedule = calculateNextReview(schedule, 'correct'); // interval=1
    schedule = calculateNextReview(schedule, 'correct'); // interval=3
    schedule = calculateNextReview(schedule, 'correct'); // interval=3*easeFactor
    expect(schedule.interval).toBeGreaterThan(3);
    expect(schedule.repetitions).toBe(3);
  });

  it('should reset to 1 day interval on incorrect', () => {
    let schedule = INITIAL_SCHEDULE;
    schedule = calculateNextReview(schedule, 'correct');
    schedule = calculateNextReview(schedule, 'correct');
    schedule = calculateNextReview(schedule, 'incorrect');
    expect(schedule.interval).toBe(1);
    expect(schedule.repetitions).toBe(0);
  });

  it('should decrease ease factor on incorrect but not below 1.3', () => {
    let schedule = { interval: 5, easeFactor: 1.5, repetitions: 3 };
    schedule = calculateNextReview(schedule, 'incorrect');
    expect(schedule.easeFactor).toBe(1.3);

    // Even if already at 1.3, shouldn't go below
    schedule = calculateNextReview(schedule, 'incorrect');
    expect(schedule.easeFactor).toBe(1.3);
  });

  it('should halve interval on prompted without resetting streak', () => {
    const schedule = { interval: 10, easeFactor: 2.5, repetitions: 4 };
    const result = calculateNextReview(schedule, 'prompted');
    expect(result.interval).toBe(5);
    expect(result.repetitions).toBe(4); // streak preserved
    expect(result.easeFactor).toBe(2.5); // no change
  });

  it('should cap interval at 30 days', () => {
    let schedule = INITIAL_SCHEDULE;
    // Run many correct answers to build up a large interval
    for (let i = 0; i < 20; i++) {
      schedule = calculateNextReview(schedule, 'correct');
    }
    expect(schedule.interval).toBeLessThanOrEqual(30);
  });

  it('should handle prompted with interval of 1', () => {
    const schedule = { interval: 1, easeFactor: 2.5, repetitions: 1 };
    const result = calculateNextReview(schedule, 'prompted');
    expect(result.interval).toBe(1); // max(1, floor(0.5)) = 1
  });
});

describe('getNextReviewDate', () => {
  it('should return a date N days from now', () => {
    const baseDate = new Date('2026-03-01T00:00:00Z');
    const schedule = { interval: 3, easeFactor: 2.5, repetitions: 2 };
    const nextDate = getNextReviewDate(schedule, baseDate);
    expect(new Date(nextDate).toISOString()).toBe('2026-03-04T00:00:00.000Z');
  });

  it('should return today if interval is 0', () => {
    const baseDate = new Date('2026-03-01T00:00:00Z');
    const nextDate = getNextReviewDate(INITIAL_SCHEDULE, baseDate);
    expect(new Date(nextDate).toISOString()).toBe('2026-03-01T00:00:00.000Z');
  });
});

describe('isDueForReview', () => {
  it('should return true if review date is in the past', () => {
    const now = new Date('2026-03-10T00:00:00Z');
    expect(isDueForReview('2026-03-09T00:00:00Z', now)).toBe(true);
  });

  it('should return true if review date is now', () => {
    const now = new Date('2026-03-10T00:00:00Z');
    expect(isDueForReview('2026-03-10T00:00:00Z', now)).toBe(true);
  });

  it('should return false if review date is in the future', () => {
    const now = new Date('2026-03-10T00:00:00Z');
    expect(isDueForReview('2026-03-11T00:00:00Z', now)).toBe(false);
  });

  it('should return false for null review date', () => {
    expect(isDueForReview(null)).toBe(false);
  });
});

describe('sortByReviewPriority', () => {
  it('should sort overdue items first, most overdue at top', () => {
    const now = new Date('2026-03-10T00:00:00Z');
    const items = [
      { next_review: '2026-03-09T00:00:00Z', mastery_level: 0.8 }, // 1 day overdue
      { next_review: '2026-03-05T00:00:00Z', mastery_level: 0.9 }, // 5 days overdue
      { next_review: '2026-03-11T00:00:00Z', mastery_level: 0.5 }, // not due yet
    ];

    const sorted = sortByReviewPriority(items, now);
    expect(sorted[0].next_review).toBe('2026-03-05T00:00:00Z'); // most overdue first
    expect(sorted[1].next_review).toBe('2026-03-09T00:00:00Z');
    expect(sorted[2].next_review).toBe('2026-03-11T00:00:00Z');
  });

  it('should sort non-overdue items by mastery (lower mastery first)', () => {
    const now = new Date('2026-03-01T00:00:00Z');
    const items = [
      { next_review: '2026-03-10T00:00:00Z', mastery_level: 0.9 },
      { next_review: '2026-03-10T00:00:00Z', mastery_level: 0.3 },
    ];

    const sorted = sortByReviewPriority(items, now);
    expect(sorted[0].mastery_level).toBe(0.3);
    expect(sorted[1].mastery_level).toBe(0.9);
  });

  it('should filter out items with null next_review', () => {
    const items = [
      { next_review: '2026-03-05T00:00:00Z', mastery_level: 0.5 },
      { next_review: null, mastery_level: 0.8 },
    ];

    const sorted = sortByReviewPriority(items);
    expect(sorted).toHaveLength(1);
  });
});
