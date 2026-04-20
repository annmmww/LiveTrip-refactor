import type { ComponentPropsWithoutRef } from 'react';
import ButtonBase from './ButtonBase';

type SecondaryButtonProps = Omit<
  ComponentPropsWithoutRef<typeof ButtonBase>,
  'variant'
>;

export default function SecondaryButton({ ...props }: SecondaryButtonProps) {
  return <ButtonBase variant='secondary' {...props} />;
}
