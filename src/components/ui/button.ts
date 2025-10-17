import { clsx } from 'clsx';

type Variant = 'primary' | 'secondary';

type ButtonOptions = {
  variant?: Variant;
  className?: string;
};

const baseClass =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 sm:px-8 sm:py-3.5 sm:text-base';

const variantClass: Record<Variant, string> = {
  primary:
    'bg-candy-base text-white shadow-pop hover:-translate-y-0.5 hover:shadow-popHover focus-visible:ring-candy-base/60 disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none',
  secondary:
    'border border-candy-lavender/30 bg-white/90 text-candy-lavender hover:bg-white focus-visible:ring-candy-accent/40 disabled:pointer-events-none disabled:opacity-50'
};

export function buttonClass({ variant = 'primary', className }: ButtonOptions = {}) {
  return clsx(baseClass, variantClass[variant], className);
}
