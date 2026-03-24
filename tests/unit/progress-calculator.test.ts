import { describe, it, expect } from 'vitest';
import {
  calculateMasteryLevel,
  checkMastery,
  shouldUnlock,
  getNewUnlocks,
} from '@/lib/progress-calculator';

describe('calculateMasteryLevel', () => {
  it('should increase mastery on correct answer', () => {
    const newMastery = calculateMasteryLevel(0, 0, 0, 'correct');
    expect(newMastery).toBeGreaterThan(0);
  });

  it('should decrease mastery on incorrect answer from high mastery', () => {
    const newMastery = calculateMasteryLevel(0.8, 10, 8, 'incorrect');
    expect(newMastery).toBeLessThan(0.8);
  });

  it('should give partial credit for prompted', () => {
    const correctMastery = calculateMasteryLevel(0.5, 5, 3, 'correct');
    const promptedMastery = calculateMasteryLevel(0.5, 5, 3, 'prompted');
    const incorrectMastery = calculateMasteryLevel(0.5, 5, 3, 'incorrect');

    expect(promptedMastery).toBeLessThan(correctMastery);
    expect(promptedMastery).toBeGreaterThan(incorrectMastery);
  });

  it('should stay between 0 and 1', () => {
    // Very high mastery + correct
    const high = calculateMasteryLevel(0.99, 100, 99, 'correct');
    expect(high).toBeLessThanOrEqual(1);

    // Very low mastery + incorrect
    const low = calculateMasteryLevel(0.01, 100, 1, 'incorrect');
    expect(low).toBeGreaterThanOrEqual(0);
  });

  it('should handle first attempt from zero', () => {
    const mastery = calculateMasteryLevel(0, 0, 0, 'correct');
    expect(mastery).toBeGreaterThan(0);
    expect(mastery).toBeLessThanOrEqual(1);
  });
});

describe('checkMastery', () => {
  const criteria = {
    minimumAttempts: 5,
    accuracyThreshold: 0.8,
    consistencyWindow: 3,
  };

  it('should not mark as mastered with too few attempts', () => {
    const result = checkMastery(
      { curriculum_node_id: 'test', mastery_level: 1.0, attempts: 3, correct: 3, unlocked: true },
      criteria,
    );
    expect(result.isMastered).toBe(false);
    expect(result.attemptsNeeded).toBe(2);
  });

  it('should mark as mastered with enough attempts and high accuracy', () => {
    const result = checkMastery(
      { curriculum_node_id: 'test', mastery_level: 0.85, attempts: 10, correct: 9, unlocked: true },
      criteria,
    );
    expect(result.isMastered).toBe(true);
    expect(result.attemptsNeeded).toBe(0);
  });

  it('should not mark as mastered with low accuracy', () => {
    const result = checkMastery(
      { curriculum_node_id: 'test', mastery_level: 0.4, attempts: 10, correct: 4, unlocked: true },
      criteria,
    );
    expect(result.isMastered).toBe(false);
  });

  it('should not mark as mastered with high accuracy but low mastery level', () => {
    const result = checkMastery(
      { curriculum_node_id: 'test', mastery_level: 0.5, attempts: 10, correct: 9, unlocked: true },
      criteria,
    );
    expect(result.isMastered).toBe(false);
  });
});

describe('shouldUnlock', () => {
  it('should unlock first node (no prerequisites)', () => {
    const result = shouldUnlock('F.phonics.01', []);
    expect(result).toBe(true);
  });

  it('should not unlock node when prerequisite is not mastered', () => {
    const progress = [
      { curriculum_node_id: 'F.phonics.01', mastery_level: 0.3, attempts: 3, correct: 1, unlocked: true },
    ];
    const result = shouldUnlock('F.phonics.02', progress);
    expect(result).toBe(false);
  });

  it('should unlock node when prerequisite is mastered', () => {
    const progress = [
      { curriculum_node_id: 'F.phonics.01', mastery_level: 0.9, attempts: 10, correct: 9, unlocked: true },
    ];
    const result = shouldUnlock('F.phonics.02', progress);
    expect(result).toBe(true);
  });
});

describe('getNewUnlocks', () => {
  it('should return newly unlockable nodes', () => {
    const progress = [
      { curriculum_node_id: 'F.phonics.01', mastery_level: 0.9, attempts: 10, correct: 9, unlocked: true },
      { curriculum_node_id: 'F.phonics.02', mastery_level: 0, attempts: 0, correct: 0, unlocked: false },
    ];

    const unlocks = getNewUnlocks(progress, ['F.phonics.01', 'F.phonics.02', 'F.phonics.03']);
    expect(unlocks).toContain('F.phonics.02');
  });

  it('should not return already unlocked nodes', () => {
    const progress = [
      { curriculum_node_id: 'F.phonics.01', mastery_level: 0.9, attempts: 10, correct: 9, unlocked: true },
    ];

    const unlocks = getNewUnlocks(progress, ['F.phonics.01']);
    expect(unlocks).not.toContain('F.phonics.01');
  });
});
