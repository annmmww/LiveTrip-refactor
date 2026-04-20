import { cx as cvaCX } from 'class-variance-authority';
import type { ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['10', '12', '13', '14', '16', '18', '20', '24', '32', '14-body', '16-body', '18-body', '20-body'],
    },
  },
});

export const cx = (...inputs: ClassValue[]): string => twMerge(cvaCX(inputs));
