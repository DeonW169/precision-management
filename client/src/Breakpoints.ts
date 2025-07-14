import { css, FlattenSimpleInterpolation } from 'styled-components';

export const xs = (props: FlattenSimpleInterpolation) => {
    return css`
    @media only screen and (max-width: 600px) {
      ${props}
    }
  `;
};

export const sm = (props: FlattenSimpleInterpolation) => {
    return css`
    @media only screen and (max-width: 768px) {
      ${props}
    }
  `;
};

export const md = (props: FlattenSimpleInterpolation) => {
    return css`
    @media only screen and (max-width: 992px) {
      ${props}
    }
  `;
};

export const lg = (props: FlattenSimpleInterpolation) => {
    return css`
    @media only screen and (max-width: 1200px) {
      ${props}
    }
  `;
};

export const xl = (props: FlattenSimpleInterpolation) => {
    return css`
    @media only screen and (min-width: 1201px) {
      ${props}
    }
  `;
};
