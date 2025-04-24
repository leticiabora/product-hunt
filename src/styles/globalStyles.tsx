import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-inter: 'Inter', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }

  body {
    font-family: var(--font-inter);
    font-size: 1rem;
    margin: 0;
    padding: 0;
    font-size: 1rem;
  }
`;
