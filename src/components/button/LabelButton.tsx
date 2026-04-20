import type { ComponentPropsWithoutRef } from 'react';
import ButtonBase from './ButtonBase';

type LabelButtonProps = Omit<
  ComponentPropsWithoutRef<typeof ButtonBase>,
  'variant'
>;

export default function LabelButton({ ...props }: LabelButtonProps) {
  return <ButtonBase variant='label' {...props} />;
}
