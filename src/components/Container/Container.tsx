import React, { JSX } from 'react';
import * as S from './Container.styles';

interface Params {
  children: JSX.Element | JSX.Element[];
  noBackground?: boolean;
  noPadding?: boolean;
  className?: string;
}

const Container: React.FC<Params> = ({ children, noBackground, noPadding, className }) => {
  return <S.Container className={className} $noBackground={noBackground} $noPadding={noPadding}>{children}</S.Container>;
};

export default Container;
