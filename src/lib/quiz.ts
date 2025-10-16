import questionsData from '@/data/questions.json';
import resultsData from '@/data/results.json';
import type { ChoiceValue, Dimension, PersonalityResult, Question } from '@/types/quiz';

export type AnswerMap = Record<number, ChoiceValue>;

const dimensionLetterMap: Record<Dimension, Record<ChoiceValue, string>> = {
  principle: { A: 'S', B: 'I' },
  cognition: { A: 'C', B: 'A' },
  stance: { A: 'S', B: 'F' },
  energy: { A: 'T', B: 'Q' }
};

const questions: Question[] = questionsData as Question[];
const results: PersonalityResult[] = resultsData as PersonalityResult[];

export function getQuestions(): Question[] {
  return questions;
}

export function getAllResults(): PersonalityResult[] {
  return results;
}

function emptyCounts(): Record<Dimension, Record<ChoiceValue, number>> {
  return {
    principle: { A: 0, B: 0 },
    cognition: { A: 0, B: 0 },
    stance: { A: 0, B: 0 },
    energy: { A: 0, B: 0 }
  };
}

export function computePersonalityType(answers: AnswerMap): string | null {
  const counts = emptyCounts();

  for (const question of questions) {
    const selected = answers[question.id];
    if (!selected) {
      continue;
    }

    counts[question.dimension][selected] += 1;
  }

  const signature = (Object.keys(counts) as Dimension[])
    .map((dimension) => {
      const dimensionCounts = counts[dimension];
      const dominant: ChoiceValue =
        dimensionCounts.A >= dimensionCounts.B ? 'A' : 'B';
      return dimensionLetterMap[dimension][dominant];
    })
    .join('');

  const energyChoice: ChoiceValue = counts.energy.A >= counts.energy.B ? 'A' : 'B';
  const energySuffix = dimensionLetterMap.energy[energyChoice];

  // Replace trailing energy letter with hyphen format e.g., ABCD -> ABC-D
  const body = signature.slice(0, 3);

  const resultType = `${body}-${energySuffix}`;

  const hasMatch = results.some((result) => result.type.toUpperCase() === resultType);
  return hasMatch ? resultType : null;
}

export function findResultByType(type: string): PersonalityResult | undefined {
  const normalized = type.toUpperCase();
  return results.find((result) => result.type.toUpperCase() === normalized);
}
