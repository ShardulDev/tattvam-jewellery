import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StorefrontThemeScope } from "@/components/theme/theme-scope";
import { ThemeSampleContent } from "@/components/theme/theme-sample-content";
import type { StorefrontThemeDefinition, StorefrontThemeId } from "@/lib/themes";

interface ThemePreviewCardProps {
  theme: StorefrontThemeDefinition;
  themeId: StorefrontThemeId;
  isDefault: boolean;
}

export function ThemePreviewCard({ theme, themeId, isDefault }: ThemePreviewCardProps) {
  return (
    <StorefrontThemeScope themeId={themeId} className="rounded-xl border border-border">
      <Card className="h-full border-0 shadow-none">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="font-heading text-2xl font-medium">
              {theme.name}
            </CardTitle>
            {isDefault ? (
              <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                Default
              </span>
            ) : null}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {theme.description}
          </p>
          <div
            className="flex gap-2 pt-2"
            role="group"
            aria-label={`${theme.name} palette`}
          >
            <span className="size-5 rounded-full bg-primary" title="Primary" />
            <span
              className="size-5 rounded-full bg-secondary ring-1 ring-border"
              title="Secondary"
            />
            <span className="size-5 rounded-full bg-accent" title="Accent" />
            <span
              className="size-5 rounded-full bg-muted ring-1 ring-border"
              title="Muted"
            />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ThemeSampleContent
            title="Shared components"
            description="The same semantic UI rendered with this theme's tokens."
          />
        </CardContent>
      </Card>
    </StorefrontThemeScope>
  );
}
