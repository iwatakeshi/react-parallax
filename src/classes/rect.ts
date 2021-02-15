import Scroll from '../types/scroll';
import View from './view';

class Rect {
  readonly height: number = 0;
  readonly width: number = 0;
  readonly left: number = 0;
  readonly right: number = 0;
  readonly top: number = 0;
  readonly bottom: number = 0;
  readonly originTotalDistY: number = 0;
  readonly originTotalDistX: number = 0;
  constructor(
    element: HTMLElement | null | undefined,
    view: View,
    scroll: Scroll
  ) {
    if (!element) return this;

    let rect = element.getBoundingClientRect();
    // rect is based on viewport -- must adjust for relative scroll container
    if (view.container && 'getBoundingClientRect' in view.container) {
      const scrollRect = view.container?.getBoundingClientRect();
      rect = {
        ...rect,
        top: rect.top - scrollRect?.top,
        right: rect.right - scrollRect?.left,
        bottom: rect.bottom - scrollRect?.top,
        left: rect.left - scrollRect?.left,
      };
    }

    this.height = element.offsetHeight;
    this.width = element.offsetWidth;
    this.left = rect.left + scroll.x;
    this.right = rect.right + scroll.x;
    this.top = rect.top + scroll.y;
    this.bottom = rect.bottom + scroll.y;
    this.originTotalDistY = view.height + this.height;
    this.originTotalDistX = view.width + this.width;
  }
}

export default Rect;
