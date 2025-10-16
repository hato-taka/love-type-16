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
    <div className="quiz-shell">
      <div className="quiz-content">
        {step === 'intro' && (
          <section>
            <span className="quiz-badge">16 問・約 3 分で完了</span>
            <h1 style={{ fontSize: '2.4rem', marginTop: '24px', marginBottom: '12px' }}>
              サンリオ恋愛性格診断へようこそ！
            </h1>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '32px' }}>
              直感で答えていくことで、あなたの恋愛タイプとぴったりのサンリオキャラクターがわかります。
              心のままに選んで、かわいい結果カードを手に入れましょう。
            </p>
            <button className="btn" onClick={handleStart}>
              診断をはじめる
            </button>
          </section>
        )}

        {step === 'questions' && currentQuestion && (
          <section>
            <span className="quiz-badge">Question {index + 1}</span>
            <h2 style={{ fontSize: '1.8rem', marginTop: '18px', marginBottom: '18px' }}>
              {currentQuestion.text}
            </h2>

            <QuizProgress current={index + 1} total={total} />

            <div className="options-grid">
              {currentQuestion.options.map((option, optionIndex) => {
                const selectedValue = answers[currentQuestion.id];
                return (
                  <QuestionOptionCard
                    key={option.value}
                    option={option}
                    index={optionIndex}
                    isSelected={selectedValue === option.value}
                    onSelect={() => handleSelect(option.value)}
                  />
                );
              })}
            </div>

            <div className="quiz-actions">
              <button className="btn btn-secondary" type="button" onClick={goPrev} disabled={index === 0}>
                1つ前の質問へ
              </button>
              <div style={{ color: 'var(--color-subtle)', fontWeight: 600 }}>
                {answeredCount} / {total} 回答済み
              </div>
            </div>
          </section>
        )}

        {isComplete && (
          <section>
            <span className="quiz-badge">おつかれさま！</span>
            <h2 style={{ fontSize: '2rem', marginTop: '20px', marginBottom: '18px' }}>
              すべての質問に回答しました
            </h2>
            <p style={{ lineHeight: 1.7, marginBottom: '28px' }}>
              あなたにぴったりのサンリオキャラクタータイプを計算中です。結果カードで、恋愛観・働き方・推し活のヒントを確認しましょう。
            </p>
            <button className="btn" type="button" onClick={handleSubmit} disabled={answeredCount !== total}>
              診断結果を見る
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              style={{ marginLeft: '16px' }}
              onClick={() => {
                setStep('questions');
                setIndex(Math.max(total - 1, 0));
              }}
            >
              回答を見直す
            </button>
          </section>
        )}

        <footer className="quiz-footer">
          ※ この診断はフロントエンドのみで完結し、回答内容は保存されません。
        </footer>
      </div>
    </div>
  );
}
