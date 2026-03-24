import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { assembleLesson } from '@/lib/lesson-assembler';
import type { Database, YearLevel, SessionMode } from '@/lib/supabase/types';

type Student = Database['public']['Tables']['students']['Row'];
type StudentProgress = Database['public']['Tables']['student_progress']['Row'];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: studentId } = await params;
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get the student
  const studentResult = await supabase
    .from('students')
    .select('*')
    .eq('id', studentId)
    .single();
  const student = studentResult.data as Student | null;

  if (studentResult.error || !student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }

  // Get the student's progress
  const { data: progress } = await supabase
    .from('student_progress')
    .select('*')
    .eq('student_id', studentId) as { data: StudentProgress[] | null };

  // Get mode from query params
  const url = new URL(request.url);
  const mode = (url.searchParams.get('mode') ?? 'parent') as SessionMode;

  // Assemble the lesson
  const lesson = assembleLesson(
    studentId,
    student.year_level as YearLevel,
    (progress ?? []).map((p) => ({
      curriculum_node_id: p.curriculum_node_id,
      domain: p.domain,
      strand: p.strand,
      mastery_level: p.mastery_level,
      attempts: p.attempts,
      correct: p.correct,
      last_practiced: p.last_practiced,
      next_review: p.next_review,
      unlocked: p.unlocked,
    })),
    mode,
  );

  return NextResponse.json(lesson);
}
