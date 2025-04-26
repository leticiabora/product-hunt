import styled from 'styled-components';

import { SkeletonType } from './Skeleton';
import { theme } from '@/theme/theme';

export const Wrapper = styled.span<{
  $variant?: SkeletonType;
  $width?: string | number;
  $height?: string | number;
}>`
  display: block;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  background-color: ${theme.colors.primary}${theme.colors.opacity[3]};
  border-radius: ${({ $variant }) => ($variant === SkeletonType.CIRCULAR ? '50%' : '5px')};

  ${({ $variant }) =>
    $variant === SkeletonType.TEXT &&
    `
      margin-top: 0;
      margin-bottom: 0;
      transform: scale(1, 0.80);
      transform-origin: '0 55%';

      &:before {
        content: '\\00a0';
      }
    `}

  animation: animation-pulse 1.5s ease-in-out 0.5s infinite;

  @keyframes animation-pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;
