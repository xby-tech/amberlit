// AmberLit: Mock AI Provider
// Returns pre-generated responses for testing and offline use.

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

const PRAISE_PHRASES = [
  'Brilliant work!',
  'You got it!',
  'Well done!',
  'Fantastic!',
  'Great job!',
  'That\'s right!',
  'You\'re a star!',
  'Super effort!',
];

const ENCOURAGEMENT_PHRASES = [
  'Good try! Have another go.',
  'Nearly there! Try sounding it out.',
  'You\'re getting closer! Think about the sounds.',
  'Nice effort! Let\'s try that one again.',
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export class MockProvider implements AIProvider {
  async generateFeedback(context: FeedbackContext): Promise<string> {
    if (context.actualResult === 'correct') {
      const praise = randomFrom(PRAISE_PHRASES);
      return `${praise} You knew that ${context.stimulus} straight away, ${context.studentName}!`;
    }

    if (context.actualResult === 'prompted') {
      return `Good try, ${context.studentName}! You got there with a little help. Let's practise that one again soon.`;
    }

    const encourage = randomFrom(ENCOURAGEMENT_PHRASES);
    return `${encourage} The answer was "${context.expectedResponse}". You'll get it next time, ${context.studentName}!`;
  }

  async generateDecodableText(params: DecodableTextParams): Promise<string> {
    const target = params.targetPattern;
    if (params.yearLevel === 'F') {
      return `Sam sat on a mat. The *${target}* is big. A cat ran to the mat. Sam and the cat sat. It was fun.`;
    }
    return `The *${target}* was in the rain. We could see it from the boat. The *${target}* made us happy. We went to play.`;
  }

  async generateWordProblem(params: WordProblemParams): Promise<WordProblemResult> {
    const [min, max] = params.numberRange;
    const a = Math.floor(Math.random() * (max - min) + min);
    const b = Math.floor(Math.random() * (max - min) + min);

    switch (params.operation) {
      case 'addition':
        return {
          problem: `Mia has ${a} apples. Her mum gives her ${b} more. How many apples does Mia have now?`,
          answer: a + b,
          working: `${a} + ${b} = ${a + b}`,
        };
      case 'subtraction': {
        const big = Math.max(a, b);
        const small = Math.min(a, b);
        return {
          problem: `Jack has ${big} stickers. He gives ${small} to his friend. How many stickers does Jack have left?`,
          answer: big - small,
          working: `${big} - ${small} = ${big - small}`,
        };
      }
      case 'multiplication':
        return {
          problem: `There are ${a} bags with ${b} oranges in each bag. How many oranges are there altogether?`,
          answer: a * b,
          working: `${a} × ${b} = ${a * b}`,
        };
    }
  }

  async generateInsight(studentData: StudentAnalysis): Promise<AIInsight> {
    const recentAccuracy = studentData.recentSessions.length > 0
      ? studentData.recentSessions.reduce((sum, s) => sum + (s.correctResponses / Math.max(1, s.totalResponses)), 0) / studentData.recentSessions.length
      : 0;

    if (recentAccuracy >= 0.8) {
      return {
        insightType: 'praise',
        title: `${studentData.studentName} is doing well!`,
        body: `${studentData.studentName} has maintained strong accuracy across recent sessions. They may be ready to progress to the next set of skills.`,
        domain: null,
        priority: 0,
      };
    }

    return {
      insightType: 'suggestion',
      title: `Extra practice needed for ${studentData.studentName}`,
      body: `${studentData.studentName}'s recent accuracy is below 80%. Consider revisiting foundational concepts and providing additional practice opportunities.`,
      domain: null,
      priority: 1,
    };
  }

  async conversationTurn(history: ConversationMessage[], context: LessonContext): Promise<string> {
    if (history.length === 0) {
      return `Great reading, ${context.studentName}! Let's talk about what you just read. What happened in the story?`;
    }

    if (history.length >= 6) {
      return `Wonderful thinking, ${context.studentName}! You understood the story really well. Great work today!`;
    }

    return `That's interesting! Can you tell me more about that? What else did you notice?`;
  }
}
