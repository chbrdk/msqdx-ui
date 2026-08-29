# MSQDX UI — SettingsShell

**Status:** Accepted — 2026-08-28 · **Polish 2026-08-29** (2-col + accent)  
**Layer:** Organisms  
**Related:** `msqdx-ui-section-chrome.md`, web-system `--z-*` / themes

## Purpose

Shared **magazine settings layout** for federation products. One quiet composition: optional lede + fixed core bands + app `extras` slot. Domain auth/profile fetching stays in consuming apps.

## Band order (required)

1. Lede (optional; max one short line — prefer omit)  
2. Account  
3. Profile  
4. Appearance  
5. Language  
6. Extras (optional product bands)

## API

### `SettingsShell`

| Prop | Role |
|------|------|
| `lede` | Optional one-line lead |
| `account` | Account band body |
| `profile` | Profile band body |
| `appearance` | Appearance band body |
| `language` | Language band body |
| `extras` | Product-specific bands (tokens, admin, federation, …) |
| `labels` | `{ account, profile, appearance, language }` section titles |
| `*Help` | Optional; when set MUST stay ≤ one meta line |

### `SettingsBand`

Quiet section: `SectionChrome quiet` + optional short help + children. Used by apps inside slots or by Shell for core titles.

### Theme preference helpers (`themePreference.ts`)

| Export | Behavior |
|--------|----------|
| `ThemePreference` | `'light' \| 'dark' \| 'auto'` |
| `resolveThemeId(pref)` | `light→msqdx`, `dark→msqdx-dark`, `auto→prefers-color-scheme` |
| `applyThemePreference(pref)` | Sets `html[data-theme]`; for `auto` installs `matchMedia` listener; returns cleanup |
| `migrateLegacyThemeId(raw)` | Maps old `msqdx` / `msqdx-dark` / `msqdx-v2*` storage to preference |

WENN `pref` is `auto`, DANN MUST the resolved theme update when `prefers-color-scheme` changes.

### Accent preference helpers (`accentPreference.ts`)

| Export | Behavior |
|--------|----------|
| `AccentPreference` | `'purple' \| 'blue' \| 'pink' \| 'orange' \| 'green' \| 'yellow' \| 'grey' \| 'ink'` |
| `ACCENT_OPTIONS` | id + preview hex + contrast text color |
| `applyAccentPreference(id)` | Sets `--accent` (+ contrast helpers) on `document.documentElement` |
| `migrateLegacyAccent(raw)` | Maps CSS-var / storage keys (e.g. `plexon-sidebar-color` values) → id |

### `AccentSwatchGroup`

Compact round swatches for Appearance. Labels via `aria-label` only (no hex dump in UI).

### `Avatar`

Optional `accent?: string` (CSS color) for initials background; otherwise uses `var(--accent)`.

## Visual rules

- **Two columns** from ~720px: title (+ optional help) left (`minmax(10rem,14rem)`), controls right (`1fr`). Mobile stacks.
- Shell max-width ~56–64rem; no card chrome / Panel dumps for core bands.
- Hairline separators optional via CSS; titles via quiet `SectionChrome`.
- Appearance MUST expose Hell / Dunkel / Automatisch **and** may host `AccentSwatchGroup`.
- Prefer no band help / lede; when present, meta role, one line.

## Non-goals

- Plexon fetch / NextAuth / i18n dictionaries inside `@msqdx/ui`
- Avatar file upload, password, API tokens (app concerns)

## Acceptance

1. Stories show 2-col shell with stub bands + accent swatches + extras.
2. Unit tests: band grid hooks; theme helpers; accent migrate/apply; Avatar accent.
3. Apps import `SettingsShell`, `SettingsBand`, theme + accent helpers, `AccentSwatchGroup` from `@msqdx/ui`.
