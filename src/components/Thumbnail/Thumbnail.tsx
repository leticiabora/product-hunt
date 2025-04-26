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

const Thumbnail: React.FC<Params> = ({ alt, src, fill, objectFit, width, height }) => {
  return (
    <S.Thumbnail>
      <Image src={src} alt={alt} fill={fill} objectFit={objectFit} width={width} height={height} />
    </S.Thumbnail>
  );
};

export default Thumbnail;
