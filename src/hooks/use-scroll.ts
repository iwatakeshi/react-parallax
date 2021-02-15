/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from 'react';
import ParallaxContext from '../contexts/parallax.context';
import { off, on } from '../utils/events';

export default function useScroll() {
  const context = useContext(ParallaxContext);
  useEffect(() => {
    if (!context || !context.container) return;

    const handler = () => {
      if (typeof window === 'undefined') return;

      if (context.container instanceof Window) {
        context.setScroll({
          x: context.container?.pageXOffset || 0,
          y: context.container?.pageYOffset || 0,
        });
      } else if (context.container instanceof HTMLElement) {
        context.setScroll({
          x: context.container!.scrollLeft || 0,
          y: context.container!.scrollTop || 0,
        });
      }
    };

    on(context.container, 'scroll', handler, {
      capture: false,
      passive: true,
    });

    return () => {
      if (!context.container) return;
      off(context.container, 'scroll', handler);
    };
  }, [context, context?.container, context?.controller]);
  return context?.scroll ?? { x: 0, y: 0 };
}
