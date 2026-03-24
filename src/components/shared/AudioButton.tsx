'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '@/hooks/useAudio';

interface AudioButtonProps {
  src: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  autoPlay?: boolean;
}

const SIZE_CLASSES = {
  sm: 'w-10 h-10 text-lg',
  md: 'w-14 h-14 text-2xl',
  lg: 'w-20 h-20 text-3xl',
};

export default function AudioButton({ src, label, size = 'md', autoPlay = false }: AudioButtonProps) {
  const { play } = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      await play(src);
    } catch {
      // Audio failed — degrade silently
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handlePlay}
      className={`
        ${SIZE_CLASSES[size]}
        rounded-full bg-amber-500 text-white
        flex items-center justify-center
        hover:bg-amber-600 transition-colors
        shadow-md
        ${isPlaying ? 'animate-pulse' : ''}
      `}
      whileTap={{ scale: 0.9 }}
      aria-label={label ?? `Play sound`}
    >
      {isPlaying ? (
        <span className="block w-4 h-4 rounded-sm bg-white" />
      ) : (
        <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </motion.button>
  );
}
