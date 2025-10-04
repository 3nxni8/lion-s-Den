// Centralized color tokens for the app. Keep in sync with CSS variables in globals.css
export const colors = {
  // Semantic base
  background: "#ffffff",
  foreground: "#171717",

  // Brand palette (adjust to your brand)
  primary: "#0ea5e9", // sky-500
  primaryForeground: "#ffffff",

  secondary: "#111827", // gray-900
  secondaryForeground: "#ffffff",

  accent: "#22c55e", // green-500
  accentForeground: "#052e16",

  muted: "#9ca3af", // gray-400
  mutedForeground: "#111827",

  border: "#e5e7eb", // gray-200
  ring: "#0ea5e9", // match primary
} as const;

export type ColorToken = keyof typeof colors;

