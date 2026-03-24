import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { initPlacement, getNextQuestion } from '@/lib/placement';
import type { YearLevel } from '@/lib/supabase/types';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { yearLevel } = await request.json() as { yearLevel: YearLevel };
  const state = initPlacement(yearLevel);

  const firstLiteracyQ = getNextQuestion(state.literacy);
  const firstMathsQ = getNextQuestion(state.maths);

  return NextResponse.json({
    state,
    nextQuestion: firstLiteracyQ, // start with literacy
    currentDomain: 'literacy',
  });
}
