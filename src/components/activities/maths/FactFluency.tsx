'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MathsFluencyContent } from '@/types/curriculum';
import type { ResponseResult } from '@/lib/supabase/types';
import NumberTile from '@/components/shared/NumberTile';
import RewardAnimation from '@/components/shared/RewardAnimation';

interface FactFluencyProps {
  content: MathsFluencyContent;
  onResponse: (stimulus: string, answer: number, result: ResponseResult, timeMs: number) => void;
  onComplete: () => void;
}

const OP_SYMBOLS: Record<string, string> = {
  addition: '+',
  subtraction: '−',
  multiplication: '×',
};

export default function FactFluency({ content, onResponse, onComplete }: FactFluencyProps) {
  const [factIndex, setFactIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showReward, setShowReward] = useState(false);
  const startTimeRef = useRef(Date.now());

  const currentFact = content.facts[factIndex];
  const isLast = factIndex >= content.facts.length - 1;
  const opSymbol = OP_SYMBOLS[content.operation] ?? '+';

  const correctAnswer = content.operation === 'addition'
    ? currentFact[0] + currentFact[1]
    : content.operation === 'subtraction'
    ? currentFact[0] - currentFact[1]
    : currentFact[0] * currentFact[1];

  // Reset timer on new fact
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [factIndex]);

  const handleSubmit = useCallback(() => {
    const answer = parseInt(userAnswer, 10);
    if (isNaN(answer)) return;

    const timeMs = Date.now() - startTimeRef.current;
    const isCorrect = answer === correctAnswer;
    const stimulus = `${currentFact[0]} ${opSymbol} ${currentFact[1]}`;

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    onResponse(stimulus, correctAnswer, isCorrect ? 'correct' : 'incorrect', timeMs);

    if (isCorrect) setShowReward(true);

    setTimeout(() => {
      setFeedback(null);
      setUserAnswer('');
      setShowReward(false);

      if (isLast) {
        onComplete();
      } else {
        setFactIndex((i) => i + 1);
      }
    }, isCorrect ? 800 : 1500);
  }, [userAnswer, correctAnswer, currentFact, opSymbol, isLast, onResponse, onComplete]);

  const handleNumberPad = (num: number) => {
    if (feedback) return;
    setUserAnswer((prev) => prev + num.toString());
  };

  const handleClear = () => {
    if (feedback) return;
    setUserAnswer('');
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Progress */}
      <div className="flex gap-2">
        {content.facts.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < factIndex ? 'bg-green-400' : i === factIndex ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Equation display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={factIndex}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="flex items-center gap-3"
        >
          <NumberTile value={currentFact[0]} size="lg" />
          <NumberTile value={opSymbol} size="lg" variant="operator" />
          <NumberTile value={currentFact[1]} size="lg" />
          <span className="text-4xl font-bold text-gray-400">=</span>

          {/* Answer display */}
          <div
            className={`
              w-20 h-20 rounded-xl border-2 flex items-center justify-center text-4xl font-bold font-mono
              ${feedback === 'correct' ? 'border-green-500 bg-green-50 text-green-800'
                : feedback === 'incorrect' ? 'border-red-400 bg-red-50 text-red-800'
                : 'border-blue-300 bg-white text-blue-900'}
            `}
          >
            {userAnswer || '?'}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Incorrect feedback */}
      {feedback === 'incorrect' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-600 font-medium"
        >
          The answer is <span className="font-bold">{correctAnswer}</span>
        </motion.p>
      )}

      {/* Number pad */}
      <div className="grid grid-cols-3 gap-2 max-w-[200px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleNumberPad(num)}
            disabled={!!feedback}
            className={`
              w-14 h-14 rounded-xl font-bold text-xl
              ${num === 0 ? 'col-start-2' : ''}
              bg-white border-2 border-gray-200 text-gray-800
              hover:bg-gray-50 hover:border-gray-300
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            `}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleClear}
          disabled={!!feedback || !userAnswer}
          className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!!feedback || !userAnswer}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          Check
        </button>
      </div>

      <RewardAnimation show={showReward} level="large" />
    </div>
  );
}
