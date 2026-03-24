'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AssembledLesson } from '@/types/curriculum';
import type { SessionMode } from '@/lib/supabase/types';
import { useSession } from '@/hooks/useSession';
import SessionTimer from './SessionTimer';
import ActivityRenderer from './ActivityRenderer';

interface SessionRunnerProps {
  lesson: AssembledLesson;
  mode: SessionMode;
  targetMinutes: number;
  onSessionComplete: (summary: ReturnType<typeof useSession>['summary']) => void;
  onResponseRecorded?: (response: ReturnType<typeof useSession>['responses'][number]) => void;
}

const PHASE_LABELS: Record<string, string> = {
  warmup: 'Warm-up',
  newContent: 'New Learning',
  practice: 'Practice',
  application: 'Apply',
  wrapup: 'Wrap-up',
};

const PHASE_COLORS: Record<string, string> = {
  warmup: 'bg-green-100 text-green-800',
  newContent: 'bg-amber-100 text-amber-800',
  practice: 'bg-blue-100 text-blue-800',
  application: 'bg-purple-100 text-purple-800',
  wrapup: 'bg-gray-100 text-gray-800',
};

export default function SessionRunner({
  lesson,
  mode,
  targetMinutes,
  onSessionComplete,
  onResponseRecorded,
}: SessionRunnerProps) {
  const session = useSession();

  // Load the lesson on mount
  useEffect(() => {
    session.loadLesson(lesson);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Notify parent when session completes
  useEffect(() => {
    if (session.isCompleted && session.summary) {
      onSessionComplete(session.summary);
    }
  }, [session.isCompleted, session.summary, onSessionComplete]);

  // Loading state
  if (session.phase === 'loading' || !session.currentActivity) {
    if (session.isCompleted) {
      return <SessionComplete summary={session.summary} />;
    }
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500 text-lg">Preparing your lesson...</p>
      </div>
    );
  }

  // Completed state
  if (session.isCompleted) {
    return <SessionComplete summary={session.summary} />;
  }

  const { phase, activity, phaseIndex, totalInPhase } = session.currentActivity;

  return (
    <div className="flex flex-col h-full">
      {/* Header: phase label, progress, timer, controls */}
      <div className="border-b border-gray-200 bg-white px-4 py-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {/* Phase badge */}
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${PHASE_COLORS[phase] ?? PHASE_COLORS.warmup}`}>
            {PHASE_LABELS[phase] ?? phase}
          </span>

          {/* Activity counter */}
          <span className="text-sm text-gray-500">
            Activity {phaseIndex + 1} of {totalInPhase}
          </span>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={session.isPaused ? session.resume : session.pause}
              className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1"
            >
              {session.isPaused ? '▶ Resume' : '⏸ Pause'}
            </button>
            <button
              type="button"
              onClick={session.endSession}
              className="text-sm text-red-500 hover:text-red-700 px-2 py-1"
            >
              End
            </button>
          </div>
        </div>

        {/* Timer */}
        <SessionTimer targetMinutes={targetMinutes} isPaused={session.isPaused} />

        {/* Lesson progress bar */}
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-amber-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${session.progress * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Activity area */}
      <div className="flex-1 overflow-y-auto px-4">
        {/* Activity title */}
        <div className="py-3">
          <h3 className="text-lg font-semibold text-gray-800">{activity.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {mode === 'parent' ? activity.instructions.parent : activity.instructions.aide}
          </p>
        </div>

        {/* Pause overlay */}
        {session.isPaused && (
          <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
              <p className="text-2xl font-bold text-gray-800 mb-4">Paused</p>
              <button
                type="button"
                onClick={session.resume}
                className="bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold text-lg"
              >
                Resume
              </button>
            </div>
          </div>
        )}

        {/* The actual activity component */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ActivityRenderer
              activity={activity}
              onResponse={(response) => {
                session.recordResponse(response);
                onResponseRecorded?.(response);
              }}
              onComplete={() => session.completeActivity()}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SessionComplete({ summary }: { summary: ReturnType<typeof useSession>['summary'] }) {
  if (!summary) return null;

  const accuracyPercent = Math.round(summary.accuracy * 100);

  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="text-6xl"
      >
        🎉
      </motion.div>

      <h2 className="text-3xl font-bold text-gray-800">Great work!</h2>

      <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 w-full max-w-sm space-y-3">
        <SummaryRow label="Time" value={`${Math.floor(summary.durationSeconds / 60)} min`} />
        <SummaryRow label="Questions" value={summary.totalResponses.toString()} />
        <SummaryRow label="Correct" value={summary.correctResponses.toString()} />
        <SummaryRow label="Accuracy" value={`${accuracyPercent}%`} highlight={accuracyPercent >= 80} />
      </div>
    </div>
  );
}

function SummaryRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}</span>
      <span className={`font-bold text-lg ${highlight ? 'text-green-600' : 'text-gray-800'}`}>{value}</span>
    </div>
  );
}
