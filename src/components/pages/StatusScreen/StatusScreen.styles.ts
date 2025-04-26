import Container from '@/components/Container/Container';
import styled from 'styled-components';

export const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  @media (max-width: 768px) {
    height: 250px;
  }
`;

export const Message = styled.h2`
  font-weight: 400;
  letter-spacing: 0.2rem;
`