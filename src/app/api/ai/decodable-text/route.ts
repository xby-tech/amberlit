import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getAIProvider } from '@/lib/ai/provider';
import { safeAICall } from '@/lib/ai/safety';
import type { DecodableTextParams } from '@/types/ai';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const params: DecodableTextParams = await request.json();
  const provider = getAIProvider();

  const { result: passage } = await safeAICall(
    () => provider.generateDecodableText(params),
    'Sam sat on a mat. The cat ran fast. It was fun.',
    'decodable-text',
  );

  return NextResponse.json({ passage });
}
