// AmberLit: AI Provider Factory
// Returns the configured AI provider based on environment variable.

import type { AIProvider } from '@/types/ai';
import { ClaudeProvider } from './claude';
import { MockProvider } from './mock';

export function getAIProvider(): AIProvider {
  const provider = process.env.AI_PROVIDER ?? 'mock';

  switch (provider) {
    case 'claude':
      return new ClaudeProvider();
    case 'mock':
      return new MockProvider();
    default:
      console.warn(`Unknown AI provider "${provider}", falling back to mock`);
      return new MockProvider();
  }
}
