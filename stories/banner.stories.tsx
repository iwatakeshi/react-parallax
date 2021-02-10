import React from 'react';
import { Meta, Story } from '@storybook/react';
import Parallax, { ParallaxLayer, ParallaxProvider, TransformFn } from '../src';
import './style.css';

const meta: Meta = {
  title: 'Banner Example',
  component: Parallax,
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    inner: {
      table: {
        disable: true,
      },
    },
    style: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => (
  <ParallaxProvider>
    <div
      className="block w-full"
      style={{
        minHeight: '300vh',
        overflowX: 'hidden',
      }}
    >
      <div className="w-full h-full relative flex items-center">
        <Parallax className="parallax" {...args} />
      </div>
    </div>
  </ParallaxProvider>
);

export const Background = Template.bind({});

Background.args = {
  className: 'block relative overflow-hidden w-full bg-white',
  style: {
    height: '50vh',
  },
  children: (
    <>
      <ParallaxLayer
        config={{ tension: 200, friction: 30, mass: 1 }}
        className="outer2 absolute inset-0"
        transform={y => `translate3d(0px, ${-y * 0.05}px, 0px)`}
        style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
        }}
        inner={{
          className: 'inner2 block absolute inset-0',
        }}
      >
        <div
          className="absolute left-0 right-0 bg-cover"
          style={{
            backgroundImage: `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner.jpg")`,
            top: '-20%',
            bottom: '-20%',
            backgroundPosition: 'center center',
          }}
        />
      </ParallaxLayer>
    </>
  ),
};

export const FullBackground = Template.bind({});

FullBackground.args = {
  className: 'relative overflow-hidden w-full bg-white',
  style: {
    height: '100vh',
  },
  children: (
    <>
      <ParallaxLayer
        config={{ duration: 0 }}
        className="outer2 absolute inset-0"
        transform={y => `translate3d(0px, ${-y * 0.067}px, 0px)`}
        inner={{
          className: 'inner2 block absolute inset-0',
        }}
      >
        <div
          className="absolute left-0 right-0 bg-cover"
          style={{
            backgroundImage: `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner.jpg")`,
            top: '-20%',
            bottom: '-20%',
            backgroundPosition: 'center center',
          }}
        />
      </ParallaxLayer>
    </>
  ),
};

export const FullBackgroundWithChildren = Template.bind({});

FullBackgroundWithChildren.args = {
  className: 'relative overflow-hidden w-full bg-white',
  style: {
    height: '75vh',
  },
  children: (
    <>
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
            backgroundImage: `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner.jpg")`,
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
    </>
  ),
};

export const MultipleBackgrounds = Template.bind({});

MultipleBackgrounds.args = {
  className: 'relative overflow-hidden w-full bg-white',
  style: {
    height: '55vh',
  },
  children: (
    <>
      <ParallaxLayer
        config={{ duration: 0 }}
        className="outer2 absolute inset-0"
        transform={y => `translate3d(0px, ${-y * 0.1}px, 0px)`}
        inner={{
          className: 'inner2 block absolute inset-0',
        }}
      >
        <div
          className="absolute  bg-cover"
          style={{
            backgroundImage: `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-background.jpg")`,
            inset: '-50% 0px',
            backgroundPosition: 'center center',
          }}
        />
      </ParallaxLayer>
      <ParallaxLayer
        config={{ duration: 0 }}
        className="outer2 absolute inset-0"
        transform={y => `translate3d(0px, ${-y * 0.05}px, 0px)`}
        inner={{
          className: 'inner2 block absolute inset-0',
        }}
      >
        <div
          className="absolute bg-cover"
          style={{
            backgroundImage: `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-foreground.png")`,
            inset: '-25% 0px',
            backgroundPosition: 'center center',
          }}
        />
      </ParallaxLayer>
    </>
  ),
};
