import styled from 'styled-components';
import {
  Container,
  Wrapper,
  ImageWrapper,
  HeaderContainer,
  TitleWrapper,
  BadgeContainer,
  BottomCardWrapper,
  BottomCard,
  Description,
} from '../PostDetails.styles';
import Card from '@/components/Card/Card';

export const LoadingContainer = styled(Container)`
  width: 100%;
`;

export const LoadingWrapper = styled(Wrapper)``;

export const LoadingCard = styled(Card)`
  box-shadow: none;
`;

export const LoadingImageWrapper = styled(ImageWrapper)`
  height: 100%;
`;

export const LoadingHeaderContainer = styled(HeaderContainer)`
  margin-bottom: 1.5rem;
`;

export const LoadingTitleWrapper = styled(TitleWrapper)`
  display: flex;
  flex: 1;
`;

export const LoadingBadgeContainer = styled(BadgeContainer)``;

export const LoadingBottomCardWrapper = styled(BottomCardWrapper)``;

export const LoadingBottomCard = styled(BottomCard)``;

export const LoadingDescription = styled(Description)``;

export const LoadingContentWrapper = styled.div`
  width: 100%;
`;
