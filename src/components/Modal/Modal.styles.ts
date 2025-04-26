import { theme } from '@/theme/theme';
import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  overflow: auto;
  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: ${theme.background.default};
  }
`;

export const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1020px;
  height: 100%;
  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 16px;
  left: 24px;
  background: white;
  padding: 8px;
  height: 40px;
  width: 40px;
  border-radius: 32px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.2);
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
  &:hover {
    background: ${theme.colors.primary}${theme.colors.opacity[9]};
  }
`;

export const MobileButtons = styled.div`
  display: none;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: ${theme.background.default};
  }
`;

export const GoBackButton = styled.button`
  rotate: 180deg;
  background-color: transparent;
  display: flex;
  align-items: center;
  border: none;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 2rem;
  &:hover {
    cursor: pointer;
  }
`;
