import { styled } from '@/stitches.config';

export const Textarea = styled('textarea', {
  outline: 'none',
  all: 'unset',

  boxShadow: '0 0 0 1px $colors$slate7',
  borderRadius: '$1',
  py: '$2',
  px: '$2',
  br: '$sm',
  fontSize: '$md',

  '&:hover': {
    boxShadow: '0 0 0 1px $colors$slate8',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$slate8',
  },

  '&::placeholder': {
    color: '$slate9',
  },
});
