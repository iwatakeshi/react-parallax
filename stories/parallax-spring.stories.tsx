import React from 'react';
import { Meta, Story } from '@storybook/react';
import Parallax, {
  Axis,
  utils,
  ParallaxSpring,
  TransformSpringFn,
} from '../src';
import { range } from 'lodash';
import { Container, Element } from './components';
import * as styles from './styles';

const { translate3d, translateX, translateY } = utils;

const meta: Meta = {
  title: 'Parallax (Spring) Example',
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
  <Container
    css={args.axis === Axis.X ? styles.elementsHorizontal : styles.elements}
    axis={args.axis ?? Axis.Y}
  >
    {args.children}
  </Container>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Simple = Template.bind({});

const transforms: Array<[string, TransformSpringFn]> = [
  ['A', offset => translateX(`${-offset / 10}px`)],
  ['B', offset => translateX(`${offset / 20}px`)],
  ['C', offset => translateY(`${-offset / 5}px`)],
  ['D', offset => translateY(`${offset / 5}px`)],
];

Simple.args = {
  style: {
    // background: `url("${bgImage}"), linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.0))`,
    // backgroundBlendMode: 'overlay',
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
  },
  children: (
    <>
      {transforms.map((item, index) => {
        const [, transform] = item;
        return (
          <ParallaxSpring
            key={`layer-${index}`}
            transform={transform}
            outer={{
              css: styles.parallax,
            }}
          >
            <Element name={`${index}`} />
          </ParallaxSpring>
        );
      })}
    </>
  ),
};

export const Crazy = Template.bind({});
const children = range(0, 101).map((_, index) => (
  <ParallaxSpring
    key={`layer-${index}`}
    transform={y =>
      translate3d(
        `${index % 2 === 0 ? -y * 0.02 : y * 0.02}px`,
        `${index % 2 === 0 ? -y * 0.02 : y * 0.02}px`,
        0
      )
    }
    outer={{
      css: styles.small,
    }}
  >
    <Element name={`${index}`} />
  </ParallaxSpring>
));
Crazy.args = {
  children: <>{children}</>,
};
