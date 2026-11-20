import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  ADMIN_THEME,
  DEFAULT_STOREFRONT_THEME,
  STOREFRONT_THEMES,
  themeTokensToStyle,
  type StorefrontThemeId,
} from "@/lib/themes";

interface ThemeScopeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface StorefrontThemeScopeProps extends ThemeScopeProps {
  themeId?: StorefrontThemeId;
}

export function StorefrontThemeScope({
  children,
  className,
  themeId = DEFAULT_STOREFRONT_THEME,
  ...props
}: StorefrontThemeScopeProps) {
  const theme =
    STOREFRONT_THEMES.find((candidate) => candidate.id === themeId) ??
    STOREFRONT_THEMES[0];

  return (
    <div
      data-theme-context="storefront"
      data-theme-id={theme.id}
      className={cn("min-h-screen bg-background text-foreground", className)}
      style={themeTokensToStyle(theme.tokens)}
      {...props}
    >
      {children}
    </div>
  );
}

export function AdminThemeScope({ children, className, ...props }: ThemeScopeProps) {
  return (
    <div
      data-theme-context="admin"
      data-theme-id={ADMIN_THEME.id}
      className={cn("bg-background text-foreground", className)}
      style={themeTokensToStyle(ADMIN_THEME.tokens)}
      {...props}
    >
      {children}
    </div>
  );
}
