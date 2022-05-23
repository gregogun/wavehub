import * as DialogPrimitive from '@radix-ui/react-dialog';
import { CSS, keyframes, styled } from '../stitches.config';
import { Heading } from './Heading';
import * as Portal from '@radix-ui/react-portal';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: 'rgba(8, 8, 8, 0.7)',
  position: 'fixed',
  inset: 0,

  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  children: React.ReactNode;
};

export function Dialog({ children, ...props }: DialogProps) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledContent = styled(DialogPrimitive.Content, {
  br: '$2xl',
  backgroundColor: '$slate1',
  boxShadow: '0px 0px 33px rgba(0, 0, 0, 0.08)',
  position: 'fixed',
  top: '40%',
  left: '50%',
  transform: 'translate(-40%, -40%)',
  width: '100%',
  maxWidth: '550px',
  maxHeight: '85vh',
  padding: '4rem 2rem 3rem',
  overflow: 'scroll',
  '&:focus': { outline: 'none' },
});

type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & { css?: CSS };

export function DialogContent({ children, ...props }: DialogContentProps) {
  return (
    <DialogPrimitive.DialogPortal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.DialogPortal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, Heading);

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = StyledTitle;
export const DialogDescription = DialogPrimitive.Description;
