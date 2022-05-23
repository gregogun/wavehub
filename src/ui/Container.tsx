import { styled } from '../stitches.config';
import type { ComponentProps, VariantProps } from '../stitches.config';

type ContainerStyledProps = ComponentProps<typeof Container>;
export type ContainerVariants = VariantProps<typeof Container>;

export interface ContainerProps extends ContainerStyledProps {}

/**
 * Container is a component intended for wrapping around other components and content alike.
 * It renders a HTML div element by default.
 */
export const Container = styled('div', {
  p: '$4',
  mx: 'auto',
  height: '100%',

  '@bp3': {
    px: 0,
    pt: '$10',
    maxW: '90vw',
  },

  variants: {
    maxWidth: {
      '60ch': {
        maxWidth: '60ch',
      },
      xs: {
        maxWidth: '$xs',
      },
      sm: {
        maxWidth: '$sm',
      },
      md: {
        maxWidth: '$md',
      },
      lg: {
        maxWidth: '$lg',
      },
      xl: {
        maxWidth: '$xl',
      },
      '2xl': {
        maxWidth: '$2xl',
      },
      '3xl': {
        maxWidth: '$3xl',
      },
      '4xl': {
        maxWidth: '$4xl',
      },
      '5xl': {
        maxWidth: '$5xl',
      },
    },
    centerContent: {
      true: {
        display: 'grid',
        placeItems: 'center',
      },
    },
  },
});
