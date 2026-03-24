'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TrickyWordFlashContent } from '@/types/curriculum';
import type { ResponseResult } from '@/lib/supabase/types';
import ResponseRecorder from '@/components/session/ResponseRecorder';
import RewardAnimation from '@/components/shared/RewardAnimation';

interface TrickyWordFlashProps {
  content: TrickyWordFlashContent;
  onResponse: (word: string, result: ResponseResult) => void;
  onComplete: () => void;
}

export default function TrickyWordFlash({ content, onResponse, onComplete }: TrickyWordFlashProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWord, setShowWord] = useState(true);
  const [showReward, setShowReward] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentWord = content.words[currentIndex];
  const isLast = currentIndex >= content.words.length - 1;

  // Auto-hide the word after displaySeconds
  useEffect(() => {
    setShowWord(true);
    timerRef.current = setTimeout(() => {
      setShowWord(false);
    }, content.displaySeconds * 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, content.displaySeconds]);

  const handleRecord = useCallback((result: ResponseResult) => {
    onResponse(currentWord, result);

    if (result === 'correct') setShowReward(true);

    if (isLast) {
      setTimeout(() => onComplete(), 600);
    } else {
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setShowReward(false);
      }, 600);
    }
  }, [currentWord, isLast, onResponse, onComplete]);

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Progress */}
      <div className="flex gap-2">
        {content.words.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < currentIndex ? 'bg-green-400' : i === currentIndex ? 'bg-amber-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Instruction */}
      <p className="text-lg text-gray-600">Can you read this tricky word?</p>

      {/* Word display */}
      <AnimatePresence mode="wait">
        {showWord ? (
          <motion.div
            key={`word-${currentIndex}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-white border-2 border-amber-300 rounded-2xl px-8 py-6 shadow-md"
          >
            <span className="text-5xl font-bold text-amber-800 font-serif tracking-wide">
              {currentWord}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key={`hidden-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-100 border-2 border-gray-200 rounded-2xl px-8 py-6"
          >
            <span className="text-3xl text-gray-400">Did they read it?</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reveal button when hidden */}
      {!showWord && (
        <button
          type="button"
          onClick={() => setShowWord(true)}
          className="text-sm text-amber-600 hover:text-amber-700 underline"
        >
          Show word again
        </button>
      )}

      {/* Response recorder */}
      <ResponseRecorder onRecord={handleRecord} />

      <RewardAnimation show={showReward} />
    </div>
  );
}
