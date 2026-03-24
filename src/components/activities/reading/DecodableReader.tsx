'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { DecodableReadingContent } from '@/types/curriculum';

interface DecodableReaderProps {
  content: DecodableReadingContent;
  /** AI-generated text (or fallback) */
  passage?: string;
  onComplete: () => void;
}

export default function DecodableReader({ content, passage, onComplete }: DecodableReaderProps) {
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const text = passage ?? content.fallbackText ?? 'No passage available.';

  // Split text and highlight target words (marked with *asterisks*)
  const parts = parsePassage(text);

  return (
    <div className="flex flex-col items-center gap-6 py-8 max-w-lg mx-auto">
      <p className="text-lg text-gray-600 font-medium">Read this passage together:</p>

      {/* Reading passage */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-amber-200 rounded-2xl p-8 w-full leading-loose"
      >
        {parts.map((part, i) => (
          <span
            key={i}
            className={`text-2xl font-serif ${
              part.isTarget
                ? 'text-amber-700 font-bold bg-amber-100 rounded px-1 cursor-pointer hover:bg-amber-200'
                : 'text-gray-800'
            }`}
            onClick={() => part.isTarget && setHighlightIndex(i)}
          >
            {part.text}
          </span>
        ))}
      </motion.div>

      {/* Target patterns being practiced */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-500">Patterns in this passage:</span>
        {content.masteredPatterns.slice(0, 5).map((pattern) => (
          <span
            key={pattern}
            className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-sm font-medium"
          >
            {pattern}
          </span>
        ))}
      </div>

      {/* Continue */}
      <button
        type="button"
        onClick={onComplete}
        className="bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-amber-700 transition-colors"
      >
        Done reading
      </button>
    </div>
  );
}

// ─── Text parsing ────────────────────────────────────────────────────────────

interface TextPart {
  text: string;
  isTarget: boolean;
}

function parsePassage(text: string): TextPart[] {
  const parts: TextPart[] = [];
  const regex = /\*(\w+)\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Text before the match
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), isTarget: false });
    }
    // The target word (without asterisks)
    parts.push({ text: match[1], isTarget: true });
    lastIndex = regex.lastIndex;
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isTarget: false });
  }

  return parts;
}
