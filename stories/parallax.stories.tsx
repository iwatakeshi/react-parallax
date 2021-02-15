import React from 'react';
import { Meta, Story } from '@storybook/react';
import Parallax, {
  ParallaxProvider,
  Axis,
  TransformFn,
  TransformSpringFn,
  utils,
} from '../src';
import { range } from 'lodash';
import { Container, Element } from './components';
import * as styles from './styles';
const { scale, translate3d, translateY, translateX } = utils;

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

const transforms: Array<[string, TransformFn]> = [
  [
    'A',
    change => {
      const x0 = -40;
      const x1 = 0;
      return translateX(`${scale(change, x0, x1, 0, 100)}%`);
    },
  ],
  [
    'B',
    change => {
      const x0 = 40;
      const x1 = 0;
      return translateX(`${scale(change, x0, x1, 0, 100)}%`);
    },
  ],
  [
    'C',
    change => {
      const y0 = -40;
      const y1 = 0;
      return translateY(`${scale(change, y0, y1, 0, 100)}%`);
    },
  ],
  [
    'D',
    change => {
      const y0 = 40;
      const y1 = 0;
      return translateY(`${scale(change, y0, y1, 0, 100)}%`);
    },
  ],
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
          <Parallax
            key={`layer-${index}`}
            transform={transform}
            outer={{
              css: styles.parallax,
            }}
          >
            <Element name={`${index}`} />
          </Parallax>
        );
      })}
    </>
  ),
};

export const Crazy = Template.bind({});
const children = range(0, 101).map((_, index) => (
  <Parallax
    key={`layer-${index}`}
    transform={change =>
      translate3d(
        `${
          index % 2 === 0
            ? scale(change, 0, -10, 0, 100)
            : scale(change, -20, 0, 0, 100)
        }%`,
        `${
          index % 2 === 0
            ? scale(change, 0, -10, 0, 100)
            : scale(change, 20, 0, 0, 100)
        }%`,
        0
      )
    }
    outer={{
      css: styles.small,
    }}
  >
    <Element name={`${index}`} />
  </Parallax>
));
Crazy.args = {
  children: <>{children}</>,
};
