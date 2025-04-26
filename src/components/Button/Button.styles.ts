'use client';

import styled, { css, DefaultTheme } from 'styled-components';

const buttonVariants = (theme: DefaultTheme) =>
  ({
    primary: css`
      background-color: white;
      color: ${theme.colors.text.primary};
      border: 1px solid ${theme.colors.primary};
      &:hover {
        background-color: ${theme.colors.primary}${theme.colors.opacity[2]};
      }
    `,
    secondary: css`
      background-color: ${theme.colors.secondary};
      color: white;
      border: 1px solid ${theme.colors.secondary};
      &:hover {
        background-color: ${theme.colors.secondary}${theme.colors.opacity[9]};
      }
    `,
  } as const);

interface ButtonProps {
  $variant?: keyof ReturnType<typeof buttonVariants>;
}

export const ButtonContainer = styled.button<ButtonProps>`
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0.6rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  box-shadow: 2px 3px 4px rgba(170, 169, 169, 0.2);

  ${({ theme, $variant = 'primary' }) => buttonVariants(theme)[$variant]}
`;
