/* eslint-disable */
import { ForwardedRef, RefObject, useRef } from 'react';

import { useScroll, useWindowScroll } from 'react-use';

/**
 * Scroll selector will determine which element to use to listen to the scrolling events.
 * @note If `ref` is null or undefined, the selector will choose `window` as the default element
 * to listen.
 * @param ref
 */
export default function useScrollSelector<T = HTMLElement>(
  ref?: ForwardedRef<T>
) {
  const _ref: RefObject<HTMLElement> =
    (ref as RefObject<HTMLDivElement>) ?? useRef<HTMLElement>();
  const { x, y } =
    typeof ref === 'undefined' || !ref ? useWindowScroll() : useScroll(_ref);

  return { x, y };
}
