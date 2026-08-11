# React types dedupe (sibling DS consumers)

## Problem

Apps (Brandion / Checkion / …) import `@msqdx/ui` **source** from a sibling `msqdx-ui` checkout. Docker builds install a full `msqdx-ui/node_modules` (incl. `@types/react`) **and** the app’s own `@types/react`.

`ChatOverlay` returns `createPortal(…)` → inferred `ReactPortal | null`. Two `@types/react` versions make:

`msqdx-ui`’s `ReactPortal` ⊄ app’s `ReactNode` → `ChatOverlay cannot be used as a JSX component`.

## Mitigations

1. **DS:** `ChatOverlay` declares return type `ReactNode` (not inferred portal).
2. **App Docker:** after `pnpm build` in the `ds` stage, **delete all `node_modules`** before `COPY --from=ds` (full trees OOM Coolify — exit 255). After app `npm ci`, `ln -s $APP/node_modules $DS/node_modules` for one `@types/react` tree during `next build`, then remove the symlink before the runner copy.
3. **Align** app `@types/react` with the DS pin when practical.

## Refs

- Brandion Coolify fail 2026-08-11 (`platform-assistant-host.tsx` × `ChatOverlay`)
- Spec: `specs/domain/msqdx-ui-chat-overlay.md`
