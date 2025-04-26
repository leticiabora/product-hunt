'use client';

import Button from '@/components/Button/Button';
import Image from 'next/image';
import * as S from './StatusScreen.styles';
import { useRouter } from 'next/navigation';

interface Params {
  message?: string;
  backToHome?: boolean;
}

const StatusScreen = ({ message = 'Ops! Something went wrong.', backToHome }: Params) => {
  const router = useRouter();
  return (
    <S.Wrapper>
      <S.Message>{message}</S.Message>
      <S.ImageContainer>
        <Image
          src="/product-hunt-cat.png"
          alt="Product Hunt cat"
          style={{ objectFit: 'contain' }}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </S.ImageContainer>
      {backToHome ? (
        <Button onClick={() => router.push('/')}>Back to home</Button>
      ) : (
        <Button onClick={() => router.refresh()}>Reload Page</Button>
      )}
    </S.Wrapper>
  );
};

export default StatusScreen;
