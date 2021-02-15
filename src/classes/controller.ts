import View from './view';
import Element, { ElementOptions } from './element';
import Axis from '../enums/axis';
import Scroll from '../types/scroll';

export type ControllerOptions = {
  container?: HTMLElement | Window | null | undefined;
  axis?: Axis;
};

/**
 * -------------------------------------------------------
 * Parallax Controller
 * -------------------------------------------------------
 *
 * The global controller for setting up window scroll/resize
 * listeners, managing and caching parallax element positions,
 * determining which elements are inside the viewport based on
 * scroll position, and then updating parallax element styles
 * based on x/y offsets and current scroll position.
 *
 */
export default class Controller {
  /**
   * The axis or direction the parallax should occur
   */
  readonly axis: Axis = Axis.Y;
  /**
   * The scrolling container
   */
  private _container?: HTMLElement | Window;
  /**
   * The elements to be updated
   */
  private _elements: Element[] = [];
  /**
   * The ticking state
   */
  private _ticking: boolean = false;
  /**
   * The view context
   */
  private _view: View;
  /**
   * The scroll context
   */
  private _scroll: Scroll;
  constructor(options: ControllerOptions = {}) {
    const { axis, container } = options;
    if (typeof window === 'undefined') {
      throw new Error(
        'Looks like ParallaxController was initialized on the server. This method must be called on the client.'
      );
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Initializing parallax controller');
    }

    this.axis = axis ?? Axis.Y;

    // Determine the view element
    this._container = container || window;
    let x: number = 0;
    let y: number = 0;

    // Determine whether it's Window or an HTMLElement and set the x, y coordinates
    if ('scrollLeft' in this._container) {
      x = this._container.scrollLeft;
      y = this._container.scrollTop;
    } else {
      x = this._container.pageXOffset;
      y = this._container.pageYOffset;
    }

    this._scroll = { x, y };
    this._view = new View({ width: 0, height: 0, container: this._container });
    this.setViewSize();
  }
  /**
   * Window scroll handler sets scroll position
   * and then calls '#updateAllElements()'.
   */
  public handleScroll(scroll: Scroll) {
    this._scroll = scroll;
    // Only called if the last animation request has been
    // completed and there are parallax elements to update
    if (!this._ticking && this._elements.length > 0) {
      this._ticking = true;
      window.requestAnimationFrame(this.updateAllElements.bind(this) as any);
    }
  }

  /**
   * Window resize handler. Sets the new window inner height
   * then updates parallax element attributes and positions.
   */
  public handleResize() {
    this.setViewSize();
    this.updateAllElements({ updateCache: true });
  }

  /**
   * Update element positions.
   * Determines if the element is in view based on the cached
   * attributes, if so set the elements parallax styles.
   */
  private updateAllElements({ updateCache } = { updateCache: false }) {
    this._elements.forEach(element => {
      this.updateElementPosition(element);
      if (updateCache) {
        element.setCachedAttributes(this._view, this._scroll);
      }
    });
    // reset ticking so more animations can be called
    this._ticking = false;
  }

  /**
   * Update element positions.
   * Determines if the element is in view based on the cached
   * attributes, if so set the elements parallax styles.
   */
  private updateElementPosition(element: Element) {
    if (element.disabled) return;
    element.updatePosition(this._view, this._scroll);
  }

  /**
   * Cache the window height.
   */
  private setViewSize() {
    if (this._container && 'offsetWidth' in this._container) {
      const width = this._container?.offsetWidth || 0;
      const height = this._container?.offsetHeight || 0;
      return this._view.setSize(width, height);
    }

    const html = document.documentElement;
    const width = window.innerWidth || html.clientWidth;
    const height = window.innerHeight || html.clientHeight;
    return this._view.setSize(width, height);
  }

  /**
   * Creates a new parallax element object with new id
   * and options to store in the 'elements' array.
   * @param {object} options
   * @return {object} element
   */
  public createElement(options: ElementOptions) {
    const newElement = new Element(options);
    newElement.setCachedAttributes(this._view, this._scroll);
    this._elements = this._elements
      ? [...this._elements, newElement]
      : [newElement];
    this.updateElementPosition(newElement);
    return newElement;
  }

  /**
   * Remove an element by id
   * @param {object} element
   */
  public removeElementById(id: number) {
    if (this._elements.length === 0) return;
    this._elements = this._elements.filter(el => el.id !== id);
  }

  /**
   * Updates an existing parallax element object with new options.
   * @param {object} element
   * @param {object} options
   */
  public updateElementOptionsById(id: number, props: ElementOptions) {
    this._elements = this._elements.map(el => {
      if (el.id === id) {
        return el.updateOptions(props);
      }
      return el;
    });

    this.update();
  }

  /**
   * Remove element styles.
   * @param {object} element
   */
  public resetElementStyles(element: Element) {
    if (!element.inner) return;
    element.inner.style.transform = '';
  }

  /**
   * Updates all parallax element attributes and positions.
   */
  public update() {
    this.setViewSize();
    this.updateAllElements({ updateCache: true });
  }

  public updateContainer(container?: HTMLElement | Window) {
    if (!container) return;
    // remove existing listeners with current el first
    this._container = container;
    this._view = new View({ width: 0, height: 0, container });
    this.setViewSize();
    this.updateAllElements({ updateCache: true });
  }

  /**
   * Removes listeners, reset all styles then nullifies the global ParallaxController.
   */
  public destroy() {
    if (this._elements.length > 0) {
      this._elements.forEach(element => {
        if (!element.inner) return;
        element.inner.style.transform = '';
      });
    }
    this._elements = [];
  }

  /**
   * Returns the elements
   */
  public get elements() {
    return this._elements;
  }
  /**
   * Returns the container
   */
  public get container() {
    return this._container;
  }
}
