'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ChoiceValue, Question } from '@/types/quiz';
import { computePersonalityType } from '@/lib/quiz';
import { QuestionOptionCard } from './QuestionOptionCard';
import { QuizProgress } from './QuizProgress';

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

  const primaryButtonClasses =
    'inline-flex items-center justify-center gap-2 rounded-full bg-candy-base px-6 py-3 text-sm font-semibold text-white shadow-pop transition duration-200 hover:-translate-y-0.5 hover:shadow-popHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candy-base/60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none sm:text-base';

  const secondaryButtonClasses =
    'inline-flex items-center justify-center gap-2 rounded-full border border-candy-lavender/30 bg-white/90 px-6 py-3 text-sm font-semibold text-candy-lavender transition duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candy-accent/40 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base';

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
    <div className="relative mx-auto my-6 w-full max-w-3xl overflow-hidden rounded-[26px] bg-white/90 px-5 py-8 shadow-pop sm:my-12 sm:px-8 sm:py-10 lg:max-w-4xl">
      <div className="pointer-events-none absolute -left-32 -top-32 h-56 w-56 rounded-full bg-candy-base/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 -right-28 h-64 w-64 rounded-full bg-candy-accent/20 blur-3xl" aria-hidden />

      <div className="relative z-10 space-y-8">
        {step === 'intro' && (
          <section className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-candy-base/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-candy-base sm:text-sm">
              16 問・約 3 分で完了
            </span>
            <h1 className="text-[clamp(2rem,6.5vw,2.4rem)] font-semibold leading-tight">
              サンリオ恋愛性格診断へようこそ！
            </h1>
            <p className="text-[clamp(0.98rem,3.6vw,1.05rem)] leading-8 text-candy-lavender">
              直感で答えていくことで、あなたの恋愛タイプとぴったりのサンリオキャラクターがわかります。
              心のままに選んで、かわいい結果カードを手に入れましょう。
            </p>
            <button className={primaryButtonClasses} onClick={handleStart}>
              診断をはじめる
            </button>
          </section>
        )}

        {step === 'questions' && currentQuestion && (
          <section className="space-y-6">
            <div className="flex flex-col gap-3">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-candy-base/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-candy-base sm:text-sm">
                Question {index + 1}
              </span>
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
                className={secondaryButtonClasses}
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
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-candy-base/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-candy-base sm:text-sm">
              おつかれさま！
            </span>
            <h2 className="text-[clamp(1.7rem,6vw,2.1rem)] font-semibold leading-tight">
              すべての質問に回答しました
            </h2>
            <p className="text-[clamp(0.95rem,3.2vw,1.05rem)] leading-7 text-candy-lavender">
              あなたにぴったりのサンリオキャラクタータイプを計算中です。結果カードで、恋愛観・働き方・推し活のヒントを確認しましょう。
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                className={primaryButtonClasses}
                type="button"
                onClick={handleSubmit}
                disabled={answeredCount !== total}
              >
                診断結果を見る
              </button>
              <button
                className={secondaryButtonClasses}
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
      </div>
    </div>
  );
}
