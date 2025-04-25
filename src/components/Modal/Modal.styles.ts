import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: auto;
`;

export const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100%;
  max-width: 1020px;
`;

export const Container = styled.div`
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
`;