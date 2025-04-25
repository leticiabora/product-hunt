'use client';

import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { ReactNode } from 'react';

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
