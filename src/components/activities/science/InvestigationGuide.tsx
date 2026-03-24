'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ScienceInvestigateContent } from '@/types/curriculum';

interface InvestigationGuideProps {
  content: ScienceInvestigateContent;
  onComplete: () => void;
}

export default function InvestigationGuide({ content, onComplete }: InvestigationGuideProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [notes, setNotes] = useState<string[]>(Array(content.steps.length).fill(''));
  const isLast = stepIndex >= content.steps.length - 1;

  return (
    <div className="flex flex-col items-center gap-6 py-8 max-w-lg mx-auto">
      <h3 className="text-xl font-bold text-gray-800">Investigation</h3>
      <p className="text-lg text-green-700 font-medium text-center">{content.question}</p>

      <div className="flex gap-2">
        {content.steps.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i <= stepIndex ? 'bg-green-500' : 'bg-gray-200'}`} />
        ))}
      </div>

      <motion.div
        key={stepIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white border-2 border-green-200 rounded-xl p-6 w-full"
      >
        <p className="font-semibold text-green-800 mb-2">Step {stepIndex + 1}</p>
        <p className="text-gray-700">{content.steps[stepIndex]}</p>

        {content.recordingPrompts[stepIndex] && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-1">{content.recordingPrompts[stepIndex]}</p>
            <textarea
              value={notes[stepIndex]}
              onChange={(e) => {
                const newNotes = [...notes];
                newNotes[stepIndex] = e.target.value;
                setNotes(newNotes);
              }}
              className="w-full h-20 border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:border-green-400 focus:outline-none"
              placeholder="Write your findings..."
            />
          </div>
        )}
      </motion.div>

      <div className="flex gap-3">
        {stepIndex > 0 && (
          <button onClick={() => setStepIndex((i) => i - 1)} className="text-gray-500 hover:text-gray-700 px-4 py-2">Back</button>
        )}
        <button
          onClick={() => isLast ? onComplete() : setStepIndex((i) => i + 1)}
          className="bg-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          {isLast ? 'Done!' : 'Next step'}
        </button>
      </div>
    </div>
  );
}
