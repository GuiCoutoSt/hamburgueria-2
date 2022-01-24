import { ChakraProvider } from "@chakra-ui/provider";
import { theme } from "../styles//theme";
import { ReactNode } from "react";

import { StoreProvider } from "../contexts/Store";
import { CartProvider } from "../contexts/Cart";
import { AuthProvider } from "../contexts/Auth";

interface IProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: IProviderProps) => (
  <AuthProvider>
    <StoreProvider>
      <CartProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CartProvider>
    </StoreProvider>
  </AuthProvider>
);
