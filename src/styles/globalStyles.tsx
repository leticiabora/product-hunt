import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-inter: 'Inter', sans-serif;
  }

  body {
    font-family: var(--font-inter);
  }
`
