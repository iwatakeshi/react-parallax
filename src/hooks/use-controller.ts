/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from 'react';
import Axis from '../enums/axis';
import Controller from '../classes/controller';
import ParallaxContext from '../contexts/parallax.context';
type UseControllerProps = {
  axis?: Axis;
};
export default function useController({ axis }: UseControllerProps = {}) {
  const context = useContext(ParallaxContext);
  useEffect(() => {
    if (!context || context.container) return;

    context.setController(
      new Controller({
        axis,
        container: context.container,
      })
    );

    return () => {
      if (!context || !context.controller) return;
      context.controller.destroy();
    };
  }, [context, context?.container, context?.controller]);

  // Update the controller on scroll
  useEffect(() => {
    if (!context || !context.controller) return;

    context?.controller?.handleScroll(context.scroll);
  }, [context, context?.scroll?.x, context?.scroll?.y, context?.controller]);

  // Update the controller on resize
  useEffect(() => {
    if (!context || !context.controller) return;
    context.controller.handleResize();
  }, [context, context?.resize?.width, context?.resize?.height]);

  return { controller: context?.controller };
}
