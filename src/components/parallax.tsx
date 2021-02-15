import React, { ComponentProps, ReactNode, RefObject } from 'react';
import useParallax from '../contexts/parallax.hook';
import mergeClassName from '../utils/merge-classname';
import { TransformFn } from '../types/transform';
interface ParallaxPropsBase {
  /**
   * Offsets on x-axis in % or px. If no unit is passed percent is assumed. Percent is based on
   * the elements width.
   */
  x?: [string | number, string | number];
  /**
   * Offsets on y-axis in % or px. If no unit is passed percent is assumed. Percent is based on
   * the elements width.
   */
  y?: [string | number, string | number];
  /**
   * Disables parallax effects on individual elements when true.
   */
  disabled?: boolean;
  /**
   * Transforms the element's position using `translate3d`
   */
  transform: TransformFn;
}

export type ParallaxProps =
  | (ParallaxPropsBase & {
      render?: (
        outerRef?: HTMLElement | RefObject<HTMLElement> | null,
        innerRef?: HTMLElement | RefObject<HTMLElement> | null
      ) => ReactNode | ReactNode[];
    })
  | (ParallaxPropsBase & {
      inner?: ComponentProps<'div'>;
      outer?: ComponentProps<'div'>;
      children: ReactNode | ReactNode[];
    });

export default function Parallax({
  x = [0, 0],
  y = [0, 0],
  disabled = false,
  transform,
  ...props
}: ParallaxProps) {
  let { innerRef, outerRef } = useParallax({
    disabled,
    transform,
  });
  let innerProps: ComponentProps<'div'> | undefined;
  let outerProps: ComponentProps<'div'> | undefined;
  if ('children' in props) {
    innerProps = props.inner;
    outerProps = props.outer;
  }
  const template = (
    <div
      {...outerProps}
      className={mergeClassName('parallax-outer', outerProps?.className)}
      ref={outerRef as any}
    >
      <div
        {...innerProps}
        className={mergeClassName('parallax-inner', innerProps?.className)}
        ref={innerRef as any}
      >
        {'children' in props && props.children}
      </div>
    </div>
  );

  if ('render' in props && props.render) {
    const rendered = props?.render(outerRef, innerRef) as JSX.Element;
    return rendered ?? template;
  }

  return template;
}
