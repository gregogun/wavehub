import * as TabsPrimitive from '@radix-ui/react-tabs';
import { styled } from '@/stitches.config';

const StyledTabs = styled(TabsPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
});

const StyledList = styled(TabsPrimitive.List, {
  display: 'flex',
  gap: '$8',
  mb: '$8',
});

const StyledContent = styled(TabsPrimitive.Content);

const StyledTrigger = styled(TabsPrimitive.TabsTrigger, {
  all: 'unset',
  fontSize: '$md',
  color: '$slate9',
  p: '$2',

  '&:hover': {
    color: '$slate10',
  },

  '&[data-state="active"]': {
    color: '$slate12',
    fontWeight: 600,
    boxShadow: '0 1px 0 0 $colors$slate12',
  },
});

export const Tabs = StyledTabs;
export const TabsList = StyledList;
export const TabsTrigger = StyledTrigger;
export const TabsContent = StyledContent;
