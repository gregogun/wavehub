import { CSS } from '@/stitches.config';
import { IconButton } from '@/ui/IconButton';
import { IoPause, IoPlaySharp } from 'react-icons/io5';

interface PlayButtonProps {
  currentlyPlaying: boolean;
  onClick?: () => void;
  css?: CSS;
}

export const PlayButton = ({ currentlyPlaying, onClick, ...props }: PlayButtonProps) => {
  return (
    <IconButton rounded="full" onClick={onClick} css={{ ...props.css }}>
      {currentlyPlaying ? <IoPause /> : <IoPlaySharp style={{ marginRight: -2 }} />}
    </IconButton>
  );
};
