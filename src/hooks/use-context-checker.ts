import { useContext, useEffect } from 'react';
import ParallaxContext from '../contexts/parallax.context';

export default function useContextChecker() {
  const context = useContext(ParallaxContext);
  // Check for context
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      if (context === undefined) {
        throw new Error('useParallax() must be used within a ParallaxProvider');
      }
    }
  }, [context]);
}
