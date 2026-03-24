'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Database } from '@/lib/supabase/types';
import { createClient } from '@/lib/supabase/client';
import NavRail from './NavRail';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AppShellProps {
  profile: Profile;
  children: React.ReactNode;
  aidePanel?: React.ReactNode;
}

export function AppShell({ profile, children, aidePanel }: AppShellProps) {
  const router = useRouter();
  const supabase = createClient();
  const [aidePanelOpen, setAidePanelOpen] = useState(false);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.push('/');
  }, [supabase, router]);

  return (
    <div className="flex h-full min-h-screen">
      {/* Left nav rail (64px on lg+) */}
      <NavRail onSignOut={handleSignOut} />

      {/* Main content area */}
      <main className="flex-1 min-w-0 pb-16 lg:pb-0 overflow-y-auto">
        {children}
      </main>

      {/* Collapsible right aide panel (desktop only) */}
      {aidePanel && (
        <>
          <button
            type="button"
            onClick={() => setAidePanelOpen(!aidePanelOpen)}
            className="hidden lg:flex items-center justify-center w-6 bg-stone-100 border-l border-stone-200 hover:bg-stone-200 transition-colors"
            aria-label={aidePanelOpen ? 'Close aide panel' : 'Open aide panel'}
          >
            <span className="text-stone-500 text-xs">
              {aidePanelOpen ? '\u203A' : '\u2039'}
            </span>
          </button>

          {aidePanelOpen && (
            <aside className="hidden lg:block w-80 border-l border-stone-200 bg-white overflow-y-auto shrink-0">
              {aidePanel}
            </aside>
          )}
        </>
      )}
    </div>
  );
}
