import { createContext } from 'react';
import { initialParallaxState, ParallaxState } from './parallax.state';

export interface IParallaxContext extends ParallaxState {
  setScroll: (x: number, y: number) => void;
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
};

const ParallaxContext = createContext<IParallaxContext>(initialContext);

export default ParallaxContext;
