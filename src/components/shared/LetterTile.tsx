'use client';

import { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

type TileSize = 'sm' | 'md' | 'lg' | 'xl';
type TileState = 'default' | 'selected' | 'correct' | 'incorrect' | 'disabled' | 'ghost';

interface LetterTileProps {
  letter: string;
  size?: TileSize;
  state?: TileState;
  onTap?: () => void;
  draggable?: boolean;
  audioSrc?: string;
  onDragEnd?: (letter: string) => void;
}

const SIZE_MAP: Record<TileSize, { box: string; text: string }> = {
  sm: { box: 'w-12 h-12', text: 'text-child-base' },
  md: { box: 'w-16 h-16', text: 'text-child-lg' },
  lg: { box: 'w-20 h-20', text: 'text-child-xl' },
  xl: { box: 'w-[120px] h-[120px]', text: 'text-child-2xl' },
};

const STATE_MAP: Record<TileState, string> = {
  default:
    'bg-white border-2 border-brand-300 text-stone-800 hover:border-brand-500 hover:shadow-card-hover',
  selected:
    'bg-brand-100 border-2 border-brand-500 text-brand-900 shadow-tile',
  correct:
    'bg-eucalyptus-100 border-2 border-eucalyptus-500 text-eucalyptus-900',
  incorrect:
    'bg-red-100 border-2 border-red-400 text-red-800 animate-shake',
  disabled:
    'bg-stone-100 border-2 border-stone-200 text-stone-400 cursor-not-allowed opacity-60',
  ghost:
    'bg-transparent border-2 border-dashed border-stone-300 text-stone-300',
};

export default function LetterTile({
  letter,
  size = 'md',
  state = 'default',
  onTap,
  draggable = false,
  audioSrc,
  onDragEnd,
}: LetterTileProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTap = useCallback(() => {
    if (state === 'disabled') return;
    if (audioSrc) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioSrc);
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    onTap?.();
  }, [state, audioSrc, onTap]);

  const sizeStyles = SIZE_MAP[size];
  const stateStyles = STATE_MAP[state];
  const isInteractive = state !== 'disabled' && state !== 'ghost';

  return (
    <motion.button
      type="button"
      className={`
        ${sizeStyles.box} ${sizeStyles.text} ${stateStyles}
        rounded-tile font-bold flex items-center justify-center
        select-none transition-colors
        tracking-wider uppercase
      `}
      onClick={handleTap}
      whileTap={isInteractive ? { scale: 0.95, transition: { duration: 0.1 } } : undefined}
      whileHover={isInteractive ? { scale: 1.03 } : undefined}
      drag={draggable && isInteractive}
      dragSnapToOrigin
      onDragEnd={() => onDragEnd?.(letter)}
      layout
      aria-label={`Letter ${letter}`}
      aria-disabled={state === 'disabled'}
    >
      {letter}
    </motion.button>
  );
}
