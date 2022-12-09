import { useEffect, useState } from 'react';
import { AppHeader } from '../modules/layout/AppHeader';
import { getAccount } from '../lib/api';
import { Account } from '../types';
import { Container } from '../ui/Container';
import { Heading } from '../ui/Heading';
import { Box } from '../ui/Box';
import { Flex } from '../ui/Flex';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';
import { appConfig } from '@/config';
import { useAuth } from '@/modules/auth/AuthContext';
import { ProfileCardContainer } from '../components/ProfileCardContainer';
import { styled } from '../stitches.config';
import { abbreviateAddress } from '../utils';
import { IconButton } from '../ui/IconButton';
import {
  CopyIcon,
  DiscordLogoIcon,
  ExternalLinkIcon,
  GitHubLogoIcon,
  QuestionMarkCircledIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/Tooltip';
import { greenDark } from '@radix-ui/colors';

const ProfileImage = styled('img', {
  objectFit: 'cover',
  objectPosition: 'center',
  width: 150,
  height: 150,
  br: '$lg',
});

const Profile = () => {
  const { connecting, walletAddress, account, verification } = useAuth();
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (account) {
      console.log(verification);
    }
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      setIsOpen(true);
    });
  };

  return (
    <Container>
      {connecting ? (
        <Box />
      ) : (
        <Box>
          {account ? (
            <Heading css={{ textAlign: 'center', color: '$slate11' }}>
              Hello, {account.profile.name}.
            </Heading>
          ) : walletAddress ? (
            <Heading css={{ textAlign: 'center', color: '$slate11' }}>{walletAddress}</Heading>
          ) : (
            <Heading css={{ textAlign: 'center', color: '$slate11' }}>
              Please Connect your wallet to see your profile
            </Heading>
          )}
          {account ? (
            <ProfileCardContainer css={{ my: '$10', mx: 'auto', maxW: 420, gap: '$8' }}>
              <Flex gap="6">
                <ProfileImage src={`${appConfig.gatewayUrl}/${account.profile.avatar}`} />
                <Flex direction="column" justify="between">
                  <Heading css={{ color: '$slate11' }} as="h3" size="xl">
                    {account?.profile.name}
                  </Heading>
                  <Flex align="center" gap="1">
                    <Text css={{ color: '$slate9' }}>Address: </Text>
                    <Text
                      css={{
                        transition: 'box-shadow .25s .1s ease',
                        display: 'flex',
                        gap: '$2',
                        alignItems: 'center',
                        boxShadow: 'none',
                        '&:hover': { boxShadow: '0 1px 0 0 $colors$slate6' },
                      }}
                      as="a"
                      href={`${appConfig.viewblockAddress}/${account?.profile.addr}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {abbreviateAddress(account?.profile.addr)}
                      <ExternalLinkIcon />
                    </Text>
                  </Flex>
                  <Text>
                    <Box css={{ color: '$slate9' }} as="span">
                      Handle:
                    </Box>{' '}
                    {account?.profile.handle}
                  </Text>
                  <Flex align="center" gap="2">
                    <Text>
                      <Box css={{ color: '$slate9' }} as="span">
                        Verified:{' '}
                      </Box>
                      {verification?.verified ? 'Yes' : 'No'}
                    </Text>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <IconButton
                          as="div"
                          size="xs"
                          variant="ghost"
                          css={{ '&:hover': { bg: '$slate4' } }}
                        >
                          <QuestionMarkCircledIcon />
                        </IconButton>
                      </TooltipTrigger>
                      <TooltipContent>
                        <Text css={{ color: '$slate9' }}>Verified?</Text>
                        <Text css={{ mb: '$4' }}>
                          Used to indicate whether an address has been verified or not.
                        </Text>
                        <Text css={{ color: '$slate9' }}>Trust score?</Text>
                        <Text css={{ mb: '$4' }}>
                          A score that can be boosted by other people verifying you.
                        </Text>
                      </TooltipContent>
                    </Tooltip>
                  </Flex>
                  <Text>
                    <Box css={{ color: '$slate9' }} as="span">
                      Trust Score:{' '}
                    </Box>
                    {verification?.percentage ? verification.percentage : 0}%
                  </Text>
                </Flex>
              </Flex>
              <Flex direction="column" gap="2">
                <Heading css={{ color: '$slate11' }} as="h3" size="lg">
                  About me
                </Heading>
                <Box css={{ height: 1, bg: '$slate6' }} />
                <Text css={{ color: '$slate9' }}>{account?.profile.bio}</Text>
              </Flex>
              <Flex direction="column" gap="2">
                <Heading css={{ color: '$slate11' }} as="h3" size="lg">
                  Connect
                </Heading>
                <Flex gap="4">
                  <IconButton
                    variant="ghost"
                    css={{ bg: '$slate3', color: '$blue10', '&:hover': { color: '$blue11' } }}
                    as="a"
                    href={`${appConfig.twitterUrl}/${account?.profile.links.twitter}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwitterLogoIcon />
                  </IconButton>
                  <IconButton
                    variant="ghost"
                    css={{ bg: '$slate3', color: '$slate10', '&:hover': { color: '$slate11' } }}
                    as="a"
                    href={`${appConfig.githubUrl}/${account?.profile.links.twitter}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubLogoIcon />
                  </IconButton>
                  <Tooltip
                    open={isOpen}
                    onOpenChange={() => setIsOpen(!isOpen)}
                    delayDuration={200}
                  >
                    <TooltipTrigger asChild>
                      <IconButton
                        disabled={isCopied}
                        aria-label="Copy discord link"
                        variant="ghost"
                        css={{
                          bg: '$slate3',
                          color: '$violet10',
                          '&:hover': { color: '$violet11' },
                        }}
                        onClick={() => copyToClipboard(account.profile.links.discord)}
                      >
                        <DiscordLogoIcon />
                      </IconButton>
                    </TooltipTrigger>
                    <TooltipContent
                      css={{
                        boxShadow: isCopied ? 'none' : '0 0 0 1px $colors$slate6',
                        bg: isCopied ? greenDark.green11 : '$slate3',
                        color: isCopied ? '$slate1' : '$slate11',
                      }}
                      side="top"
                      sideOffset={8}
                    >
                      {isCopied ? 'Copied to clipboard!' : 'Copy discord'}
                    </TooltipContent>
                  </Tooltip>
                </Flex>
              </Flex>
            </ProfileCardContainer>
          ) : walletAddress ? (
            <Flex css={{ my: '$10', mx: 'auto' }} direction="column" gap="4">
              <Text>No account information to display.</Text>
              <Button
                css={{ alignSelf: 'start' }}
                as="a"
                href={appConfig.accountUrl}
                target="_blank"
                rel="noreferrer"
              >
                Create an account for the permaweb
              </Button>
            </Flex>
          ) : null}
        </Box>
      )}
    </Container>
  );
};

export default Profile;
