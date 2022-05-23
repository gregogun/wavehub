import { Dropzone } from '@/modules/upload/Dropzone';
import { Box } from '@/ui/Box';
import { Container } from '@/ui/Container';
import { Flex } from '@/ui/Flex';
import { Heading } from '@/ui/Heading';
import { Input } from '@/ui/Input';
import { Separator } from '@/ui/Separator';
import { Text } from '@/ui/Text';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useCallback } from 'react';

export const UploadForm = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const acceptedAudioFiles = {
    'audio/wave': ['.wav'],
    'audio/mpeg': ['.mp3'],
    'audio/aac': ['.aac'],
  };

  return (
    <Container css={{ p: '$8' }}>
      <Flex css={{ height: '100%', pb: '$10', justifyContent: 'center' }} gap="10" as="form">
        <Flex gap="2" direction="column">
          <Text size="lg" css={{ fontWeight: 600 }}>
            Upload your audio file
          </Text>
          <Text size="sm" css={{ color: '$slate9' }}>
            Upload an mp3, wav, or flac audio file (under 20mb)
          </Text>
          <Dropzone onDrop={onDrop} accept={acceptedAudioFiles}>
            <Label>Choose or drop your audio file here.</Label>
          </Dropzone>
        </Flex>
        <Separator orientation="vertical" />
        <Flex gap="2" direction="column">
          <Text size="lg" css={{ fontWeight: 600 }}>
            Track name
          </Text>
          <Input type="text" placeholder="track name" />
        </Flex>
      </Flex>
    </Container>
  );
};
