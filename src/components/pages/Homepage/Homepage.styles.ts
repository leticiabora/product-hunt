import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid lightGray;
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
  gap: 16px;
  margin: 24px 0;
`;

export const Item = styled.p`
  width: 100%;
  margin: 0;
`;

export const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid gray;
  border-radius: 0.5rem;
  padding: 1rem 0.5rem;
  gap: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;

