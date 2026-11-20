import type { StorefrontThemeId } from "@/lib/themes";

export const BRAND = {
  name: "TATTVAM JEWELS",
  tagline: "WEAR YOUR STORY.",
  masterLogoAssetPath: "/brand/tattvam-jewels-master.png",
  iconAssetPath: "/brand/tattvam-jewels-icon.png",
  defaultTheme: "burgundy-elegance" as StorefrontThemeId,
  signatureAesthetic: "Deep emerald green and luxurious gold",
  description: "A considered collection of imitation jewellery, chosen with care.",
} as const;
