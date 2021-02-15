import { ComponentProps, useRef } from 'react';
import { ParallaxProvider, ParallaxProviderProps } from '../../src';
import Axis from '../../src/enums/axis';

interface ScrollContainerProps
  extends ComponentProps<'div'>,
    ParallaxProviderProps {
  axis?: Axis;
}

export default function ScrollContainer({ children }: ScrollContainerProps) {
  const ref = useRef<HTMLDivElement>();
  return (
    <div className="scroll-container" ref={ref}>
      <ParallaxProvider container={ref.current}>{children}</ParallaxProvider>
    </div>
  );
}
