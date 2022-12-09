import Link from 'next/link';
import { Box } from '../../ui/Box';
import { Flex } from '../../ui/Flex';
import { styled } from '../../stitches.config';
import { Button } from '../../ui/Button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../../ui/Dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { IconButton } from '../../ui/IconButton';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cross1Icon,
  ExitIcon,
  MoonIcon,
  PersonIcon,
  SunIcon,
} from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/Dropdown';
import { abbreviateAddress } from '../../utils';
import { useTheme } from 'next-themes';
import { useAuth } from '@/modules/auth/AuthContext';
import { appConfig } from '@/config';
import { connect, getAccount } from '@/lib/api';
import { Heading } from '@/ui/Heading';
import { useRouter } from 'next/router';

const ProfileImage = styled('img', {
  objectFit: 'cover',
  objectPosition: 'center',
  width: 20,
  height: 20,
  br: '$full',
});

type WalletName = 'ArConnect' | 'ArweaveApp';

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark');
  };

  const mode = resolvedTheme === 'dark' ? 'light' : 'dark';

  return (
    <IconButton
      css={{ '& svg': { width: 13, height: 13 } }}
      size="sm"
      variant="outline"
      aria-label="Toggle theme"
      rounded="full"
      onClick={toggleTheme}
    >
      {mode === 'light' ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: 'absolute',
  top: '1rem',
  right: '1.5rem',
});

export const AppHeader = () => {
  const router = useRouter();
  const { connecting, account, walletAddress, setState } = useAuth();

  const handleConnect = async () => {
    try {
      setState({ connecting: true });
      await connect();
      const address = await window.arweaveWallet.getActiveAddress();
      const userAccount = await getAccount(address);
      if (await userAccount) {
        setState({ walletAddress: address, account: userAccount, connecting: false });
      } else {
        setState({ walletAddress: address, connecting: false });
      }
    } catch (e) {
      console.log('error', e);
      setState({ connecting: false });
    }
  };

  const handleDisconnect = () => {
    window.arweaveWallet.disconnect().then(() => {
      setState({ walletAddress: '' });
    });
  };

  let pageTitle;

  switch (router.pathname) {
    case '/':
      pageTitle = 'Discover';
      break;
    case '/upload':
      pageTitle = 'Upload';
      break;
    case '/profile':
      pageTitle = 'Profile';
      break;
    default:
      pageTitle = 'Page not found';
      break;
  }

  return (
    <Flex css={{ p: '$5' }} justify="between">
      <Heading as="h1">{pageTitle}</Heading>
      <Flex align="center" gap="4">
        <ThemeToggle />
        {connecting ? (
          <Button colorScheme="violet" rounded="full" variant="outline">
            Connecting...
          </Button>
        ) : walletAddress ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                colorScheme="violet"
                rounded="full"
                css={{ display: 'flex', gap: '$4' }}
                variant="outline"
              >
                {account ? (
                  <Flex as="span" align="center" gap="2">
                    <ProfileImage src={`${appConfig.gatewayUrl}/${account.profile.avatar}`} />
                    {account.profile.name}
                  </Flex>
                ) : !account && walletAddress ? (
                  <span>{abbreviateAddress(walletAddress)}</span>
                ) : (
                  <Box />
                )}
                <span>
                  <ChevronDownIcon />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8}>
              <Link href="/profile" passHref>
                <DropdownMenuItem
                  as="a"
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '$2',
                    lineHeight: 0,
                  }}
                  color="slate"
                >
                  <Box as="span">
                    <PersonIcon />
                  </Box>
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem color="red" onClick={handleDisconnect}>
                <Box as="span" css={{ display: 'inline-flex' }}>
                  <ExitIcon />
                </Box>
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button colorScheme="violet" variant="outline" rounded="full">
                Connect Wallet
              </Button>
            </DialogTrigger>
            <DialogContent css={{ display: 'flex', flexDirection: 'column', gap: '$4' }}>
              <DialogTitle size="lg" as="h3">
                Choose one of the following providers:
              </DialogTitle>
              {/* <Button
                onClick={handleConnect}
                size="lg"
                css={{
                  width: '$full',
                  justifyContent: 'center',
                  backgroundColor: '$violet3',
                  color: '$violet11',
                  boxShadow: `0 0 0 1px $colors$violet7`,

                  '&:hover': {
                    backgroundColor: '$violet4',
                    boxShadow: `0 0 0 1px $colors$violet8`,
                  },

                  '&:active': {
                    backgroundColor: '$violet5',
                    boxShadow: `0 0 0 1px $colors$violet8`,
                  },
                }}
              >
                ArConnect
              </Button> */}
              <Button
                onClick={handleConnect}
                size="lg"
                css={{
                  width: '$full',
                  justifyContent: 'center',
                }}
              >
                Arweave.app
              </Button>

              <StyledCloseButton asChild>
                <IconButton variant="outline">
                  <Cross1Icon />
                </IconButton>
              </StyledCloseButton>
            </DialogContent>
          </Dialog>
        )}
      </Flex>
    </Flex>
  );
};
