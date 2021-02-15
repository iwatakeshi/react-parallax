export default class View {
  private _container?: HTMLElement | Window;
  private _width: number = 0;
  private _height: number = 0;
  constructor({
    width,
    height,
    container,
  }: {
    width: number;
    height: number;
    container?: HTMLElement | Window;
  }) {
    this._container = container as HTMLElement;
    this.setSize(width, height);
  }
  setContainer(container: HTMLElement | Window) {
    this._container = container;
  }
  setSize(width: number, height: number) {
    this._width = width;
    this._height = height;
    return this;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get container() {
    return this._container;
  }
}
