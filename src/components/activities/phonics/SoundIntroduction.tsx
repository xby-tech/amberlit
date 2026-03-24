'use client';

import { motion } from 'framer-motion';
import type { SoundIntroductionContent } from '@/types/curriculum';
import AudioButton from '@/components/shared/AudioButton';
import LetterTile from '@/components/shared/LetterTile';

interface SoundIntroductionProps {
  content: SoundIntroductionContent;
  onComplete: () => void;
}

export default function SoundIntroduction({ content, onComplete }: SoundIntroductionProps) {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      {/* Large grapheme display */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.4 }}
      >
        <LetterTile letter={content.grapheme} size="lg" />
      </motion.div>

      {/* Phoneme label */}
      <p className="text-xl text-gray-600 font-medium">
        says <span className="text-amber-700 font-bold text-2xl">{content.phoneme}</span>
      </p>

      {/* Audio play button */}
      <AudioButton src={content.audioPath} label={`Hear the sound ${content.phoneme}`} size="lg" />

      {/* Keywords */}
      <div className="flex flex-wrap gap-4 justify-center">
        {content.keywords.map((word) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border-2 border-amber-200 rounded-xl px-4 py-2 text-lg font-medium text-gray-800"
          >
            <span className="text-amber-600 font-bold">{content.grapheme}</span>
            {word.slice(content.grapheme.length)}
          </motion.div>
        ))}
      </div>

      {/* Continue button */}
      <motion.button
        type="button"
        onClick={onComplete}
        className="mt-4 bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-amber-700 transition-colors"
        whileTap={{ scale: 0.95 }}
      >
        Got it!
      </motion.button>
    </div>
  );
}
