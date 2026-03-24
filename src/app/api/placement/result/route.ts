import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { calculatePlacementResult, type PlacementState } from '@/lib/placement';
import type { YearLevel } from '@/lib/supabase/types';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { state, yearLevel, studentId } = await request.json() as {
    state: { literacy: PlacementState; maths: PlacementState };
    yearLevel: YearLevel;
    studentId: string;
  };

  const result = calculatePlacementResult(state.literacy, state.maths, yearLevel);

  // Initialize student progress with unlocked starting nodes
  const progressRows = [
    { student_id: studentId, curriculum_node_id: result.literacy.phonicsStartNode, domain: 'literacy', strand: 'phonics', unlocked: true },
    { student_id: studentId, curriculum_node_id: result.maths.startNode, domain: 'maths', strand: 'number', unlocked: true },
  ];

  await supabase.from('student_progress').upsert(progressRows, { onConflict: 'student_id,curriculum_node_id' });

  return NextResponse.json(result);
}
