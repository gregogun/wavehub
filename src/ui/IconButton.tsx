import { styled } from '../stitches.config';

export const IconButton = styled('button', {
  //resets
  cursor: 'pointer',
  border: 0,
  padding: 0,
  margin: 0,
  textDecoration: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  appearance: 'none',
  boxSizing: 'border-box',
  display: 'inline-flex',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  fontFamily: 'inherit',
  fontWeight: '$medium',
  lineHeight: 1,

  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px $colors$blue8',
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

        '&:disabled': {
          opacity: '50%',
          cursor: 'not-allowed',
        },
      },
      outline: {
        bg: 'transparent',
        boxShadow: '0 0 0 1px $colors$slate7',

        '&:hover': {
          bg: '$slate4',
          boxShadow: '0 0 0 1px $colors$slate8',
        },

        '&:active': {
          bg: '$slate5',
        },

        '&:disabled': {
          opacity: '50%',
          cursor: 'not-allowed',
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

        '&:disabled': {
          opacity: '50%',
          cursor: 'not-allowed',
        },
      },
      solid: {
        bg: '$slate9',
        color: '#EDEDED',

        '&:hover': {
          bg: '$slate10',
        },

        '&:disabled': {
          opacity: '50%',
          cursor: 'not-allowed',
        },
      },
    },

    size: {
      xs: {
        boxSize: '$6',
        fontSize: '$xl',
      },
      sm: {
        boxSize: '$8',
      },
      md: {
        boxSize: '$10',
        fontSize: '$4xl',
      },
      lg: {
        boxSize: '$12',
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
  },

  defaultVariants: {
    variant: 'subtle',
    size: 'md',
    rounded: 'md',
  },
});
