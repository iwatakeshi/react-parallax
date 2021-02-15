import { RefObject } from 'react';
import Axis from '../enums/axis';
import useContainer from '../hooks/use-container';
import useContextChecker from '../hooks/use-context-checker';
import useController from '../hooks/use-controller';
import useElement from '../hooks/use-element';
import useResize from '../hooks/use-resize';
import useScroll from '../hooks/use-scroll';
import { TransformFn } from '../types/transform';
interface useParallaxProps<Outer = HTMLElement, Inner = HTMLElement> {
  container?: RefObject<HTMLElement | Window> | HTMLElement | Window;
  axis?: Axis;
  outerRef?: Outer;
  innerRef?: Inner;
  disabled?: boolean;
  transform: TransformFn;
}

function useParallax<Outer extends HTMLElement, Inner extends HTMLElement>({
  container: containerRef,
  axis,
  transform,
  ...props
}: useParallaxProps<Outer, Inner>) {
  // Check for context
  useContextChecker();

  // Setup the container
  const { container } = useContainer({ ref: containerRef });

  // Setup the controller
  const { controller } = useController({ axis });

  // Setup the scroll listener
  const scroll = useScroll();

  // Setup the resize listener
  const resize = useResize();

  // Setup the element
  const element = useElement({ axis, ...props, transform });
  return {
    container,
    controller,
    ...element,
    scroll,
    resize,
  };
}

export default useParallax;
