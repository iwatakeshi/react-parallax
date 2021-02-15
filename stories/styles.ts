import { css } from '@emotion/react';
export const parallax = css`
  width: 10rem;
  height: 10rem;
`;

export const small = css`
  width: 10%;
  margin: 4rem;
`;

export const smallLinear = css`
  width: 10%;
  margin: 5rem;
`;

export const elements = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
`;

export const elementsHorizontal = css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-flow: column nowrap;
`;

export const linear = css`
  flex-flow: row nowrap;
`;

export const linearHorizontal = css`
  flex-flow: column nowrap;
`;

export const parallaxChildren = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;

  h1 {
    color: white;
    font-size: 4vw;
    font-weight: normal;
  }
`;

export const bannerContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const bannerBg = css`
  background: #fff;
`;

export const customChild = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
`;

export const red = css`
  background-color: rgba(#f74c36, 0.8);
`;

export const green = css`
  background-color: rgba(#35f783, 0.8);
`;

export const blue = css`
  background-color: rgba(#42a7f4, 0.8);
`;

export const video = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
