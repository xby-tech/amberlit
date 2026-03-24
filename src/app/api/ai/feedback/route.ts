import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getAIProvider } from '@/lib/ai/provider';
import { safeAICall } from '@/lib/ai/safety';
import type { FeedbackContext } from '@/types/ai';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const context: FeedbackContext = await request.json();
  const provider = getAIProvider();

  const { result: feedback } = await safeAICall(
    () => provider.generateFeedback(context),
    context.actualResult === 'correct' ? 'Well done!' : 'Good try! Keep going!',
    'student-feedback',
    context.studentName,
  );

  return NextResponse.json({ feedback });
}
