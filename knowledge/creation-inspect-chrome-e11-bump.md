# CREATION inspect chrome E11 bump (msqdx-ui)

**Date:** 2026-08-12  
**Consumer:** creation-v3 (`Dockerfile` `MSQDX_UI_REF`)  
**Prior:** `knowledge/creation-inspect-chrome-e10-bump.md`

## Why

E10 shipped icon slots, but Coolify failed: `pnpm-lock.yaml` still pinned `lucide-react ^1.27.0` while `package.json` asked for `^1.31.0`. Inspect still lacked type glyphs for decoration / transform / border / variant / size / tone.

## What landed in @msqdx/ui

| Change | Detail |
|--------|--------|
| Lockfile | `pnpm-lock.yaml` matches `lucide-react ^1.31.0` (latest as of 2026-08-12). |
| Icons | Type/chrome wraps: italic/underline/strike, case, ban/ghost, min/max, scroll, dotted, move, minus, circle/sparkles/success/warning/danger. |
| `Button` href | Discriminated link vs button props so `tsc` can spread a11y attrs onto `<a>` (Coolify `pnpm build`). |

Apps own name → icon maps. Values stay token/enum.

## Pin after push

Fill `MSQDX_UI_REF` with the **code** SHA of this wave (not a later docs-only commit).

Grep in creation-v3 Dockerfile: `IconItalic` · `IconBan`.
