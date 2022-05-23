import { useAuth } from '@/modules/auth/AuthContext';
import { styled } from '@/stitches.config';
import { Box } from '@/ui/Box';
import { Flex } from '@/ui/Flex';
import { DiscIcon, StackIcon, UploadIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavItem = styled('a', {
  py: '$2',
  pr: '$4',
  pl: 0,
  br: '$full',
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  color: '$slate10',

  '&:hover': {
    color: '$slate11',
  },

  '& svg': {
    width: 18,
    height: 18,
  },

  variants: {
    selected: {
      true: {
        color: '$slate12',
        '&:hover': {
          color: '$slate12',
        },
      },
    },
  },
});

export const Nav = () => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const { walletAddress } = useAuth();

  let src;

  switch (resolvedTheme) {
    case 'light':
      src = '/static/img/logo_text_dark.svg';
      break;
    case 'dark':
      src = '/static/img/logo_text.svg';
      break;
    default:
      src = '/static/img/logo_text.svg';
      break;
  }

  return (
    <Flex
      direction="column"
      css={{
        gap: '$10',
        borderRight: '1px solid $colors$slate6',
        pl: '$8',
        pr: '$10',
        pt: '$5',
      }}
    >
      <Box css={{ py: '$2' }}>
        <Image width={140} height={32} objectFit="cover" src={src} alt="logo" />
      </Box>
      <Flex
        direction="column"
        css={{
          gap: '$5',
          p: '$1',
        }}
        as="nav"
      >
        <Link href="/" passHref>
          <NavItem selected={router.pathname === '/'}>
            <DiscIcon />
            Discover
          </NavItem>
        </Link>
        {walletAddress && (
          <>
            <Link href="/" passHref>
              <NavItem selected={router.pathname === '/library'}>
                <StackIcon />
                Library
              </NavItem>
            </Link>
            <Link href="/upload" passHref>
              <NavItem selected={router.pathname === '/upload'}>
                <UploadIcon />
                Upload
              </NavItem>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};
