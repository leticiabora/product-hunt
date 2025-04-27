import styled from 'styled-components';

export const Card = styled.div<{
  $noPadding?: boolean;
  $scroll?: boolean;
}>`
  background-color: white;
  padding: ${({ $noPadding }) => ($noPadding ? 0 : '2rem')};
  border-radius: 1rem;
  width: 100%;
  box-shadow: -3px 9px 20px rgba(177, 177, 177, 0.3);
  display: flex;
  flex: 1;
`;
