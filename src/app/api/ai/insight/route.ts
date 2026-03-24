import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getAIProvider } from '@/lib/ai/provider';
import { safeAICall } from '@/lib/ai/safety';
import type { StudentAnalysis } from '@/types/ai';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const studentData: StudentAnalysis = await request.json();
  const provider = getAIProvider();

  const fallback = {
    insightType: 'observation' as const,
    title: `Update for ${studentData.studentName}`,
    body: 'Continue with current activities.',
    domain: null,
    priority: 0,
  };

  const { result: insight } = await safeAICall(
    () => provider.generateInsight(studentData),
    fallback,
    'insight',
  );

  return NextResponse.json(insight);
}
