'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { WritingPromptContent } from '@/types/curriculum';
import type { ResponseResult } from '@/lib/supabase/types';
import RewardAnimation from '@/components/shared/RewardAnimation';

interface SentenceBuilderProps {
  content: WritingPromptContent;
  onResponse: (sentence: string, result: ResponseResult) => void;
  onComplete: () => void;
}

export default function SentenceBuilder({ content, onResponse, onComplete }: SentenceBuilderProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const wordBank = content.wordBank ?? [];

  const handleWordTap = (word: string) => {
    if (submitted) return;
    setSelectedWords((prev) => [...prev, word]);
  };

  const handleUndo = () => {
    setSelectedWords((prev) => prev.slice(0, -1));
  };

  const handleSubmit = useCallback(() => {
    const sentence = selectedWords.join(' ');
    setSubmitted(true);
    setShowReward(true);
    onResponse(sentence, 'correct'); // sentence building is always "correct" — it's creative

    setTimeout(() => {
      setShowReward(false);
      onComplete();
    }, 1500);
  }, [selectedWords, onResponse, onComplete]);

  return (
    <div className="flex flex-col items-center gap-6 py-8 max-w-lg mx-auto">
      <p className="text-lg text-gray-600 text-center">{content.prompt}</p>

      {/* Built sentence */}
      <div className="min-h-[60px] w-full bg-white border-2 border-amber-200 rounded-xl px-4 py-3 flex flex-wrap gap-2">
        {selectedWords.length === 0 ? (
          <span className="text-gray-300">Tap words below to build your sentence...</span>
        ) : (
          selectedWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-amber-100 text-amber-800 px-3 py-1 rounded-lg font-medium text-lg"
            >
              {word}
            </motion.span>
          ))
        )}
      </div>

      {/* Scaffolds */}
      {content.scaffolds && content.scaffolds.length > 0 && selectedWords.length === 0 && (
        <p className="text-sm text-gray-400">Hint: {content.scaffolds[0]}</p>
      )}

      {/* Word bank */}
      <div className="flex flex-wrap gap-2 justify-center">
        {wordBank.map((word, i) => (
          <button
            key={`${word}-${i}`}
            type="button"
            onClick={() => handleWordTap(word)}
            disabled={submitted}
            className="bg-white border-2 border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium hover:border-amber-400 hover:bg-amber-50 disabled:opacity-50 transition-colors"
          >
            {word}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        {selectedWords.length > 0 && !submitted && (
          <button onClick={handleUndo} className="text-sm text-gray-500 hover:text-gray-700 underline">Undo</button>
        )}
        {selectedWords.length >= 2 && !submitted && (
          <button onClick={handleSubmit} className="bg-amber-600 text-white px-6 py-2 rounded-xl font-semibold">
            Done!
          </button>
        )}
      </div>

      <RewardAnimation show={showReward} type="confetti" />
    </div>
  );
}
