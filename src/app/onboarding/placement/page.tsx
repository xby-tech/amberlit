'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import type { PlacementQuestion } from '@/lib/placement';

interface PlacementApiState {
  literacy: unknown;
  maths: unknown;
}

export default function PlacementPage() {
  const router = useRouter();
  const supabase = createClient();
  const [state, setState] = useState<PlacementApiState | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<PlacementQuestion | null>(null);
  const [currentDomain, setCurrentDomain] = useState<'literacy' | 'maths'>('literacy');
  const [studentId, setStudentId] = useState<string | null>(null);
  const [yearLevel, setYearLevel] = useState<string>('F');
  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [answering, setAnswering] = useState(false);
  const [done, setDone] = useState(false);

  // Load the most recent student and start placement
  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const { data: students } = await supabase
        .from('students')
        .select('id, year_level')
        .eq('parent_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      const student = (students as Array<{ id: string; year_level: string }> | null)?.[0];
      if (!student) { router.push('/onboarding/students'); return; }

      setStudentId(student.id);
      setYearLevel(student.year_level);

      const res = await fetch('/api/placement/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ yearLevel: student.year_level }),
      });
      const data = await res.json();
      setState(data.state);
      setCurrentQuestion(data.nextQuestion);
      setCurrentDomain(data.currentDomain);
      setLoading(false);
    }
    init();
  }, []);

  const handleAnswer = useCallback(async (correct: boolean) => {
    if (!state || !currentQuestion || answering) return;
    setAnswering(true);

    const res = await fetch('/api/placement/respond', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        state,
        questionId: currentQuestion.id,
        correct,
        currentDomain,
      }),
    });
    const data = await res.json();

    setState(data.state);
    setQuestionCount((c) => c + 1);

    if (data.done) {
      // Save results
      await fetch('/api/placement/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: data.state, yearLevel, studentId }),
      });
      setDone(true);
    } else {
      setCurrentQuestion(data.nextQuestion);
      setCurrentDomain(data.currentDomain);
    }
    setAnswering(false);
  }, [state, currentQuestion, currentDomain, answering, yearLevel, studentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto" />
          <p className="text-gray-600">Preparing your placement assessment...</p>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="space-y-6 text-center py-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-5xl">
          🎉
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900">All done!</h2>
        <p className="text-gray-600">
          We&apos;ve created a personalised learning path. Let&apos;s get started!
        </p>
        <button
          onClick={() => router.push('/app/dashboard')}
          className="bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-amber-700 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Quick Assessment</h2>
        <p className="mt-2 text-sm text-gray-600">
          This helps us find the right starting point. It&apos;s not a test — just tap what your child can do!
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          currentDomain === 'literacy' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {currentDomain === 'literacy' ? 'Reading' : 'Maths'}
        </span>
        <span className="text-sm text-gray-500">Question {questionCount + 1}</span>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        {currentQuestion && (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center"
          >
            <p className="text-2xl font-medium text-gray-800 leading-relaxed">
              {currentQuestion.stimulus}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleAnswer(true)}
          disabled={answering}
          className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-green-600 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          <span className="text-xl">✓</span> They got it
        </button>
        <button
          onClick={() => handleAnswer(false)}
          disabled={answering}
          className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-gray-300 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          <span className="text-xl">✗</span> Not yet
        </button>
      </div>

      <p className="text-center text-xs text-gray-400">
        Tap based on what your child can do right now. There are no wrong answers.
      </p>
    </div>
  );
}
