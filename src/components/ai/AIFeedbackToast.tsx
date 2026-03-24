'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIFeedbackToastProps {
  message: string | null;
  type?: 'praise' | 'encouragement' | 'hint';
  duration?: number;
  onDismiss?: () => void;
}

const TYPE_STYLES = {
  praise: 'bg-green-50 border-green-300 text-green-800',
  encouragement: 'bg-amber-50 border-amber-300 text-amber-800',
  hint: 'bg-blue-50 border-blue-300 text-blue-800',
};

const TYPE_ICONS = {
  praise: '🌟',
  encouragement: '💪',
  hint: '💡',
};

export default function AIFeedbackToast({
  message,
  type = 'praise',
  duration = 4000,
  onDismiss,
}: AIFeedbackToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message, duration, onDismiss]);

  return (
    <AnimatePresence>
      {visible && message && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', bounce: 0.3 }}
          className={`
            fixed bottom-6 left-1/2 -translate-x-1/2 z-50
            max-w-md w-[90%]
            border-2 rounded-2xl px-5 py-4 shadow-lg
            ${TYPE_STYLES[type]}
          `}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{TYPE_ICONS[type]}</span>
            <p className="text-base font-medium leading-relaxed">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
