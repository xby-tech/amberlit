import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getAIProvider } from '@/lib/ai/provider';
import { safeAICall } from '@/lib/ai/safety';
import type { ConversationMessage, LessonContext } from '@/types/ai';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { history, context }: { history: ConversationMessage[]; context: LessonContext } = await request.json();
  const provider = getAIProvider();

  const { result: response } = await safeAICall(
    () => provider.conversationTurn(history, context),
    'Great reading! What did you notice in the story?',
    'conversation',
  );

  return NextResponse.json({ response });
}
