import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: sessionId } = await params;
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get the session to calculate duration
  const { data: session } = await supabase
    .from('sessions')
    .select('started_at')
    .eq('id', sessionId)
    .single() as { data: { started_at: string } | null };

  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  const now = new Date();
  const startedAt = new Date(session.started_at);
  const durationSeconds = Math.floor((now.getTime() - startedAt.getTime()) / 1000);

  const { error } = await supabase
    .from('sessions')
    .update({
      ended_at: now.toISOString(),
      duration_seconds: durationSeconds,
      status: 'completed',
    })
    .eq('id', sessionId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ durationSeconds, status: 'completed' });
}
