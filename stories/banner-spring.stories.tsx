import React, { ComponentProps, CSSProperties } from 'react';
import { Meta, Story } from '@storybook/react';
import { ParallaxProvider, ParallaxSpring, utils } from '../src';
const { translateY } = utils;
import * as styles from './styles';

const containerStyle: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '50vh',
};

const absoluteStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const ParallaxBanner = ({ children, style }: ComponentProps<'div'>) => {
  return (
    <div css={styles.bannerContainer}>
      <div
        className="parallax-banner"
        style={{
          ...containerStyle,
          ...style,
        }}
        css={styles.bannerBg}
      >
        {children}
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Banner (Spring) Example',
  component: ParallaxSpring,
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
    <div className="vertical">{args.children}</div>
  </ParallaxProvider>
);

export const Background = Template.bind({});

Background.args = {
  children: (
    <>
      <ParallaxBanner>
        <ParallaxSpring
          config={{ tension: 200, friction: 30, mass: 1 }}
          transform={offset => translateY(`${-offset * 0.05}px`)}
          outer={{
            style: absoluteStyle,
          }}
          inner={{
            style: absoluteStyle,
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
        </ParallaxSpring>
      </ParallaxBanner>
    </>
  ),
};

export const FullBackground = Template.bind({});

FullBackground.args = {
  children: (
    <>
      <ParallaxBanner
        style={{
          height: '100vh',
        }}
      >
        <ParallaxSpring
          config={{ duration: 0 }}
          outer={{
            style: {
              ...containerStyle,
              height: '100vh',
            },
          }}
          inner={{
            style: absoluteStyle,
          }}
          transform={offset => translateY(`${-offset * 0.067}px`)}
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
        </ParallaxSpring>
      </ParallaxBanner>
    </>
  ),
};

export const FullBackgroundWithChildren = Template.bind({});

FullBackgroundWithChildren.args = {
  children: (
    <>
      <ParallaxBanner>
        <ParallaxSpring
          config={{ tension: 200, friction: 30, mass: 1 }}
          className="outer2 absolute inset-0"
          transform={offset => translateY(`${-offset * 0.067}px`)}
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
        </ParallaxSpring>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ flexFlow: 'row wrap' }}
        >
          <h1 className="text-6xl text-white">Hello!</h1>
        </div>
      </ParallaxBanner>
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
      <ParallaxBanner
        style={{
          height: '75vh',
        }}
      >
        <ParallaxSpring
          config={{ duration: 0 }}
          outer={{
            css: styles.bannerBg,
          }}
          transform={offset => translateY(`${-offset * 0.1}px`)}
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
        </ParallaxSpring>
        <ParallaxSpring
          config={{ duration: 0 }}
          outer={{
            css: styles.bannerBg,
          }}
          transform={offset => translateY(`${-offset * 0.05}px`)}
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
        </ParallaxSpring>
      </ParallaxBanner>
    </>
  ),
};
