import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getAIProvider } from '@/lib/ai/provider';
import { safeAICall } from '@/lib/ai/safety';
import type { WordProblemParams } from '@/types/ai';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const params: WordProblemParams = await request.json();
  const provider = getAIProvider();

  const fallback = {
    problem: `What is ${params.numberRange[0]} + ${params.numberRange[1]}?`,
    answer: params.numberRange[0] + params.numberRange[1],
    working: `${params.numberRange[0]} + ${params.numberRange[1]} = ${params.numberRange[0] + params.numberRange[1]}`,
  };

  const { result } = await safeAICall(
    () => provider.generateWordProblem(params),
    fallback,
    'word-problem',
  );

  return NextResponse.json(result);
}
