import { ComponentProps, useRef } from 'react';
import { ParallaxProvider, ParallaxProviderProps } from '../../src';

interface ScrollContainerProps
  extends ComponentProps<'div'>,
    ParallaxProviderProps {}

export default function ScrollContainer({ children }: ScrollContainerProps) {
  const ref = useRef<HTMLDivElement>();
  return (
    <div className="scroll-container" ref={ref}>
      <ParallaxProvider container={ref?.current}>{children}</ParallaxProvider>
    </div>
  );
}
