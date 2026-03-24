'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WordBuildingContent } from '@/types/curriculum';
import type { ResponseResult } from '@/lib/supabase/types';
import LetterTile from '@/components/shared/LetterTile';
import RewardAnimation from '@/components/shared/RewardAnimation';

interface WordBuildingProps {
  content: WordBuildingContent;
  onResponse: (word: string, result: ResponseResult) => void;
  onComplete: () => void;
}

export default function WordBuilding({ content, onResponse, onComplete }: WordBuildingProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showReward, setShowReward] = useState(false);

  const currentWord = content.words[wordIndex];
  const targetLetters = currentWord.split('');
  const isLast = wordIndex >= content.words.length - 1;

  const handleLetterTap = useCallback((letter: string) => {
    if (feedback) return; // don't allow input during feedback

    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);

    // Check if word is complete
    if (newSelected.length === targetLetters.length) {
      const built = newSelected.join('');
      const isCorrect = built === currentWord;

      setFeedback(isCorrect ? 'correct' : 'incorrect');
      onResponse(currentWord, isCorrect ? 'correct' : 'incorrect');

      if (isCorrect) {
        setShowReward(true);
      }

      setTimeout(() => {
        setFeedback(null);
        setSelectedLetters([]);
        setShowReward(false);

        if (isLast) {
          onComplete();
        } else {
          setWordIndex((i) => i + 1);
        }
      }, isCorrect ? 1200 : 1500);
    }
  }, [selectedLetters, targetLetters, currentWord, isLast, onResponse, onComplete, feedback]);

  const handleUndo = () => {
    if (feedback) return;
    setSelectedLetters((prev) => prev.slice(0, -1));
  };

  // Shuffle available letters (but keep them stable per word)
  const availableLetters = content.availableLetters;

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Progress */}
      <div className="flex gap-2">
        {content.words.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < wordIndex ? 'bg-green-400' : i === wordIndex ? 'bg-amber-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Instruction */}
      <p className="text-lg text-gray-600">
        Build the word: <span className="font-bold text-amber-700 text-xl">{currentWord}</span>
      </p>

      {/* Word slots */}
      <div className="flex gap-2 min-h-[60px]">
        {targetLetters.map((_, i) => (
          <div
            key={i}
            className={`
              w-14 h-14 rounded-xl border-2 border-dashed flex items-center justify-center text-2xl font-bold font-mono
              ${selectedLetters[i]
                ? feedback === 'correct'
                  ? 'border-green-500 bg-green-50 text-green-800'
                  : feedback === 'incorrect'
                  ? 'border-red-400 bg-red-50 text-red-800'
                  : 'border-amber-400 bg-amber-50 text-amber-800'
                : 'border-gray-300 bg-gray-50 text-gray-300'
              }
            `}
          >
            {selectedLetters[i] ?? ''}
          </div>
        ))}
      </div>

      {/* Feedback text */}
      <AnimatePresence>
        {feedback === 'incorrect' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-600 font-medium"
          >
            Not quite — the word is <span className="font-bold">{currentWord}</span>
          </motion.p>
        )}
      </AnimatePresence>

      {/* Available letters */}
      <div className="flex flex-wrap gap-2 justify-center max-w-md">
        {availableLetters.map((letter, i) => (
          <LetterTile
            key={`${letter}-${i}`}
            letter={letter}
            size="md"
            state={feedback ? 'disabled' : 'default'}
            onTap={() => handleLetterTap(letter)}
          />
        ))}
      </div>

      {/* Undo button */}
      {selectedLetters.length > 0 && !feedback && (
        <button
          type="button"
          onClick={handleUndo}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Undo last letter
        </button>
      )}

      <RewardAnimation show={showReward} />
    </div>
  );
}
