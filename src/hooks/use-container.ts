import { RefObject, useContext, useEffect } from 'react';
import ParallaxContext from '../contexts/parallax.context';

type UseContainerProps = {
  ref?: RefObject<HTMLElement | Window> | HTMLElement | Window;
};

export default function useContainer({ ref }: UseContainerProps) {
  const context = useContext(ParallaxContext);
  // Setup the container
  useEffect(() => {
    if (!context) return;
    // If the container doesn't exist then `window` is assumed
    if (!context.container && !ref) {
      context.setContainer(window);
    }
    // If the ref is set, use it as the container
    if (ref && 'current' in ref && ref.current)
      context.setContainer(ref.current);
    else if (ref && !('current' in ref)) context.setContainer(ref);
  }, [ref, context]);
  return { container: context?.container };
}
