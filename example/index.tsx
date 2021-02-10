import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Parallax, { ParallaxLayer, ParallaxProvider } from '../.';

const App = () => {
  const src =
    'https://images.unsplash.com/photo-1515855334181-bb9b4d4c1d8a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1066&q=80';
  return (
    <>
      <Parallax className="block relative overflow-hidden w-full h-screen">
        <ParallaxLayer
          config={{ tension: 200, friction: 30, mass: 1 }}
          className="outer2 absolute inset-0"
          transform={y => `translate3d(0px, ${-y * 0.067}px, 0px)`}
          inner={{
            className: 'inner2 block absolute inset-0',
          }}
        >
          <div
            className="absolute left-0 right-0 bg-cover"
            style={{
              backgroundImage: `url("${src}")`,
              top: '-20%',
              bottom: '-20%',
              backgroundPosition: 'center center',
            }}
          />
        </ParallaxLayer>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ flexFlow: 'row wrap' }}
        >
          <h1 className="text-6xl text-white">Hello!</h1>
        </div>
      </Parallax>
      <div style={{ minHeight: '200px' }}></div>
    </>
  );
};

ReactDOM.render(
  <ParallaxProvider>
    <App />
  </ParallaxProvider>,
  document.getElementById('root')
);
