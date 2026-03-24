'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { OralLanguageContent } from '@/types/curriculum';

interface OralLanguageProps {
  content: OralLanguageContent;
  onComplete: () => void;
}

export default function OralLanguage({ content, onComplete }: OralLanguageProps) {
  const [structureIndex, setStructureIndex] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const isLast = structureIndex >= content.targetStructures.length - 1;

  const handleSubmit = () => {
    if (!currentInput.trim()) return;
    setResponses((prev) => [...prev, currentInput.trim()]);
    setCurrentInput('');
    if (isLast) {
      setTimeout(onComplete, 500);
    } else {
      setStructureIndex((i) => i + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8 max-w-lg mx-auto">
      <h3 className="text-xl font-bold text-gray-800">Let&apos;s Talk!</h3>
      <p className="text-lg text-gray-600 text-center">{content.prompt}</p>

      {/* Model sentences */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 w-full">
        <p className="text-sm text-amber-700 font-medium mb-2">Try saying something like:</p>
        {content.modelSentences.map((sentence, i) => (
          <p key={i} className="text-amber-800 italic text-sm">&quot;{sentence}&quot;</p>
        ))}
      </div>

      {/* Current target structure */}
      <motion.div
        key={structureIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-2 border-amber-300 rounded-xl px-6 py-4 w-full text-center"
      >
        <p className="text-sm text-gray-500 mb-1">Try to use this pattern:</p>
        <p className="text-xl font-medium text-amber-800">{content.targetStructures[structureIndex]}</p>
      </motion.div>

      {/* Input (what the child said, typed by parent/aide) */}
      <div className="w-full">
        <label className="text-sm text-gray-500 mb-1 block">What did they say?</label>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Type what the child said..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:border-amber-400 focus:outline-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!currentInput.trim()}
        className="bg-amber-600 text-white px-6 py-2 rounded-xl font-semibold disabled:opacity-50"
      >
        {isLast ? 'Finish' : 'Next'}
      </button>

      <div className="flex gap-2">
        {content.targetStructures.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i < structureIndex ? 'bg-green-400' : i === structureIndex ? 'bg-amber-500' : 'bg-gray-200'}`} />
        ))}
      </div>
    </div>
  );
}
