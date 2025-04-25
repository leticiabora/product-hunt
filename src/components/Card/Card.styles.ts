import styled from 'styled-components';

export const Card = styled.div<{
  $noPadding?: boolean;
}>`
  background-color: white;
  padding: ${({ $noPadding }) => ($noPadding ? 0 : '2rem')};
  border-radius: 1.5rem;
  width: 100%;
  overflow: auto;
  box-shadow: 20px 30px 40px rgba(0, 0, 0, 0.2);

`;
