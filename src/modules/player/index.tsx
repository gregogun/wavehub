import { appConfig } from '@/config';
import { SongInfo } from '@/types';
import { Box } from '@/ui/Box';
import { Flex } from '@/ui/Flex';
import { Text } from '@/ui/Text';
import {
  LoopIcon,
  ShuffleIcon,
  SpeakerLoudIcon,
  SpeakerModerateIcon,
  SpeakerOffIcon,
  SpeakerQuietIcon,
} from '@radix-ui/react-icons';
import Image from 'next/image';
import { createRef, useEffect, useRef, useState } from 'react';
import { usePlayer } from './context';
import { Music as MusicIcon } from 'react-feather';
import ReactAudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { IoPause, IoPlaySharp } from 'react-icons/io5';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';
import { css, darkTheme } from '@/stitches.config';
import { IconButton } from '@/ui/IconButton';

const loopOn = css({
  color: '$violet11',
});

const loopOff = css({
  opacity: '50%',
});

interface AudioPlayerProps {
  audioSrc?: string;
  trackList: SongInfo[];
}

export const AudioPlayer = ({ trackList }: AudioPlayerProps) => {
  const { currentTrack, nextTrack, prevTrack } = usePlayer();
  const [isShuffled, setIsShuffled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef?.current) {
      console.log(audioRef.current.readyState);
    }
  }, [audioRef]);

  const currentSong = trackList[currentTrack];
  const title = currentSong?.title;
  const artist = currentSong?.artist;
  const audioSrc = currentSong?.audioTxId;
  const cover = currentSong?.coverTxId;

  return (
    <Box
      css={{
        position: 'fixed',
        width: '100%',
        left: 0,
        right: 16,
        bottom: 0,
      }}
    >
      <Flex
        align="center"
        justify="between"
        css={{
          display: 'flex',
          p: '$4',
          bg: '$slate1',
          borderTop: '1px solid $colors$slate6',
          position: 'relative',
        }}
      >
        <Flex css={{ w: 250 }} align="center" gap="3">
          <Box
            css={{
              position: 'relative',
              br: '$xs',
              overflow: 'hidden',
              boxShadow: '0 0 0 1px $colors$slate2',
            }}
          >
            {cover ? (
              <Box
                as="img"
                css={{
                  width: 48,
                  height: 48,
                  objectFit: 'cover',
                  br: '$sm',
                }}
                src={`${appConfig.devGatewayUrl}/${cover}`}
              />
            ) : (
              <Box
                css={{
                  width: 48,
                  height: 48,
                  display: 'grid',
                  placeItems: 'center',
                  '& svg': { strokeWidth: 1 },
                }}
              >
                <MusicIcon />
              </Box>
            )}
          </Box>
          {title && artist ? (
            <Flex direction="column">
              <Text size="sm">{title}</Text>
              <Text size="sm" css={{ fontWeight: 600 }}>
                {artist}
              </Text>
            </Flex>
          ) : (
            <Box css={{ width: 80 }} />
          )}
        </Flex>

        <Box
          css={{
            maxW: 964,

            // main and volume controls
            '.rhap_stacked': {
              display: 'flex',
              flexDirection: 'row-reverse',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              gap: '$10',
            },

            '.rhap_progress-section': {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '$3',
              width: '100%',
              fontSize: '$xs',

              button: {
                all: 'unset',
                cursor: 'pointer',
                border: 0,
                padding: 0,
                margin: 0,
                textDecoration: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                appearance: 'none',
                boxSizing: 'border-box',
                display: 'inline-flex',
                userSelect: 'none',
                WebkitTapHighlightColor: 'rgba(0,0,0,0)',
                fontFamily: 'inherit',
                fontWeight: '$medium',
                lineHeight: 1,
                backgroundColor: 'transaparent',
                boxSize: '$10',
                br: '$full',
                color: '$slate10',

                '&:focus-visible': {
                  outline: 'none',
                  boxShadow: '0 0 0 2px $colors$blue8',
                },

                '&:hover': {
                  color: '$slate12',
                },

                '&:active': {
                  color: '$slate12',
                },

                '&:disabled': {
                  opacity: '50%',
                  cursor: 'not-allowed',
                },
              },

              '& svg': {
                boxSize: '$4',
              },
            },

            '.rhap_progress-container': {
              br: '$full',
              backgroundColor: '$slate7',
              height: '$1',
              width: 640,

              '&:hover': {
                '.rhap_progress-indicator': {
                  height: '$3',
                  width: '$3',
                },

                '.rhap_progress-filled': {
                  backgroundColor: '$violet9',
                  br: '$full 0 0 $full',

                  [`.${darkTheme} &`]: {
                    backgroundColor: '$violet11',
                  },
                },
              },
            },

            '.rhap_progress-bar': {
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              br: '$full',
              height: '$1',
            },

            '.rhap_progress-indicator': {
              position: 'absolute',
              backgroundColor: '$slate12',
              br: '$full',
              ml: '-$1',
              zIndex: 1,
            },

            '.rhap_progress-filled': {
              position: 'absolute',
              left: 0,
              br: '$full',
              backgroundColor: '$slate12',
              height: '$1',
            },

            '.rhap_current-time': {
              width: 32,
            },

            '.rhap_controls-section': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              button: {
                all: 'unset',
                cursor: 'pointer',
                border: 0,
                padding: 0,
                margin: 0,
                textDecoration: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                appearance: 'none',
                boxSizing: 'border-box',
                display: 'inline-flex',
                userSelect: 'none',
                WebkitTapHighlightColor: 'rgba(0,0,0,0)',
                fontFamily: 'inherit',
                fontWeight: '$medium',
                lineHeight: 1,
                backgroundColor: 'transaparent',
                boxSize: '$9',
                br: '$full',
                color: '$slate10',

                '&:focus-visible': {
                  outline: 'none',
                  boxShadow: '0 0 0 2px $colors$blue8',
                },

                '&:hover': {
                  color: '$slate12',
                },

                '&:active': {
                  color: '$slate12',
                },

                '&:disabled': {
                  opacity: '50%',
                  cursor: 'not-allowed',
                },
              },

              svg: {
                boxSize: 18,
              },

              '.rhap_play-pause-button': {
                backgroundColor: '$violet9',
                color: '$slate1',

                [`.${darkTheme} &`]: {
                  backgroundColor: '$violet11',
                  color: '$slate1',
                },

                '&:hover': {
                  color: '$slate1',
                  transform: 'scale(1.05)',
                },
              },
            },

            '.rhap_main-controls': {
              display: 'flex',
              gap: '$2',
            },

            '.rhap_volume-controls': {
              position: 'absolute',
              right: 0,
              mr: '$10',
            },

            '.rhap_volume-container': {
              display: 'flex',
              alignItems: 'center',
            },

            '.rhap_volume-bar': {
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              backgroundColor: '$slate9',
              width: 100,
              height: 4,
              br: '$full',

              '&:hover': {
                '.rhap_volume-indicator': {
                  height: '$3',
                  width: '$3',
                },

                '.rhap_volume-filled': {
                  backgroundColor: '$violet9',
                  br: '$full 0 0 $full',

                  [`.${darkTheme} &`]: {
                    backgroundColor: '$violet11',
                  },
                },
              },
            },

            '.rhap_volume-filled': {
              position: 'absolute',
              left: 0,
              backgroundColor: '$slate12',
              br: '$full',
              height: 4,
            },

            '.rhap_volume-indicator': {
              position: 'absolute',
              backgroundColor: '$slate12',
              br: '$full',
            },
          }}
        >
          <ReactAudioPlayer
            ref={audioRef}
            src={`${appConfig.devGatewayUrl}/${audioSrc}`}
            autoPlay={false}
            onClickNext={() => nextTrack(currentTrack)}
            onClickPrevious={prevTrack}
            showJumpControls={false}
            showSkipControls
            showFilledVolume
            showDownloadProgress
            customIcons={{
              play: <IoPlaySharp style={{ marginRight: -2 }} />,
              pause: <IoPause />,
              previous: <MdSkipPrevious />,
              next: <MdSkipNext />,
              loop: <LoopIcon className={loopOn()} />,
              loopOff: <LoopIcon className={loopOff()} />,
              volume: <SpeakerLoudIcon />,
              volumeMute: <SpeakerOffIcon />,
            }}
            customProgressBarSection={[
              RHAP_UI.CURRENT_TIME,
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.DURATION,
              RHAP_UI.VOLUME_CONTROLS,
            ]}
            customControlsSection={[
              RHAP_UI.ADDITIONAL_CONTROLS,
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.LOOP,
            ]}
            customAdditionalControls={[
              <IconButton
                onClick={() => setIsShuffled(!isShuffled)}
                css={{
                  '& svg': {
                    opacity: isShuffled ? '100%' : '50%',
                    color: isShuffled ? '$violet11' : null,
                  },
                }}
              >
                <ShuffleIcon />
              </IconButton>,
            ]}
          />
        </Box>
        <Box />
      </Flex>
    </Box>
  );
};
