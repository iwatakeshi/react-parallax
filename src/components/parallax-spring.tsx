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
import useParallax from '../contexts/parallax.hook';
import useBoundingclientrectRef from '@rooks/use-boundingclientrect-ref';
import useForkRef from '@rooks/use-fork-ref';
import { TransformSpringFn } from '../types/transform';
import Axis from '../enums/axis';
import mergeClassName from '../utils/merge-classname';

export interface ParallaxSpringLayerProps
  extends ComponentPropsWithoutRef<'div'> {
  transform: TransformSpringFn;
  children?: ReactNode;
  axis?: Axis;
  outer?: ComponentPropsWithoutRef<'div'>;
  inner?: ComponentPropsWithoutRef<'div'>;
  onVisibilityChange?: (visible: boolean) => void;
  config?: SpringConfig;
}

interface OuterLayerProps extends ComponentPropsWithoutRef<'div'> {}

const OuterLayer = forwardRef<HTMLDivElement, OuterLayerProps>(
  function OuterLayer(props, ref) {
    return (
      <div
        ref={ref as RefObject<HTMLDivElement>}
        {...props}
        className={mergeClassName('parallax-outer', props.className)}
      />
    );
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
        className={mergeClassName('parallax-inner', props.className)}
      />
    );
  }
);

export default function ParallaxSpring({
  transform,
  children,
  onVisibilityChange,
  config = Config.default,
  axis = Axis.Y,
  ...props
}: ParallaxSpringLayerProps) {
  const { scroll } = useParallax({
    disabled: true,
    transform: () => `translate3d(0, 0, 0)`,
  });
  const [boundingclientrectRef, rect] = useBoundingclientrectRef();
  const { ref: intersectionRef, inView: visible } = useInView();
  const ref = useForkRef(intersectionRef, boundingclientrectRef as any);

  const { x, y } = scroll;

  const [_props, set] = useSpring(() => ({ offset: 0 }));

  useEffect(() => {
    if (visible) {
      switch (axis) {
        case Axis.X:
          set({ offset: x - (rect?.left ?? 0) });
          break;
        case Axis.Y:
          set({ offset: y - (rect?.top ?? 0) });
          break;
      }
    }
  }, [x, y, axis, rect, set, visible]);

  const interpolate = () => {
    return _props?.offset?.interpolate(param => transform(param as number));
  };

  return (
    <OuterLayer ref={ref} {...props.outer}>
      <InnerLayer {...{ ...props.inner, interpolate, children }} />
    </OuterLayer>
  );
}
