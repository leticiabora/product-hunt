import Skeleton, { SkeletonType } from '@/components/Skeleton/Skeleton';
import * as S from './Loading.styles';

const Loading = () => {
  return (
    <S.LoadingContainer>
      <S.LoadingWrapper>
        <S.LoadingCard noPadding>
          <S.LoadingImageWrapper>
            <Skeleton variant={SkeletonType.RECTANGULAR} height="100%" />
          </S.LoadingImageWrapper>
        </S.LoadingCard>
        <S.LoadingCard>
          <S.LoadingContentWrapper>
            <S.LoadingHeaderContainer>
              <Skeleton variant={SkeletonType.RECTANGULAR} width={100} height={100} />
              <S.LoadingTitleWrapper>
                <Skeleton variant={SkeletonType.TEXT} />
                <S.LoadingBadgeContainer>
                  <Skeleton variant={SkeletonType.TEXT} />
                  <Skeleton variant={SkeletonType.TEXT} />
                </S.LoadingBadgeContainer>
              </S.LoadingTitleWrapper>
            </S.LoadingHeaderContainer>
            <S.LoadingDescription>
              <Skeleton variant={SkeletonType.TEXT} />
            </S.LoadingDescription>
            <S.LoadingDescription>
              <Skeleton variant={SkeletonType.TEXT} />
            </S.LoadingDescription>{' '}
            <S.LoadingDescription>
              <Skeleton variant={SkeletonType.TEXT} />
            </S.LoadingDescription>{' '}
            <S.LoadingDescription>
              <Skeleton variant={SkeletonType.TEXT} />
            </S.LoadingDescription>{' '}
            <S.LoadingDescription>
              <Skeleton variant={SkeletonType.TEXT} />
            </S.LoadingDescription>{' '}
            <S.LoadingDescription>
              <Skeleton variant={SkeletonType.TEXT} />
            </S.LoadingDescription>
          </S.LoadingContentWrapper>
        </S.LoadingCard>
      </S.LoadingWrapper>
      <S.LoadingBottomCardWrapper>
        <S.LoadingBottomCard>
          <Skeleton variant={SkeletonType.RECTANGULAR} width={200} height={42} />
          <Skeleton variant={SkeletonType.RECTANGULAR} width={200} height={42}  />
        </S.LoadingBottomCard>
      </S.LoadingBottomCardWrapper>
    </S.LoadingContainer>
  );
};

export default Loading;
