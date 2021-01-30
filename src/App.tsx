import React from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
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
      <Grid
        container
        direction="column"
        justify="space-between"
        style={{ minHeight: '100vh' }}
        alignItems="center"
      >
        <Grid item style={{ flex: 1 }}>
          <MainPage />
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

export default App;
