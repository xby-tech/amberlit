import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/types';

type Group = Database['public']['Tables']['groups']['Row'];
type Student = Database['public']['Tables']['students']['Row'];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: groupId } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Get group
  const groupResult = await supabase.from('groups').select('*').eq('id', groupId).single();
  const group = groupResult.data as Group | null;
  if (!group) return NextResponse.json({ error: 'Group not found' }, { status: 404 });

  // Get students in group
  const { data: groupStudents } = await supabase
    .from('group_students')
    .select('student_id')
    .eq('group_id', groupId);

  const studentIds = ((groupStudents as Array<{ student_id: string }>) ?? []).map((gs) => gs.student_id);

  let students: Student[] = [];
  if (studentIds.length > 0) {
    const { data } = await supabase.from('students').select('*').in('id', studentIds);
    students = (data as Student[] | null) ?? [];
  }

  return NextResponse.json({ group, students });
}
