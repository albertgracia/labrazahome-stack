export const colors = {
  light: {
    background: "#fafafa",
    surface: "#ffffff",
    surfaceElevated: "#ffffff",
    border: "#e4e4e7",
    text: "#18181b",
    textMuted: "#71717a",
    primary: "#6366f1",
    primaryHover: "#4f46e5",
    primaryLight: "#a5b4fc",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
    successBg: "#f0fdf4",
    warningBg: "#fffbeb",
    dangerBg: "#fef2f2",
  },
  dark: {
    background: "#09090b",
    surface: "#18181b",
    surfaceElevated: "#27272a",
    border: "#27272a",
    text: "#fafafa",
    textMuted: "#a1a1aa",
    primary: "#818cf8",
    primaryHover: "#6366f1",
    primaryLight: "#a5b4fc",
    success: "#4ade80",
    warning: "#fbbf24",
    danger: "#f87171",
    successBg: "#052e16",
    warningBg: "#451a03",
    dangerBg: "#450a0a",
  },
} as const;

export type ColorKey = keyof typeof colors.light;
export type ColorScheme = keyof typeof colors;
