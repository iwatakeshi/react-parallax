import { ParallaxState } from './parallax.state';

type Action = { type: 'SCROLL'; scroll: [number, number] };

export const reducer = (
  state: ParallaxState,
  action: Action
): ParallaxState => {
  switch (action.type) {
    case 'SCROLL': {
      return {
        ...state,
        scroll: [action.scroll[0], action.scroll[1]],
      };
    }
  }
};
