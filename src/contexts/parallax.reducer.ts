import Controller from '../classes/controller';
import { ParallaxState } from './parallax.state';

type Action =
  | { type: 'SCROLL'; scroll: { x: number; y: number } }
  | { type: 'RESIZE'; resize: { width: number; height: number } }
  | { type: 'SET_CONTAINER'; container: HTMLElement | Window }
  | { type: 'SET_CONTROLLER'; controller: Controller };

export const reducer = (
  state: ParallaxState,
  action: Action
): ParallaxState => {
  switch (action.type) {
    case 'SCROLL': {
      if (
        state.scroll.x === action.scroll.x &&
        state.scroll.y === action.scroll.y
      ) {
        return state;
      }
      return {
        ...state,
        scroll: { ...state.scroll, ...action.scroll },
      };
    }
    case 'RESIZE': {
      if (
        state.resize.width === action.resize.width &&
        state.resize.height === action.resize.height
      ) {
        return state;
      }
      return {
        ...state,
        resize: { ...state.resize, ...action.resize },
      };
    }
    case 'SET_CONTAINER': {
      return {
        ...state,
        container: action.container,
      };
    }
    case 'SET_CONTROLLER': {
      return {
        ...state,
        controller: action.controller,
      };
    }
  }
};
