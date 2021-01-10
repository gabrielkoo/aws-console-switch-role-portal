import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import MainPage from './MainPage';
import { useTheme } from './hooks';

const App = () => {
  const theme = useTheme();

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
