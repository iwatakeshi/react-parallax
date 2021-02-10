import React from 'react';
import { Meta, Story } from '@storybook/react';
import Parallax, { ParallaxLayer, ParallaxProvider, TransformFn } from '../src';
import './style.css';
import Element from './element';
import { range } from 'lodash';

const meta: Meta = {
  title: 'Parallax Example',
  component: Parallax,
  argTypes: {
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
    <div className="container">
      <Parallax className="parallax" {...args} />
    </div>
  </ParallaxProvider>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Simple = Template.bind({});

const transforms: Array<[string, TransformFn]> = [
  ['A', y => `translateX(${-y / 10}px)`],
  ['B', y => `translateX(${y / 20}px)`],
  ['C', y => `translateY(${-y / 5}px)`],
  ['D', y => `translateY(${y / 5}px)`],
];

Simple.args = {
  className: 'w-full height-full flex justify-center item-center',
  style: {
    minHeight: '300vh',
    flexFlow: 'row wrap',
    // background: `url("${bgImage}"), linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.0))`,
    // backgroundBlendMode: 'overlay',
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
  },
  children: (
    <>
      {transforms.map((item, index) => {
        const [name, transform] = item;
        return (
          <ParallaxLayer
            key={`layer-${index}`}
            transform={transform}
            className="outer mx-auto mt-40"
            inner={{
              className: 'inner',
            }}
          >
            <Element
              className="flex relative w-full h-0"
              style={{ paddingTop: '100%' }}
              name={`${index}`}
            />
          </ParallaxLayer>
        );
      })}
    </>
  ),
};

export const Crazy = Template.bind({});
const children = range(0, 101).map((_, index) => (
  <ParallaxLayer
    key={`layer-${index}`}
    transform={y =>
      `translate3d(${index % 2 === 0 ? y * 0.02 : -(y * 0.02)}px,${
        index % 2 === 0 ? -y * 0.02 : y * 0.02
      }px, 0)`
    }
    className="outer m-24"
    inner={{
      className: 'inner',
    }}
  >
    <Element
      className="flex relative w-full h-0"
      style={{ paddingTop: '100%' }}
      name={`${index}`}
    />
  </ParallaxLayer>
));
Crazy.args = {
  style: {
    // background: `url("${bgImage}"), linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.0))`,
    // backgroundBlendMode: 'overlay',
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
  },
  children: <>{children}</>,
};
