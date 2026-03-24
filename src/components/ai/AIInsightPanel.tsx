'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Insight {
  id: string;
  type: 'observation' | 'suggestion' | 'alert' | 'praise';
  studentName: string;
  text: string;
  timestamp: string;
}

interface AIInsightPanelProps {
  insights: Insight[];
  onAddNote: (studentId: string, note: string) => void;
  activeStudentId: string;
  activeStudentName: string;
}

const TYPE_COLORS: Record<string, string> = {
  observation: 'border-l-blue-400 bg-blue-50',
  suggestion: 'border-l-amber-400 bg-amber-50',
  alert: 'border-l-red-400 bg-red-50',
  praise: 'border-l-green-400 bg-green-50',
};

export default function AIInsightPanel({ insights, onAddNote, activeStudentId, activeStudentName }: AIInsightPanelProps) {
  const [noteText, setNoteText] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubmitNote = () => {
    if (!noteText.trim()) return;
    onAddNote(activeStudentId, noteText.trim());
    setNoteText('');
  };

  return (
    <div className="bg-white border-l border-gray-200 h-full flex flex-col w-80">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 text-sm">AI Insights</h3>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-600 text-xs"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex-1 overflow-y-auto flex flex-col"
          >
            {/* Insights list */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {insights.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">
                  Insights will appear as the session progresses.
                </p>
              ) : (
                insights.map((insight) => (
                  <div
                    key={insight.id}
                    className={`border-l-4 rounded-r-lg p-3 ${TYPE_COLORS[insight.type] ?? 'border-l-gray-300 bg-gray-50'}`}
                  >
                    <p className="text-xs text-gray-500 mb-1">{insight.studentName}</p>
                    <p className="text-sm text-gray-700">{insight.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Quick note */}
            <div className="p-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Note for {activeStudentName}</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add a note..."
                  className="flex-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:border-blue-400 focus:outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitNote()}
                />
                <button
                  type="button"
                  onClick={handleSubmitNote}
                  disabled={!noteText.trim()}
                  className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
