/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from 'react';
import ParallaxContext from '../contexts/parallax.context';
import { on, off } from '../utils/events';

export default function useResize() {
  const context = useContext(ParallaxContext);
  useEffect(() => {
    if (!context || typeof window === 'undefined') return;

    const handler = () => {
      context.setResize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    on(window, 'resize', handler);

    return () => {
      off(window, 'resize', handler);
    };
  }, [context?.container, context?.controller]);
  return context?.resize ?? { width: 0, height: 0 };
}
