import React, { JSX } from 'react';
import * as S from './Container.styles';

interface Params {
  children: JSX.Element | JSX.Element[];
}

const Container: React.FC<Params> = ({ children }) => {
  return <S.Container>{children}</S.Container>;
};

export default Container;
