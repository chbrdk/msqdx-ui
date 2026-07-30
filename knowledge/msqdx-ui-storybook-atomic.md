# MSQ DX v2 — Atomic Storybook (2026-07-28)

Full Atomic Design catalog for ECHON product UI.

**Spec:** `specs/domain/msqdx-ui-storybook-atomic.md`  
**Map:** `specs/domain/msqdx-ui-catalog-map.md`  
**Runtime inventory:** `apps/web-ui/src/storybook/catalog.ts`  
**Run:** `pnpm storybook` in `apps/web-ui` · URL `web.storybook_base_url`

## Layers

`Foundation` → `Atoms` → `Molecules` → `Organisms` → `Templates` → `Pages`

Each entry: co-located `*.stories.tsx` + `*.mdx` (Usage / Do–Don’t).

## Guards

- `src/storybook/catalogCompleteness.test.ts`
- `src/storybook/storySmoke.test.tsx`
- `src/storybook/viewports.ts` (responsiveSm/Md/desktop/ultraWide from paths)
- `pnpm build-storybook`

## Related

- Hub: `msqdx-ui-design-system.md`
- Completeness: `msqdx-ui-completeness.md`
- Responsive: `msqdx-ui-responsive.md`
- ADR 0028 §21 · §22
