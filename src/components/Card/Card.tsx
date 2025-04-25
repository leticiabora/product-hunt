import React, { JSX } from 'react';
import * as S from './Card.styles';

interface Params {
  children: JSX.Element | JSX.Element[];
  noPadding?: boolean;
}

const Card: React.FC<Params> = ({ children, noPadding = false }) => {
  return <S.Card $noPadding={noPadding}>{children}</S.Card>;
};

export default Card;
