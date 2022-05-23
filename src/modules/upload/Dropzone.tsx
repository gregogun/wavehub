import { styled } from '@/stitches.config';
import { Box } from '@/ui/Box';
import { Text } from '@/ui/Text';
import { Label } from '@radix-ui/react-dropdown-menu';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

const DropzoneLayout = styled('div', {
  py: '$5',
  px: '$10',
  maxW: '$md',
  br: '$md',
  bg: '$slate3',
  border: '2px dashed $colors$slate6',
  display: 'grid',
  placeItems: 'center',
  cursor: 'pointer',
});

const DropzoneInput = styled('input', {
  width: '0.1px',
  height: '0.1px',
  opacity: 0,
  overflow: 'hidden',
  position: 'absolute',
  zIndex: -1,
});

interface DropzoneProps {
  onDrop: (acceptedFiles: any) => void;
  accept: {};
  children: React.ReactNode;
}

export const Dropzone = ({ onDrop, accept, children, ...props }: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept,
  });
  return (
    <DropzoneLayout css={{ bg: isDragActive ? '$slate5' : null }} {...props} {...getRootProps()}>
      <DropzoneInput id="dropzone" type="file" {...getInputProps()} />
      {children}
    </DropzoneLayout>
  );
};
