'use client';

type RingSize = 'sm' | 'md' | 'lg';

interface ProgressRingProps {
  /** Progress value 0–1 */
  value: number;
  size?: RingSize;
  label?: string;
}

const SIZE_MAP: Record<RingSize, { svgSize: number; strokeWidth: number; textClass: string }> = {
  sm: { svgSize: 32, strokeWidth: 3, textClass: 'text-[9px]' },
  md: { svgSize: 48, strokeWidth: 4, textClass: 'text-adult-xs' },
  lg: { svgSize: 80, strokeWidth: 5, textClass: 'text-adult-base' },
};

function getColor(value: number): string {
  if (value >= 1.0) return 'var(--eucalyptus-500)';
  if (value >= 0.8) return 'var(--brand-600)';
  if (value >= 0.4) return 'var(--brand-400)';
  return '#a8a29e'; // stone-400
}

export default function ProgressRing({ value, size = 'md', label }: ProgressRingProps) {
  const clamped = Math.min(1, Math.max(0, value));
  const { svgSize, strokeWidth, textClass } = SIZE_MAP[size];
  const radius = (svgSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - clamped * circumference;
  const color = getColor(clamped);
  const percentage = Math.round(clamped * 100);
  const showCheck = clamped >= 1.0;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? `${percentage}% progress`}
    >
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="transform -rotate-90"
      >
        {/* Background track */}
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke="#e7e5e4"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>

      {/* Center content */}
      <span className={`absolute ${textClass} font-bold`} style={{ color }}>
        {showCheck ? (
          <svg
            width={svgSize * 0.35}
            height={svgSize * 0.35}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          `${percentage}%`
        )}
      </span>
    </div>
  );
}
