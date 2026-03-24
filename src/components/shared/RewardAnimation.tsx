'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RewardAnimationProps {
  /** Trigger animation */
  show: boolean;
  type?: 'stars' | 'confetti' | 'levelup';
  onComplete?: () => void;
}

const STAR_EMOJIS = ['⭐', '🌟', '✨'];

function StarBurst({ onComplete }: { onComplete?: () => void }) {
  const stars = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    emoji: STAR_EMOJIS[i % STAR_EMOJIS.length],
    angle: (i / 8) * 360,
    delay: i * 0.05,
  }));

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 0.8 }}
      onAnimationComplete={onComplete}
    >
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute text-3xl"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            x: Math.cos((star.angle * Math.PI) / 180) * 120,
            y: Math.sin((star.angle * Math.PI) / 180) * 120,
          }}
          transition={{ duration: 0.8, delay: star.delay, ease: 'easeOut' }}
        >
          {star.emoji}
        </motion.span>
      ))}
      <motion.span
        className="text-5xl"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1] }}
        transition={{ duration: 0.5 }}
      >
        🌟
      </motion.span>
    </motion.div>
  );
}

function ConfettiBurst({ onComplete }: { onComplete?: () => void }) {
  const pieces = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    color: ['bg-amber-400', 'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400'][i % 5],
    x: (Math.random() - 0.5) * 300,
    y: -(Math.random() * 200 + 100),
    rotation: Math.random() * 360,
  }));

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2, delay: 1 }}
      onAnimationComplete={onComplete}
    >
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className={`absolute w-3 h-3 rounded-sm ${piece.color}`}
          initial={{ y: 0, x: 0, rotate: 0, scale: 1 }}
          animate={{
            y: [piece.y, piece.y + 400],
            x: piece.x,
            rotate: piece.rotation,
            scale: [1, 0.5],
          }}
          transition={{ duration: 1.5, ease: 'easeIn' }}
        />
      ))}
    </motion.div>
  );
}

export default function RewardAnimation({ show, type = 'stars', onComplete }: RewardAnimationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) setVisible(true);
  }, [show]);

  const handleComplete = () => {
    setVisible(false);
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {visible && (
        type === 'confetti'
          ? <ConfettiBurst onComplete={handleComplete} />
          : <StarBurst onComplete={handleComplete} />
      )}
    </AnimatePresence>
  );
}
