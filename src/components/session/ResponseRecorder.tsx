'use client';

import { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, HelpCircle, X } from 'lucide-react';
import type { ResponseResult } from '@/lib/supabase/types';

interface ResponseRecorderProps {
  onRecord: (result: ResponseResult) => void;
  aideMode?: boolean;
  disabled?: boolean;
}

export default function ResponseRecorder({
  onRecord,
  aideMode = false,
  disabled = false,
}: ResponseRecorderProps) {
  // Keyboard shortcuts in aide mode: 1=correct, 2=prompted, 3=incorrect
  useEffect(() => {
    if (!aideMode || disabled) return;

    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case '1':
          onRecord('correct');
          break;
        case '2':
          onRecord('prompted');
          break;
        case '3':
          onRecord('incorrect');
          break;
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [aideMode, disabled, onRecord]);

  return (
    <div className="flex items-center gap-3 py-4" role="group" aria-label="Response recorder">
      {/* Correct - largest */}
      <ResponseButton
        label="Correct"
        shortcut={aideMode ? '1' : undefined}
        icon={<Check className="w-5 h-5" />}
        className="bg-eucalyptus-500 hover:bg-eucalyptus-600 text-white flex-[2]"
        onClick={() => onRecord('correct')}
        disabled={disabled}
      />

      {/* Prompted - medium */}
      <ResponseButton
        label="Prompted"
        shortcut={aideMode ? '2' : undefined}
        icon={<HelpCircle className="w-5 h-5" />}
        className="bg-brand-500 hover:bg-brand-600 text-white flex-[1.5]"
        onClick={() => onRecord('prompted')}
        disabled={disabled}
      />

      {/* Incorrect - smallest */}
      <ResponseButton
        label="Incorrect"
        shortcut={aideMode ? '3' : undefined}
        icon={<X className="w-5 h-5" />}
        className="bg-red-400 hover:bg-red-500 text-white flex-1"
        onClick={() => onRecord('incorrect')}
        disabled={disabled}
      />
    </div>
  );
}

function ResponseButton({
  label,
  shortcut,
  icon,
  className,
  onClick,
  disabled,
}: {
  label: string;
  shortcut?: string;
  icon: React.ReactNode;
  className: string;
  onClick: () => void;
  disabled: boolean;
}) {
  const handleClick = useCallback(() => {
    if (!disabled) onClick();
  }, [disabled, onClick]);

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`
        ${className}
        min-h-[48px] px-4 py-3 rounded-button font-semibold text-adult-base
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors shadow-button
      `}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
    >
      {icon}
      <span>{label}</span>
      {shortcut && (
        <kbd className="ml-1 text-xs opacity-70 bg-white/20 rounded px-1.5 py-0.5">
          {shortcut}
        </kbd>
      )}
    </motion.button>
  );
}
