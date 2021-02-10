import React, {
  forwardRef,
  HTMLAttributes,
  HtmlHTMLAttributes,
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

export type TransformFn =
  | ((params: number) => string)
  | ((x: number, y: number) => string);
export type CalcFn = (x: number, y: number) => [number, number];
export interface ParallaxLayerProps extends HtmlHTMLAttributes<HTMLDivElement> {
  transform: TransformFn;
  children?: ReactNode;
  direction?: 'x' | 'y' | 'xy';
  calc?: CalcFn;
  inner?: HTMLAttributes<HTMLDivElement>;
  onVisibilityChange?: (visible: boolean) => void;
  config?: SpringConfig;
}

interface OuterLayerProps extends HTMLAttributes<HTMLDivElement> {}

const OuterLayer = forwardRef<HTMLDivElement, OuterLayerProps>(
  function OuterLayer(props, ref) {
    return <div ref={ref as RefObject<HTMLDivElement>} {...props} />;
  }
);

interface InnerLayerProps extends HTMLAttributes<HTMLDivElement> {
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
  const { scroll, ready } = useParallax();
  const [boundingclientrectRef, rect] = useBoundingclientrectRef();
  const { ref: intersectionRef, inView: visible } = useInView({
    threshold: 0.6,
  });
  const ref = useForkRef(intersectionRef, boundingclientrectRef as any);
  const [x, y] = scroll;
  const springFn = () => {
    if (direction === 'x' || direction === 'y')
      return { springscrollY: 0, springscrollX: 0, config };
    return { xy: 0, config };
  };

  const [_props, set, stop] = useSpring<any>(springFn) as any;

  const interpolate = () => {
    switch (direction) {
      case 'x':
        return _props?.springscrollX?.interpolate(
          transform as (x: any) => string
        );
      case 'xy':
        return _props?.xy?.interpolate(transform as (x: any, y: any) => string);
      default:
        return _props?.springscrollY?.interpolate(
          transform as (x: any) => string
        );
    }
  };

  useEffect(() => {
    onVisibilityChange && onVisibilityChange(visible);
  }, [visible]);

  useEffect(() => {
    if (visible && ready) {
      switch (direction) {
        case 'x':
          set({
            springscrollX: rect ? x - rect.left : x,
            springscrollY: 0,
          });
          break;
        case 'y':
          set({
            springscrollX: 0,
            springscrollY: rect ? y - rect.top : y,
          });
          break;
        case 'xy':
          calc &&
            set({
              xy: calc(rect ? x - rect.left : x, rect ? y - rect.top : y),
            });
          break;
      }
    } else stop();
  }, [x, y, visible, ready, ref]);

  return (
    <OuterLayer ref={ref} {...props}>
      <InnerLayer {...{ ...inner, interpolate, children }} />
    </OuterLayer>
  );
}
