'use client';

import { motion } from 'framer-motion';

interface LetterTileProps {
  letter: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'correct' | 'incorrect' | 'selected' | 'disabled';
  onClick?: () => void;
  draggable?: boolean;
  onDragEnd?: (letter: string) => void;
}

const SIZE_CLASSES = {
  sm: 'w-10 h-10 text-lg',
  md: 'w-14 h-14 text-2xl',
  lg: 'w-20 h-20 text-4xl',
};

const VARIANT_CLASSES = {
  default: 'bg-white border-2 border-amber-300 text-amber-900 hover:border-amber-500 hover:shadow-md',
  correct: 'bg-green-100 border-2 border-green-500 text-green-800',
  incorrect: 'bg-red-100 border-2 border-red-400 text-red-800',
  selected: 'bg-amber-100 border-2 border-amber-500 text-amber-900 shadow-md',
  disabled: 'bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed',
};

export default function LetterTile({
  letter,
  size = 'md',
  variant = 'default',
  onClick,
  draggable = false,
  onDragEnd,
}: LetterTileProps) {
  return (
    <motion.button
      type="button"
      className={`
        ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]}
        rounded-xl font-bold flex items-center justify-center
        select-none cursor-pointer transition-colors
        font-mono tracking-wider
      `}
      onClick={variant !== 'disabled' ? onClick : undefined}
      whileTap={variant !== 'disabled' ? { scale: 0.92 } : undefined}
      whileHover={variant !== 'disabled' ? { scale: 1.05 } : undefined}
      drag={draggable && variant !== 'disabled'}
      dragSnapToOrigin
      onDragEnd={() => onDragEnd?.(letter)}
      layout
    >
      {letter}
    </motion.button>
  );
}
