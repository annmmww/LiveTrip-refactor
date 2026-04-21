import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cx } from '@/lib/cx';

interface FilterButtonProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
> {
  selected?: boolean;
  children?: ReactNode;
}

const filterClassName =
  'inline-flex h-9 w-full items-center justify-center gap-1 rounded-full text-center select-none text-14 font-bold transition-colors motion-safe:transition-transform motion-safe:transition-shadow duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] enabled:hover:-translate-y-0.5 enabled:hover:shadow-lg enabled:active:translate-y-0 enabled:active:shadow md:text-16 md:h-11 [&_svg]:shrink-0';

export default function FilterButton({
  selected = false,
  type = 'button',
  className,
  children,
  ...rest
}: FilterButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        filterClassName,
        selected
          ? 'bg-gray-875 text-white hover:bg-gray-800 [&_svg]:fill-white'
          : 'border-gray-150 border bg-white text-gray-950',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
