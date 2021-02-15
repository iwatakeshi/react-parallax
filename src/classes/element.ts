import { createId } from '../utils/create-id';

import Rect from './rect';
import Axis from '../enums/axis';
import View from './view';
import Scroll from '../types/scroll';
import { TransformFn } from '../types/transform';
import percentMoved from '../utils/percent-moved';

export type ElementOptions = {
  inner: HTMLElement | null | undefined;
  outer: HTMLElement | null | undefined;
  axis?: Axis;
  disabled?: boolean;
  transform: TransformFn;
};

export default class Element {
  transform: TransformFn = () => `translate3d(0, 0, 0)`;
  inner: HTMLElement | null | undefined;
  outer: HTMLElement | null | undefined;
  axis: Axis;
  id: number;
  visible: boolean;
  percent: number;
  rect?: Rect;
  disabled: boolean | undefined;
  constructor(options: ElementOptions) {
    this.inner = options.inner;
    this.outer = options.outer;
    this.disabled = options.disabled;
    this.axis = options.axis || Axis.Y;
    this.transform = options.transform;
    this.id = createId();
    this.visible = false;
    this.percent = 0;
  }

  public setVisibility(visible: boolean) {
    this.visible = visible;
  }

  public updatePosition(view: View, scroll: Scroll) {
    if (!this.rect || !this.inner) return this;

    this.percent =
      this.axis === Axis.X
        ? percentMoved(
            this.rect.left,
            this.rect.originTotalDistX,
            view.width,
            scroll.x
          )
        : percentMoved(
            this.rect.top,
            this.rect.originTotalDistY,
            view.height,
            scroll.y
          );

    this.inner.style.transform = this.transform(this.percent, view, scroll);
    return this;
  }

  public updateOptions(options: ElementOptions) {
    this.disabled = options.disabled;
    this.axis = options.axis || Axis.Y;
    return this;
  }

  public setCachedAttributes(view: View, scroll: Scroll) {
    this.rect = new Rect(this.outer, view, scroll);
    return this;
  }
}
