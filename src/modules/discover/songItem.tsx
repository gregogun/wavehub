import { appConfig } from '@/config';
import { styled } from '@/stitches.config';
import { SongInfo } from '@/types';
import { Box } from '@/ui/Box';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/ui/Dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/Dropdown';
import { Flex } from '@/ui/Flex';
import { Heading } from '@/ui/Heading';
import { IconButton } from '@/ui/IconButton';
import { Text } from '@/ui/Text';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/Tooltip';
import { abbreviateAddress } from '@/utils';
import { Cross2Icon, DotsHorizontalIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoPause, IoPlaySharp } from 'react-icons/io5';
import { usePlayer } from '../player/context';
import { getSongIndex } from '../player/utils';

const SongInfoItemTitle = styled(Text, {
  color: '$slate10',
});

const SongInfoItemContent = styled(Text, {
  color: '$slate12',
  fontWeight: 600,
});

interface SongItemProps {
  audioTxId: string;
  coverTxId: string;
  title: string;
  artist: string;
  id: string;
  owner: string;
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
  owner,
}: SongItemProps) => {
  const {
    setCurrentTrackId,
    setCurrentTrack,
    currentTrackId,
    currentTrack,
    playing,
    togglePlaying,
    audioRef,
    trackList: tracks,
  } = usePlayer();
  const [showSongInfo, setShowSongInfo] = useState(false);
  const coverLoader = ({ src }) => `${appConfig.devGatewayUrl}/${coverTxId}`;

  useEffect(() => {
    const currentTrackIndex = getSongIndex(currentTrackId, tracklist);
    setCurrentTrack(currentTrackIndex);
  }, [currentTrackId]);

  const handleOpenSongInfo = () => setShowSongInfo(true);
  const handleCloseSongInfo = () => setShowSongInfo(false);

  const handleClick = () => {
    if (audioRef?.current) {
      const audioPlayer = audioRef?.current;
      setTracklist(tracklist);
      setCurrentTrackId(id);

      // console.log(audioRef?.current.audio.current.duration);

      if (!audioPlayer.isPlaying() && audioRef?.current.audio.current.readyState === 4) {
        audioPlayer.audio.current.play();
      } else {
        audioPlayer.audio.current.pause();
      }
    }
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
          boxShadow: '0 0 0 1px $colors$slate2',

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
          <IconButton
            rounded="full"
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
          >
            {currentTrack === getSongIndex(id, tracklist) && playing ? (
              <IoPause />
            ) : (
              <IoPlaySharp />
            )}
          </IconButton>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <IconButton
                onClick={handleOpenSongInfo}
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
            </TooltipTrigger>
            <TooltipContent>Show song info</TooltipContent>
          </Tooltip>
        </Box>

        <Dialog open={showSongInfo} onOpenChange={handleCloseSongInfo}>
          <DialogContent css={{ maxW: 376 }}>
            <Box css={{ mb: '$8' }}>
              <DialogTitle asChild>
                <Text size="xl" css={{ fontWeight: 600, color: '$slate12', mb: '$3' }}>
                  Song info
                </Text>
              </DialogTitle>
              <DialogDescription asChild>
                <Text>Some information about this release.</Text>
              </DialogDescription>
            </Box>

            <Flex direction="column" gap="5">
              <Flex direction="column">
                <Flex justify="between">
                  <SongInfoItemTitle>Song Title</SongInfoItemTitle>
                  <SongInfoItemTitle>Artist Name</SongInfoItemTitle>
                </Flex>

                <Flex justify="between">
                  <SongInfoItemContent>{title}</SongInfoItemContent>
                  <SongInfoItemContent>{artist}</SongInfoItemContent>
                </Flex>
              </Flex>

              <Flex direction="column">
                <Flex justify="between">
                  <SongInfoItemTitle>Song Duration</SongInfoItemTitle>
                  <SongInfoItemTitle>Album</SongInfoItemTitle>
                </Flex>

                <Flex justify="between">
                  <SongInfoItemContent>3:36</SongInfoItemContent>
                  <SongInfoItemContent>N/A</SongInfoItemContent>
                </Flex>
              </Flex>

              <Flex direction="column">
                <Flex justify="between">
                  <SongInfoItemTitle>Uploaded by</SongInfoItemTitle>
                  <SongInfoItemTitle>Upload Date</SongInfoItemTitle>
                </Flex>

                <Flex justify="between">
                  <SongInfoItemContent
                    as="a"
                    href={`${appConfig.viewblockAddress}/${owner}`}
                    target="_blank"
                    rel="noreferrer"
                    css={{
                      cursor: 'pointer',
                      '&:hover': { color: '$violet11', boxShadow: '0 2px 0 0 $colors$violet11' },
                    }}
                  >
                    {abbreviateAddress(owner)}
                  </SongInfoItemContent>
                  <SongInfoItemContent>N/A</SongInfoItemContent>
                </Flex>
              </Flex>
            </Flex>

            <DialogClose asChild>
              <IconButton
                size="sm"
                variant="ghost"
                css={{ position: 'absolute', top: 24, right: 24, svg: { boxSize: '$4' } }}
              >
                <Cross2Icon />
              </IconButton>
            </DialogClose>
          </DialogContent>
        </Dialog>

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
