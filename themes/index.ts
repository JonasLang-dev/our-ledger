import { Appearance } from "react-native";
import dark from "./dark";
import light, { Theme } from "./light";

export type ThemeNames = "light" | "dark" | "system";
export interface ThemeMeta {
  id: ThemeNames;
  name: string;
  theme: Theme;
}

export const themes: readonly ThemeMeta[] = [
  {
    id: "light",
    name: "Default Light",
    theme: light,
  },
  {
    id: "dark",
    name: "Default Dark",
    theme: dark,
  },
  {
    id: "system",
    name: "Theme with system",
    theme: Appearance.getColorScheme() === "dark" ? dark : light,
  },
];

export type { Theme };

