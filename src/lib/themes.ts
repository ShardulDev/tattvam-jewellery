import type { CSSProperties } from "react";

export interface ThemeTokens {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

interface StorefrontThemeEntry {
  id: string;
  name: string;
  description: string;
  tokens: ThemeTokens;
}

export const STOREFRONT_THEMES = [
  {
    id: "burgundy-elegance",
    name: "Burgundy Elegance",
    description: "Warm ivory, rich burgundy and muted gold.",
    tokens: {
      background: "#F8F3EC",
      foreground: "#332A28",
      card: "#FFFFFF",
      cardForeground: "#332A28",
      popover: "#FFFFFF",
      popoverForeground: "#332A28",
      primary: "#713B43",
      primaryForeground: "#FFFFFF",
      secondary: "#F8F3EC",
      secondaryForeground: "#332A28",
      accent: "#C5A46D",
      accentForeground: "#332A28",
      muted: "#E9DED3",
      mutedForeground: "#5F504B",
      destructive: "#B42318",
      destructiveForeground: "#FFFFFF",
      border: "#D7C8BC",
      input: "#CDBEB2",
      ring: "#713B43",
    },
  },
  {
    id: "emerald-luxe",
    name: "Emerald Luxe",
    description: "Soft botanical neutrals with deep emerald and antique gold.",
    tokens: {
      background: "#F3F6F1",
      foreground: "#26312D",
      card: "#FFFFFF",
      cardForeground: "#26312D",
      popover: "#FFFFFF",
      popoverForeground: "#26312D",
      primary: "#2F665B",
      primaryForeground: "#FFFFFF",
      secondary: "#F3F6F1",
      secondaryForeground: "#26312D",
      accent: "#C2A66D",
      accentForeground: "#26312D",
      muted: "#E1E9E0",
      mutedForeground: "#56635A",
      destructive: "#B42318",
      destructiveForeground: "#FFFFFF",
      border: "#C9D5CA",
      input: "#BDCCBF",
      ring: "#2F665B",
    },
  },
  {
    id: "rose-romance",
    name: "Rose Romance",
    description: "Blush surfaces, softened rose and gentle warmth.",
    tokens: {
      background: "#FBF4F5",
      foreground: "#392C30",
      card: "#FFFFFF",
      cardForeground: "#392C30",
      popover: "#FFFFFF",
      popoverForeground: "#392C30",
      primary: "#905A67",
      primaryForeground: "#FFFFFF",
      secondary: "#FBF4F5",
      secondaryForeground: "#392C30",
      accent: "#C79A9E",
      accentForeground: "#392C30",
      muted: "#EFE1E3",
      mutedForeground: "#645459",
      destructive: "#B42318",
      destructiveForeground: "#FFFFFF",
      border: "#DDC9CD",
      input: "#D5BEC3",
      ring: "#905A67",
    },
  },
  {
    id: "midnight-gold",
    name: "Midnight Gold",
    description: "Tailored midnight blue, light stone and restrained gold.",
    tokens: {
      background: "#F4F2ED",
      foreground: "#2D2A26",
      card: "#FFFFFF",
      cardForeground: "#2D2A26",
      popover: "#FFFFFF",
      popoverForeground: "#2D2A26",
      primary: "#303949",
      primaryForeground: "#FFFFFF",
      secondary: "#F4F2ED",
      secondaryForeground: "#2D2A26",
      accent: "#B99452",
      accentForeground: "#2D2A26",
      muted: "#E7E1D5",
      mutedForeground: "#5D574E",
      destructive: "#B42318",
      destructiveForeground: "#FFFFFF",
      border: "#D4CABA",
      input: "#C9BDA8",
      ring: "#303949",
    },
  },
  {
    id: "terracotta-warmth",
    name: "Terracotta Warmth",
    description: "Sun-warmed clay, creamy ivory and earthy rosewood.",
    tokens: {
      background: "#FBF3ED",
      foreground: "#382B26",
      card: "#FFFFFF",
      cardForeground: "#382B26",
      popover: "#FFFFFF",
      popoverForeground: "#382B26",
      primary: "#9A4F3C",
      primaryForeground: "#FFFFFF",
      secondary: "#FBF3ED",
      secondaryForeground: "#382B26",
      accent: "#CF9C72",
      accentForeground: "#382B26",
      muted: "#EFE0D3",
      mutedForeground: "#62534A",
      destructive: "#B42318",
      destructiveForeground: "#FFFFFF",
      border: "#DCC8B8",
      input: "#D2BBA8",
      ring: "#9A4F3C",
    },
  },
  {
    id: "champagne-minimal",
    name: "Champagne Minimal",
    description: "Quiet champagne, clean white and balanced taupe.",
    tokens: {
      background: "#FAF7F0",
      foreground: "#332F28",
      card: "#FFFFFF",
      cardForeground: "#332F28",
      popover: "#FFFFFF",
      popoverForeground: "#332F28",
      primary: "#806B4E",
      primaryForeground: "#FFFFFF",
      secondary: "#FAF7F0",
      secondaryForeground: "#332F28",
      accent: "#B89964",
      accentForeground: "#332F28",
      muted: "#EDE5D8",
      mutedForeground: "#625A4E",
      destructive: "#B42318",
      destructiveForeground: "#FFFFFF",
      border: "#D9D0C1",
      input: "#CDC2AE",
      ring: "#806B4E",
    },
  },
] as const satisfies readonly StorefrontThemeEntry[];

export type StorefrontThemeDefinition = (typeof STOREFRONT_THEMES)[number];
export type StorefrontThemeId = StorefrontThemeDefinition["id"];

import { BRAND } from "./brand";

export const DEFAULT_STOREFRONT_THEME: StorefrontThemeId = BRAND.defaultTheme;

export const ADMIN_THEME = {
  id: "neutral",
  name: "Neutral Operations",
  description: "A quiet, readable palette for daily operational work.",
  tokens: {
    background: "#F4F5F6",
    foreground: "#252A31",
    card: "#FFFFFF",
    cardForeground: "#252A31",
    popover: "#FFFFFF",
    popoverForeground: "#252A31",
    primary: "#40566F",
    primaryForeground: "#FFFFFF",
    secondary: "#E8EBEF",
    secondaryForeground: "#303A45",
    accent: "#E3E8ED",
    accentForeground: "#303A45",
    muted: "#ECEFF2",
    mutedForeground: "#56616D",
    destructive: "#B42318",
    destructiveForeground: "#FFFFFF",
    border: "#D5D9DE",
    input: "#C7CDD4",
    ring: "#40566F",
  },
} as const satisfies StorefrontThemeEntry;

type ThemeStyle = CSSProperties & { [key: `--${string}`]: string };

export function themeTokensToStyle(tokens: ThemeTokens): ThemeStyle {
  return {
    "--background": tokens.background,
    "--foreground": tokens.foreground,
    "--card": tokens.card,
    "--card-foreground": tokens.cardForeground,
    "--popover": tokens.popover,
    "--popover-foreground": tokens.popoverForeground,
    "--primary": tokens.primary,
    "--primary-foreground": tokens.primaryForeground,
    "--secondary": tokens.secondary,
    "--secondary-foreground": tokens.secondaryForeground,
    "--accent": tokens.accent,
    "--accent-foreground": tokens.accentForeground,
    "--muted": tokens.muted,
    "--muted-foreground": tokens.mutedForeground,
    "--destructive": tokens.destructive,
    "--destructive-foreground": tokens.destructiveForeground,
    "--border": tokens.border,
    "--input": tokens.input,
    "--ring": tokens.ring,
  };
}
