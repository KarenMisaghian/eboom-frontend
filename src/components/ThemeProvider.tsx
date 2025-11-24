'use client';

import type { ComponentProps } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as ThemeVarsProvider } from '@mui/material/styles';

import { createTheme } from './theme/create-theme';

import type {} from './theme/extend-theme-types';
import type { ThemeOptions } from './theme/types';

// ----------------------------------------------------------------------

export type ThemeProviderProps = Partial<ComponentProps<typeof ThemeVarsProvider>> & {
  themeOverrides?: ThemeOptions;
};

export function ThemeProvider({ themeOverrides, children, ...other }: ThemeProviderProps) {
  const theme = createTheme({
    themeOverrides,
  });

  return (
    <ThemeVarsProvider disableTransitionOnChange theme={theme} {...other}>
      <CssBaseline />
      {children}
    </ThemeVarsProvider>
  );
}
