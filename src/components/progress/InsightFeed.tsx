'use client';

import { useEffect, useState } from 'react';

interface Insight {
  id: string;
  insight_type: string;
  title: string;
  body: string;
  domain: string | null;
  priority: number;
  created_at: string;
}

interface InsightFeedProps {
  studentId: string;
}

const TYPE_ICONS: Record<string, string> = {
  observation: '👁',
  suggestion: '💡',
  alert: '⚠️',
  praise: '🌟',
  milestone: '🎯',
};

const TYPE_STYLES: Record<string, string> = {
  observation: 'border-blue-200 bg-blue-50',
  suggestion: 'border-amber-200 bg-amber-50',
  alert: 'border-red-200 bg-red-50',
  praise: 'border-green-200 bg-green-50',
  milestone: 'border-purple-200 bg-purple-50',
};

export default function InsightFeed({ studentId }: InsightFeedProps) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/student/${studentId}/insights`)
      .then((res) => res.json())
      .then((data) => setInsights(data.insights ?? []))
      .finally(() => setLoading(false));
  }, [studentId]);

  if (loading) {
    return <div className="animate-pulse bg-gray-100 rounded-xl h-24" />;
  }

  if (insights.length === 0) {
    return (
      <p className="text-center py-6 text-gray-500 border border-dashed border-gray-200 rounded-xl">
        AI insights will appear here after a few sessions.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {insights.map((insight) => (
        <div
          key={insight.id}
          className={`border rounded-xl p-4 ${TYPE_STYLES[insight.insight_type] ?? 'border-gray-200 bg-gray-50'}`}
        >
          <div className="flex items-start gap-2">
            <span className="text-lg">{TYPE_ICONS[insight.insight_type] ?? '📝'}</span>
            <div>
              <p className="font-medium text-gray-800 text-sm">{insight.title}</p>
              <p className="text-sm text-gray-600 mt-1">{insight.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
