# WC compile (catalog → Custom Elements)

**Status:** Accepted · **Date:** 2026-08-17  
**Domain:** `specs/domain/library-composition-roundtrip.md` Phase 5  
**Knowledge:** `knowledge/wc-compile.md`

## Purpose

Web Components are a **compile target** of the React `@msqdx/ui` catalog — not a second SSOT. CREATION MUST NOT export ad-hoc WCs.

## Input

- `CATALOG` (`packages/ui/src/storybook/catalog.ts`)
- Primitive source under `packages/ui/src` (CSS tokens / Print class names)

## Output

Git-diffable:

- `packages/ui/src/wc/generated/manifest.ts` — tag map compiled from catalog ids
- Runtime: `defineMsqdxCatalogElements(manifest)` registers `msqdx-{kebab(id)}` Custom Elements (Shadow DOM + slot; styling via inherited CSS custom properties)

## Requirements (EARS)

1. WHERE a catalog entry exists, the compile MUST emit exactly one tag `msqdx-` + kebab-case `id`.
2. WHEN `pnpm wc:compile` runs, it MUST rewrite `packages/ui/src/wc/generated/manifest.ts` from `CATALOG` (deterministic).
3. WHEN a consumer needs WCs, it MUST import `@msqdx/ui/wc` (or the generated manifest) — not a CREATION-local catalog.
4. The compile MUST NOT copy Collection branding, report payloads, or CREATION scene JSON into the WC layer.

## Non-goals

- Replacing the React catalog.
- Pixel-perfect Print HTML inside every custom element.
- Auto-publishing a npm WC package from CREATION.
