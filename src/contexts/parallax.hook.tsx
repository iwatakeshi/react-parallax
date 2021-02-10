import { useContext } from 'react';
import ParallaxContext, { IParallaxContext } from './parallax.context';

const useParallax = (): IParallaxContext => {
  const context = useContext(ParallaxContext);
  if (process.env.NODE_ENV === 'development') {
    if (context === undefined) {
      throw new Error('useParallax() must be used within a ParallaxProvider');
    }
  }
  return context;
};

export default useParallax;
