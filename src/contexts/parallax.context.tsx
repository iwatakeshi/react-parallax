import { createContext } from 'react';
import Controller from '../classes/controller';
import { initialParallaxState, ParallaxState } from './parallax.state';

export interface IParallaxContext extends ParallaxState {
  setScroll: ({ x, y }: { x: number; y: number }) => void;
  setResize: ({ width, height }: { width: number; height: number }) => void;
  setContainer: (container: HTMLElement | Window) => void;
  setController: (controller: Controller) => void;
}

/**
 * @ignore
 */
const stub = (): never => {
  throw new Error('You forgot to wrap your component in <ParallelProvider>.');
};

/**
 * @ignore
 */
const initialContext: IParallaxContext = {
  ...initialParallaxState,
  setScroll: stub,
  setContainer: stub,
  setResize: stub,
  setController: stub,
};

const ParallaxContext = createContext<IParallaxContext>(initialContext);

export default ParallaxContext;
