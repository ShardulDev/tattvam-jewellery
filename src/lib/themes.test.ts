import { describe, expect, it } from "vitest";
import {
  ADMIN_THEME,
  DEFAULT_STOREFRONT_THEME,
  STOREFRONT_THEMES,
  themeTokensToStyle,
} from "./themes";

function relativeLuminance(hex: string) {
  const channels = [1, 3, 5].map((offset) => {
    const channel = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(first: string, second: string) {
  const luminances = [relativeLuminance(first), relativeLuminance(second)].sort(
    (a, b) => b - a,
  );

  return (luminances[0] + 0.05) / (luminances[1] + 0.05);
}

describe("theme configuration", () => {
  it("starts with Burgundy Elegance and includes all planned storefront themes", () => {
    expect(DEFAULT_STOREFRONT_THEME).toBe("burgundy-elegance");
    expect(STOREFRONT_THEMES.map(({ id }) => id)).toEqual([
      "burgundy-elegance",
      "emerald-luxe",
      "rose-romance",
      "midnight-gold",
      "terracotta-warmth",
      "champagne-minimal",
    ]);
  });

  it("maps every palette through the same semantic CSS variable contract", () => {
    const requiredVariables: Array<`--${string}`> = [
      "--background",
      "--foreground",
      "--card",
      "--card-foreground",
      "--popover",
      "--popover-foreground",
      "--primary",
      "--primary-foreground",
      "--secondary",
      "--secondary-foreground",
      "--accent",
      "--accent-foreground",
      "--muted",
      "--muted-foreground",
      "--destructive",
      "--destructive-foreground",
      "--border",
      "--input",
      "--ring",
    ];

    for (const theme of STOREFRONT_THEMES) {
      const style = themeTokensToStyle(theme.tokens);
      for (const variable of requiredVariables) {
        expect(style[variable]).toBeTruthy();
      }
      expect(style["--primary"]).toBe(theme.tokens.primary);
    }

    expect(themeTokensToStyle(ADMIN_THEME.tokens)["--primary"]).toBe(
      ADMIN_THEME.tokens.primary,
    );
  });

  it("keeps key text and control pairings at WCAG AA contrast", () => {
    const themes = [...STOREFRONT_THEMES, ADMIN_THEME];

    for (const theme of themes) {
      expect(
        contrastRatio(theme.tokens.foreground, theme.tokens.background),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(theme.tokens.cardForeground, theme.tokens.card),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(theme.tokens.primaryForeground, theme.tokens.primary),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(theme.tokens.accentForeground, theme.tokens.accent),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(theme.tokens.mutedForeground, theme.tokens.muted),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
});
