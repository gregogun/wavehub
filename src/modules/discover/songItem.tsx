import { PlayButton } from '@/components/PlayButton';
import { appConfig } from '@/config';
import { styled } from '@/stitches.config';
import { SongInfo } from '@/types';
import { Box } from '@/ui/Box';
import { Flex } from '@/ui/Flex';
import { IconButton } from '@/ui/IconButton';
import { Text } from '@/ui/Text';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { usePlayer } from '../player/context';

const Audio = styled('audio', {
  width: '100%',
});

interface SongItemProps {
  audioTxId: string;
  coverTxId: string;
  title: string;
  artist: string;
  id: string;
  tracklist: SongInfo[];
  setTracklist: (tracklist: SongInfo[]) => void;
}

export const SongItem = ({
  artist,
  title,
  audioTxId,
  coverTxId,
  tracklist,
  setTracklist,
  id,
}: SongItemProps) => {
  const { setCurrentTrackId, currentTrackId } = usePlayer();
  const coverLoader = ({ src }) => `${appConfig.devGatewayUrl}/${coverTxId}`;

  const handleClick = () => {
    setTracklist(tracklist);
    setCurrentTrackId(id);
  };

  return (
    <Flex direction="column" gap="3" css={{ p: '$2', br: '$xl' }}>
      <Box
        css={{
          position: 'relative',
          br: '$xl',
          overflow: 'hidden',
          width: 240,
          height: 240,
          cursor: 'pointer',
          boxShadow: '0 0 0 2px $colors$slate2',

          '&:hover': {
            '& div': {
              display: 'grid',
            },
          },
        }}
      >
        <Box
          css={{
            display: 'none',
            position: 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            placeItems: 'center',
            zIndex: 1,
            background:
              'linear-gradient(0deg, rgba(0, 0, 0, 0.723) 0%, rgba(0, 0, 0, 0.706) 2.1%, rgba(0, 0, 0, 0.672) 2.1%,  rgba(0, 0, 0, 0.641) 6.4%, rgba(0, 0, 0, 0.628) 8.1%, rgba(0, 0, 0, 0.6) 10.8%, rgba(0, 0, 0, 0.55) 12.4%,  rgba(0, 0, 0, 0.531) 14.4%, rgba(0, 0, 0, 0.5) 16.2%, rgba(0, 0, 0, 0.486) 19.5%, rgba(0, 0, 0, 0.45) 22.5%, rgba(0, 0, 0, 0.4) 29%, rgba(0, 0, 0, 0.35) 35.3%, rgba(0, 0, 0, 0.3) 41.2%, rgba(0, 0, 0, 0.275) 47.1%,rgba(0, 0, 0, 0.25) 52.9%, rgba(0, 0, 0, 0.225) 58.8%, rgba(0, 0, 0, 0.2) 64.7%, rgba(0, 0, 0, 0.175) 71%, rgba(0, 0, 0, 0.15) 77.5%, rgba(0, 0, 0, 0.125) 84.5%, rgba(0, 0, 0, 0.1) 91.9%, rgba(0, 0, 0, 0.05) 100% )',
          }}
        >
          <PlayButton
            currentlyPlaying={currentTrackId === id}
            onClick={handleClick}
            css={{
              bg: 'rgba(0, 0, 0, 0.44)',
              boxShadow: 'none',
              boxSize: '$16',

              '& svg': {
                boxSize: '$8',
                fill: 'white',
              },

              '&:hover': {
                bg: 'rgba(0, 0, 0, 0.55)',
                boxShadow: 'none',
              },

              '&:active': {
                bg: 'rgba(0, 0, 0, 0.66)',
              },
            }}
          />
          <IconButton
            css={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              color: 'white',
              '&:hover': {
                bg: 'rgba(0, 0, 0, 0.22)',
                boxShadow: 'none',
              },

              '&:active': {
                bg: 'rgba(0, 0, 0, 0.33)',
              },

              '& svg': {
                boxSize: '$5',
              },
            }}
            variant="ghost"
            size="lg"
          >
            <DotsHorizontalIcon />
          </IconButton>
        </Box>
        <Image
          priority
          loader={coverLoader}
          layout="fill"
          src={`${appConfig.devGatewayUrl}/${coverTxId}`}
          objectFit="cover"
          objectPosition="center"
        />
      </Box>
      <Box css={{ px: '$2' }}>
        <Text css={{ color: '$slate12' }}>{title}</Text>
        <Text>{artist}</Text>
      </Box>
    </Flex>
  );
};
