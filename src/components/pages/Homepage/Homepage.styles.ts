import Container from '@/components/Container/Container';
import { theme } from '@/theme/theme';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`;

export const HeaderContent = styled(Container)`
  background-color: white;
  padding: 0 1rem 0 1rem;
  @media (max-width: ${theme.breakpoints.xs}) {
    padding: 0;
  }
`;

export const HeaderContainer = styled.div`
  padding: 1rem 1rem 0 1rem;
  background-color: white;
  border-bottom: 1px solid ${theme.colors.border.primary};
  @media (max-width: ${theme.breakpoints.xs}) {
    padding: 1rem 0 0 0;
    margin-bottom: 1rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 1rem;
  }
`;

export const ProfileWrapper = styled.div`
  border: 1px solid gray;
  width: fit-content;
  border-radius: 3rem;
  background: ${theme.background.dark};
`;

export const DateWrapper = styled.div`
  background: ${theme.background.default};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  height: fit-content;
  font-size: 1rem;
  justify-content: center;
  color: ${theme.colors.text.light};
`;

export const TabButton = styled.div<{ $active?: boolean }>`
  display: flex;
  width: 100%;
  padding: 1rem;
  justify-content: center;
  position: relative;
  font-weight: 500;
  color: ${({ $active }) => ($active ? '#d75834' : 'gray')};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: ${({ $active }) => ($active ? '#d75834' : 'transparent')};
    transition: background-color 0.3s ease, border-radius 0.3s ease;
  }

  &:first-child::after {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:last-child::after {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

export const Item = styled.div`
  flex: 1;
  min-width: 0;
  margin: 0;
  color: ${theme.colors.primary};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 2rem;
`;

export const CardContainer = styled.div`
`;

export const ContainerList = styled(Container)`
`;

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  border-radius: 0.5rem;
  padding: 1.5rem;
  gap: 1.5rem;
  background-color: white;
  position: relative;
  &:hover {
    cursor: pointer;
    background-color: ${theme.colors.primary}${theme.colors.opacity[1]};
    transition: background 0.2s ease-in-out;
  }
  @media (max-width: ${theme.breakpoints.xs}) {
    padding: 1rem;
    gap: 1rem;
    font-size: 0.9rem;
  }
`;

export const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 300;
  margin: 0;
  display: flex;
  width: fit-content;
  flex: 1;
  align-items: end;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: ${theme.breakpoints.xs}) {
    font-size: 1rem;
    line-height: 1;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  justify-content: space-between;
`;

export const ImagePlaceholder = styled.div<{
  $width: number;
  $height: number;
}>`
  display: flex;
  flex-direction: column;
  background-image: url(/product-hunt-cat.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;
`;

export const Votes = styled.div<{
  $isVoted?: boolean;
}>`
  position: absolute;
  right: -1rem;
  background: ${({ $isVoted }) => ($isVoted ? theme.colors.secondary : 'white')};
  border-radius: 1rem;
  border: 1px solid
    ${({ $isVoted }) => ($isVoted ? theme.colors.secondary : theme.colors.border.primary)};
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  display: flex;
  flex-direction: column;
  color: ${({ $isVoted }) => ($isVoted ? 'white' : theme.colors.text.primary)};
  @media (max-width: ${theme.breakpoints.xs}) {
    top: -0.5rem;
    right: 0.5rem;
    width: fit-content;
    height: fit-content;
    padding: 0.2rem;
    flex-direction: row;
  }
  & > svg {
    width: 20px;
  }
`;
