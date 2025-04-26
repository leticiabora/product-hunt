import { theme } from '@/theme/theme';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 1rem;
  margin-right: auto;
  margin-left: auto;
  background-color: ${theme.background.default};
  border-radius: 1rem;
  box-shadow: 1px 1px 4px rgba(170, 169, 169, 0.2);

  @media (min-width: ${theme.breakpoints.xs}) {
    max-width: 540px;
  }

  @media (min-width: ${theme.breakpoints.sm}) {
    max-width: 720px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0;
    box-shadow: none;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    max-width: 960px;
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    max-width: 1140px;
  }
`;
