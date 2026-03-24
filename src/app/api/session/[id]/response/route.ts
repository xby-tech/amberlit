import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { calculateMasteryLevel } from '@/lib/progress-calculator';
import { calculateNextReview, getNextReviewDate } from '@/lib/spaced-repetition';
import type { Database, ResponseResult } from '@/lib/supabase/types';
import type { ReviewResult } from '@/lib/spaced-repetition';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: sessionId } = await params;
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const {
    studentId,
    activityType,
    curriculumNodeId,
    stimulus,
    expectedResponse,
    actualResponse,
    result,
    responseTimeMs,
  } = body;

  // 1. Insert the response
  const { error: responseError } = await supabase
    .from('responses')
    .insert({
      session_id: sessionId,
      student_id: studentId,
      activity_type: activityType,
      curriculum_node_id: curriculumNodeId,
      stimulus,
      expected_response: expectedResponse,
      actual_response: actualResponse,
      result,
      response_time_ms: responseTimeMs,
    });

  if (responseError) {
    return NextResponse.json({ error: responseError.message }, { status: 500 });
  }

  // 2. Update student progress
  const { data: existingProgress } = await supabase
    .from('student_progress')
    .select('*')
    .eq('student_id', studentId)
    .eq('curriculum_node_id', curriculumNodeId)
    .single() as { data: Database['public']['Tables']['student_progress']['Row'] | null };

  const currentMastery = existingProgress?.mastery_level ?? 0;
  const currentAttempts = existingProgress?.attempts ?? 0;
  const currentCorrect = existingProgress?.correct ?? 0;

  const newMastery = calculateMasteryLevel(currentMastery, currentAttempts, currentCorrect, result as ResponseResult);
  const newAttempts = currentAttempts + 1;
  const newCorrect = currentCorrect + (result === 'correct' ? 1 : 0);

  // Calculate spaced repetition schedule
  const reviewResult: ReviewResult = result === 'correct' ? 'correct' : result === 'prompted' ? 'prompted' : 'incorrect';
  const currentSchedule = {
    interval: existingProgress ? Math.max(1, Math.floor((Date.now() - new Date(existingProgress.last_practiced ?? Date.now()).getTime()) / 86400000)) : 0,
    easeFactor: 2.5,
    repetitions: result === 'correct' ? (currentCorrect + 1) : 0,
  };
  const newSchedule = calculateNextReview(currentSchedule, reviewResult);
  const nextReview = getNextReviewDate(newSchedule);

  // Extract domain/strand from node ID (e.g. 'F.phonics.01' → domain='literacy', strand='phonics')
  const parts = curriculumNodeId.split('.');
  const domain = parts[1] === 'phonics' || parts[1] === 'reading' ? 'literacy' : parts[1] === 'maths' ? 'maths' : parts[1];
  const strand = parts[1] === 'maths' ? parts[2] : parts[1];

  if (existingProgress) {
    await supabase
      .from('student_progress')
      .update({
        mastery_level: newMastery,
        attempts: newAttempts,
        correct: newCorrect,
        last_practiced: new Date().toISOString(),
        next_review: nextReview,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existingProgress.id);
  } else {
    await supabase
      .from('student_progress')
      .insert({
        student_id: studentId,
        curriculum_node_id: curriculumNodeId,
        domain,
        strand,
        mastery_level: newMastery,
        attempts: newAttempts,
        correct: newCorrect,
        last_practiced: new Date().toISOString(),
        next_review: nextReview,
        unlocked: true,
      });
  }

  return NextResponse.json({
    progressUpdate: {
      masteryLevel: newMastery,
      attempts: newAttempts,
      correct: newCorrect,
      nextReview,
    },
  });
}
