import Skeleton, { SkeletonType } from '@/components/Skeleton/Skeleton';
import * as S from './Loading.styles';

export const Loading = () => {
  return Array.from({ length: 10 }, (_, index) => (
    <S.LoadingWrapper key={index}>
      <Skeleton variant={SkeletonType.RECTANGULAR} width={60} height={60} />
      <S.LoadingText>
        <Skeleton width="40%" />
        <Skeleton width="100%" />
      </S.LoadingText>
    </S.LoadingWrapper>
  ));
};
