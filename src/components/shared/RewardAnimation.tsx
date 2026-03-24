'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type RewardLevel = 'small' | 'medium' | 'large';

interface RewardAnimationProps {
  show: boolean;
  level?: RewardLevel;
  message?: string;
  onComplete?: () => void;
}

/* ── Small: single star float up (600ms) ── */
function SmallReward({ onComplete }: { onComplete?: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="text-4xl"
        initial={{ y: 0, scale: 0 }}
        animate={{ y: -120, scale: [0, 1.3, 1] }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="#FFC107" stroke="#FF8F00" strokeWidth="1">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ── Medium: 3 stars + progress bar + "Well done!" (1.2s) ── */
function MediumReward({ message, onComplete }: { message: string; onComplete?: () => void }) {
  const stars = [
    { id: 0, x: -60, delay: 0 },
    { id: 1, x: 0, delay: 0.1 },
    { id: 2, x: 60, delay: 0.2 },
  ];

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50 flex flex-col items-center justify-center gap-6"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 1.0 }}
      onAnimationComplete={onComplete}
    >
      <div className="flex gap-4">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ y: 20, scale: 0, rotate: -30 }}
            animate={{ y: [-20, -60], scale: [0, 1.2, 1], rotate: 0 }}
            transition={{ duration: 0.5, delay: star.delay, ease: 'easeOut' }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#FFC107" stroke="#FF8F00" strokeWidth="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-child-lg font-bold text-brand-700"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {message}
      </motion.p>

      <motion.div
        className="w-48 h-2 bg-stone-200 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-brand-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ── Large: confetti burst (30 particles) + trophy + summary slide-up (2s) ── */
function LargeReward({ message, onComplete }: { message: string; onComplete?: () => void }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        color: ['#FFC107', '#4CAF50', '#42A5F5', '#EC407A', '#7E57C2', '#FF8F00'][i % 6],
        x: (Math.random() - 0.5) * 400,
        y: -(Math.random() * 300 + 100),
        rotation: Math.random() * 720,
        size: 4 + Math.random() * 6,
        delay: Math.random() * 0.3,
      })),
    []
  );

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 1.8 }}
      onAnimationComplete={onComplete}
    >
      {/* Confetti particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
          initial={{ y: 0, x: 0, rotate: 0, scale: 1, opacity: 1 }}
          animate={{
            y: [p.y, p.y + 500],
            x: p.x,
            rotate: p.rotation,
            scale: [1, 0.5],
            opacity: [1, 0],
          }}
          transition={{ duration: 1.8, delay: p.delay, ease: 'easeIn' }}
        />
      ))}

      {/* Trophy */}
      <motion.div
        className="text-6xl mb-4"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: [0, 1.3, 1], rotate: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <svg width="72" height="72" viewBox="0 0 24 24" fill="#FFC107" stroke="#E65100" strokeWidth="0.5">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      </motion.div>

      {/* Summary slide up */}
      <motion.div
        className="bg-white rounded-card shadow-modal px-8 py-6 text-center"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
      >
        <p className="text-child-xl font-bold text-brand-700">{message}</p>
      </motion.div>
    </motion.div>
  );
}

export default function RewardAnimation({
  show,
  level = 'small',
  message = 'Well done!',
  onComplete,
}: RewardAnimationProps) {
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
        <>
          {level === 'small' && <SmallReward onComplete={handleComplete} />}
          {level === 'medium' && <MediumReward message={message} onComplete={handleComplete} />}
          {level === 'large' && <LargeReward message={message} onComplete={handleComplete} />}
        </>
      )}
    </AnimatePresence>
  );
}
