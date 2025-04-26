import styled from 'styled-components';

export const Card = styled.div<{
  $noPadding?: boolean;
  $scroll?: boolean;
}>`
  background-color: white;
  padding: ${({ $noPadding }) => ($noPadding ? 0 : '2rem')};
  border-radius: 1rem;
  width: 100%;
  box-shadow: 20px 30px 40px rgba(177, 177, 177, 0.4);
  display: flex;
  flex: 1;
`;
