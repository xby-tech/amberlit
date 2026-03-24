// AmberLit: Master Curriculum Map
// Links phonics sequences, maths sequences, and curriculum nodes together.
// Provides the lookup layer used by the lesson assembler.

import type { CurriculumNode, Domain, Activity, ActivityType, AssessmentCriteria } from '@/types/curriculum';
import type { YearLevel } from '@/lib/supabase/types';
import { PHONICS_SEQUENCE, getGraphemesUpTo } from './literacy/phonics-sequence';
import { WORD_LISTS } from './literacy/word-lists';
import { TRICKY_WORDS } from './literacy/tricky-words';
import { MATHS_SEQUENCE } from './maths/maths-sequence';
import { ADDITION_FACTS, SUBTRACTION_FACTS } from './maths/fact-sets';
import { SCIENCE_SEQUENCE } from './science/science-sequence';
import { DIGITAL_SEQUENCE } from './digital/digital-sequence';

// ─── Default assessment criteria ─────────────────────────────────────────────

const DEFAULT_PHONICS_CRITERIA: AssessmentCriteria = {
  minimumAttempts: 5,
  accuracyThreshold: 0.8,
  consistencyWindow: 3,
};

const DEFAULT_MATHS_CRITERIA: AssessmentCriteria = {
  minimumAttempts: 5,
  accuracyThreshold: 0.8,
  consistencyWindow: 3,
  speedThreshold: 5000, // 5 seconds for automaticity
};

// ─── Build Phonics Curriculum Nodes ──────────────────────────────────────────

function buildPhonicsNodes(): CurriculumNode[] {
  return PHONICS_SEQUENCE.map((unit, index) => {
    const yearLevel = unit.id.startsWith('F') ? 'F' : unit.id.startsWith('1') ? '1' : '2';
    const prevId = index > 0 ? PHONICS_SEQUENCE[index - 1].id : undefined;
    const isBlendUnit = !!unit.blends;

    const title = isBlendUnit
      ? `${unit.blends === 'initial' ? 'Initial' : 'Final'} blends: ${unit.patterns?.join(', ')}`
      : `Letter ${unit.grapheme} — ${unit.phoneme}`;

    const description = isBlendUnit
      ? `Practice ${unit.blends} consonant blends: ${unit.patterns?.join(', ')}`
      : `Learn the sound ${unit.phoneme} for the letter(s) "${unit.grapheme}"`;

    const activities: Activity[] = [];

    if (!isBlendUnit && unit.grapheme && unit.phoneme) {
      // Sound introduction
      activities.push({
        id: `${unit.id}.intro`,
        type: 'sound_introduction',
        title: `Meet the sound ${unit.phoneme}`,
        instructions: {
          parent: `Show your child the letter "${unit.grapheme}" and say the sound "${unit.phoneme}". Point to the picture clues.`,
          aide: `Introduce the grapheme "${unit.grapheme}" representing ${unit.phoneme}. Model the sound clearly, have students repeat. Use keywords: ${unit.keywords?.join(', ')}.`,
        },
        content: {
          type: 'sound_introduction',
          grapheme: unit.grapheme,
          phoneme: unit.phoneme,
          keywords: unit.keywords ?? [],
          audioPath: `/audio/phonemes/${unit.grapheme}.mp3`,
        },
        aiEnhanced: false,
      });

      // Sound practice (flashcard review)
      const reviewGraphemes = getGraphemesUpTo(unit.id).slice(-6); // last 6 learned
      activities.push({
        id: `${unit.id}.practice`,
        type: 'sound_practice',
        title: `Practice sounds`,
        instructions: {
          parent: `Flash each letter and ask your child to say the sound. Tap correct or incorrect.`,
          aide: `Rapid sound drill. Show each grapheme, students say the sound. Note any hesitation.`,
        },
        content: {
          type: 'sound_practice',
          graphemes: reviewGraphemes,
          includeReview: true,
        },
        aiEnhanced: false,
      });
    }

    // Word building (if enough graphemes known)
    if (index >= 5) {
      const rangeKey = findBestWordListKey(unit.id);
      const words = rangeKey ? WORD_LISTS[rangeKey] ?? [] : [];
      if (words.length > 0) {
        const selectedWords = words.slice(0, 6);
        const allLetters = [...new Set(selectedWords.join('').split(''))];
        activities.push({
          id: `${unit.id}.wordbuilding`,
          type: 'word_building',
          title: `Build words`,
          instructions: {
            parent: `Help your child drag the letters to spell each word. Say the sounds together.`,
            aide: `Word building activity. Students segment and blend to spell words using known graphemes.`,
          },
          content: {
            type: 'word_building',
            words: selectedWords,
            availableLetters: [...allLetters, 'x', 'z'].slice(0, 12), // add distractors
          },
          aiEnhanced: false,
        });
      }
    }

    return {
      id: unit.id,
      yearLevel: yearLevel as YearLevel,
      domain: 'literacy',
      strand: 'phonics',
      title,
      description,
      prerequisites: prevId ? [prevId] : [],
      masteryThreshold: 0.8,
      estimatedMinutes: 5,
      activities,
      assessmentCriteria: DEFAULT_PHONICS_CRITERIA,
    };
  });
}

// ─── Build Maths Curriculum Nodes ────────────────────────────────────────────

function buildMathsNodes(): CurriculumNode[] {
  return MATHS_SEQUENCE.map((unit, index) => {
    const yearLevel = unit.id.startsWith('F') ? 'F' : unit.id.startsWith('1') ? '1' : '2';
    const sameYearUnits = MATHS_SEQUENCE.filter((u) => u.id.startsWith(yearLevel === 'F' ? 'F.' : `${yearLevel}.`));
    const unitIndex = sameYearUnits.indexOf(unit);
    const prevId = unitIndex > 0 ? sameYearUnits[unitIndex - 1].id : undefined;

    const activities: Activity[] = [];

    // Concept explorer for all maths units
    activities.push({
      id: `${unit.id}.concept`,
      type: 'maths_concept',
      title: unit.title,
      instructions: {
        parent: `Work through this concept with your child. Use the visual aids on screen.`,
        aide: `Teach ${unit.title}. Use concrete materials alongside the digital visual. Skills: ${unit.skills.join(', ')}.`,
      },
      content: {
        type: 'maths_concept',
        conceptId: unit.id,
        visual: unit.strand === 'number' ? 'ten_frame' : unit.strand === 'space' ? 'shapes' : 'counters',
        steps: unit.skills.map((s) => s.replace(/_/g, ' ')),
      },
      aiEnhanced: false,
    });

    // Fact fluency for number strand
    if (unit.strand === 'number' && unit.skills.some((s) => s.includes('addition') || s.includes('subtraction') || s.includes('multiply'))) {
      const operation = unit.skills.some((s) => s.includes('multiply')) ? 'multiplication' as const
        : unit.skills.some((s) => s.includes('subtraction')) ? 'subtraction' as const
        : 'addition' as const;

      const level = unit.skills.some((s) => s.includes('to_5') || s.includes('within_5')) ? 'within_5'
        : unit.skills.some((s) => s.includes('to_10') || s.includes('within_10')) ? 'within_10'
        : 'within_20';

      const factsSource = operation === 'addition' ? ADDITION_FACTS
        : operation === 'subtraction' ? SUBTRACTION_FACTS
        : ADDITION_FACTS; // multiplication uses its own but fallback to addition

      const facts = factsSource[level] ?? factsSource['within_10'] ?? [];

      activities.push({
        id: `${unit.id}.fluency`,
        type: 'maths_fluency',
        title: `${operation.charAt(0).toUpperCase() + operation.slice(1)} practice`,
        instructions: {
          parent: `Your child will answer quick ${operation} questions. Encourage fast, accurate answers.`,
          aide: `Timed ${operation} drill at ${level} level. Note automaticity and any facts needing extra practice.`,
        },
        content: {
          type: 'maths_fluency',
          operation,
          facts: facts.slice(0, 10),
          targetSeconds: 5,
        },
        aiEnhanced: false,
      });
    }

    // AI word problem for number strand
    if (unit.strand === 'number') {
      const operation = unit.skills.some((s) => s.includes('multiply')) ? 'multiplication' as const
        : unit.skills.some((s) => s.includes('subtraction')) ? 'subtraction' as const
        : 'addition' as const;

      const maxNum = unit.skills.some((s) => s.includes('to_5') || s.includes('within_5')) ? 5
        : unit.skills.some((s) => s.includes('to_10') || s.includes('within_10')) ? 10
        : unit.skills.some((s) => s.includes('to_20') || s.includes('within_20')) ? 20
        : 100;

      activities.push({
        id: `${unit.id}.wordproblem`,
        type: 'maths_word_problem',
        title: `Word problem`,
        instructions: {
          parent: `Read the problem with your child and help them work out the answer.`,
          aide: `AI-generated word problem. Guide the student to identify the operation and solve step by step.`,
        },
        content: {
          type: 'maths_word_problem',
          operation,
          numberRange: [1, maxNum],
          fallbackProblem: {
            problem: `Sam has ${Math.floor(maxNum / 2)} apples. Mum gives him ${Math.floor(maxNum / 4)} more. How many does Sam have now?`,
            answer: Math.floor(maxNum / 2) + Math.floor(maxNum / 4),
            working: `${Math.floor(maxNum / 2)} + ${Math.floor(maxNum / 4)} = ${Math.floor(maxNum / 2) + Math.floor(maxNum / 4)}`,
          },
        },
        aiEnhanced: true,
      });
    }

    return {
      id: unit.id,
      yearLevel: yearLevel as YearLevel,
      domain: 'maths',
      strand: unit.strand,
      title: unit.title,
      description: `${unit.title} (${unit.acDescriptor})`,
      acContentDescriptor: unit.acDescriptor,
      prerequisites: prevId ? [prevId] : [],
      masteryThreshold: 0.8,
      estimatedMinutes: unit.strand === 'number' ? 8 : 5,
      activities,
      assessmentCriteria: DEFAULT_MATHS_CRITERIA,
    };
  });
}

// ─── Build Science Curriculum Nodes ───────────────────────────────────────────

const DEFAULT_SCIENCE_CRITERIA: AssessmentCriteria = {
  minimumAttempts: 3,
  accuracyThreshold: 0.7,
  consistencyWindow: 2,
};

function buildScienceNodes(): CurriculumNode[] {
  return SCIENCE_SEQUENCE.map((unit, index) => {
    const yearLevel = unit.id.startsWith('F') ? 'F' : unit.id.startsWith('1') ? '1' : '2';
    const sameYearUnits = SCIENCE_SEQUENCE.filter((u) => u.id.startsWith(yearLevel === 'F' ? 'F.' : `${yearLevel}.`));
    const unitIndex = sameYearUnits.indexOf(unit);
    const prevId = unitIndex > 0 ? sameYearUnits[unitIndex - 1].id : undefined;

    const activities: Activity[] = [];

    // Observation activity
    activities.push({
      id: `${unit.id}.observe`,
      type: 'science_explore',
      title: `Explore: ${unit.title}`,
      instructions: {
        parent: `Help your child observe and describe what they see. Use the prompts to guide discussion.`,
        aide: `Guided observation activity for ${unit.title}. Use prompts to scaffold student thinking. Record observations.`,
      },
      content: {
        type: 'science_explore',
        topic: unit.title,
        observationPrompts: unit.observationPrompts,
      },
      aiEnhanced: false,
    });

    // Investigation activity
    activities.push({
      id: `${unit.id}.investigate`,
      type: 'science_investigate',
      title: `Investigate: ${unit.title}`,
      instructions: {
        parent: `Follow the steps with your child to investigate ${unit.title.toLowerCase()}.`,
        aide: `Guided investigation. Students follow steps, record findings, and discuss results.`,
      },
      content: {
        type: 'science_investigate',
        question: unit.investigationQuestions[0],
        steps: unit.investigationSteps,
        recordingPrompts: unit.recordingPrompts,
      },
      aiEnhanced: false,
    });

    return {
      id: unit.id,
      yearLevel: yearLevel as YearLevel,
      domain: 'science',
      strand: unit.strand,
      title: unit.title,
      description: `${unit.title} (${unit.acDescriptor})`,
      acContentDescriptor: unit.acDescriptor,
      prerequisites: prevId ? [prevId] : [],
      masteryThreshold: 0.7,
      estimatedMinutes: 10,
      activities,
      assessmentCriteria: DEFAULT_SCIENCE_CRITERIA,
    };
  });
}

// ─── Build Digital Technologies Curriculum Nodes ─────────────────────────────

const DEFAULT_DIGITAL_CRITERIA: AssessmentCriteria = {
  minimumAttempts: 3,
  accuracyThreshold: 0.7,
  consistencyWindow: 2,
};

function buildDigitalNodes(): CurriculumNode[] {
  return DIGITAL_SEQUENCE.map((unit, index) => {
    const yearLevel = unit.id.startsWith('F') ? 'F' : unit.id.startsWith('1') ? '1' : '2';
    const sameYearUnits = DIGITAL_SEQUENCE.filter((u) => u.id.startsWith(yearLevel === 'F' ? 'F.' : `${yearLevel}.`));
    const unitIndex = sameYearUnits.indexOf(unit);
    const prevId = unitIndex > 0 ? sameYearUnits[unitIndex - 1].id : undefined;

    const activities: Activity[] = [];

    // Algorithm builder activity
    activities.push({
      id: `${unit.id}.algorithm`,
      type: 'digital_activity',
      title: unit.title,
      instructions: {
        parent: `Work through the steps with your child. Help them understand the order matters.`,
        aide: `Algorithm activity: ${unit.title}. Guide students through step-by-step instructions. Discuss sequencing.`,
      },
      content: {
        type: 'digital_activity',
        activityId: unit.id,
        instructions: unit.instructions,
      },
      aiEnhanced: false,
    });

    // Pattern finding activity (if patterns available)
    if (unit.patterns.length > 0) {
      activities.push({
        id: `${unit.id}.patterns`,
        type: 'digital_activity',
        title: `Patterns: ${unit.title}`,
        instructions: {
          parent: `Help your child find the pattern and predict what comes next.`,
          aide: `Pattern recognition activity. Students identify repeating patterns and predict the next element.`,
        },
        content: {
          type: 'digital_activity',
          activityId: `${unit.id}.patterns`,
          instructions: unit.patterns.map((p, i) => `Pattern ${i + 1}: ${p.sequence.join(' ')} → ?`),
        },
        aiEnhanced: false,
      });
    }

    return {
      id: unit.id,
      yearLevel: yearLevel as YearLevel,
      domain: 'digital',
      strand: unit.strand,
      title: unit.title,
      description: `${unit.title} (${unit.acDescriptor})`,
      acContentDescriptor: unit.acDescriptor,
      prerequisites: prevId ? [prevId] : [],
      masteryThreshold: 0.7,
      estimatedMinutes: 8,
      activities,
      assessmentCriteria: DEFAULT_DIGITAL_CRITERIA,
    };
  });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function findBestWordListKey(unitId: string): string | undefined {
  // Find the word list range that contains this unit
  const keys = Object.keys(WORD_LISTS);
  // Try exact match first
  const exact = keys.find((k) => k === unitId);
  if (exact) return exact;
  // Try range match
  return keys.find((k) => {
    const parts = k.split('-');
    if (parts.length === 1) return k === unitId;
    // e.g. 'F.phonics.01-06' — check if unitId falls in range
    return unitId >= parts[0] && unitId <= parts[1];
  });
}

// ─── Exported Curriculum Map ─────────────────────────────────────────────────

let _allNodes: CurriculumNode[] | null = null;

/** Get all curriculum nodes (cached after first call) */
export function getAllCurriculumNodes(): CurriculumNode[] {
  if (!_allNodes) {
    _allNodes = [...buildPhonicsNodes(), ...buildMathsNodes(), ...buildScienceNodes(), ...buildDigitalNodes()];
  }
  return _allNodes;
}

/** Get curriculum nodes for a specific year level */
export function getNodesForYear(yearLevel: YearLevel): CurriculumNode[] {
  return getAllCurriculumNodes().filter((n) => n.yearLevel === yearLevel);
}

/** Get curriculum nodes for a specific domain */
export function getNodesForDomain(yearLevel: YearLevel, domain: Domain): CurriculumNode[] {
  return getNodesForYear(yearLevel).filter((n) => n.domain === domain);
}

/** Get a single curriculum node by ID */
export function getNodeById(nodeId: string): CurriculumNode | undefined {
  return getAllCurriculumNodes().find((n) => n.id === nodeId);
}

/** Get the next node in sequence after a given node */
export function getNextNode(nodeId: string): CurriculumNode | undefined {
  const all = getAllCurriculumNodes();
  const index = all.findIndex((n) => n.id === nodeId);
  return index >= 0 && index < all.length - 1 ? all[index + 1] : undefined;
}
