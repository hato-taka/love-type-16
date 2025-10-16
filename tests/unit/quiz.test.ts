import { describe, expect, it } from 'vitest';
import { computePersonalityType, findResultByType, getQuestions } from '@/lib/quiz';

const questions = getQuestions();

describe('computePersonalityType', () => {
  it('returns a known personality signature when answers map to data', () => {
    const answers: Record<number, 'A' | 'B'> = {};

    for (const question of questions) {
      if (question.dimension === 'stance') {
        answers[question.id] = 'B';
      } else {
        answers[question.id] = 'A';
      }
    }

    const resultType = computePersonalityType(answers);

    expect(resultType).toBe('SCF-T');
    expect(findResultByType(resultType!)).toBeDefined();
  });

  it('matches result lookup regardless of casing', () => {
    const result = findResultByType('scf-t');
    expect(result?.type).toBe('SCF-T');
  });
});
