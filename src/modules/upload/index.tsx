import { styled } from '@/stitches.config';
import { Box } from '@/ui/Box';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Flex } from '@/ui/Flex';
import { Heading } from '@/ui/Heading';
import { Input } from '@/ui/Input';
import { Text } from '@/ui/Text';
import { Textarea } from '@/ui/Textarea';
import { TrashIcon, UploadIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';
import { FormEvent, useEffect, useState } from 'react';
import { FormikErrors, useFormik } from 'formik';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/Tooltip';
import Image from 'next/image';
import { IconButton } from '@/ui/IconButton';
import { upload } from '@/lib/upload';

const acceptedAudioFileNames = 'audio/mpeg, audio/wav, audio/x-aiff, audio/x-flac';
const acceptedImageFileNames = 'image/png, image/jpeg, image/gif';

const FormHelperError = styled('p', {
  color: '$red11',
  m: 0,
  mt: '$1',
});

const HiddenInput = styled(Input, {
  width: 0.1,
  height: 0.1,
  opacity: 0,
  overflow: 'hidden',
  position: 'absolute',
  zIndex: -1,
});

const StyledLabel = styled(Label, {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  py: '$3',
  px: '$4',
  cursor: 'pointer',
  br: '$md',

  variants: {
    variant: {
      solid: {
        boxShadow: '0 0 0 2px $colors$slate7',

        '&:hover': {
          boxShadow: '0 0 0 2px $colors$slate8',
        },
      },
      dashed: {
        border: '2px dashed $colors$slate7',

        '&:hover': {
          border: '2px dashed $colors$slate8',
        },
      },
    },
    active: {
      true: {
        boxShadow: '0 0 0 2px $colors$violet11',
        color: '$slate12',

        '&:hover': {
          boxShadow: '0 0 0 2px $colors$violet11',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'solid',
  },
});

const Span = styled('span', {
  '& svg': {
    width: '$5',
    height: '$5',
  },
});

const FormRow = styled(Flex, {
  defaultVariants: {
    direction: 'column',
  },
});

interface FormProps {
  trackName: string;
  artistName: string;
  trackDescription: string;
}

export const UploadForm = () => {
  const [audioFile, setAudioFile] = useState<File>();
  const [audioUrl, setAudioUrl] = useState<string>();
  const [audioData, setAudioData] = useState<ArrayBuffer>();
  const [coverImageFile, setCoverImageFile] = useState<File>();
  const [coverImage, setCoverImage] = useState<string>();
  const [coverImageData, setCoverImageData] = useState<ArrayBuffer>();
  const [imageFileError, setImageFileError] = useState<string>();
  const [audioFileError, setAudioFileError] = useState<string>();

  // useEffect(() => {
  //   // check config is correct
  //   console.log(webWallet.getArweaveConfig());
  // }, []);

  const formik = useFormik<FormProps>({
    initialValues: {
      artistName: '',
      trackDescription: '',
      trackName: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values) => {
      const errors: FormikErrors<FormProps> = {};

      if (!values.artistName) {
        errors.artistName = 'Artist name required';
      }

      if (!values.trackName) {
        errors.trackName = 'Track name required';
      }

      if (values.artistName && values.artistName.length > 50) {
        errors.artistName = 'Artist name too long';
      }
      if (values.trackName && values.trackName.length > 60) {
        errors.trackName = 'Track name too long';
      }

      return errors;
    },
    onSubmit: async (values, { validateForm, setSubmitting }) => {
      console.log(values);
      validateMediaUpload();

      if (audioFile && coverImage) {
        upload(
          formik.values.artistName,
          formik.values.trackName,
          formik.values.trackDescription,
          audioData,
          audioFile,
          coverImageData,
          coverImageFile
        );
      }

      setSubmitting(false);
    },
  });

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files[0];

    try {
      if (file.type.includes('audio')) {
        try {
          if (file.size > 52428800) {
            setAudioFileError('The file size is too big. Try uploading something below 50MB');
            throw new Error('The file size is too big');
          }

          const supportedFileType = checkAudioType(file.type);

          if (!supportedFileType) {
            setAudioFileError('Unsupported file type.');
            throw new Error('The file size is too big');
          }

          setAudioFileError(null);
          setAudioFile(file);

          let reader = new FileReader();
          reader.onload = function () {
            if (reader.result) {
              let blob;
              let url;
              blob = new Blob([file], { type: 'audio/wav' });
              url = window.URL.createObjectURL(blob);
              setAudioUrl(url);
              setAudioData(reader.result as ArrayBuffer);
            }
          };
          reader.readAsArrayBuffer(file);
        } catch (error) {
          console.error(error);
        }
      }

      if (file.type.includes('image')) {
        try {
          const image = URL.createObjectURL(file);

          // if file size is > 10MB
          if (file.size > 10485760) {
            setImageFileError('The file size is too big. Try uploading something below 10MB');
            throw new Error('The file size is too big');
          }

          const supportedFileType = checkImageType(file.type);

          if (!supportedFileType) {
            setImageFileError(
              'Unsupported file type. Try uploading an image in .jpeg or .png format.'
            );
            throw new Error('Unsupported file type');
          }

          setImageFileError(null);
          setCoverImage(image);
          setCoverImageFile(file);

          let reader = new FileReader();
          reader.onload = function () {
            if (reader.result) {
              setCoverImageData(reader.result as ArrayBuffer);
            }
          };
          reader.readAsArrayBuffer(file);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      setAudioFileError('Unsupported file type.');
      setImageFileError('Unsupported file type.');
      console.error(error);
    }
  };

  const checkImageType = (type: string) => {
    switch (type) {
      case 'image/jpeg':
        return true;
      case 'image/png':
        return true;
      case 'image/gif':
        return true;
      default:
        return false;
    }
  };

  const checkAudioType = (type: string) => {
    switch (type) {
      case 'audio/wav':
        return true;
      case 'audio/mpeg':
        return true;
      case 'audio/x-flac':
        return true;
      case 'audio/x-aiff':
        return true;
      default:
        return false;
    }
  };

  const validateMediaUpload = () => {
    try {
      if (!audioFile && !coverImage) {
        setAudioFileError('No audio file uploaded.');
        setImageFileError('No image file uploaded.');
        throw new Error('No image file uploaded.');
      }

      if (!audioFile) {
        setAudioFileError('No audio file uploaded.');
        throw new Error('No audio file uploaded.');
      }

      if (!coverImage) {
        setImageFileError('No image file uploaded.');
        throw new Error('No image file uploaded.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container css={{ p: '$8' }}>
      <Flex direction="column" gap="3" css={{ alignSelf: 'start', alignItems: 'center' }}>
        <Heading size="md">Track preview</Heading>
        <Flex gap="4" css={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>
            {formik.values.artistName ? formik.values.artistName : 'Artist Name'} -{' '}
            {formik.values.trackName ? formik.values.trackName : 'Song Name'}
          </Text>
          <audio src={audioUrl} controls />
        </Flex>
      </Flex>
      <Flex
        onSubmit={formik.handleSubmit}
        gap="20"
        css={{ p: '$10', justifyContent: 'center' }}
        as="form"
      >
        <Flex gap="10" direction="column">
          <Heading
            css={{ pb: '$1', boxShadow: '0 1px 0 0 $colors$slate12', alignSelf: 'start' }}
            weight="semibold"
            size="xs"
          >
            Release Details
          </Heading>

          <FormRow>
            <Label aria-required htmlFor="trackName">
              Track name
            </Label>
            {formik.errors.trackName && (
              <FormHelperError>{formik.errors.trackName}</FormHelperError>
            )}
            <Input
              type="text"
              css={{ mt: '$2' }}
              onChange={formik.handleChange}
              value={formik.values.trackName}
              size="lg"
              name="trackName"
              id="trackName"
              placeholder="Track name"
            />
          </FormRow>

          <FormRow>
            <Label aria-required htmlFor="artistName">
              Artist name
            </Label>
            {formik.errors.artistName && (
              <FormHelperError>{formik.errors.artistName}</FormHelperError>
            )}
            <Input
              css={{ mt: '$2' }}
              onChange={formik.handleChange}
              value={formik.values.artistName}
              size="lg"
              name="artistName"
              id="artistName"
              placeholder="Artist name"
              type="text"
            />
          </FormRow>

          <FormRow>
            <Label aria-required htmlFor="trackDescription">
              About this track
            </Label>
            <Textarea
              name="trackDescription"
              id="trackDescription"
              value={formik.values.trackDescription}
              onChange={formik.handleChange}
              maxLength={400}
              css={{ mt: '$2' }}
              placeholder="About this release..."
            />
          </FormRow>
        </Flex>

        <Flex align="start" gap="5" direction="column">
          <Heading
            css={{ pb: '$1', boxShadow: '0 1px 0 0 $colors$slate12' }}
            weight="semibold"
            size="xs"
          >
            Audio
          </Heading>

          <FormRow css={{ mb: '$8', maxW: 282 }}>
            {audioFileError && <FormHelperError>{audioFileError}</FormHelperError>}
            <HiddenInput
              multiple={false}
              accept={acceptedAudioFileNames}
              onChange={handleChange}
              type="file"
              name="audioFileName"
              id="audioFileName"
            />
            <StyledLabel
              active={audioFile ? true : false}
              css={{
                mt: '$2',
                w: 250,
                justifyContent: 'center',
              }}
              htmlFor="audioFileName"
            >
              {audioFile ? (
                <IconButton
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAudioFile(null);
                  }}
                  variant="ghost"
                >
                  <TrashIcon />
                </IconButton>
              ) : (
                <Span>
                  <UploadIcon />
                </Span>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Span
                    css={{
                      overflow: 'hidden',
                      display: '-webkit-box',
                      '-webkit-line-clamp': 1,
                      '-webkit-box-orient': 'vertical',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {audioFile ? audioFile.name : 'Upload audio file'}
                  </Span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={4}>
                  {audioFile ? audioFile.name : 'No song data'}
                </TooltipContent>
              </Tooltip>
            </StyledLabel>
          </FormRow>

          <Heading
            css={{ pb: '$1', boxShadow: '0 1px 0 0 $colors$slate12' }}
            weight="semibold"
            size="xs"
          >
            Artwork
          </Heading>

          {coverImage ? (
            <Box
              css={{
                boxSize: 282,
                position: 'relative',
                br: '$lg',
                overflow: 'hidden',
              }}
            >
              <IconButton
                onClick={() => setCoverImage(null)}
                css={{ position: 'absolute', top: '$2', right: '$2', zIndex: 1 }}
                variant="ghost"
              >
                <TrashIcon />
              </IconButton>
              <Image src={coverImage} layout="fill" objectFit="cover" objectPosition="center" />
            </Box>
          ) : (
            <FormRow css={{ mb: '$8', maxW: 282 }}>
              {imageFileError && <FormHelperError>{imageFileError}</FormHelperError>}
              <HiddenInput
                accept={acceptedImageFileNames}
                onChange={handleChange}
                type="file"
                name="image_file"
                id="image_file"
              />
              <StyledLabel
                variant="dashed"
                css={{
                  mt: '$2',
                  boxSize: 250,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '$2',
                }}
                htmlFor="image_file"
              >
                Upload Cover Art
                <Text size="xs">1000 x 1000 minimum</Text>
                <Text as="em" size="xs">
                  .jpg, .png, or .gif - 10MB max
                </Text>
              </StyledLabel>
            </FormRow>
          )}

          <Button type="submit" rounded="full" variant="solid" colorScheme="violet">
            Publish
          </Button>

          {/* {imageURI && (
          <Button as='a' href={imageURI} target='_blank' rel='noreferrer' rounded="full" variant="solid">
            View artwork
          </Button>
        )} */}
        </Flex>
      </Flex>
    </Container>
  );
};
