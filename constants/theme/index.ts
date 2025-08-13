import { darkTheme } from "./dark";
import { lightTheme } from "./light";

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  system: lightTheme, // Default to light theme for system
};

export type Theme = typeof lightTheme;
