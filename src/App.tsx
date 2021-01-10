import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, useMediaQuery } from '@material-ui/core';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import MainPage from './MainPage';

const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#ec7211', // AWS's primary Color
          },
        },
      }),
    [prefersDarkMode],
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar />
      <MainPage />
      <Footer />
    </MuiThemeProvider>
  );
};

export default App;
