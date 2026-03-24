'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ScienceExploreContent } from '@/types/curriculum';

interface ObservationLogProps {
  content: ScienceExploreContent;
  onComplete: () => void;
}

export default function ObservationLog({ content, onComplete }: ObservationLogProps) {
  const [observations, setObservations] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);

  const currentPrompt = content.observationPrompts[promptIndex];
  const isLastPrompt = promptIndex >= content.observationPrompts.length - 1;

  const handleAdd = () => {
    if (!currentInput.trim()) return;
    setObservations((prev) => [...prev, currentInput.trim()]);
    setCurrentInput('');

    if (isLastPrompt) {
      setTimeout(onComplete, 500);
    } else {
      setPromptIndex((i) => i + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-8 max-w-lg mx-auto">
      <h3 className="text-xl font-bold text-gray-800">{content.topic}</h3>

      <div className="flex gap-2">
        {content.observationPrompts.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i < promptIndex ? 'bg-green-400' : i === promptIndex ? 'bg-green-600' : 'bg-gray-200'}`} />
        ))}
      </div>

      <motion.div
        key={promptIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 border border-green-200 rounded-xl px-6 py-4 w-full text-center"
      >
        <p className="text-lg text-green-800">{currentPrompt}</p>
      </motion.div>

      <textarea
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        placeholder="Type what you observe..."
        className="w-full h-24 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 resize-none focus:border-green-400 focus:outline-none"
      />

      <button
        onClick={handleAdd}
        disabled={!currentInput.trim()}
        className="bg-green-600 text-white px-6 py-2 rounded-xl font-semibold disabled:opacity-50 hover:bg-green-700 transition-colors"
      >
        {isLastPrompt ? 'Finish' : 'Next observation'}
      </button>

      {observations.length > 0 && (
        <div className="w-full space-y-2">
          <p className="text-sm text-gray-500 font-medium">Your observations:</p>
          {observations.map((obs, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
              {obs}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
