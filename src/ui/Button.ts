import { slate } from '@radix-ui/colors';
import { styled } from '../stitches.config';

export const Button = styled('button', {
  cursor: 'pointer',
  border: 0,
  padding: 0,
  margin: 0,
  textDecoration: 'none',
  alignItems: 'center',
  appearance: 'none',
  boxSizing: 'border-box',
  display: 'inline-flex',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  fontFamily: 'inherit',
  fontWeight: '$medium',
  lineHeight: 1,

  color: '$slate11',

  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px $colors$blue8',
  },

  '&:disabled': {
    pointerEvents: 'none',
    opacity: '50%',
    cursor: 'not-allowed',
  },

  variants: {
    variant: {
      subtle: {
        bg: '$slate3',
        boxShadow: '0 0 0 1px $colors$slate7',

        '&:hover': {
          bg: '$slate4',
          boxShadow: '0 0 0 1px $colors$slate8',
        },

        '&:active': {
          bg: '$slate5',
        },
      },
      outline: {
        bg: 'transparent',
        boxShadow: '0 0 0 1px $colors$slate7',

        '&:hover': {
          bg: '$slate4',
          boxShadow: '0 0 0 1px $colors$slate7',
        },

        '&:active': {
          bg: '$slate5',
        },
      },
      ghost: {
        boxShadow: 'none',
        bg: 'transparent',

        '&:hover': {
          bg: '$slate4',
        },

        '&:active': {
          bg: '$slate5',
        },
      },
      solid: {
        bg: '$slate9',
        color: slate.slate1,

        '&:hover': {
          bg: '$slate10',
        },
      },
    },

    size: {
      xs: {
        px: '10px',
        fontSize: '$xs',
        height: '$7',
      },
      sm: {
        px: '$3',
        fontSize: '$sm',
        height: '$8',
      },
      md: {
        px: '$4',
        fontSize: '$md',
        height: '$10',
      },
      lg: {
        px: '$6',
        fontSize: '$lg',
        height: '$12',
      },
    },

    rounded: {
      none: {
        br: '0px',
      },
      xs: {
        br: '$xs',
      },
      sm: {
        br: '$sm',
      },
      md: {
        br: '$md',
      },
      lg: {
        br: '$lg',
      },
      full: {
        br: '$full',
      },
    },
    colorScheme: {
      violet: {
        color: '$violet11',
      },
    },
  },

  compoundVariants: [
    {
      colorScheme: 'violet',
      variant: 'outline',
      css: {
        boxShadow: '0 0 0 1px $colors$violet7',

        '&:hover': {
          bg: '$violet4',
          boxShadow: '0 0 0 1px $colors$violet7',
        },

        '&:active': {
          bg: '$violet5',
        },
      },
    },
    {
      colorScheme: 'violet',
      variant: 'solid',
      css: {
        color: '$violet12',
        bg: '$violet9',

        '&:hover': {
          bg: '$violet10',
        },

        '&:active': {
          bg: '$violet10',
        },
      },
    },
  ],

  defaultVariants: {
    variant: 'subtle',
    size: 'md',
    rounded: 'md',
  },
});
