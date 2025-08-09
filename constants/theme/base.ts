/**
 * Spacing
 * @description 间距
 */
export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

/**
 * Border radius
 * @description 边框半径
 */
export const radii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  pill: 9999,
} as const;

/**
 * Text variants
 * @description 文本字体样式
 */
export const textVariants = {
  header: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
  },
  subheader: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    fontWeight: "300",
    lineHeight: 16,
  },
} as const;
