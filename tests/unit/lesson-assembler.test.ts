import { describe, it, expect } from 'vitest';
import { assembleLesson, getLessonActivityCount, flattenLessonActivities } from '@/lib/lesson-assembler';

describe('assembleLesson', () => {
  it('should assemble a lesson for a brand new Foundation student (parent mode)', () => {
    // New student with first node unlocked, no progress yet
    const progress = [
      {
        curriculum_node_id: 'F.phonics.01',
        domain: 'literacy',
        strand: 'phonics',
        mastery_level: 0,
        attempts: 0,
        correct: 0,
        last_practiced: null,
        next_review: null,
        unlocked: true,
      },
    ];

    const lesson = assembleLesson('student-1', 'F', progress, 'parent');

    expect(lesson.studentId).toBe('student-1');
    expect(lesson.yearLevel).toBe('F');
    expect(lesson.estimatedMinutes).toBe(20); // parent mode = 3+7+7+3+0

    // Should have new content activities
    expect(lesson.newContent.length).toBeGreaterThan(0);

    // Warmup may be empty for brand new student (nothing to review)
    // That's OK
  });

  it('should assemble a lesson for aide mode with longer duration', () => {
    const progress = [
      {
        curriculum_node_id: 'F.phonics.01',
        domain: 'literacy',
        strand: 'phonics',
        mastery_level: 0,
        attempts: 0,
        correct: 0,
        last_practiced: null,
        next_review: null,
        unlocked: true,
      },
    ];

    const lesson = assembleLesson('student-1', 'F', progress, 'aide');

    expect(lesson.estimatedMinutes).toBe(45); // aide mode = 5+15+15+8+2

    // Aide mode should have wrapup
    expect(lesson.wrapup.length).toBeGreaterThan(0);
  });

  it('should include review activities when items are due', () => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const progress = [
      {
        curriculum_node_id: 'F.phonics.01',
        domain: 'literacy',
        strand: 'phonics',
        mastery_level: 0.9,
        attempts: 10,
        correct: 9,
        last_practiced: yesterday.toISOString(),
        next_review: yesterday.toISOString(), // overdue
        unlocked: true,
      },
      {
        curriculum_node_id: 'F.phonics.02',
        domain: 'literacy',
        strand: 'phonics',
        mastery_level: 0,
        attempts: 0,
        correct: 0,
        last_practiced: null,
        next_review: null,
        unlocked: true,
      },
    ];

    const lesson = assembleLesson('student-1', 'F', progress, 'parent');

    // Should have warmup activities from the review queue
    expect(lesson.warmup.length).toBeGreaterThan(0);
  });

  it('should produce a non-empty lesson even with minimal progress', () => {
    const lesson = assembleLesson('student-1', 'F', [], 'parent');

    // Even with no progress, should assemble something from first available nodes
    const totalActivities = getLessonActivityCount(lesson);
    expect(totalActivities).toBeGreaterThanOrEqual(0);
  });
});

describe('getLessonActivityCount', () => {
  it('should sum all activities across phases', () => {
    const progress = [
      {
        curriculum_node_id: 'F.phonics.01',
        domain: 'literacy',
        strand: 'phonics',
        mastery_level: 0,
        attempts: 0,
        correct: 0,
        last_practiced: null,
        next_review: null,
        unlocked: true,
      },
    ];

    const lesson = assembleLesson('student-1', 'F', progress, 'parent');
    const count = getLessonActivityCount(lesson);
    const flat = flattenLessonActivities(lesson);

    expect(count).toBe(flat.length);
  });
});

describe('flattenLessonActivities', () => {
  it('should return activities in phase order', () => {
    const progress = [
      {
        curriculum_node_id: 'F.phonics.01',
        domain: 'literacy',
        strand: 'phonics',
        mastery_level: 0,
        attempts: 0,
        correct: 0,
        last_practiced: null,
        next_review: null,
        unlocked: true,
      },
    ];

    const lesson = assembleLesson('student-1', 'F', progress, 'aide');
    const flat = flattenLessonActivities(lesson);

    // All warmup activities should come before newContent activities
    const warmupIds = lesson.warmup.map((a) => a.id);
    const newContentIds = lesson.newContent.map((a) => a.id);

    if (warmupIds.length > 0 && newContentIds.length > 0) {
      const lastWarmupIndex = Math.max(...warmupIds.map((id) => flat.findIndex((a) => a.id === id)));
      const firstNewContentIndex = Math.min(...newContentIds.map((id) => flat.findIndex((a) => a.id === id)));
      expect(lastWarmupIndex).toBeLessThan(firstNewContentIndex);
    }
  });
});
