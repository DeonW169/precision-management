import { css } from 'styled-components';

export const xs = (props: any) => {
  return css`
    @media only screen and (max-width: 600px) {
      ${props}
    }
  `;
};

export const sm = (props: any) => {
  return css`
    @media only screen and (max-width: 768px) {
      ${props}
    }
  `;
};

export const md = (props: any) => {
  return css`
    @media only screen and (max-width: 992px) {
      ${props}
    }
  `;
};

export const lg = (props: any) => {
  return css`
    @media only screen and (max-width: 1200px) {
      ${props}
    }
  `;
};

export const xl = (props: any) => {
  return css`
    @media only screen and (min-width: 1201px) {
      ${props}
    }
  `;
};
