'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface PatternFinderProps {
  onComplete: () => void;
}

// Simple pattern sequences for young learners
const PATTERNS = [
  { sequence: ['🔴', '🔵', '🔴', '🔵', '🔴', '?'], answer: '🔵', options: ['🔴', '🔵', '🟢'] },
  { sequence: ['⭐', '⭐', '🌙', '⭐', '⭐', '?'], answer: '🌙', options: ['⭐', '🌙', '☀️'] },
  { sequence: ['1', '2', '3', '1', '2', '?'], answer: '3', options: ['1', '2', '3'] },
  { sequence: ['🐱', '🐶', '🐱', '🐶', '🐱', '?'], answer: '🐶', options: ['🐱', '🐶', '🐰'] },
];

export default function PatternFinder({ onComplete }: PatternFinderProps) {
  const [patternIndex, setPatternIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const current = PATTERNS[patternIndex];
  const isLast = patternIndex >= PATTERNS.length - 1;

  const handleSelect = (option: string) => {
    if (feedback) return;
    const isCorrect = option === current.answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setFeedback(null);
      if (isLast) onComplete();
      else setPatternIndex((i) => i + 1);
    }, isCorrect ? 800 : 1500);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <h3 className="text-xl font-bold text-gray-800">Find the Pattern</h3>
      <p className="text-gray-600">What comes next?</p>

      <div className="flex gap-2">
        {PATTERNS.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i < patternIndex ? 'bg-green-400' : i === patternIndex ? 'bg-purple-500' : 'bg-gray-200'}`} />
        ))}
      </div>

      {/* Pattern display */}
      <motion.div
        key={patternIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-3 items-center"
      >
        {current.sequence.map((item, i) => (
          <span
            key={i}
            className={`text-4xl ${item === '?' ? 'w-14 h-14 border-2 border-dashed border-purple-400 rounded-xl flex items-center justify-center text-purple-300' : ''}`}
          >
            {item}
          </span>
        ))}
      </motion.div>

      {/* Options */}
      <div className="flex gap-4">
        {current.options.map((option) => (
          <motion.button
            key={option}
            type="button"
            onClick={() => handleSelect(option)}
            disabled={!!feedback}
            className={`text-4xl w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-colors ${
              feedback && option === current.answer ? 'border-green-500 bg-green-50' :
              feedback === 'incorrect' && option !== current.answer ? 'opacity-50' :
              'border-gray-200 bg-white hover:border-purple-400'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {feedback === 'incorrect' && (
        <p className="text-red-500 text-sm">The answer is {current.answer}</p>
      )}
    </div>
  );
}
