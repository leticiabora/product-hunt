import Card from '@/components/Card/Card';
import { theme } from '@/theme/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.background.default};
  border-radius: 1rem;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  gap: 2rem;
  background-color: ${theme.background.default};
  overflow: auto;
  border-radius: 1.5rem 1.5rem 0 0;
  flex: 1;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 1rem;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    border-radius: 0;
    flex: 1;
  }
`;

export const CardDetails = styled(Card)`
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1rem;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  background: linear-gradient(rgba(217, 85, 45, 0.1), rgba(255, 255, 255, 0.3));
  border-radius: 1rem;
  padding: 2rem;
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

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

export const Title = styled.h3`
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-size: 1.5rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  flex: 1;
`;

export const BadgeContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Badge = styled.div`
  background-color: ${theme.background.default};
  padding: 0.5rem 1rem;
  border-radius: 0.7rem;
  text-transform: uppercase;
  color: ${theme.colors.text.light};
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
  position: sticky;
  bottom: 0;
  overflow: hidden;
  border-radius: 1rem;
  @media (max-width: ${theme.breakpoints.md}) {
    border-radius: 1.5rem 1.5rem 0 0;
  }
`;

export const BottomCard = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;
  padding: 2rem;
  justify-content: space-between;
  background-color: white;
  box-shadow: -2px -3px 5px rgba(177, 177, 177, 0.1);
  z-index: 1000;
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1.5rem 1.5rem;
    gap: 1.5rem;
  }
  & > button {
    flex: 1;
  }
`;
