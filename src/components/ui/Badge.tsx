import type { ReactNode } from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex w-fit items-center gap-2 rounded-full bg-candy-base/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-candy-base sm:text-sm',
        className
      )}
    >
      {children}
    </span>
  );
}
