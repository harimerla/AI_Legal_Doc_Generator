"use client";

import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { ReactNode } from "react";
import { mode } from "@chakra-ui/theme-tools";

// Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      primary: "#1A202C", // Charcoal navy
      accent: "#4FD1C5", // Teal
      secondary: "#7C3AED", // Violet
      background: "#F7FAFC", // Light gray
      text: {
        dark: "#2D3748", // Rich gray
        light: "#718096", // Muted gray
      },
      success: "#38A169", // Green
      warning: "#D69E2E", // Yellow
      danger: "#E53E3E", // Red
      border: "#E2E8F0", // Light border
      cardShadow: "0 2px 8px rgba(0,0,0,0.03)",
    },
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Open Sans, sans-serif",
    mono: "Fira Code, monospace",
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "20px",
    xl: "24px",
    "2xl": "28px",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  components: {
    Input: {
      baseStyle: {
        field: (props: any) => ({
          bg: mode("#F7FAFC", "#23263A")(props),
          borderColor: mode("brand.border", "#35384A")(props),
          color: mode("brand.text.dark", "white")(props),
          borderRadius: "lg",
          fontSize: "md",
          px: 4,
          py: 2.5,
          transition: "all 0.2s",
          _placeholder: {
            color: mode("brand.text.light", "#A0AEC0")(props),
            fontWeight: 400,
            letterSpacing: "0.01em",
          },
          _hover: {
            borderColor: "brand.accent",
            boxShadow: mode(
              "0 1px 4px rgba(79,209,197,0.08)",
              "0 1px 4px rgba(79,209,197,0.18)"
            )(props),
          },
          _focus: {
            borderColor: "brand.accent",
            boxShadow: mode(
              "0 0 0 2px #4FD1C533, 0 2px 8px rgba(79,209,197,0.10)",
              "0 0 0 2px #4FD1C599, 0 2px 8px rgba(79,209,197,0.18)"
            )(props),
            bg: mode("white", "#23263A")(props),
          },
        }),
      },
    },
    FormLabel: {
      baseStyle: (props: any) => ({
        color: mode("brand.text.dark", "white")(props),
        fontWeight: 500,
        fontSize: "md",
        mb: 1,
        letterSpacing: "0.01em",
      }),
    },
    Menu: {
      baseStyle: {
        list: (props: any) => ({
          bg: mode("#fff", "#23263A")(props),
          border: "1.5px solid",
          borderColor: mode("gray.200", "#35384A")(props),
          color: mode("brand.text.dark", "white")(props),
          boxShadow: mode(
            "0 8px 32px rgba(0,0,0,0.18)",
            "0 8px 32px rgba(0,0,0,0.44)"
          )(props),
          minW: "180px",
          py: 2,
        }),
        item: (props: any) => ({
          bg: mode("#fff", "#23263A")(props),
          color: mode("brand.text.dark", "white")(props),
          borderRadius: "md",
          _hover: {
            bg: mode("#F0F4F8", "#35384A")(props),
            color: mode("brand.primary", "brand.accent")(props),
          },
          _focus: {
            bg: mode("#F0F4F8", "#35384A")(props),
            color: mode("brand.primary", "brand.accent")(props),
          },
          _active: {
            bg: mode("#E6FFFA", "#23263A")(props),
          },
        }),
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: mode("white", "#23263A")(props),
          borderRadius: "lg",
          boxShadow: mode(
            "brand.cardShadow",
            "0 2px 8px rgba(0,0,0,0.5)"
          )(props),
          border: "1px solid",
          borderColor: mode("brand.border", "#23263A")(props),
          p: 6,
        },
      }),
    },
    Box: {
      baseStyle: (props: any) => ({
        bg: mode("white", "#23263A")(props),
        borderRadius: "lg",
        border: "1px solid",
        borderColor: mode("brand.border", "#23263A")(props),
        boxShadow: mode("brand.cardShadow", "0 2px 8px rgba(0,0,0,0.5)")(props),
      }),
    },
    Button: {
      baseStyle: {
        fontWeight: "medium",
        borderRadius: "md",
      },
      variants: {
        solid: (props: any) => ({
          bg: mode("brand.accent", "brand.accent")(props),
          color: mode("white", "#181A20")(props),
          _hover: { bg: "#63E6BE" },
          _active: {
            bg: mode("brand.accent", "brand.accent")(props),
            transform: "scale(0.98)",
          },
        }),
        outline: (props: any) => ({
          borderColor: mode("brand.accent", "brand.accent")(props),
          color: mode("brand.accent", "brand.accent")(props),
          bg: mode("white", "#23263A")(props),
          _hover: {
            bg: mode("brand.background", "#181A20")(props),
            borderColor: mode("brand.primary", "brand.primary")(props),
          },
        }),
        ghost: (props: any) => ({
          color: mode("brand.text.dark", "white")(props),
          _hover: { bg: mode("brand.background", "#23263A")(props) },
        }),
      },
    },
    Heading: {
      baseStyle: (props: any) => ({
        fontFamily: "heading",
        fontWeight: "semibold",
        color: mode("brand.primary", "white")(props),
      }),
    },
    Text: {
      baseStyle: (props: any) => ({
        fontFamily: "body",
        color: mode("brand.text.dark", "white")(props),
      }),
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("brand.background", "#181A20")(props),
        color: mode("brand.text.dark", "white")(props),
      },
    }),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
}
