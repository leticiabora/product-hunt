'use client';

import Button from '@/components/Button/Button';
import { Container } from '@/components/Container/Container.styles';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import styled from 'styled-components';

const ErrorContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  @media (max-width: 768px) {
    height: 250px;
  }
`;

export default function Error() {
  return (
    <ErrorContainer>
      <h1>Oh noes! Something went wrong.</h1>
      <ImageContainer>
        <Image
          src="/product-hunt-cat.png"
          alt="Product Hunt cat"
          style={{ objectFit: 'contain' }}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </ImageContainer>
      <Button onClick={() => redirect('/')}>Reload Page</Button>
    </ErrorContainer>
  );
}
