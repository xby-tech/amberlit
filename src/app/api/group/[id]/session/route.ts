import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { assembleLesson } from '@/lib/lesson-assembler';
import type { Database, YearLevel } from '@/lib/supabase/types';

type Student = Database['public']['Tables']['students']['Row'];
type StudentProgress = Database['public']['Tables']['student_progress']['Row'];

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: groupId } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Get students in group
  const { data: groupStudents } = await supabase
    .from('group_students')
    .select('student_id')
    .eq('group_id', groupId);

  const studentIds = ((groupStudents as Array<{ student_id: string }>) ?? []).map((gs) => gs.student_id);
  if (studentIds.length === 0) {
    return NextResponse.json({ error: 'No students in group' }, { status: 400 });
  }

  // Get students
  const { data: studentsData } = await supabase.from('students').select('*').in('id', studentIds);
  const students = (studentsData as Student[] | null) ?? [];

  // Assemble lessons for each student
  const lessons = await Promise.all(
    students.map(async (student) => {
      const { data: progress } = await supabase
        .from('student_progress')
        .select('*')
        .eq('student_id', student.id);

      const progressRecords = ((progress as StudentProgress[] | null) ?? []).map((p) => ({
        curriculum_node_id: p.curriculum_node_id,
        domain: p.domain,
        strand: p.strand,
        mastery_level: p.mastery_level,
        attempts: p.attempts,
        correct: p.correct,
        last_practiced: p.last_practiced,
        next_review: p.next_review,
        unlocked: p.unlocked,
      }));

      const lesson = assembleLesson(student.id, student.year_level as YearLevel, progressRecords, 'aide');

      // Create session row
      const { data: session } = await supabase.from('sessions').insert({
        student_id: student.id,
        conductor_id: user.id,
        mode: 'aide',
        group_id: groupId,
        lesson_id: lesson.id,
        status: 'active',
      }).select('id').single();

      return {
        studentId: student.id,
        studentName: student.first_name,
        sessionId: (session as { id: string } | null)?.id,
        lesson,
      };
    }),
  );

  return NextResponse.json({ lessons });
}
