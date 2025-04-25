'use client';

import StyledComponentsRegistry from '@/lib/registry';
import { client } from '@/services/api';
import { GlobalStyle } from '@/styles/globalStyles';
import { ThemeProviderWrapper } from '@/theme/ThemeProvider';
import { ApolloProvider } from '@apollo/client';

interface Params {
  children: React.ReactNode;
}

const Providers: React.FC<Params> = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProviderWrapper>
        <GlobalStyle />
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </ThemeProviderWrapper>
    </StyledComponentsRegistry>
  );
};

export default Providers;
