'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { ComprehensionContent } from '@/types/curriculum';

interface ComprehensionChatProps {
  content: ComprehensionContent;
  studentName: string;
  onComplete: () => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function ComprehensionChat({ content, studentName, onComplete }: ComprehensionChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  const fetchAIResponse = useCallback(async (history: ChatMessage[]) => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history,
          context: {
            studentName,
            yearLevel: 'F',
            activityType: 'comprehension_conversation',
            passage: content.passage,
            questionStarters: content.questionStarters,
          },
        }),
      });
      const data = await res.json();
      return data.response as string;
    } catch {
      return "That's great! Can you tell me more about the story?";
    } finally {
      setLoading(false);
    }
  }, [content, studentName]);

  const handleStart = async () => {
    setStarted(true);
    const response = await fetchAIResponse([]);
    setMessages([{ role: 'assistant', content: response }]);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: input.trim() };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');

    if (newHistory.filter((m) => m.role === 'user').length >= 4) {
      setMessages([...newHistory, { role: 'assistant', content: `Wonderful thinking, ${studentName}! You understood the story really well. Great work today!` }]);
      setTimeout(onComplete, 2000);
      return;
    }

    const response = await fetchAIResponse(newHistory);
    setMessages([...newHistory, { role: 'assistant', content: response }]);
  };

  if (!started) {
    return (
      <div className="flex flex-col items-center gap-6 py-8 max-w-lg mx-auto">
        {content.passage && (
          <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 w-full">
            <p className="text-lg text-gray-800 leading-relaxed font-serif">{content.passage}</p>
          </div>
        )}
        <button onClick={handleStart} className="bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-amber-700">
          Let&apos;s talk about it!
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[400px] max-w-lg mx-auto">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 p-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
              msg.role === 'user'
                ? 'bg-amber-100 text-amber-900'
                : 'bg-gray-100 text-gray-800'
            }`}>
              <p className="text-sm">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-2.5">
              <span className="text-gray-400 animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your answer..."
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
