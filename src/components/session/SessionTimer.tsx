'use client';

import { useEffect, useRef, useState } from 'react';

interface SessionTimerProps {
  targetMinutes: number;
  isPaused: boolean;
  onTick?: (elapsedSeconds: number) => void;
}

export default function SessionTimer({ targetMinutes, isPaused, onTick }: SessionTimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        onTick?.(next);
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, onTick]);

  const targetSeconds = targetMinutes * 60;
  const remaining = Math.max(0, targetSeconds - elapsed);
  const isOvertime = elapsed > targetSeconds;
  const progressPercent = Math.min(100, (elapsed / targetSeconds) * 100);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="flex items-center gap-3">
      {/* Progress bar */}
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isOvertime ? 'bg-red-400' : progressPercent > 80 ? 'bg-amber-400' : 'bg-green-400'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Time display */}
      <span
        className={`font-mono text-sm font-medium tabular-nums ${
          isOvertime ? 'text-red-600' : remaining < 120 ? 'text-amber-600' : 'text-gray-600'
        }`}
      >
        {isOvertime ? `+${Math.floor((elapsed - targetSeconds) / 60)}:${((elapsed - targetSeconds) % 60).toString().padStart(2, '0')}` : display}
      </span>

      {isPaused && (
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Paused</span>
      )}
    </div>
  );
}
