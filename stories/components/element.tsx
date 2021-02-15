import React, { ComponentProps } from 'react';
import styled from '@emotion/styled';

const Ratio = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  background: slateblue;
`;

const Box = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  text-align: center;
  line-height: 3rem;
  color: #333;
  font-weight: bold;
  background: lightgreen;
`;

export default function Element(
  props: ComponentProps<'div'> & { name: string }
) {
  return (
    <Ratio>
      <Inner>
        <Box>{props.name}</Box>
        {props.children}
      </Inner>
    </Ratio>
  );
}
