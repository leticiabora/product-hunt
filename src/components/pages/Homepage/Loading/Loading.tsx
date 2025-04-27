import Skeleton, { SkeletonType } from '@/components/Skeleton/Skeleton';
import * as S from '../Homepage.styles';

export const Loading = () => {
  return (
    <S.ContainerList>
        <S.TabContent>
        {Array.from({ length: 10 }, (_, index) => (
          <S.CardContainer key={index}>
            <S.CardWrapper>
              <S.Wrapper>
                <Skeleton variant={SkeletonType.RECTANGULAR} width={60} height={60} />
                <S.CardContent>
                  <S.Item>
                    <Skeleton width={150} />
                  </S.Item>
                  <S.Title>
                    <Skeleton width={300} />
                  </S.Title>
                </S.CardContent>
              </S.Wrapper>
            </S.CardWrapper>
          </S.CardContainer>
        ))}
    </S.TabContent>
      </S.ContainerList>
  );
};
