import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/types';

type AIInsightRow = Database['public']['Tables']['ai_insights']['Row'];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: studentId } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: insights } = await supabase
    .from('ai_insights')
    .select('*')
    .eq('student_id', studentId)
    .eq('dismissed', false)
    .order('created_at', { ascending: false })
    .limit(10);

  return NextResponse.json({ insights: (insights as AIInsightRow[] | null) ?? [] });
}
