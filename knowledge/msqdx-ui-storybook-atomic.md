# MSQ DX v2 — Atomic Storybook (2026-07-28)

Full Atomic Design catalog for ECHON product UI.

**Spec:** `specs/domain/msqdx-ui-storybook-atomic.md`  
**Map:** `specs/domain/msqdx-ui-catalog-map.md`  
**Runtime inventory:** `packages/ui/src/storybook/catalog.ts`  
**Run:** `pnpm storybook` in `msqdx-ui` · URL http://localhost:6006/

## Layers

`Foundation` → `Atoms` → `Molecules` → `Organisms` → `Templates` → `Pages`

Each entry: co-located `*.stories.tsx` + `*.mdx` (Usage / Do–Don’t).

## Guards

- `packages/ui/src/storybook/catalogCompleteness.test.ts`
- Coverage audit: `knowledge/storybook-coverage-audit-2026-08-03.md`

## Related

- Hub: `msqdx-ui-design-system.md`
- Completeness: `msqdx-ui-completeness.md`
- Responsive: `msqdx-ui-responsive.md`
- ADR 0028 §21 · §22
