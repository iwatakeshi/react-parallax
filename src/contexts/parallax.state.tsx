export interface ParallaxState {
  error?: Error;
  /**
   * `true` if parallax is ready (i.e. ssr), `false` otherwise.
   */
  ready: boolean;
  /**
   * A 2-tuple containing the `x` and `y` coordinates from scrolling.
   */
  scroll: [number, number];
}

export const initialParallaxState: ParallaxState = {
  ready: typeof window !== 'undefined',
  scroll: [0, 0],
};
