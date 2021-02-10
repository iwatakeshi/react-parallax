import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactNode,
  RefObject,
  useEffect,
} from 'react';
import {
  animated,
  SpringConfig,
  useSpring,
  config as Config,
} from 'react-spring';
import { useInView } from 'react-intersection-observer';
import useParallax from './contexts/parallax.hook';
import useBoundingclientrectRef from '@rooks/use-boundingclientrect-ref';
import useForkRef from '@rooks/use-fork-ref';

export type TransformFn = (param: number) => string;
export type CalcFn = (x: number, y: number) => [number, number];
export interface ParallaxLayerProps extends ComponentPropsWithoutRef<'div'> {
  transform: TransformFn;
  children?: ReactNode;
  direction?: 'x' | 'y' | 'xy';
  calc?: CalcFn;
  inner?: ComponentPropsWithoutRef<'div'>;
  onVisibilityChange?: (visible: boolean) => void;
  config?: SpringConfig;
}

interface OuterLayerProps extends ComponentPropsWithoutRef<'div'> {}

const OuterLayer = forwardRef<HTMLDivElement, OuterLayerProps>(
  function OuterLayer(props, ref) {
    return <div ref={ref as RefObject<HTMLDivElement>} {...props} />;
  }
);

interface InnerLayerProps extends ComponentPropsWithoutRef<'div'> {
  interpolate: () => any;
  children: ReactNode;
}

const InnerLayer = forwardRef<HTMLDivElement, InnerLayerProps>(
  function InnerLayer({ interpolate, ...props }, ref) {
    return (
      <animated.div
        ref={ref}
        {...props}
        style={{
          transform: interpolate(),
          willChange: 'transform',
          ...props.style,
        }}
      />
    );
  }
);

export default function ParallaxLayer({
  transform,
  direction = 'y',
  calc,
  inner,
  children,
  onVisibilityChange,
  config = Config.default,
  ...props
}: ParallaxLayerProps) {
  const { scroll } = useParallax();
  const [boundingclientrectRef, rect] = useBoundingclientrectRef();
  const { ref: intersectionRef, inView: visible } = useInView();
  const ref = useForkRef(intersectionRef, boundingclientrectRef as any);
  const [x, y] = scroll;

  const [_props, set] = useSpring(() => ({ offset: 0 }));

  useEffect(() => {
    if (visible) {
      set({ offset: y - (rect?.top ?? 0) });
    }
  }, [x, y]);

  const interpolate = () => {
    return _props?.offset?.interpolate(transform as any);
  };

  return (
    <OuterLayer ref={ref} {...props}>
      <InnerLayer {...{ ...inner, interpolate, children }} />
    </OuterLayer>
  );
}
