'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { AssembledLesson } from '@/types/curriculum';
import type { ResponseData } from '@/types/session';
import SessionRunner from '@/components/session/SessionRunner';
import StudentSwitcher from '@/components/session/StudentSwitcher';
import AIInsightPanel from '@/components/ai/AIInsightPanel';
import AIFeedbackToast from '@/components/ai/AIFeedbackToast';

interface StudentLesson {
  studentId: string;
  studentName: string;
  sessionId: string | null;
  lesson: AssembledLesson;
}

interface GroupInfo {
  group: { id: string; name: string; year_level: string };
  students: Array<{ id: string; first_name: string; avatar_seed: string | null }>;
}

interface Insight {
  id: string;
  type: 'observation' | 'suggestion' | 'alert' | 'praise';
  studentName: string;
  text: string;
  timestamp: string;
}

export default function GroupSessionPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.groupId as string;

  const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null);
  const [lessons, setLessons] = useState<StudentLesson[]>([]);
  const [activeStudentIdx, setActiveStudentIdx] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load group info
  useEffect(() => {
    fetch(`/api/group/${groupId}`)
      .then((res) => res.json())
      .then((data) => {
        setGroupInfo(data);
        setLoading(false);
      })
      .catch(() => { setError('Failed to load group'); setLoading(false); });
  }, [groupId]);

  // Start group session
  const startSession = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/group/${groupId}/session`, { method: 'POST' });
      const data = await res.json();
      setLessons(data.lessons);
      setSessionStarted(true);
    } catch {
      setError('Failed to start session');
    }
    setLoading(false);
  }, [groupId]);

  const activeLesson = lessons[activeStudentIdx];
  const activeStudent = groupInfo?.students[activeStudentIdx];

  const handleSwitch = (studentId: string) => {
    const idx = lessons.findIndex((l) => l.studentId === studentId);
    if (idx >= 0) setActiveStudentIdx(idx);
  };

  const handleAddNote = async (studentId: string, note: string) => {
    const studentName = lessons.find((l) => l.studentId === studentId)?.studentName ?? 'Student';
    setInsights((prev) => [
      { id: Date.now().toString(), type: 'observation', studentName, text: `Note: ${note}`, timestamp: new Date().toISOString() },
      ...prev,
    ]);
  };

  const handleResponseRecorded = useCallback(async (response: ResponseData) => {
    if (!activeLesson?.sessionId) return;

    await fetch(`/api/session/${activeLesson.sessionId}/response`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId: activeLesson.studentId, ...response }),
    }).catch(() => {});

    // Fetch AI feedback
    fetch('/api/ai/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentName: activeLesson.studentName,
        yearLevel: activeLesson.lesson.yearLevel,
        activityType: response.activityType,
        stimulus: response.stimulus,
        expectedResponse: response.expectedResponse ?? '',
        actualResult: response.result,
        recentHistory: [],
        mode: 'aide',
      }),
    })
      .then((res) => res.json())
      .then((data) => { if (data.feedback) setAiFeedback(data.feedback); })
      .catch(() => {});
  }, [activeLesson]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-red-600">{error}</p>
        <button onClick={() => router.push('/app/dashboard')} className="text-blue-600 underline">Back</button>
      </div>
    );
  }

  // Pre-session: show group overview with start button
  if (!sessionStarted || !activeLesson) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">{groupInfo?.group.name}</h1>
        <p className="text-gray-600">
          {groupInfo?.group.year_level === 'F' ? 'Foundation' : `Year ${groupInfo?.group.year_level}`} — {groupInfo?.students.length} students
        </p>

        <div className="space-y-2">
          {groupInfo?.students.map((s) => (
            <div key={s.id} className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">
                {s.first_name[0]}
              </div>
              <span className="font-medium text-gray-800">{s.first_name}</span>
            </div>
          ))}
        </div>

        <button
          onClick={startSession}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
        >
          Start group session (45 min)
        </button>
      </div>
    );
  }

  // Active session
  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Student switcher */}
        <div className="px-4 border-b border-gray-200 bg-gray-50">
          <StudentSwitcher
            students={lessons.map((l) => ({
              id: l.studentId,
              name: l.studentName,
              avatarSeed: l.studentId,
            }))}
            activeStudentId={activeLesson.studentId}
            onSwitch={handleSwitch}
          />
        </div>

        {/* Session runner for active student */}
        <div className="flex-1 overflow-hidden">
          <SessionRunner
            key={activeLesson.studentId}
            lesson={activeLesson.lesson}
            mode="aide"
            targetMinutes={45}
            onSessionComplete={async () => {
              if (activeLesson.sessionId) {
                await fetch(`/api/session/${activeLesson.sessionId}/end`, { method: 'POST' }).catch(() => {});
              }
            }}
            onResponseRecorded={handleResponseRecorded}
          />
        </div>
      </div>

      {/* AI Insight Panel (right sidebar) */}
      <AIInsightPanel
        insights={insights}
        onAddNote={handleAddNote}
        activeStudentId={activeLesson.studentId}
        activeStudentName={activeLesson.studentName}
      />

      <AIFeedbackToast
        message={aiFeedback}
        type="encouragement"
        onDismiss={() => setAiFeedback(null)}
      />
    </div>
  );
}
