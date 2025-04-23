'use client';

import StyledComponentsRegistry from "@/lib/registry";
import { GlobalStyle } from "@/styles/globalStyles";

interface Params {
  children: React.ReactNode;
}

const Providers: React.FC<Params> = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      {children}
    </StyledComponentsRegistry>
  );
};

export default Providers;
