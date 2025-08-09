import { createTheme } from "@shopify/restyle";
import { radii, spacing, textVariants } from "./base";

/**
 * Light theme
 * @description 浅色主题
 */
export const lightTheme = createTheme({
  colors: {
    background: "#FFFFFF",
    primary: "#008060",
    secondary: "#F6F6F7",
    text: "#212B36",
    textSecondary: "#637381",
    border: "#DFE3E8",
    danger: "#D82C0D",
  },
  spacing,
  radii,
  textVariants,
});
