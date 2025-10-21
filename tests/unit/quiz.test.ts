import { describe, expect, it } from 'vitest';
import { computePersonalityType, findResultByType, getQuestions } from '@/lib/quiz';

const questions = getQuestions();

// 設問回答からタイプ判定と結果取得が意図通りに動くことを確認する単体テスト群
describe('computePersonalityType', () => {
  // 特定の回答セットで既知のタイプが算出されデータに紐づくことを確認する
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

  // タイプコードの大文字小文字が混在しても結果検索できることを確認する
  it('matches result lookup regardless of casing', () => {
    const result = findResultByType('scf-t');
    expect(result?.type).toBe('SCF-T');
  });
});
