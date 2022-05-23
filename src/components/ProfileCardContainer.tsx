import { styled } from '../stitches.config';

export const ProfileCardContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  py: '$4',
  pl: '$4',
  pr: '$8',
  mb: '$6',
  backgroundColor: '$slate2',
  boxShadow: '0 0 0 1px $colors$slate6',
  br: '$xl',
  alignSelf: 'stretch',
  overflow: 'hidden',
});
