# MSQDX UI — SettingsShell

**Status:** Accepted — 2026-08-28  
**Layer:** Organisms  
**Related:** `msqdx-ui-section-chrome.md`, web-system `--z-*` / themes

## Purpose

Shared **magazine settings layout** for federation products. One quiet composition: lede + fixed core bands + app `extras` slot. Domain auth/profile fetching stays in consuming apps.

## Band order (required)

1. Lede (Hint / short magazine lead)  
2. Account  
3. Profile  
4. Appearance  
5. Language  
6. Extras (optional product bands)

## API

### `SettingsShell`

| Prop | Role |
|------|------|
| `lede` | Magazine lead / Hint |
| `account` | Account band body |
| `profile` | Profile band body |
| `appearance` | Appearance band body |
| `language` | Language band body |
| `extras` | Product-specific bands (tokens, admin, federation, …) |
| `labels` | `{ account, profile, appearance, language }` section titles |

### `SettingsBand`

Quiet section: `SectionChrome quiet` + optional help + children. Used by apps inside slots or by Shell for core titles.

### Theme preference helpers (`themePreference.ts`)

| Export | Behavior |
|--------|----------|
| `ThemePreference` | `'light' \| 'dark' \| 'auto'` |
| `resolveThemeId(pref)` | `light→msqdx`, `dark→msqdx-dark`, `auto→prefers-color-scheme` |
| `applyThemePreference(pref)` | Sets `html[data-theme]`; for `auto` installs `matchMedia` listener; returns cleanup |
| `migrateLegacyThemeId(raw)` | Maps old `msqdx` / `msqdx-dark` / `msqdx-v2*` storage to preference |

WENN `pref` is `auto`, DANN MUST the resolved theme update when `prefers-color-scheme` changes.

WENN `prefers-reduced-transparency` is not required for this shell (solid magazine bands).

## Visual rules

- One column stack; generous band spacing; no card chrome / Panel dumps for core bands.
- Hairline separators optional via CSS; titles via quiet `SectionChrome`.
- Appearance UI MUST expose only Hell / Dunkel / Automatisch (light / dark / auto).

## Non-goals

- Plexon fetch / NextAuth / i18n dictionaries inside `@msqdx/ui`
- Brand accent color, password, API tokens (app extras)

## Acceptance

1. Stories show full shell with stub bands + extras.
2. Unit tests: band order class hooks; `resolveThemeId` / `migrateLegacyThemeId` / auto listener apply.
3. Apps import `SettingsShell`, `SettingsBand`, theme helpers from `@msqdx/ui`.
