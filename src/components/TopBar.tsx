import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  Brightness4 as DarkThemeIcon,
  Brightness7 as LightThemeIcon,
} from '@material-ui/icons';
import { useThemeChoice, ThemeChoice } from '../hooks';

const TopBar: React.FC = () => {
  const [themeChoice, setThemeChoice] = useThemeChoice();
  const isDarkSide = themeChoice === ThemeChoice.DARK;

  const handleThemeChoiceButtonClick = React.useCallback(() => {
    setThemeChoice(isDarkSide ? ThemeChoice.LIGHT : ThemeChoice.DARK);
  }, [setThemeChoice, isDarkSide]);

  return (
    <AppBar position="absolute">
      <Toolbar>
        <Typography component="h1" style={{ flex: 1 }}>
            AWS Console Switch Role Portal
        </Typography>
        <IconButton onClick={handleThemeChoiceButtonClick}>
          {isDarkSide ? (
            <LightThemeIcon />
            ) : (
            <DarkThemeIcon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
