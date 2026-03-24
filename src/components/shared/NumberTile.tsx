'use client';

import { motion } from 'framer-motion';

type TileSize = 'sm' | 'md' | 'lg' | 'xl';
type TileState = 'default' | 'selected' | 'correct' | 'incorrect' | 'disabled' | 'ghost';
type TileVariant = 'number' | 'operator' | 'equals';

interface NumberTileProps {
  value: number | string;
  size?: TileSize;
  state?: TileState;
  variant?: TileVariant;
  onTap?: () => void;
}

const SIZE_MAP: Record<TileSize, { box: string; text: string }> = {
  sm: { box: 'w-12 h-12', text: 'text-child-base' },
  md: { box: 'w-16 h-16', text: 'text-child-lg' },
  lg: { box: 'w-20 h-20', text: 'text-child-xl' },
  xl: { box: 'w-[120px] h-[120px]', text: 'text-child-2xl' },
};

const STATE_MAP: Record<TileState, string> = {
  default:
    'bg-white border-2 border-sky-300 text-sky-900 hover:border-sky-500 hover:shadow-card-hover',
  selected:
    'bg-sky-100 border-2 border-sky-500 text-sky-900 shadow-tile',
  correct:
    'bg-eucalyptus-100 border-2 border-eucalyptus-500 text-eucalyptus-900',
  incorrect:
    'bg-red-100 border-2 border-red-400 text-red-800 animate-shake',
  disabled:
    'bg-stone-100 border-2 border-stone-200 text-stone-400 cursor-not-allowed opacity-60',
  ghost:
    'bg-transparent border-2 border-dashed border-stone-300 text-stone-300',
};

const VARIANT_OVERRIDE: Record<TileVariant, string | null> = {
  number: null, // use state styles
  operator: 'bg-sky-50 border-2 border-sky-300 text-sky-700',
  equals: 'bg-stone-200 border-2 border-stone-400 text-stone-700',
};

export default function NumberTile({
  value,
  size = 'md',
  state = 'default',
  variant = 'number',
  onTap,
}: NumberTileProps) {
  const sizeStyles = SIZE_MAP[size];
  const variantOverride = VARIANT_OVERRIDE[variant];
  const stateStyles = variantOverride ?? STATE_MAP[state];
  const isInteractive = state !== 'disabled' && state !== 'ghost';

  return (
    <motion.button
      type="button"
      className={`
        ${sizeStyles.box} ${sizeStyles.text} ${stateStyles}
        rounded-tile font-bold flex items-center justify-center
        select-none transition-colors
      `}
      onClick={isInteractive ? onTap : undefined}
      whileTap={isInteractive ? { scale: 0.95, transition: { duration: 0.1 } } : undefined}
      whileHover={isInteractive ? { scale: 1.03 } : undefined}
      aria-label={`${variant === 'operator' ? 'Operator' : variant === 'equals' ? 'Equals' : 'Number'} ${value}`}
      aria-disabled={state === 'disabled'}
    >
      {value}
    </motion.button>
  );
}
