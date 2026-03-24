'use client';

// Deterministic avatar from a seed string.
// Generates a simple colored circle with initials.

interface AvatarProps {
  seed: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASSES = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-xl',
};

const COLORS = [
  'bg-amber-400', 'bg-red-400', 'bg-blue-400', 'bg-green-400',
  'bg-purple-400', 'bg-pink-400', 'bg-teal-400', 'bg-orange-400',
  'bg-indigo-400', 'bg-cyan-400',
];

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function Avatar({ seed, name, size = 'md' }: AvatarProps) {
  const colorIndex = hashCode(seed) % COLORS.length;
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`
        ${SIZE_CLASSES[size]} ${COLORS[colorIndex]}
        rounded-full flex items-center justify-center
        font-bold text-white select-none
      `}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
