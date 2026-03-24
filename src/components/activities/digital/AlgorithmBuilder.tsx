'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { DigitalActivityContent } from '@/types/curriculum';

interface AlgorithmBuilderProps {
  content: DigitalActivityContent;
  onComplete: () => void;
}

export default function AlgorithmBuilder({ content, onComplete }: AlgorithmBuilderProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const allDone = completedSteps.size === content.instructions.length;

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8 max-w-lg mx-auto">
      <h3 className="text-xl font-bold text-gray-800">Algorithm Builder</h3>
      <p className="text-gray-600 text-center">Follow these steps in order. Tick each one as you complete it.</p>

      <div className="w-full space-y-3">
        {content.instructions.map((instruction, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => toggleStep(i)}
            className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-colors ${
              completedSteps.has(i)
                ? 'border-purple-400 bg-purple-50'
                : 'border-gray-200 bg-white hover:border-purple-300'
            }`}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
              completedSteps.has(i) ? 'border-purple-500 bg-purple-500 text-white' : 'border-gray-300'
            }`}>
              {completedSteps.has(i) && <span className="text-xs">✓</span>}
            </div>
            <div>
              <span className="text-xs text-purple-600 font-medium">Step {i + 1}</span>
              <p className={`text-gray-700 ${completedSteps.has(i) ? 'line-through text-gray-400' : ''}`}>
                {instruction}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {allDone && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onComplete}
          className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors"
        >
          Algorithm complete!
        </motion.button>
      )}
    </div>
  );
}
