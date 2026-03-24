'use client';

import { motion } from 'framer-motion';
import type { ResponseResult } from '@/lib/supabase/types';

interface ResponseRecorderProps {
  onRecord: (result: ResponseResult) => void;
  showPrompted?: boolean;
  showSkip?: boolean;
  disabled?: boolean;
}

export default function ResponseRecorder({
  onRecord,
  showPrompted = true,
  showSkip = true,
  disabled = false,
}: ResponseRecorderProps) {
  return (
    <div className="flex items-center gap-3 py-4">
      <RecordButton
        label="Correct"
        emoji="✓"
        color="bg-green-500 hover:bg-green-600"
        onClick={() => onRecord('correct')}
        disabled={disabled}
      />
      <RecordButton
        label="Incorrect"
        emoji="✗"
        color="bg-red-500 hover:bg-red-600"
        onClick={() => onRecord('incorrect')}
        disabled={disabled}
      />
      {showPrompted && (
        <RecordButton
          label="Prompted"
          emoji="?"
          color="bg-amber-500 hover:bg-amber-600"
          onClick={() => onRecord('prompted')}
          disabled={disabled}
        />
      )}
      {showSkip && (
        <RecordButton
          label="Skip"
          emoji="→"
          color="bg-gray-400 hover:bg-gray-500"
          onClick={() => onRecord('skipped')}
          disabled={disabled}
        />
      )}
    </div>
  );
}

function RecordButton({
  label,
  emoji,
  color,
  onClick,
  disabled,
}: {
  label: string;
  emoji: string;
  color: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        ${color} text-white
        px-5 py-3 rounded-xl font-semibold text-sm
        flex items-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors shadow-sm
      `}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
    >
      <span className="text-lg">{emoji}</span>
      {label}
    </motion.button>
  );
}
