import React from 'react';

import { Wrapper } from './Skeleton.styles';

export enum SkeletonType {
  TEXT = 'text',
  CIRCULAR = 'circular',
  RECTANGULAR = 'rectangular',
}

interface Params {
  variant?: SkeletonType;
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<Params> = ({ variant = SkeletonType.TEXT, width, height, ...styles }) => {
  const newWidth = width ? `${width}px` : '100%';
  const newHeight = height ? `${height}px` : 'auto';

  return (
    <Wrapper
      data-testid="skeleton"
      $variant={variant}
      $width={typeof width === 'string' ? width : newWidth}
      $height={typeof height === 'string' ? height : newHeight}
      {...styles}
    />
  );
};

export default Skeleton;
