import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/types';

type Session = Database['public']['Tables']['sessions']['Row'];
type Response = Database['public']['Tables']['responses']['Row'];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: sessionId } = await params;
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get session details
  const sessionResult = await supabase
    .from('sessions')
    .select('*')
    .eq('id', sessionId)
    .single();
  const session = sessionResult.data as Session | null;

  if (sessionResult.error || !session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  // Get all responses for this session
  const { data: responses } = await supabase
    .from('responses')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true }) as { data: Response[] | null };

  const allResponses = responses ?? [];

  const correct = allResponses.filter((r) => r.result === 'correct').length;
  const incorrect = allResponses.filter((r) => r.result === 'incorrect').length;
  const prompted = allResponses.filter((r) => r.result === 'prompted').length;
  const skipped = allResponses.filter((r) => r.result === 'skipped').length;
  const scoreable = correct + incorrect + prompted;

  return NextResponse.json({
    sessionId,
    studentId: session.student_id,
    mode: session.mode,
    durationSeconds: session.duration_seconds ?? 0,
    totalResponses: allResponses.length,
    correctResponses: correct,
    promptedResponses: prompted,
    incorrectResponses: incorrect,
    skippedResponses: skipped,
    accuracy: scoreable > 0 ? correct / scoreable : 0,
    responses: allResponses,
  });
}
