import { theme } from '@/theme/theme';
import styled from 'styled-components';

export const Container = styled.div<{
  $noBackground?: boolean;
  $noPadding?: boolean;
}>`
  width: 100%;
  padding: ${({ $noPadding }) => $noPadding ? '0' : '1rem'};
  margin-right: auto;
  margin-left: auto;
  background-color: ${({ $noBackground }) => $noBackground ? 'transparent' : theme.background.default};
  border-radius: 1rem;

  @media (min-width: ${theme.breakpoints.xs}) {
    max-width: 540px;
  }

  @media (min-width: ${theme.breakpoints.sm}) {
    max-width: 720px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    max-width: 960px;
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    max-width: 1140px;
  }
`;
