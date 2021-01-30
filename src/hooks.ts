import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { createGlobalState } from 'react-use';

export enum ThemeChoice {
  LIGHT = 'light',
  DARK = 'dark',
};
/* KHOOOOH PUUUHRR~ You don't know the power of the dark side! */
const DEFAULT_THEME = ThemeChoice.DARK;
const THEME_CHOICE_KEY = 'themeChoice';

const getThemeChoiceFromLocalStorage = (): ThemeChoice | null => {
  const themeChoice = localStorage.getItem(THEME_CHOICE_KEY) as ThemeChoice;
  if (Object.values(ThemeChoice).includes(themeChoice)) {
    return themeChoice;
  }
  return null;
};

const isDeviceDarkSide = () => !!window?.matchMedia('(prefers-color-scheme: dark)').matches;

// `useLocalStorage` is not yet fixed: https://github.com/streamich/react-use/issues/785
const useGlobalThemeChoice = createGlobalState(
  getThemeChoiceFromLocalStorage() || (isDeviceDarkSide() ? ThemeChoice.DARK : DEFAULT_THEME),
);

export const useThemeChoice = () => {
  const [themeChoice, setThemeChoice] = useGlobalThemeChoice();
  const setChoice = React.useCallback(
    (choice: ThemeChoice) => {
      localStorage.setItem(THEME_CHOICE_KEY, choice);
      setThemeChoice(choice);
    },
    [setThemeChoice],
  );
  return [themeChoice as ThemeChoice, setChoice] as const;
};

export const useTheme = () => {
  const [themeChoice] = useThemeChoice();
  const theme = React.useMemo(
    () => createMuiTheme({
      palette: {
        type: themeChoice,
        primary: {
          main: '#ec7211', // AWS's primary Color
        },
      },
    }),
    [themeChoice],
  );
  return theme;
};
