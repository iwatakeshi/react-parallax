/* eslint-disable */
import { ForwardedRef, RefObject } from 'react';

import { useScroll, useWindowScroll } from 'react-use';

/**
 * Scroll selector will determine which element to use to listen to the scrolling events.
 * @note If `ref` is null or undefined, the selector will choose `window` as the default element
 * to listen.
 * @param ref
 */
export default function useScrollSelector<T = HTMLElement>(
  ref?: ForwardedRef<T> | RefObject<HTMLDivElement>
) {
  const { x, y } =
    typeof ref === 'undefined' || !ref
      ? useWindowScroll()
      : useScroll(ref as RefObject<HTMLDivElement>);

  return { x, y };
}
