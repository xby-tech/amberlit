'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SoundPracticeContent } from '@/types/curriculum';
import type { ResponseResult } from '@/lib/supabase/types';
import LetterTile from '@/components/shared/LetterTile';
import ResponseRecorder from '@/components/session/ResponseRecorder';
import RewardAnimation from '@/components/shared/RewardAnimation';

interface SoundPracticeProps {
  content: SoundPracticeContent;
  onResponse: (grapheme: string, result: ResponseResult) => void;
  onComplete: () => void;
}

export default function SoundPractice({ content, onResponse, onComplete }: SoundPracticeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const currentGrapheme = content.graphemes[currentIndex];
  const isLast = currentIndex >= content.graphemes.length - 1;

  const handleRecord = useCallback((result: ResponseResult) => {
    onResponse(currentGrapheme, result);

    if (result === 'correct') {
      setShowReward(true);
    }

    if (isLast) {
      setTimeout(() => onComplete(), result === 'correct' ? 800 : 300);
    } else {
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setShowReward(false);
      }, result === 'correct' ? 800 : 300);
    }
  }, [currentGrapheme, isLast, onResponse, onComplete]);

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Progress dots */}
      <div className="flex gap-2">
        {content.graphemes.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i < currentIndex ? 'bg-green-400' : i === currentIndex ? 'bg-amber-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Instruction */}
      <p className="text-lg text-gray-600">What sound does this letter make?</p>

      {/* Flashcard */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LetterTile letter={currentGrapheme} size="lg" />
        </motion.div>
      </AnimatePresence>

      {/* Response buttons */}
      <ResponseRecorder onRecord={handleRecord} showSkip={false} />

      <RewardAnimation show={showReward} />
    </div>
  );
}
