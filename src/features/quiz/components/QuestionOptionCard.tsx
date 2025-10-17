import { clsx } from 'clsx';
import type { QuestionOption } from '@/types/quiz';

interface QuestionOptionCardProps {
  option: QuestionOption;
  isSelected: boolean;
  onSelect: () => void;
}

export function QuestionOptionCard({ option, isSelected, onSelect }: QuestionOptionCardProps) {
  return (
    <button
      type="button"
      className={clsx(
        'group flex flex-col gap-3 rounded-3xl border border-transparent bg-white/90 p-5 text-left shadow-pop transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candy-base/60 sm:p-6',
        isSelected
          ? 'bg-gradient-to-br from-candy-base/15 via-candy-soft/60 to-candy-accent/20 shadow-popHover'
          : 'hover:-translate-y-1 hover:shadow-popHover active:translate-y-0'
      )}
      onClick={onSelect}
      aria-pressed={isSelected}
      aria-label={`${option.label} を選択`}
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-candy-accent text-base font-semibold text-white shadow-sm">
        {option.value}
      </span>
      <span className="text-sm leading-7 text-candy-plum sm:text-base">{option.label}</span>
    </button>
  );
}
