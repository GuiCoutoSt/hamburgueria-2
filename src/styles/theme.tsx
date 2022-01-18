import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react";

export const theme = extendTheme(ChakraTheme, {
  color: {
    gray: {
      50: "#f5f5f5",
      100: "#e0e0e0",
      300: "#828282",
      600: "#333333",
    },
    green: {
      50: "#93D7AF",
      100: "#27AE60",
      300: "#168821", // Success
    },
    red: {
      50: "#E60000", // Negative
    },
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.600",
      },
    },
  },
});
