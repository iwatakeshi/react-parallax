import React from 'react';
import * as ReactDOM from 'react-dom';
import Parallax from '../src';
import ParallaxProvider from '../src/contexts/parallax.provider';

describe('Parallax', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ParallaxProvider>
        <Parallax />
      </ParallaxProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
