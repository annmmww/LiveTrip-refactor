import type { ComponentPropsWithoutRef } from 'react';
import ButtonBase from './ButtonBase';

type PrimaryButtonProps = Omit<
  ComponentPropsWithoutRef<typeof ButtonBase>,
  'variant' | 'tone'
>;

export default function PrimaryButton({ ...props }: PrimaryButtonProps) {
  return <ButtonBase variant='primary' tone='normal' {...props} />;
}
