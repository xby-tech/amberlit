'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { AssembledLesson } from '@/types/curriculum';
import type { SessionSummary, ResponseData } from '@/types/session';
import SessionRunner from '@/components/session/SessionRunner';
import AIFeedbackToast from '@/components/ai/AIFeedbackToast';
import { createClient } from '@/lib/supabase/client';

export default function SessionPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.studentId as string;

  const [lesson, setLesson] = useState<AssembledLesson | null>(null);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'praise' | 'encouragement' | 'hint'>('praise');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch lesson and start session
  useEffect(() => {
    async function init() {
      try {
        // 1. Fetch assembled lesson
        const lessonRes = await fetch(`/api/student/${studentId}/lesson?mode=parent`);
        if (!lessonRes.ok) throw new Error('Failed to load lesson');
        const lessonData: AssembledLesson = await lessonRes.json();
        setLesson(lessonData);

        // 2. Start session in DB
        const sessionRes = await fetch('/api/session/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId,
            mode: 'parent',
            lessonId: lessonData.id,
          }),
        });

        if (!sessionRes.ok) throw new Error('Failed to start session');
        const sessionData = await sessionRes.json();
        setSessionId(sessionData.id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [studentId]);

  // Record response to API and fetch AI feedback
  const handleResponseRecorded = useCallback(async (response: ResponseData) => {
    if (!sessionId) return;

    try {
      await fetch(`/api/session/${sessionId}/response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          ...response,
        }),
      });

      // Fetch AI feedback (non-blocking)
      fetch('/api/ai/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: 'Student',
          yearLevel: lesson?.yearLevel ?? 'F',
          activityType: response.activityType,
          stimulus: response.stimulus,
          expectedResponse: response.expectedResponse ?? '',
          actualResult: response.result,
          recentHistory: [],
          mode: 'parent',
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.feedback) {
            setAiFeedback(data.feedback);
            setFeedbackType(response.result === 'correct' ? 'praise' : response.result === 'prompted' ? 'encouragement' : 'hint');
          }
        })
        .catch(() => {}); // Best effort
    } catch {
      // Silently fail — responses are also tracked client-side
    }
  }, [sessionId, studentId, lesson]);

  // Handle session completion
  const handleSessionComplete = useCallback(async (summary: SessionSummary | null) => {
    if (!sessionId) return;

    try {
      await fetch(`/api/session/${sessionId}/end`, {
        method: 'POST',
      });
    } catch {
      // Best effort
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Preparing your lesson...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={() => router.push('/app/dashboard')}
            className="text-amber-600 hover:text-amber-700 underline"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">No lesson available</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)]">
      <SessionRunner
        lesson={lesson}
        mode="parent"
        targetMinutes={20}
        onSessionComplete={handleSessionComplete}
        onResponseRecorded={handleResponseRecorded}
      />
      <AIFeedbackToast
        message={aiFeedback}
        type={feedbackType}
        onDismiss={() => setAiFeedback(null)}
      />
    </div>
  );
}
