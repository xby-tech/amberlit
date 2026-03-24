'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MasteryMap from '@/components/progress/MasteryMap';
import SessionHistory from '@/components/progress/SessionHistory';
import InsightFeed from '@/components/progress/InsightFeed';

interface ProgressData {
  progress: Array<{
    curriculum_node_id: string;
    domain: string;
    strand: string;
    mastery_level: number;
    attempts: number;
    correct: number;
    unlocked: boolean;
  }>;
  sessions: Array<{
    id: string;
    started_at: string;
    duration_seconds: number | null;
    lesson_id: string;
    status: string;
  }>;
  stats: {
    streak: number;
    totalNodes: number;
    masteredNodes: number;
    avgMastery: number;
    totalSessions: number;
  };
}

export default function ProgressPage() {
  const params = useParams();
  const studentId = params.studentId as string;
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/student/${studentId}/progress`)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!data) {
    return <p className="text-center py-12 text-gray-500">Could not load progress data.</p>;
  }

  const { stats } = data;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Progress</h1>
        <Link
          href={`/app/session/${studentId}`}
          className="bg-amber-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
        >
          Start session
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Streak" value={`${stats.streak} day${stats.streak !== 1 ? 's' : ''}`} icon="🔥" />
        <StatCard label="Sessions" value={stats.totalSessions.toString()} icon="📚" />
        <StatCard label="Mastered" value={`${stats.masteredNodes}/${stats.totalNodes}`} icon="⭐" />
        <StatCard label="Avg mastery" value={`${Math.round(stats.avgMastery * 100)}%`} icon="📈" />
      </div>

      {/* Mastery Map */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Curriculum Map</h2>
        <MasteryMap progress={data.progress} />
      </section>

      {/* Two column: Sessions + Insights */}
      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Sessions</h2>
          <SessionHistory sessions={data.sessions} />
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Insights</h2>
          <InsightFeed studentId={studentId} />
        </section>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
      <span className="text-2xl">{icon}</span>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
