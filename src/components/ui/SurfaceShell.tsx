import type { ReactNode } from 'react';
import { clsx } from 'clsx';

interface SurfaceShellProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  hideDecorations?: boolean;
}

export function SurfaceShell({
  children,
  className,
  contentClassName,
  hideDecorations = false
}: SurfaceShellProps) {
  return (
    <div
      className={clsx(
        'relative mx-auto my-6 w-full max-w-3xl overflow-hidden rounded-[26px] bg-white/90 px-5 py-8 shadow-pop sm:my-12 sm:px-8 sm:py-10 lg:max-w-4xl',
        className
      )}
    >
      {!hideDecorations && (
        <>
          <div
            className="pointer-events-none absolute -left-28 -top-32 h-64 w-64 rounded-full bg-candy-base/20 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-36 -right-28 h-72 w-72 rounded-full bg-candy-accent/20 blur-3xl"
            aria-hidden
          />
        </>
      )}

      <div className={clsx('relative z-10', contentClassName)}>{children}</div>
    </div>
  );
}
