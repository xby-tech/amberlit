'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RoleSelectionPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function selectRole(role: 'parent' | 'aide') {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    await supabase
      .from('profiles')
      .update({ role })
      .eq('id', user.id);

    router.push('/onboarding/students');
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          How will you use AmberLit?
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Choose your role to get a tailored experience.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => selectRole('parent')}
          disabled={loading}
          className="flex flex-col items-center gap-3 rounded-xl border-2 border-gray-200 p-6 text-center transition hover:border-amber-400 hover:bg-amber-50 disabled:opacity-50"
        >
          <span className="text-4xl">👨‍👩‍👧</span>
          <span className="text-lg font-semibold text-gray-900">Parent</span>
          <span className="text-sm text-gray-500">
            15-20 minute daily practice sessions at home
          </span>
        </button>

        <button
          onClick={() => selectRole('aide')}
          disabled={loading}
          className="flex flex-col items-center gap-3 rounded-xl border-2 border-gray-200 p-6 text-center transition hover:border-amber-400 hover:bg-amber-50 disabled:opacity-50"
        >
          <span className="text-4xl">👩‍🏫</span>
          <span className="text-lg font-semibold text-gray-900">
            Teacher Aide
          </span>
          <span className="text-sm text-gray-500">
            45-60 minute small-group intervention sessions
          </span>
        </button>
      </div>
    </div>
  );
}
