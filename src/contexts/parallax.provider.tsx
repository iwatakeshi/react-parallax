import React, { ReactNode, useReducer } from 'react';
import ParallaxContext from './parallax.context';
import { reducer } from './parallax.reducer';
import { initialParallaxState } from './parallax.state';

export interface ParallaxProviderProps {
  children?: ReactNode;
}

const ParallaxProvider = ({ children }: ParallaxProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialParallaxState);
  return (
    <ParallaxContext.Provider
      value={{
        ...state,
        setScroll: (x, y) => {
          dispatch({ type: 'SCROLL', scroll: [x, y] });
        },
      }}
    >
      {children}
    </ParallaxContext.Provider>
  );
};

export default ParallaxProvider;
