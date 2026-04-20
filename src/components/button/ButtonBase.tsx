import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cx } from '@/lib/cx';

type ButtonVariant = 'primary' | 'secondary' | 'label';
type ButtonTone = 'normal' | 'active';

interface ButtonBaseProps extends ComponentPropsWithoutRef<'button'> {
  variant: ButtonVariant;
  tone: ButtonTone;
  children: ReactNode;
}

const shapes = {
  primary: 'h-10 md:h-12 lg:h-14 rounded-xl md:rounded-2xl',
  secondary: 'h-8 md:h-12 lg:h-14 rounded-xl md:rounded-2xl',
  label: 'h-10 md:h-12 lg:h-14 rounded-xl md:rounded-2xl',
};

const typo = {
  primary: 'text-14 md:text-16 font-bold',
  secondary: 'text-14 md:text-16 font-medium',
  label: 'text-14 md:text-16 font-medium',
};

const toneClassMap = {
  primary: {
    normal:
      'bg-primary-500 text-white hover:bg-primary-hover disabled:bg-gray-200 disabled:text-gray-50',
    active:
      'bg-white text-gray-600 border border-gray-200 disabled:bg-white disabled:text-gray-200 disabled:border-gray-200',
  },
  secondary: {
    normal:
      'bg-primary-500 text-white hover:bg-primary-hover disabled:bg-white disabled:text-gray-200 disabled:border disabled:border-gray-200',
    active:
      'bg-white text-gray-600 border border-gray-200 disabled:bg-white disabled:text-gray-200 disabled:border-gray-200',
  },
  label: {
    normal: 'bg-primary-100 text-gray-950 hover:bg-label-hover',
    active: 'text-gray-600',
  },
} satisfies Record<ButtonVariant, Record<ButtonTone, string>>;

const baseClassName =
  'inline-flex w-full items-center justify-center gap-1 text-center select-none transition-colors motion-safe:transition-transform motion-safe:transition-shadow duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] enabled:hover:-translate-y-0.5 enabled:hover:shadow-lg enabled:active:translate-y-0 enabled:active:shadow [&>img]:h-4 [&>img]:w-4 md:[&>img]:h-6 md:[&>img]:w-6 lg:[&>img]:h-6 lg:[&>img]:w-6';

export default function ButtonBase({
  variant,
  tone,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonBaseProps) {
  return (
    <button
      type={type}
      className={cx(
        baseClassName,
        shapes[variant],
        typo[variant],
        toneClassMap[variant][tone],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
