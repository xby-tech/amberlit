'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { MathsConceptContent } from '@/types/curriculum';

interface ConceptExplorerProps {
  content: MathsConceptContent;
  title: string;
  onComplete: () => void;
}

export default function ConceptExplorer({ content, title, onComplete }: ConceptExplorerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const isLast = stepIndex >= content.steps.length - 1;

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

      {/* Visual representation */}
      <div className="bg-white border-2 border-blue-200 rounded-2xl p-8 min-w-[300px] min-h-[200px] flex items-center justify-center">
        <VisualDisplay visual={content.visual} step={stepIndex} />
      </div>

      {/* Step instruction */}
      <motion.div
        key={stepIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-4 max-w-md text-center"
      >
        <p className="text-lg text-gray-700">
          <span className="font-semibold text-blue-700">Step {stepIndex + 1}:</span>{' '}
          {content.steps[stepIndex]}
        </p>
      </motion.div>

      {/* Step progress */}
      <div className="flex gap-2">
        {content.steps.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i <= stepIndex ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {stepIndex > 0 && (
          <button
            type="button"
            onClick={() => setStepIndex((i) => i - 1)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            if (isLast) {
              onComplete();
            } else {
              setStepIndex((i) => i + 1);
            }
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          {isLast ? 'Done!' : 'Next'}
        </button>
      </div>
    </div>
  );
}

// Simple visual representations
function VisualDisplay({ visual, step }: { visual: string; step: number }) {
  switch (visual) {
    case 'ten_frame':
      return <TenFrame filled={Math.min(10, (step + 1) * 3)} />;
    case 'counters':
      return <Counters count={Math.min(10, (step + 1) * 2)} />;
    case 'number_line':
      return <NumberLine max={20} highlight={(step + 1) * 3} />;
    case 'shapes':
      return <ShapeDisplay step={step} />;
    default:
      return <Counters count={(step + 1) * 2} />;
  }
}

function TenFrame({ filled }: { filled: number }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={i}
          initial={i < filled ? { scale: 0 } : undefined}
          animate={i < filled ? { scale: 1 } : undefined}
          transition={{ delay: i * 0.05 }}
          className={`w-10 h-10 rounded-full border-2 ${
            i < filled ? 'bg-blue-400 border-blue-500' : 'bg-gray-100 border-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

function Counters({ count }: { count: number }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center max-w-[250px]">
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.08, type: 'spring' }}
          className="w-10 h-10 rounded-full bg-amber-400 border-2 border-amber-500"
        />
      ))}
    </div>
  );
}

function NumberLine({ max, highlight }: { max: number; highlight: number }) {
  const ticks = Array.from({ length: max + 1 }, (_, i) => i);
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="relative w-full h-8 flex items-center">
        <div className="absolute w-full h-1 bg-gray-300 rounded" />
        {ticks.filter((_, i) => i % 5 === 0 || i === highlight).map((tick) => (
          <div
            key={tick}
            className="absolute flex flex-col items-center"
            style={{ left: `${(tick / max) * 100}%`, transform: 'translateX(-50%)' }}
          >
            <div
              className={`w-2 h-4 rounded-full ${
                tick <= highlight ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
            <span className="text-xs text-gray-500 mt-1">{tick}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShapeDisplay({ step }: { step: number }) {
  const shapes = ['circle', 'square', 'triangle', 'rectangle'];
  const shape = shapes[step % shapes.length];
  return (
    <div className="flex items-center justify-center">
      {shape === 'circle' && <div className="w-24 h-24 rounded-full bg-blue-400 border-2 border-blue-500" />}
      {shape === 'square' && <div className="w-24 h-24 bg-green-400 border-2 border-green-500" />}
      {shape === 'triangle' && (
        <div className="w-0 h-0 border-l-[48px] border-r-[48px] border-b-[80px] border-l-transparent border-r-transparent border-b-amber-400" />
      )}
      {shape === 'rectangle' && <div className="w-32 h-20 bg-purple-400 border-2 border-purple-500" />}
    </div>
  );
}
