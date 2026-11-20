# Tattvam Jewels Brand Identity

## Official identity

- **Brand name:** TATTVAM JEWELS
- **Official tagline:** WEAR YOUR STORY.
- **Signature aesthetic:** deep emerald green and luxurious gold.
- **Default website theme:** Burgundy Elegance.

The approved artwork has two supplied variants of the same identity. Their
source files were copied byte-for-byte into the repository; their checksums
match the supplied Downloads files.

## Approved assets

| Asset                        | Repository path                          | Use                                                                                               |
| ---------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Complete logo on green satin | `public/brand/tattvam-jewels-master.png` | Approved asset, retained but not currently displayed                                              |
| Standalone gold lotus        | `public/brand/tattvam-jewels-icon.png`   | The only artwork currently used in the app; compact header, landing presentation and browser icon |

Both supplied images are 1536 × 1024 PNGs. The complete logo has an opaque
green satin background. The standalone icon has an alpha channel with
transparent and partially transparent pixels; retain a suitable background
when placing it. The icon is not a square image, so keep its 3:2 aspect ratio.

## Preservation rules

- Preserve both original files unchanged. Do not redraw, regenerate, recolour,
  filter, crop, stretch, distort, background-remove or replace them.
- Keep each image's intrinsic 3:2 aspect ratio. In the UI, use `object-fit:
contain` or equivalent sizing that does not crop or distort artwork.
- The complete artwork includes the lotus, TATTVAM wordmark, JEWELS lettering,
  tagline and green satin background. Do not assume its background is
  transparent.
- The standalone icon has transparency and no wordmark or tagline. Place it on
  a background with sufficient contrast; do not assume it is an opaque image.
- Theme changes affect surrounding interface tokens only. Always use these
  same approved assets without CSS filters or theme-specific variants.
- The standalone icon is referenced for browser icon support without editing
  the source file. Any resized, square, or format-converted favicon asset would
  be a separate derivative and needs separate approval.

## Placement guidance

- **Storefront header and landing presentation:** currently use only the
  standalone lotus with its transparent background and natural ratio. The
  complete artwork is preserved in the repository but not displayed for now.
- **Admin login and dashboard:** use only the standalone icon if brand artwork
  is needed. Keep admin interface tokens neutral and separate from customer
  themes.
- **Browser icon:** point browser icon metadata at the supplied standalone
  icon. If a platform later requires another size or format, create a separate
  approved asset rather than altering this source.
- **Email and order communications:** use only the standalone icon if artwork
  is needed for now; the complete artwork remains unused.

The central application configuration is `src/lib/brand.ts`. Read the brand
name, tagline, asset paths, signature aesthetic and default theme from there
instead of repeating them in UI components or metadata.
