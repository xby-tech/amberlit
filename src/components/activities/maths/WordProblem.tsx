'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { MathsWordProblemContent } from '@/types/curriculum';
import type { ResponseResult } from '@/lib/supabase/types';
import RewardAnimation from '@/components/shared/RewardAnimation';

interface WordProblemProps {
  content: MathsWordProblemContent;
  onResponse: (problem: string, answer: number, result: ResponseResult) => void;
  onComplete: () => void;
}

export default function WordProblem({ content, onResponse, onComplete }: WordProblemProps) {
  const [problem, setProblem] = useState(content.fallbackProblem);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [showWorking, setShowWorking] = useState(false);

  const handleSubmit = useCallback(() => {
    if (!problem) return;
    const answer = parseInt(userAnswer, 10);
    if (isNaN(answer)) return;

    const isCorrect = answer === problem.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    onResponse(problem.problem, problem.answer, isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setShowReward(true);
      setTimeout(() => onComplete(), 1500);
    } else {
      setShowWorking(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    }
  }, [userAnswer, problem, onResponse, onComplete]);

  if (!problem) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading problem...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8 max-w-lg mx-auto">
      {/* Problem text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-blue-200 rounded-2xl p-6 w-full"
      >
        <p className="text-xl text-gray-800 leading-relaxed">{problem.problem}</p>
      </motion.div>

      {/* Answer input */}
      <div className="flex items-center gap-3">
        <label className="text-lg font-medium text-gray-600">Answer:</label>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => !feedback && setUserAnswer(e.target.value)}
          disabled={!!feedback}
          className={`
            w-24 h-14 text-center text-2xl font-bold font-mono rounded-xl border-2
            ${feedback === 'correct' ? 'border-green-500 bg-green-50 text-green-800'
              : feedback === 'incorrect' ? 'border-red-400 bg-red-50 text-red-800'
              : 'border-blue-300 bg-white text-blue-900'}
            focus:outline-none focus:ring-2 focus:ring-blue-400
            disabled:opacity-70
          `}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          autoFocus
        />
      </div>

      {/* Submit button */}
      {!feedback && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!userAnswer}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          Check answer
        </button>
      )}

      {/* Feedback */}
      {feedback === 'correct' && (
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-bold text-green-600"
        >
          Correct! Well done!
        </motion.p>
      )}

      {feedback === 'incorrect' && showWorking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-amber-50 border border-amber-200 rounded-xl p-4 w-full"
        >
          <p className="font-medium text-amber-800">
            The answer is <span className="font-bold">{problem.answer}</span>
          </p>
          <p className="text-sm text-amber-700 mt-1">{problem.working}</p>
        </motion.div>
      )}

      <RewardAnimation show={showReward} type="confetti" />
    </div>
  );
}
