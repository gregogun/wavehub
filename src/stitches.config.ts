import { createStitches, PropertyValue, ScaleValue } from '@stitches/react';
import type { CSS as StitchesCSS } from '@stitches/react';
import {
  blue,
  blueDark,
  green,
  greenDark,
  red,
  redDark,
  slate,
  slateDark,
  violet,
  violetDark,
} from '@radix-ui/colors';

const spacing = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

export const { styled, css, config, theme, createTheme, reset, getCssText, globalCss, keyframes } =
  createStitches({
    theme: {
      colors: {
        ...slate,
        ...blue,
        ...red,
        ...violet,
        ...green,

        appBg: '$slate1',
        bgSubtle: '$slate2',
        bg: '$slate3',
        bgHover: '$slate4',
        bgActive: '$slate5',
        separator: '$slate6',
        subtleBorder: '$slate6',
        border: '$slate7',
        borderHover: '$slate8',
        solid: '$slate9',
        placeholderText: '$slate9',
        solidHover: '$slate10',
        text: '$slate11',
        textHiContrast: '$slate12',

        // focus
        focusRing: '$blue8',
      },
      fonts: {
        body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        heading:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        mono: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
      },
      fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
      },
      fontWeights: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      lineHeights: {
        none: 1,
        xs: '1rem',
        sm: '1.25rem',
        md: '1.5rem',
        lg: '1.75rem',
        xl: '1.75rem',
        '2xl': '2rem',
        '3xl': '2.25rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
      },
      radii: {
        none: '0',
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      zIndices: {
        hide: -1,
        auto: 'auto',
        base: 0,
        docked: 10,
        dropdown: 1000,
        sticky: 1100,
        banner: 1200,
        overlay: 1300,
        modal: 1400,
        popover: 1500,
        skipLink: 1600,
        toast: 1700,
        tooltip: 1800,
      },
      space: {
        ...spacing,
      },
      sizes: {
        ...spacing,
        max: 'max-content',
        min: 'min-content',
        full: '100%',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        '8xl': '90rem',
        'container-xs': '$xl',
        'container-sm': '$2xl',
        'container-md': '$3xl',
        'container-lg': '$5xl',
        'container-xl': '$7xl',
      },
    },
    media: {
      light: '(prefers-color-scheme: light)',
      dark: '(prefers-color-scheme: dark)',
      bp1: '(min-width: 280px)',
      bp2: '(min-width: 768px)',
      bp3: '(min-width: 1024px)',
      bp4: '(min-width: 1440px)',
    },
    utils: {
      p: (value: PropertyValue<'padding'>) => ({
        paddingTop: value,
        paddingBottom: value,
        paddingLeft: value,
        paddingRight: value,
      }),
      pt: (value: PropertyValue<'padding'>) => ({
        paddingTop: value,
      }),
      pr: (value: PropertyValue<'padding'>) => ({
        paddingRight: value,
      }),
      pb: (value: PropertyValue<'padding'>) => ({
        paddingBottom: value,
      }),
      pl: (value: PropertyValue<'padding'>) => ({
        paddingLeft: value,
      }),
      px: (value: PropertyValue<'padding'>) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value: PropertyValue<'padding'>) => ({
        paddingTop: value,
        paddingBottom: value,
      }),

      m: (value: PropertyValue<'margin'>) => ({
        marginTop: value,
        marginBottom: value,
        marginLeft: value,
        marginRight: value,
      }),
      mt: (value: PropertyValue<'margin'>) => ({
        marginTop: value,
      }),
      mr: (value: PropertyValue<'margin'>) => ({
        marginRight: value,
      }),
      mb: (value: PropertyValue<'margin'>) => ({
        marginBottom: value,
      }),
      ml: (value: PropertyValue<'margin'>) => ({
        marginLeft: value,
      }),
      mx: (value: PropertyValue<'margin'>) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: PropertyValue<'margin'>) => ({
        marginTop: value,
        marginBottom: value,
      }),
      bg: (value: PropertyValue<'backgroundColor'>) => ({
        backgroundColor: value,
      }),
      br: (value: PropertyValue<'borderRadius'>) => ({
        borderRadius: value,
      }),
      btrr: (value: ScaleValue<'radii'>) => ({
        borderTopRightRadius: value,
      }),
      bbrr: (value: ScaleValue<'radii'>) => ({
        borderBottomRightRadius: value,
      }),
      bblr: (value: ScaleValue<'radii'>) => ({
        borderBottomLeftRadius: value,
      }),
      btlr: (value: ScaleValue<'radii'>) => ({
        borderTopLeftRadius: value,
      }),
      ox: (value: PropertyValue<'overflowX'>) => ({ overflowX: value }),
      oy: (value: PropertyValue<'overflowY'>) => ({ overflowY: value }),
      boxSize: (value: PropertyValue<'width'>) => ({
        width: value,
        height: value,
      }),
      w: (value: PropertyValue<'width'>) => ({ width: value }),
      h: (value: PropertyValue<'height'>) => ({ height: value }),
      maxW: (value: PropertyValue<'maxWidth'>) => ({ maxWidth: value }),
      maxH: (value: PropertyValue<'maxHeight'>) => ({ maxHeight: value }),
    },
  });

const darkModeConfig = {
  colors: {
    ...slateDark,
    ...blueDark,
    ...redDark,
    ...violetDark,
    ...greenDark,

    appBg: '$slate1',
    bgSubtle: '$slate2',
    bg: '$slate3',
    bgHover: '$slate4',
    bgActive: '$slate5',
    separator: '$slate6',
    subtleBorder: '$slate6',
    border: '$slate7',
    borderHover: '$slate8',
    focus: '$slate8',
    solid: '$slate9',
    solidHover: '$slate10',
    loContrast: '$slate11',
    hiContrast: '$slate12',
  },
};

const globalStyles = globalCss({
  '*, *::before, *::after': {
    boxSizing: 'inherit',
  },
  'html, body': {
    padding: 0,
    margin: 0,
    fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
    backgroundColor: '$slate1',
    color: '$slate11',
  },
});

globalStyles();

export const darkTheme = createTheme('dark-theme', darkModeConfig);
export type CSS = StitchesCSS<typeof config>;
export type { ComponentProps, VariantProps, PropertyValue, ScaleValue } from '@stitches/react';
