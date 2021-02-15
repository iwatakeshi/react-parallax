import { MutableRefObject, RefObject } from 'react';

export default function getRef<T = HTMLElement>(
  ref: T | RefObject<T> | MutableRefObject<T>
): T | null {
  if (!ref) return null;
  if ('current' in ref) return ref.current;
  return ref;
}
