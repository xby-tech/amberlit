'use client';

import type { Activity } from '@/types/curriculum';
import type { ResponseResult } from '@/lib/supabase/types';
import type { ResponseData } from '@/types/session';
import SoundIntroduction from '@/components/activities/phonics/SoundIntroduction';
import SoundPractice from '@/components/activities/phonics/SoundPractice';
import WordBuilding from '@/components/activities/phonics/WordBuilding';
import TrickyWordFlash from '@/components/activities/phonics/TrickyWordFlash';
import FactFluency from '@/components/activities/maths/FactFluency';
import ConceptExplorer from '@/components/activities/maths/ConceptExplorer';
import WordProblem from '@/components/activities/maths/WordProblem';
import DecodableReader from '@/components/activities/reading/DecodableReader';
import SpellingDictation from '@/components/activities/writing/SpellingDictation';
import SentenceBuilder from '@/components/activities/writing/SentenceBuilder';
import ComprehensionChat from '@/components/activities/reading/ComprehensionChat';
import ObservationLog from '@/components/activities/science/ObservationLog';
import InvestigationGuide from '@/components/activities/science/InvestigationGuide';
import AlgorithmBuilder from '@/components/activities/digital/AlgorithmBuilder';
import PatternFinder from '@/components/activities/digital/PatternFinder';
import OralLanguage from '@/components/activities/phonics/OralLanguage';

interface ActivityRendererProps {
  activity: Activity;
  onResponse: (response: ResponseData) => void;
  onComplete: () => void;
}

export default function ActivityRenderer({ activity, onResponse, onComplete }: ActivityRendererProps) {
  // Extract the curriculum node ID from the activity ID
  const nodeId = activity.id.split('.').slice(0, -1).join('.');

  const makeResponse = (
    stimulus: string,
    expected: string | null,
    actual: string | null,
    result: ResponseResult,
    timeMs?: number,
  ): ResponseData => ({
    activityType: activity.type,
    curriculumNodeId: nodeId,
    stimulus,
    expectedResponse: expected,
    actualResponse: actual,
    result,
    responseTimeMs: timeMs ?? null,
  });

  switch (activity.content.type) {
    case 'sound_introduction':
      return (
        <SoundIntroduction
          content={activity.content}
          onComplete={onComplete}
        />
      );

    case 'sound_practice':
      return (
        <SoundPractice
          content={activity.content}
          onResponse={(grapheme, result) => {
            onResponse(makeResponse(grapheme, grapheme, null, result));
          }}
          onComplete={onComplete}
        />
      );

    case 'word_building':
      return (
        <WordBuilding
          content={activity.content}
          onResponse={(word, result) => {
            onResponse(makeResponse(word, word, null, result));
          }}
          onComplete={onComplete}
        />
      );

    case 'tricky_word_flash':
      return (
        <TrickyWordFlash
          content={activity.content}
          onResponse={(word, result) => {
            onResponse(makeResponse(word, word, null, result));
          }}
          onComplete={onComplete}
        />
      );

    case 'maths_fluency':
      return (
        <FactFluency
          content={activity.content}
          onResponse={(stimulus, answer, result, timeMs) => {
            onResponse(makeResponse(stimulus, answer.toString(), null, result, timeMs));
          }}
          onComplete={onComplete}
        />
      );

    case 'maths_concept':
      return (
        <ConceptExplorer
          content={activity.content}
          title={activity.title}
          onComplete={onComplete}
        />
      );

    case 'maths_word_problem':
      return (
        <WordProblem
          content={activity.content}
          onResponse={(problem, answer, result) => {
            onResponse(makeResponse(problem, answer.toString(), null, result));
          }}
          onComplete={onComplete}
        />
      );

    case 'decodable_reading':
      return (
        <DecodableReader
          content={activity.content}
          onComplete={onComplete}
        />
      );

    case 'spelling_dictation':
      return (
        <SpellingDictation
          content={activity.content}
          onResponse={(word, result) => {
            onResponse(makeResponse(word, word, null, result));
          }}
          onComplete={onComplete}
        />
      );

    case 'writing_prompt':
      return (
        <SentenceBuilder
          content={activity.content}
          onResponse={(sentence, result) => {
            onResponse(makeResponse(activity.title, null, sentence, result));
          }}
          onComplete={onComplete}
        />
      );

    case 'comprehension_conversation':
      return (
        <ComprehensionChat
          content={activity.content}
          studentName="Student"
          onComplete={onComplete}
        />
      );

    case 'science_explore':
      return (
        <ObservationLog
          content={activity.content}
          onComplete={onComplete}
        />
      );

    case 'science_investigate':
      return (
        <InvestigationGuide
          content={activity.content}
          onComplete={onComplete}
        />
      );

    case 'digital_activity':
      return (
        <AlgorithmBuilder
          content={activity.content}
          onComplete={onComplete}
        />
      );

    case 'oral_language':
      return (
        <OralLanguage
          content={activity.content}
          onComplete={onComplete}
        />
      );

    default:
      return (
        <div className="flex flex-col items-center gap-4 py-12">
          <p className="text-gray-500">Activity: {activity.title}</p>
          <p className="text-sm text-gray-400">{activity.type}</p>
          <button
            type="button"
            onClick={onComplete}
            className="bg-amber-600 text-white px-6 py-2 rounded-xl font-medium"
          >
            Continue
          </button>
        </div>
      );
  }
}
