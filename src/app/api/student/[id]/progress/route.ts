import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/types';

type StudentProgress = Database['public']['Tables']['student_progress']['Row'];
type Session = Database['public']['Tables']['sessions']['Row'];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: studentId } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Progress records
  const { data: progress } = await supabase
    .from('student_progress')
    .select('*')
    .eq('student_id', studentId)
    .order('updated_at', { ascending: false });

  // Recent sessions
  const { data: sessions } = await supabase
    .from('sessions')
    .select('*')
    .eq('student_id', studentId)
    .eq('status', 'completed')
    .order('started_at', { ascending: false })
    .limit(20);

  // Calculate streak (consecutive days with sessions)
  const sessionDates = ((sessions as Session[] | null) ?? [])
    .map((s) => new Date(s.started_at).toISOString().split('T')[0]);
  const uniqueDates = [...new Set(sessionDates)].sort().reverse();

  let streak = 0;
  const today = new Date().toISOString().split('T')[0];
  for (let i = 0; i < uniqueDates.length; i++) {
    const expected = new Date();
    expected.setDate(expected.getDate() - i);
    const expectedStr = expected.toISOString().split('T')[0];
    if (uniqueDates[i] === expectedStr) {
      streak++;
    } else {
      break;
    }
  }

  // Overall mastery stats
  const allProgress = (progress as StudentProgress[] | null) ?? [];
  const totalNodes = allProgress.length;
  const masteredNodes = allProgress.filter((p) => p.mastery_level >= 0.8 && p.attempts >= 5).length;
  const avgMastery = totalNodes > 0
    ? allProgress.reduce((sum, p) => sum + p.mastery_level, 0) / totalNodes
    : 0;

  return NextResponse.json({
    progress: allProgress,
    sessions: (sessions as Session[] | null) ?? [],
    stats: {
      streak,
      totalNodes,
      masteredNodes,
      avgMastery,
      totalSessions: ((sessions as Session[] | null) ?? []).length,
    },
  });
}
