// AmberLit: Claude AI Provider
// Uses the Vercel AI SDK with Anthropic's Claude API.

import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import type {
  AIProvider,
  FeedbackContext,
  DecodableTextParams,
  WordProblemParams,
  WordProblemResult,
  StudentAnalysis,
  AIInsight,
  ConversationMessage,
  LessonContext,
} from '@/types/ai';
import { SYSTEM_PROMPTS } from './prompts';
import { getMaxTokens } from './safety';

const MODEL = 'claude-haiku-4-5-20251001';

export class ClaudeProvider implements AIProvider {
  async generateFeedback(context: FeedbackContext): Promise<string> {
    const { text } = await generateText({
      model: anthropic(MODEL),
      system: SYSTEM_PROMPTS.studentFeedback,
      prompt: `Student: ${context.studentName} (${context.yearLevel === 'F' ? 'Foundation' : `Year ${context.yearLevel}`})
Activity: ${context.activityType}
Question/stimulus: "${context.stimulus}"
Expected answer: "${context.expectedResponse}"
Result: ${context.actualResult}
Mode: ${context.mode}

Recent history (last ${context.recentHistory.length} responses):
${context.recentHistory.map((r) => `- ${r.stimulus}: ${r.result}`).join('\n')}

Generate brief, encouraging feedback (1-2 sentences).`,
      maxOutputTokens: getMaxTokens('feedback'),
    });

    return text;
  }

  async generateDecodableText(params: DecodableTextParams): Promise<string> {
    const { text } = await generateText({
      model: anthropic(MODEL),
      system: SYSTEM_PROMPTS.decodableTextGenerator,
      prompt: `Year level: ${params.yearLevel === 'F' ? 'Foundation' : `Year ${params.yearLevel}`}
Mastered phonics patterns: ${params.masteredPatterns.join(', ')}
Target pattern being practiced: ${params.targetPattern}
Known tricky words: ${params.knownTrickyWords.join(', ')}
Number of sentences: ${params.sentenceCount}

Generate a decodable passage. Mark target pattern words with asterisks.`,
      maxOutputTokens: getMaxTokens('decodableText'),
    });

    return text;
  }

  async generateWordProblem(params: WordProblemParams): Promise<WordProblemResult> {
    const { text } = await generateText({
      model: anthropic(MODEL),
      system: SYSTEM_PROMPTS.mathsWordProblem,
      prompt: `Operation: ${params.operation}
Number range: ${params.numberRange[0]} to ${params.numberRange[1]}
Multi-step: ${params.multiStep ? 'yes' : 'no'}
Year level: ${params.yearLevel === 'F' ? 'Foundation' : `Year ${params.yearLevel}`}

Generate a word problem as JSON.`,
      maxOutputTokens: getMaxTokens('wordProblem'),
    });

    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch {
      // Parse failed
    }

    // Fallback
    const a = Math.floor(Math.random() * params.numberRange[1]) + params.numberRange[0];
    const b = Math.floor(Math.random() * params.numberRange[1]) + params.numberRange[0];
    return {
      problem: `What is ${a} ${params.operation === 'addition' ? '+' : params.operation === 'subtraction' ? '-' : '×'} ${b}?`,
      answer: params.operation === 'addition' ? a + b : params.operation === 'subtraction' ? a - b : a * b,
      working: `${a} ${params.operation === 'addition' ? '+' : params.operation === 'subtraction' ? '-' : '×'} ${b} = ${params.operation === 'addition' ? a + b : params.operation === 'subtraction' ? a - b : a * b}`,
    };
  }

  async generateInsight(studentData: StudentAnalysis): Promise<AIInsight> {
    const { text } = await generateText({
      model: anthropic(MODEL),
      system: SYSTEM_PROMPTS.aideInsight,
      prompt: `Student: ${studentData.studentName} (${studentData.yearLevel === 'F' ? 'Foundation' : `Year ${studentData.yearLevel}`})

Recent sessions (last ${studentData.recentSessions.length}):
${studentData.recentSessions.map((s) => `- ${s.date}: ${s.correctResponses}/${s.totalResponses} correct (${JSON.stringify(s.strandAccuracy)})`).join('\n')}

Current progress:
${studentData.progressSnapshot.map((p) => `- ${p.curriculumNodeId}: mastery ${(p.masteryLevel * 100).toFixed(0)}%, ${p.attempts} attempts`).join('\n')}

Generate one teaching insight as JSON: { "insightType": "observation"|"suggestion"|"alert"|"praise"|"milestone", "title": "...", "body": "...", "domain": "literacy"|"maths"|null, "priority": 0-3 }`,
      maxOutputTokens: getMaxTokens('insight'),
    });

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch {
      // Parse failed
    }

    return {
      insightType: 'observation',
      title: `Progress update for ${studentData.studentName}`,
      body: 'Continue with current activities and monitor progress.',
      domain: null,
      priority: 0,
    };
  }

  async conversationTurn(history: ConversationMessage[], context: LessonContext): Promise<string> {
    const systemPrompt = `${SYSTEM_PROMPTS.comprehensionConversation}

Context:
- Student: ${context.studentName} (${context.yearLevel === 'F' ? 'Foundation' : `Year ${context.yearLevel}`})
- Passage: "${context.passage ?? 'No passage provided'}"`;

    if (history.length === 0) {
      const { text } = await generateText({
        model: anthropic(MODEL),
        system: systemPrompt,
        prompt: 'Start the comprehension conversation with your first question.',
        maxOutputTokens: getMaxTokens('conversation'),
      });
      return text;
    }

    const { text } = await generateText({
      model: anthropic(MODEL),
      system: systemPrompt,
      messages: history.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      maxOutputTokens: getMaxTokens('conversation'),
    });
    return text;
  }
}
