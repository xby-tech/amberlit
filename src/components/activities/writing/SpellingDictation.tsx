'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SpellingDictationContent } from '@/types/curriculum';
import type { ResponseResult } from '@/lib/supabase/types';
import LetterTile from '@/components/shared/LetterTile';
import AudioButton from '@/components/shared/AudioButton';
import RewardAnimation from '@/components/shared/RewardAnimation';

interface SpellingDictationProps {
  content: SpellingDictationContent;
  onResponse: (word: string, result: ResponseResult) => void;
  onComplete: () => void;
}

export default function SpellingDictation({ content, onResponse, onComplete }: SpellingDictationProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showReward, setShowReward] = useState(false);

  const currentWord = content.words[wordIndex];
  const isLast = wordIndex >= content.words.length - 1;

  const handleSubmit = useCallback(() => {
    const isCorrect = typed.toLowerCase().trim() === currentWord.toLowerCase();
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    onResponse(currentWord, isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setShowReward(true);

    setTimeout(() => {
      setFeedback(null);
      setTyped('');
      setShowReward(false);
      if (isLast) onComplete();
      else setWordIndex((i) => i + 1);
    }, isCorrect ? 1000 : 2000);
  }, [typed, currentWord, isLast, onResponse, onComplete]);

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="flex gap-2">
        {content.words.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i < wordIndex ? 'bg-green-400' : i === wordIndex ? 'bg-amber-500' : 'bg-gray-200'}`} />
        ))}
      </div>

      <p className="text-lg text-gray-600">Listen to the word, then spell it:</p>

      {content.audioPaths[wordIndex] && (
        <AudioButton src={content.audioPaths[wordIndex]} label={`Hear word ${wordIndex + 1}`} size="lg" />
      )}

      <input
        type="text"
        value={typed}
        onChange={(e) => !feedback && setTyped(e.target.value)}
        disabled={!!feedback}
        className={`text-3xl text-center font-mono tracking-widest w-64 border-b-4 py-2 outline-none ${
          feedback === 'correct' ? 'border-green-500 text-green-800' :
          feedback === 'incorrect' ? 'border-red-400 text-red-800' :
          'border-amber-400 text-gray-800'
        }`}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        autoFocus
      />

      <AnimatePresence>
        {feedback === 'incorrect' && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600">
            The spelling is: <span className="font-bold font-mono tracking-wide">{currentWord}</span>
          </motion.p>
        )}
      </AnimatePresence>

      {!feedback && (
        <button onClick={handleSubmit} disabled={!typed.trim()} className="bg-amber-600 text-white px-6 py-2 rounded-xl font-semibold disabled:opacity-50">
          Check
        </button>
      )}

      <RewardAnimation show={showReward} />
    </div>
  );
}
