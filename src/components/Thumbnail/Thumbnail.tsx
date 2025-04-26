import React from 'react';
import * as S from './Thumbnail.styles';
import Image from 'next/image';

interface Params {
  alt: string;
  src: string;
  fill?: boolean;
  objectFit?: string;
  width?: number;
  height?: number;
}

const Thumbnail: React.FC<Params> = ({ alt, src, fill = true, objectFit, width = 100, height = 100 }) => {
  return (
    <S.Thumbnail $width={width} $height={height}>
      <Image src={src} alt={alt} fill={fill} objectFit={objectFit} />
    </S.Thumbnail>
  );
};

export default Thumbnail;
