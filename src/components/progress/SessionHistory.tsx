'use client';

interface SessionItem {
  id: string;
  started_at: string;
  duration_seconds: number | null;
  lesson_id: string;
  status: string;
}

interface SessionHistoryProps {
  sessions: SessionItem[];
}

export default function SessionHistory({ sessions }: SessionHistoryProps) {
  if (sessions.length === 0) {
    return (
      <p className="text-center py-6 text-gray-500 border border-dashed border-gray-200 rounded-xl">
        No sessions yet. Start your first session!
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {sessions.map((session) => {
        const date = new Date(session.started_at);
        const duration = session.duration_seconds
          ? `${Math.floor(session.duration_seconds / 60)} min`
          : '—';

        return (
          <div
            key={session.id}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3"
          >
            <div>
              <p className="font-medium text-gray-800 text-sm">
                {date.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })}
              </p>
              <p className="text-xs text-gray-500">
                {date.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">{duration}</p>
              <p className={`text-xs ${session.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                {session.status}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
