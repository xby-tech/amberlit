'use client';

import { useState, useCallback } from 'react';
import type { FeedbackContext, WordProblemResult } from '@/types/ai';

interface UseAIReturn {
  feedback: string | null;
  feedbackLoading: boolean;
  fetchFeedback: (context: FeedbackContext) => Promise<string | null>;
  fetchWordProblem: (params: { yearLevel: string; operation: string; numberRange: [number, number] }) => Promise<WordProblemResult | null>;
  fetchDecodableText: (params: { yearLevel: string; masteredPatterns: string[]; targetPattern: string; knownTrickyWords: string[]; sentenceCount: number }) => Promise<string | null>;
}

export function useAI(): UseAIReturn {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const fetchFeedback = useCallback(async (context: FeedbackContext): Promise<string | null> => {
    setFeedbackLoading(true);
    try {
      const res = await fetch('/api/ai/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(context),
      });
      if (!res.ok) return null;
      const data = await res.json();
      setFeedback(data.feedback);
      return data.feedback;
    } catch {
      return null;
    } finally {
      setFeedbackLoading(false);
    }
  }, []);

  const fetchWordProblem = useCallback(async (params: { yearLevel: string; operation: string; numberRange: [number, number] }): Promise<WordProblemResult | null> => {
    try {
      const res = await fetch('/api/ai/word-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }, []);

  const fetchDecodableText = useCallback(async (params: { yearLevel: string; masteredPatterns: string[]; targetPattern: string; knownTrickyWords: string[]; sentenceCount: number }): Promise<string | null> => {
    try {
      const res = await fetch('/api/ai/decodable-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.passage;
    } catch {
      return null;
    }
  }, []);

  return { feedback, feedbackLoading, fetchFeedback, fetchWordProblem, fetchDecodableText };
}
