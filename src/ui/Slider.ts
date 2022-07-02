import { styled } from '@/stitches.config';
import { blackA } from '@radix-ui/colors';
import * as SliderPrimitive from '@radix-ui/react-slider';

export const Slider = styled(SliderPrimitive.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: 500,

  '&[data-orientation="horizontal"]': {
    height: 20,
  },

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    width: 20,
    height: 100,
  },
});

export const SliderTrack = styled(SliderPrimitive.Track, {
  backgroundColor: blackA.blackA10,
  position: 'relative',
  flexGrow: 1,
  borderRadius: '9999px',

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
});

export const SliderRange = styled(SliderPrimitive.Range, {
  position: 'absolute',
  backgroundColor: '$slate12',
  borderRadius: '9999px',
  height: '100%',
});

export const SliderThumb = styled(SliderPrimitive.Thumb, {
  all: 'unset',
  display: 'block',
  width: '$3',
  height: '$3',
  backgroundColor: '$slate12',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  borderRadius: '$full',
  '&:hover': { backgroundColor: '$violet11' },
  '&:focus': { boxShadow: `0 0 0 5px ${blackA.blackA8}` },
});