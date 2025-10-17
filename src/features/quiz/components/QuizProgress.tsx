interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const ratio = Math.round((current / total) * 100);
  return (
    <div className="mt-6 space-y-3" aria-hidden="false" aria-label={`進捗 ${ratio}%`}>
      <div className="h-3 w-full overflow-hidden rounded-full bg-white/70">
        <div
          className="h-full rounded-full bg-gradient-to-r from-candy-base to-candy-accent transition-all duration-300 ease-out"
          style={{ width: `${ratio}%` }}
        />
      </div>
      <p className="text-sm font-semibold text-candy-lavender sm:text-base">
        Question {current} / {total}
      </p>
    </div>
  );
}
