import React, {
  ComponentPropsWithRef,
  forwardRef,
  RefObject,
  useEffect,
} from 'react';
import useParallax from './contexts/parallax.hook';
import useScrollSelector from './hooks/use-scroll-selector';

export interface ParallaxProps extends ComponentPropsWithRef<'div'> {}

const Parallax = forwardRef<HTMLElement, ParallaxProps>(function Parallax(
  props,
  ref
) {
  const { x, y } = useScrollSelector(ref);
  const { setScroll } = useParallax();
  useEffect(() => {
    setScroll(x, y);
  }, [x, y]);

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
