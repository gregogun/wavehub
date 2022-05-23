import { styled } from '@/stitches.config';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

export const Separator = styled(SeparatorPrimitive.Root, {
  backgroundColor: '$slate6',
  '&[data-orientation=horizontal]': { height: 1, width: '100%' },
  '&[data-orientation=vertical]': { height: '100%', width: 1 },
});
