import type { AppProps } from 'next/app';
import { AuthProvider } from '@/modules/auth/AuthContext';
import { ThemeProvider } from 'next-themes';
import { darkTheme, globalCss } from '../stitches.config';
import { TooltipProvider } from '../ui/Tooltip';
import { Flex } from '@/ui/Flex';
import { Nav } from '@/modules/layout/Nav';
import { AppHeader } from '@/modules/layout/AppHeader';
import { Box } from '@/ui/Box';
import { PlayerProvider } from '@/modules/player/context';

const GlobalStyle = globalCss({
  'html, body, #root, #__next': {
    height: '100%',
  },

  a: {
    textDecoration: 'none',
  },

  '#__next': {
    position: 'relative',
    zIndex: 0,
  },
});

GlobalStyle();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <PlayerProvider>
        <TooltipProvider>
          <ThemeProvider
            disableTransitionOnChange
            attribute="class"
            defaultTheme="dark"
            value={{ light: 'light-theme', dark: darkTheme.toString() }}
          >
            <Flex css={{ height: '100%' }}>
              <Nav />
              <Box css={{ width: '100%' }}>
                <AppHeader />
                <Component {...pageProps} />
              </Box>
            </Flex>
          </ThemeProvider>
        </TooltipProvider>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default MyApp;
