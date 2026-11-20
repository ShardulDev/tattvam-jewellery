# Tattvam Jewels Design System

## Brand identity

The official brand is **TATTVAM JEWELS**, with the tagline **WEAR YOUR STORY.**
The approved complete logo and standalone lotus are stored at
`public/brand/tattvam-jewels-master.png` and
`public/brand/tattvam-jewels-icon.png` respectively. They are the supplied
original files; do not substitute or recreate either one.

The fixed logo identity uses deep emerald green and luxurious gold, with an
elegant premium presentation. Preserve the master artwork unchanged, including
its original colours and proportions. Do not crop, stretch, filter, recolour or
redraw it. Theme switching changes only website interface tokens; the same
approved logo is used with a sufficiently contrasting surrounding surface.

The active website theme remains **Burgundy Elegance**. The brand's signature
emerald-and-gold direction does not by itself change that default. Exact
signature website token values have not been separately approved; Emerald
Luxury remains a proposed theme palette.

The complete artwork has a green satin background and is preserved but unused
in the current UI. The app uses only the standalone icon, which has an alpha
channel with transparent and partially transparent pixels and a 3:2 ratio.
Preserve its transparency and proportions; the storefront and design-system
headers and landing presentation use the icon without an added background.
Browser icon metadata points to the same standalone icon; do not edit it to
create an alternate format or size.

The central identity values are in `src/lib/brand.ts`. Use them for the name,
tagline, both asset paths, signature aesthetic and default theme. Refer to
[BRAND_IDENTITY.md](BRAND_IDENTITY.md) for preservation rules and placement
guidance.

Keep the affordable-premium, elegant and welcoming experience through
restrained details and clear hierarchy; avoid wholesale styling, heavy ornament
and flashy effects.

## Default theme

**Burgundy Elegance** is the initial storefront theme. Its approved brand values
are primary `#713B43`, secondary/background `#F8F3EC`, accent `#C5A46D`, surface
`#FFFFFF`, foreground `#332A28`, and muted `#E9DED3`.

The theme registry also includes Emerald Luxe, Rose Romance, Midnight Gold,
Terracotta Warmth and Champagne Minimal. Their palettes are defined alongside the
default in `src/lib/themes.ts`. Each palette implements the same complete token
contract. Only Burgundy Elegance has a supplied exact palette; the other five
are initial visual proposals for review before any production theme selector is
enabled.

## Typography

- **Cormorant Garamond:** editorial headings and brand presentation. Use the
  Tailwind `font-heading` utility.
- **Inter:** body text, navigation, buttons, forms and operational interfaces.
  It is the default `font-sans` utility and body font.

Both are loaded and self-hosted through `next/font` in the root layout.

## Semantic colour tokens

Components consume semantic CSS variables through Tailwind utilities. Do not
put a theme's HEX values in reusable component classes or page markup.

| Token                                   | Use                                          |
| --------------------------------------- | -------------------------------------------- |
| `background`, `foreground`              | Main page surface and text                   |
| `card`, `card-foreground`               | Cards and their content                      |
| `popover`, `popover-foreground`         | Popovers, menus and dialogs                  |
| `primary`, `primary-foreground`         | Main actions and brand emphasis              |
| `secondary`, `secondary-foreground`     | Quiet actions and secondary surfaces         |
| `accent`, `accent-foreground`           | Badges and restrained highlights             |
| `muted`, `muted-foreground`             | Subtle surfaces and supporting text          |
| `destructive`, `destructive-foreground` | Errors and destructive actions               |
| `border`, `input`, `ring`               | Boundaries, form controls and keyboard focus |

`src/app/globals.css` maps the CSS variables to Tailwind 4 and shadcn-compatible
utilities with `@theme inline`. The base UI primitives are in
`src/components/ui/` and use those semantic utilities.

## Theme configuration and scope

`src/lib/themes.ts` is the source for storefront palette values and theme IDs.
`themeTokensToStyle()` maps each typed token set to the CSS custom property
contract. The `StorefrontThemeScope` applies a selected palette at its wrapper;
all descendant shared components continue using the same semantic classes.
`DEFAULT_STOREFRONT_THEME` selects Burgundy Elegance at launch.

Theme values are scoped rather than set by a global client-side provider. This
keeps server rendering straightforward and avoids theme-dependent business
logic or unnecessary global state.

## Admin and storefront separation

The customer storefront uses `StorefrontThemeScope` and the six brand palettes.
The admin interface has a separate `AdminThemeScope` and its own neutral
`ADMIN_THEME` token set, tuned for readable tables, forms and daily operations.
Both scopes expose the same semantic token names, but each owns its values. A
storefront theme change therefore does not change admin appearance. Future admin
appearance choices should remain separate from public brand settings.

The `/design-system` page demonstrates the same shared sample UI under every
storefront theme and under the independent admin scope.

## Adding a storefront theme

1. Add an entry to `STOREFRONT_THEMES` in `src/lib/themes.ts` with a unique ID,
   name, description and every `ThemeTokens` value.
2. Keep foreground/background pairs accessible. The theme tests check key text,
   button, badge and muted-text contrast against the WCAG AA 4.5:1 threshold.
3. The typed theme ID, preview and semantic components pick up the new entry;
   no component palette changes are needed.
4. Change `DEFAULT_STOREFRONT_THEME` only when the business chooses a new default.

## Future theme management and persistence

This phase keeps themes in code and does not create a database table or browser
storage. Later, theme selection and custom token overrides should be saved as a
versioned brand setting in the operational database. Admins can edit a draft,
preview it using the same scope, and publish it as the active storefront theme.
Publishing should record the actor and timestamp in the audit trail. The
administrator's own appearance preference should be stored separately from the
public brand setting. Browser `localStorage` must not become the source of truth
for either setting.

Custom HEX values should be validated at the server boundary, mapped to the
same semantic token contract, and checked for accessible contrast before they
can be published.

## Accessibility

- Normal text and controls with text use at least 4.5:1 contrast against their
  backgrounds; large text uses at least 3:1.
- Keyboard focus remains visible with the semantic `ring` token.
- Buttons, links and inputs retain native semantics and disabled states.
- Inputs have labels, navigation has an accessible name, and decorative artwork
  is hidden from assistive technology.
- Do not communicate availability, errors or status through colour alone.
