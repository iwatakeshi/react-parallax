import React, { ReactNode, useReducer } from 'react';
import ParallaxContext from './parallax.context';
import { reducer } from './parallax.reducer';
import { initialParallaxState } from './parallax.state';

export interface ParallaxProviderProps {
  children?: ReactNode;
  container?: HTMLElement | Window | undefined;
}

const ParallaxProvider = ({ container, children }: ParallaxProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialParallaxState);
  return (
    <ParallaxContext.Provider
      value={{
        ...state,
        container: container ?? state.container,
        setScroll(scroll) {
          dispatch({ type: 'SCROLL', scroll });
        },
        setContainer(container) {
          dispatch({ type: 'SET_CONTAINER', container });
        },
        setResize(resize) {
          dispatch({ type: 'RESIZE', resize });
        },
        setController(controller) {
          dispatch({ type: 'SET_CONTROLLER', controller });
        },
      }}
    >
      {children}
    </ParallaxContext.Provider>
  );
};

export default ParallaxProvider;
