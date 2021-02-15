import { ComponentProps } from 'react';
import { Axis, ParallaxProvider, ParallaxProviderProps } from '../../src';

interface ContainerProps extends ComponentProps<'div'>, ParallaxProviderProps {
  axis?: Axis;
}

export default function Container({
  children,
  className,
  axis = Axis.Y,
}: ContainerProps) {
  return (
    <ParallaxProvider>
      <div className={axis === Axis.Y || !axis ? 'vertical' : 'horitontal'}>
        <div className={className}>{children}</div>
      </div>
    </ParallaxProvider>
  );
}
