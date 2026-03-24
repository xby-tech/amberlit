import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { recordPlacementAnswer, getNextQuestion, type PlacementState } from '@/lib/placement';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { state, questionId, correct, currentDomain } = await request.json() as {
    state: { literacy: PlacementState; maths: PlacementState };
    questionId: string;
    correct: boolean;
    currentDomain: 'literacy' | 'maths';
  };

  // Update the current domain's state
  const updatedDomainState = recordPlacementAnswer(state[currentDomain], questionId, correct);
  const newState = { ...state, [currentDomain]: updatedDomainState };

  // Determine next question
  let nextDomain = currentDomain;
  let nextQuestion = getNextQuestion(updatedDomainState);

  // If current domain is done, switch to the other
  if (!nextQuestion || updatedDomainState.done) {
    nextDomain = currentDomain === 'literacy' ? 'maths' : 'literacy';
    nextQuestion = getNextQuestion(newState[nextDomain]);
  }

  const allDone = newState.literacy.done && newState.maths.done;

  return NextResponse.json({
    state: newState,
    nextQuestion: allDone ? null : nextQuestion,
    currentDomain: nextDomain,
    done: allDone,
  });
}
