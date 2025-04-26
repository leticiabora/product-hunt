'use client';

import styled, { css, DefaultTheme } from 'styled-components';

const buttonVariants = (theme: DefaultTheme) =>
  ({
    primary: css`
      background-color: white;
      color: ${theme.colors.primary};
      border: 1px solid ${theme.colors.primary};
      &:hover {
        background-color: rgba(${theme.colors.primary}, 0.6);
      }
    `,
    secondary: css`
      background-color: ${theme.colors.secondary};
      color: white;
      border: 1px solid ${theme.colors.secondary};
      &:hover {
        background-color: rgba(${theme.colors.secondary}, 0.6);
      }
    `,
  } as const);

interface ButtonProps {
  $variant?: keyof ReturnType<typeof buttonVariants>;
}

export const ButtonContainer = styled.button<ButtonProps>`
  padding: 12px 16px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  ${({ theme, $variant = 'primary' }) => buttonVariants(theme)[$variant]}
`;
