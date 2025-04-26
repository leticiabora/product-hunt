import { theme } from '@/theme/theme';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid lightGray;
  margin-bottom: 1rem;
`;

export const TabButton = styled.div<{
  $active?: boolean;
  $position?: string;
}>`
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
    border-top-right-radius: ${({ $position }) => ($position === 'left' ? '8px' : '0')};
    border-bottom-right-radius: ${({ $position }) => ($position === 'left' ? '8px' : '0')};
    border-top-left-radius: ${({ $position }) => ($position === 'right' ? '8px' : '0')};
    border-bottom-left-radius: ${({ $position }) => ($position === 'right' ? '8px' : '0')};
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

export const Item = styled.p`
  flex: 1;
  min-width: 0;
  margin: 0;
  color: ${theme.colors.primary};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  flex: 1;
  align-items: end;
`;

export const CardContainer = styled.div``;

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  border-radius: 0.5rem;
  padding: 1.5rem;
  gap: 1.5rem;
  background-color: white;
  position: relative;
  &:hover {
    cursor: default;
    background-color: ${theme.colors.primary}${theme.colors.opacity[1]};
    transition: background 0.2s ease-in-out;
  }
`;

export const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 300;
  margin: 0;
  display: flex;
  flex: 1;
  align-items: end;
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
  $isVoted: boolean;
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
`;
