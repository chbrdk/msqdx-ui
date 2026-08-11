# React types dedupe (sibling DS consumers)

## Problem

Apps (Brandion / Checkion / …) import `@msqdx/ui` **source** from a sibling `msqdx-ui` checkout. Docker builds install a full `msqdx-ui/node_modules` (incl. `@types/react`) **and** the app’s own `@types/react`.

`ChatOverlay` returns `createPortal(…)` → inferred `ReactPortal | null`. Two `@types/react` versions make:

`msqdx-ui`’s `ReactPortal` ⊄ app’s `ReactNode` → `ChatOverlay cannot be used as a JSX component`.

## Mitigations

1. **DS:** `ChatOverlay` declares return type `ReactNode` (not inferred portal).
2. **App Docker:** after `npm ci`, point `msqdx-ui/node_modules/@types/react{,-dom}` at the app’s copies (symlink) so one type tree remains.
3. **Align** app `@types/react` with the DS pin when practical.

## Refs

- Brandion Coolify fail 2026-08-11 (`platform-assistant-host.tsx` × `ChatOverlay`)
- Spec: `specs/domain/msqdx-ui-chat-overlay.md`
