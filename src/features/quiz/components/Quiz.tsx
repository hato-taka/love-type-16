'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ChoiceValue, Question } from '@/types/quiz';
import { computePersonalityType } from '@/lib/quiz';
import { QuestionOptionCard } from './QuestionOptionCard';
import { QuizProgress } from './QuizProgress';
import { buttonClass } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';
import { SurfaceShell } from '@/components/ui/SurfaceShell';

interface QuizProps {
  questions: Question[];
}

type Step = 'intro' | 'questions' | 'complete';

type AnswersState = Record<number, ChoiceValue>;

export function Quiz({ questions }: QuizProps) {
  const total = questions.length;
  const router = useRouter();

  const [step, setStep] = useState<Step>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswersState>({});
  const currentQuestion = questions[index];

  const answeredCount = useMemo(
    () => Object.keys(answers).length,
    [answers]
  );

  const handleStart = () => {
    setStep('questions');
  };

  const goPrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSelect = (value: ChoiceValue) => {
    if (!currentQuestion) {
      return;
    }

    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));

    if (index + 1 < total) {
      setTimeout(() => setIndex((prev) => prev + 1), 160);
      return;
    }

    setStep('complete');
  };

  const handleSubmit = () => {
    const resultType = computePersonalityType(answers);

    if (!resultType) {
      alert('診断結果が特定できませんでした。回答を確認してください。');
      return;
    }

    router.push(`/results/${resultType.toLowerCase()}`);
  };

  const isComplete = step === 'complete';

  return (
    <SurfaceShell contentClassName="space-y-8">
      {step === 'intro' && (
          <section className="space-y-6">
            <Badge>16 問・約 3 分で完了</Badge>
            <h1 className="text-[clamp(2rem,6.5vw,2.4rem)] font-semibold leading-tight">
              サンリオ恋愛性格診断へようこそ！
            </h1>
            <p className="text-[clamp(0.98rem,3.6vw,1.05rem)] leading-8 text-candy-lavender">
              直感で答えていくことで、あなたの恋愛タイプとぴったりのサンリオキャラクターがわかります。
              心のままに選んで、かわいい結果カードを手に入れましょう。
            </p>
            <button className={buttonClass()} onClick={handleStart}>
              診断をはじめる
            </button>
          </section>
        )}

      {step === 'questions' && currentQuestion && (
          <section className="space-y-6">
            <div className="flex flex-col gap-3">
              <Badge>Question {index + 1}</Badge>
              <h2 className="text-[clamp(1.45rem,5.8vw,1.9rem)] font-semibold leading-tight">
                {currentQuestion.text}
              </h2>
            </div>

            <QuizProgress current={index + 1} total={total} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {currentQuestion.options.map((option) => {
                const selectedValue = answers[currentQuestion.id];
                return (
                  <QuestionOptionCard
                    key={option.value}
                    option={option}
                    isSelected={selectedValue === option.value}
                    onSelect={() => handleSelect(option.value)}
                  />
                );
              })}
            </div>

            <div className="mt-4 flex flex-col gap-4 text-sm font-semibold text-candy-lavender sm:flex-row sm:items-center sm:justify-between sm:text-base">
              <button
                className={buttonClass({ variant: 'secondary' })}
                type="button"
                onClick={goPrev}
                disabled={index === 0}
              >
                1つ前の質問へ
              </button>
              <div>
                {answeredCount} / {total} 回答済み
              </div>
            </div>
          </section>
        )}

      {isComplete && (
          <section className="space-y-6">
            <Badge>おつかれさま！</Badge>
            <h2 className="text-[clamp(1.7rem,6vw,2.1rem)] font-semibold leading-tight">
              すべての質問に回答しました
            </h2>
            <p className="text-[clamp(0.95rem,3.2vw,1.05rem)] leading-7 text-candy-lavender">
              あなたにぴったりのサンリオキャラクタータイプを計算中です。結果カードで、恋愛観・働き方・推し活のヒントを確認しましょう。
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                className={buttonClass()}
                type="button"
                onClick={handleSubmit}
                disabled={answeredCount !== total}
              >
                診断結果を見る
              </button>
              <button
                className={buttonClass({ variant: 'secondary' })}
                type="button"
                onClick={() => {
                  setStep('questions');
                  setIndex(Math.max(total - 1, 0));
                }}
              >
                回答を見直す
              </button>
            </div>
          </section>
        )}

      <footer className="text-center text-xs text-candy-lavender/80 sm:text-sm">
        ※ この診断はフロントエンドのみで完結し、回答内容は保存されません。
      </footer>
    </SurfaceShell>
  );
}
