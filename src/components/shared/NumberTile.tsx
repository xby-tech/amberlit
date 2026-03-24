'use client';

import { motion } from 'framer-motion';

interface NumberTileProps {
  value: number | string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'correct' | 'incorrect' | 'selected' | 'operator';
  onClick?: () => void;
}

const SIZE_CLASSES = {
  sm: 'w-10 h-10 text-lg',
  md: 'w-14 h-14 text-2xl',
  lg: 'w-20 h-20 text-4xl',
};

const VARIANT_CLASSES = {
  default: 'bg-white border-2 border-blue-300 text-blue-900 hover:border-blue-500',
  correct: 'bg-green-100 border-2 border-green-500 text-green-800',
  incorrect: 'bg-red-100 border-2 border-red-400 text-red-800',
  selected: 'bg-blue-100 border-2 border-blue-500 text-blue-900 shadow-md',
  operator: 'bg-amber-50 border-2 border-amber-300 text-amber-800',
};

export default function NumberTile({
  value,
  size = 'md',
  variant = 'default',
  onClick,
}: NumberTileProps) {
  return (
    <motion.button
      type="button"
      className={`
        ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]}
        rounded-xl font-bold flex items-center justify-center
        select-none cursor-pointer transition-colors
        font-mono
      `}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
    >
      {value}
    </motion.button>
  );
}
