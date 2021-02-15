/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from 'react';
import Axis from '../enums/axis';
import Element, { ElementOptions } from '../classes/element';
import { getRef } from '../utils/get-ref';
import useController from './use-controller';
import { TransformFn } from '../types/transform';

type UseElementProps<Outer extends HTMLElement, Inner extends HTMLElement> = {
  innerRef?: Inner;
  outerRef?: Outer;
  disabled?: boolean;
  axis?: Axis;
  transform: TransformFn;
};

export default function useElement<
  Outer extends HTMLElement,
  Inner extends HTMLElement
>({ transform, disabled, ...props }: UseElementProps<Outer, Inner>) {
  const { controller } = useController();
  const [element, setElement] = useState<Element | null>(null);
  const innerRef = useRef<Outer>(getRef(props.innerRef as any)!);
  const outerRef = useRef<Inner>(getRef(props.outerRef as any)!);

  const getElementOptions = (): ElementOptions => ({
    axis: props.axis,
    inner: getRef(innerRef),
    outer: getRef(outerRef),
    disabled,
    transform,
  });
  useEffect(() => {
    if (!controller || element) return;
    const options = getElementOptions();
    const el = controller.createElement(options);
    setElement(el);
  }, [controller]);

  useEffect(() => {
    if (!element || !controller) return;
    controller.updateElementOptionsById(element.id, getElementOptions());
  }, [disabled, props.axis]);

  useEffect(() => {
    if (!element || !disabled) return;
    // resets element styles when disabled
    controller?.resetElementStyles(element);
  }, [disabled, element]);

  useEffect(() => {
    if (!element) return;
    return () => {
      controller?.removeElementById(element?.id);
      controller?.destroy();
    };
  }, [element]);
  return { innerRef, outerRef, element };
}
