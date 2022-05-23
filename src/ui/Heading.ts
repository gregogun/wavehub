import { styled } from '../stitches.config';

export const Heading = styled('h2', {
  m: 0,
  fontFamily: '$body',
  color: '$slate12',

  variants: {
    size: {
      xs: {
        fontSize: '$md',
        lineHeight: '$md',
      },
      sm: {
        fontSize: '$lg',
        lineHeight: '$lg',
      },
      md: {
        fontSize: '$xl',
        lineHeight: '$xl',
      },
      lg: {
        fontSize: '$2xl',
        lineHeight: '$2xl',
      },
      xl: {
        fontSize: '$3xl',
        lineHeight: '$3xl',
      },
      '2xl': {
        fontSize: '$4xl',
        lineHeight: '$4xl',
      },
      '3xl': {
        fontSize: '$5xl',
        lineHeight: '$5xl',
      },
      '4xl': {
        fontSize: '$6xl',
        lineHeight: '$6xl',
      },
      '5xl': {
        fontSize: '$7xl',
        lineHeight: '$7xl',
      },
      '6xl': {
        fontSize: '$8xl',
        lineHeight: '$8xl',
      },
    },
    weight: {
      bold: {
        fontWeight: '$bold',
      },
      semibold: {
        fontWeight: '$semibold',
      },
      normal: {
        fontWeight: '$normal',
      },
    },
  },

  defaultVariants: {
    size: '2xl',
    weight: 'semibold',
  },
});
