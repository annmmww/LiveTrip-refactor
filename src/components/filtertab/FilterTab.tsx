import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cx } from '@/lib/cx';

interface FilterTabProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  | 'aria-controls'
  | 'aria-selected'
  | 'children'
  | 'disabled'
  | 'id'
  | 'role'
  | 'tabIndex'
> {
  id: string;
  panelId: string;
  selected: boolean;
  children?: ReactNode;
  disabled?: never;
}

const filterBaseClassName =
  'inline-flex h-9 w-full items-center justify-center gap-1 rounded-full text-center select-none text-14 font-bold transition-[color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,transform,box-shadow] duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-reduce:transition-none enabled:hover:-translate-y-0.5 enabled:hover:shadow-lg enabled:active:translate-y-0 enabled:active:shadow md:h-11 md:text-16 [&_svg]:shrink-0';

const filterTone = {
  selected: 'bg-gray-875 text-white hover:bg-gray-800 [&_svg]:fill-white',
  normal: 'border border-gray-150 bg-white text-gray-950',
};

export default function FilterTab({
  id,
  panelId,
  selected,
  type = 'button',
  className,
  children,
  ...rest
}: FilterTabProps) {
  return (
    <div>
      <button
        type={type}
        role='tab'
        id={id}
        aria-selected={selected}
        aria-controls={panelId}
        tabIndex={selected ? 0 : -1}
        className={cx(
          filterBaseClassName,
          selected ? filterTone.selected : filterTone.normal,
          className
        )}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
}
