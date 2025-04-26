import React, { JSX } from 'react';
import * as S from './Card.styles';

interface Params {
  children: JSX.Element | JSX.Element[];
  noPadding?: boolean;
  className?: string;
}

const Card: React.FC<Params> = ({ children, noPadding = false, className }) => {
  return <S.Card className={className} $noPadding={noPadding}>{children}</S.Card>;
};

export default Card;
