import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-inter: 'Inter', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-inter);
    font-size: 16px;
    margin: 0;
    padding: 0;
  }
`;
