import { theme } from '@/theme/theme';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: ${theme.breakpoints.xs}) {
    max-width: 540px;
  }
  
  @media (min-width: ${theme.breakpoints.sm}) {
    max-width: 720px;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    max-width: 960px;
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    max-width: 1140px;
  }
`;
