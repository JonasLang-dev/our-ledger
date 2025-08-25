import { createTheme } from "@shopify/restyle";
import { StatusBarStyle } from "react-native";
import light, { Theme } from "./light";

const p = {
  slate00: "#1b1c1d",
  slate10: "#202225",
  slate20: "#292c2f",
  slate30: "#2e3235",
  slate40: "#35393d",
  slate100: "#767577",
  slate900: "#dddddd",
  blue70: "#2185d0",
};

export const theme: Theme = createTheme({
  ...light,
  colors: {
    ...light.colors,
    $primary: p.blue70,
    $secondary: p.slate00,
    $windowBackground: p.slate00,
    $background: p.slate10,
    $foreground: p.slate900,
  },
  statusBar: {
    barStyle: "light-content" as StatusBarStyle,
  },
  textVariants: {
    ...light.textVariants,
  },
});

export default theme;
