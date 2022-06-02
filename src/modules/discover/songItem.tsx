import { appConfig } from '@/config';
import { styled } from '@/stitches.config';
import { Box } from '@/ui/Box';
import { Flex } from '@/ui/Flex';
import { Text } from '@/ui/Text';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Audio = styled('audio', {
  width: 240,
});

interface SongItemProps {
  audioTxId: string;
  coverTxId: string;
  title: string;
  artist: string;
}

export const SongItem = ({ artist, title, audioTxId, coverTxId }: SongItemProps) => {
  const coverLoader = ({ src }) => `${appConfig.gatewayUrl}/${coverTxId}`;
  return (
    <Flex direction="column" gap="3">
      <Box css={{ position: 'relative', br: '$md', overflow: 'hidden' }}>
        <Image
          priority
          loader={coverLoader}
          width={240}
          height={240}
          src={`${appConfig.gatewayUrl}/${coverTxId}`}
          objectFit="cover"
        />
      </Box>
      <Box>
        <Text>{title}</Text>
        <Text css={{ fontWeight: 600 }}>{artist}</Text>
      </Box>
      <Audio src={`${appConfig.gatewayUrl}/${audioTxId}`} controls />
    </Flex>
  );
};
