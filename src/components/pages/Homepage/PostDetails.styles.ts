import { theme } from '@/theme/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  gap: 2rem;
  background-color: ${theme.background.default};
  overflow: auto;
  border-radius: 2rem;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 1rem;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    overflow: auto;
    height: 100%;
    border-radius: 0;
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
  width: fit-content;
`;

export const Description = styled.div`
  font-size: 1.2rem;
  line-height: 1.8rem;
  color: gray;
  font-weight: 300;
`;

export const BottomCardWrapper = styled.div`
  display: flex;
  position: relative;
  height: 5rem;
`;

export const BottomCard = styled.div`
  display: flex;
  flex: 1;
  gap: 1rem;
  padding: 1rem;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 1.5rem 1rem;
  background-color: white;
  border-radius: 1rem 1rem 0 0;
  box-shadow: -2px -3px 5px rgba(177, 177, 177, 0.1);
  z-index: 10;
  & > button {
    flex: 1;
  }
`;
