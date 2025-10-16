import { clsx } from 'clsx';
import type { QuestionOption } from '@/types/quiz';

interface QuestionOptionCardProps {
  option: QuestionOption;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

export function QuestionOptionCard({ option, isSelected, onSelect, index }: QuestionOptionCardProps) {
  return (
    <button
      type="button"
      className={clsx('option-card', { 'is-selected': isSelected })}
      onClick={onSelect}
    >
      <span className="option-chip">{index === 0 ? 'A' : 'B'}</span>
      <span className="option-label">{option.label}</span>
    </button>
  );
}
