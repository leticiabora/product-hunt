'use client';

import StyledComponentsRegistry from "@/lib/registry";
import { client } from "@/services/api";
import { GlobalStyle } from "@/styles/globalStyles";
import { ApolloProvider } from "@apollo/client";

interface Params {
  children: React.ReactNode;
}

const Providers: React.FC<Params> = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
