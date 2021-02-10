import React, { forwardRef, HTMLAttributes, RefObject, useEffect } from 'react';
import useParallax from './contexts/parallax.hook';
import useScrollSelector from './hooks/use-scroll-selector';

export type ParallaxProps = HTMLAttributes<HTMLElement> & {};

const Parallax = forwardRef<HTMLElement, ParallaxProps>(function Parallax(
  props,
  ref
) {
  const { x, y } = useScrollSelector(ref);
  const { setScroll } = useParallax();
  useEffect(() => {
    setScroll(x, y);
  }, [x, y, setScroll]);

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      {...props}
      style={{
        width: '100%',
        ...props.style,
      }}
    />
  );
});

export default Parallax;
