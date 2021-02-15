import Controller from '../classes/controller';

export interface ParallaxState {
  error?: Error;
  /**
   * `true` if parallax is ready (i.e. ssr), `false` otherwise.
   */
  ready: boolean;
  /**
   * An object containing the `x` and `y` coordinates from scrolling.
   */
  scroll: { x: number; y: number };
  /**
   * An object containing the width and height of the window on resize
   */
  resize: { width: number; height: number };
  /**
   * A reference to the parent element.
   */
  container?: HTMLElement | Window;
  /**
   * The controller
   */
  controller?: Controller;
}

export const initialParallaxState: ParallaxState = {
  ready: typeof window !== 'undefined',
  scroll: { x: 0, y: 0 },
  resize: { width: 0, height: 0 },
};
