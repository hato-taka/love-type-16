interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const ratio = Math.round((current / total) * 100);
  return (
    <div className="quiz-progress" aria-hidden="false" aria-label={`進捗 ${ratio}%`}>
      <div className="progress-track">
        <div className="progress-bar" style={{ width: `${ratio}%` }} />
      </div>
      <p style={{ marginTop: '12px', fontWeight: 600 }}>
        Question {current} / {total}
      </p>
    </div>
  );
}
