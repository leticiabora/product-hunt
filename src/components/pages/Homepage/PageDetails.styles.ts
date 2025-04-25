import { theme } from '@/theme/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  gap: 2rem;
  background-color: ${theme.background.default};
  overflow: auto;
  borderradius: 2rem;

  @media (min-width: ${theme.breakpoints.xs}) {
    padding: 1rem;
  }

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: 2rem;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 0.5rem;
  overflow: hidden;

  @media (min-width: ${theme.breakpoints.sm}) {
    height: 250px;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    height: 300px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const Thumbnail = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 1.2rem;
  overflow: hidden;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

export const Title = styled.h3`
  margin: 0;
  padding: 0;
  padding-top: '1rem';
  font-weight: 400;
  font-size: '1.5rem';
  text-transform: uppercase;
`;

export const Badge = styled.div`
  background-color: lightgray;
  padding: 0.5rem 1rem;
  border-radius: 0.7rem;
  text-transform: uppercase;
  color: white;
  width: fit-content
`;

export const Description = styled.div`
  font-size: 1.2rem;
  line-height: 1.8rem;
  color: gray;
  font-weight: 300;
`;
