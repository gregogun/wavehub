import { styled } from '@/stitches.config';

export const Input = styled('input', {
  // reset
  appearance: 'none',
  all: 'unset',

  borderWidth: '0',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  margin: '0',
  outline: 'none',
  padding: '0',
  width: '100%',
  minWidth: 320,
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  //custom
  px: '$3',
  br: '$md',
  color: '$text',

  '&:focus': {
    boxShadow: 'inset 0 0 0 1px $colors$focusRing, 0 0 0 1px $colors$focusRing',
  },

  '&::placeholder': {
    color: '$placeholderText',
  },

  '&[aria-disabled="true"]': {
    pointerEvents: 'none',
    opacity: '50%',
    cursor: 'not-allowed',
    userSelect: 'none',
  },

  '&:read-only': {
    backgroundColor: '$subtleBg',
    '&:focus': {
      boxShadow: '0 0 0 2px $colors$subtleBorder',
    },
  },

  variants: {
    variant: {
      outline: {
        boxShadow: '0 0 0 1px $colors$border',
      },
      subtle: {
        backgroundColor: '$bg',
        boxShadow: '0 0 0 1px $colors$border',
      },
      ghost: {
        '&:hover:not(:focus)': {
          boxShadow: '0 0 0 1px $colors$borderHover',
        },
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

    size: {
      sm: {
        height: '$6',
        maxW: '$xs',
        br: '$sm',
        fontSize: '$xs',
      },
      md: {
        height: '$8',
        maxW: '$xs',
        fontSize: '$sm',
      },
      lg: {
        height: '$10',
        maxW: '$sm',
        fontSize: '$md',
      },
    },
  },

  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
});
