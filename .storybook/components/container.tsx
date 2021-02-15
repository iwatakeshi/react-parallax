import { ComponentProps } from 'react';
import { ParallaxProvider } from '../../src';
import Axis from '../../src/enums/axis';

interface ContainerProps extends ComponentProps<'div'> {
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
