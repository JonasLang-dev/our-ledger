import { createTheme } from "@shopify/restyle";
import { radii, spacing, textVariants } from "./base";

/**
 * Dark theme
 * @description 深色主题
 */
export const darkTheme = createTheme({
  colors: {
    background: "#0B0F14",
    primary: "#36D399",
    secondary: "#1C1F26",
    text: "#FFFFFF",
    textSecondary: "#A6ADBB",
    border: "#2E323A",
    danger: "#F87171",
  },
  spacing,
  radii,
  textVariants,
});
