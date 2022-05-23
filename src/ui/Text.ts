import { styled } from '../stitches.config';

export const Text = styled('p', {
  fontFamily: '$body',
  fontWeight: 'normal',
  color: '$slate11',
  m: 0,

  variants: {
    size: {
      xs: {
        fontSize: '$xs',
        lineHeight: '$xs',
      },
      sm: {
        fontSize: '$sm',
        lineHeight: '$sm',
      },
      md: {
        fontSize: '$md',
        lineHeight: '$md',
      },
      lg: {
        fontSize: '$lg',
        lineHeight: '$lg',
      },
      xl: {
        fontSize: '$xl',
        lineHeight: '$xl',
      },
      '2xl': {
        fontSize: '$2xl',
        lineHeight: '$2xl',
      },
      '3xl': {
        fontSize: '$3xl',
        lineHeight: '$3xl',
      },
      '4xl': {
        fontSize: '$4xl',
        lineHeight: '$4xl',
      },
      '5xl': {
        fontSize: '$5xl',
        lineHeight: '$5xl',
      },
      '6xl': {
        fontSize: '$6xl',
        lineHeight: '$6xl',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});
