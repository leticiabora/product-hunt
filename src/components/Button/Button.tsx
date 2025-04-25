import { ReactNode } from 'react';
import { ButtonContainer } from './Button.styles';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: ReactNode | string;
  onClick: () => void;
}

const Button = ({ children, variant, onClick }: ButtonProps) => {
  return (
    <ButtonContainer $variant={variant} onClick={onClick}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
