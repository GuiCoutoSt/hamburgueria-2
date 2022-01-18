import { ChakraProvider } from "@chakra-ui/provider";
import { theme } from "../styles//theme";
import { ReactNode } from "react";

interface IProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: IProviderProps) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);
