import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

export const useTheme = () => {
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
  return theme;
};
