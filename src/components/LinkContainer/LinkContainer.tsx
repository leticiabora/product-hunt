import React, { JSX } from 'react';
import * as S from './LinkContainer.styles';

interface Params {
  children: JSX.Element | JSX.Element[];
  href: string;
}

const LinkContainer: React.FC<Params> = ({ children, href }) => {
  return <S.LinkContainer href={href}>{children}</S.LinkContainer>;
};

export default LinkContainer;
