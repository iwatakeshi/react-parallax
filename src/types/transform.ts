import View from '../classes/view';
import { Translate3d, TranslateX, TranslateY } from '../utils/translate';
import Scroll from './scroll';
/**
 * A transform function
 */
export type TransformFn =
  /** @param change Then amount an element moved in percents */
  (
    change: number,
    view: View,
    scroll: Scroll
  ) => TranslateX | TranslateY | Translate3d;

/**
 * A spring transform function
 */
export type TransformSpringFn =
  /**
   * @param offet The offset passed by spring's interpolate function
   */
  (offset: number) => TranslateX | TranslateY | Translate3d;
