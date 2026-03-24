// AmberLit: AI Safety Guardrails
// Content filtering, rate limiting, and fallback handling for all AI calls.

import { DEFAULT_SAFETY_CONFIG, type AISafetyConfig } from '@/types/ai';

const config: AISafetyConfig = DEFAULT_SAFETY_CONFIG;

// ─── Content Filtering ───────────────────────────────────────────────────────

const BLOCKED_PATTERNS = config.blockedTopics.map(
  (topic) => new RegExp(`\\b${topic}\\b`, 'i'),
);

export function containsBlockedContent(text: string): boolean {
  return BLOCKED_PATTERNS.some((pattern) => pattern.test(text));
}

// ─── Rate Limiting (in-memory per session) ───────────────────────────────────

const sessionCalls = new Map<string, { count: number; windowStart: number }>();

export function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const entry = sessionCalls.get(sessionId);

  if (!entry || now - entry.windowStart > 60000) {
    sessionCalls.set(sessionId, { count: 1, windowStart: now });
    return true;
  }

  if (entry.count >= config.maxAICallsPerMinute) {
    return false;
  }

  entry.count++;
  return true;
}

export function resetRateLimit(sessionId: string): void {
  sessionCalls.delete(sessionId);
}

// ─── Safe AI Call Wrapper ────────────────────────────────────────────────────

/**
 * Wraps an AI call with safety checks: rate limiting, content filtering, fallback.
 */
export async function safeAICall<T>(
  fn: () => Promise<T>,
  fallback: T,
  context: string,
  sessionId?: string,
): Promise<{ result: T; filtered: boolean; error: boolean }> {
  // Rate limit check
  if (sessionId && !checkRateLimit(sessionId)) {
    console.warn(`Rate limit exceeded for session ${sessionId}: ${context}`);
    return { result: fallback, filtered: false, error: false };
  }

  try {
    const result = await fn();

    // Post-generation content check for string results
    if (typeof result === 'string' && containsBlockedContent(result)) {
      console.warn(`AI output filtered for: ${context}`);
      return { result: fallback, filtered: true, error: false };
    }

    return { result, filtered: false, error: false };
  } catch (error) {
    console.error(`AI call failed for ${context}:`, error);
    return { result: fallback, filtered: false, error: true };
  }
}

// ─── Max Tokens by Function ──────────────────────────────────────────────────

export function getMaxTokens(fnType: 'feedback' | 'decodableText' | 'insight' | 'wordProblem' | 'conversation'): number {
  switch (fnType) {
    case 'feedback': return config.maxTokensStudentFeedback;
    case 'decodableText': return config.maxTokensDecodableText;
    case 'insight': return config.maxTokensInsight;
    case 'wordProblem': return config.maxTokensWordProblem;
    case 'conversation': return 200;
  }
}
