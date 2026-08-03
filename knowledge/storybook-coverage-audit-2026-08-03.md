# Storybook coverage audit — 2026-08-03

**Repo:** `msqdx-ui` (`@msqdx/ui`)  
**Storybook:** v10.5.5 · local http://localhost:6006/  
**Catalog SoT:** `packages/ui/src/storybook/catalog.ts`  
**Guard:** `packages/ui/src/storybook/catalogCompleteness.test.ts`

## Verdict (updated)

Atomic + shell/overview/viz barrel exports now have CSF + MDX + catalog rows.  
`CatalogLayer` extended with `Templates` for `AppFrame`.

## Added this session

| Id | Title |
|----|--------|
| Icons | Foundation/Icons |
| BrandCorner | Molecules/BrandCorner |
| TopStatus | Molecules/TopStatus |
| DivergingBar | Molecules/DivergingBar |
| WizardSteps | Molecules/WizardSteps |
| NavRail | Organisms/NavRail |
| KpiStrip | Organisms/KpiStrip |
| PipelinePanel | Organisms/PipelinePanel |
| StatusMeterPanel | Organisms/StatusMeterPanel |
| AppFrame | Templates/AppFrame |

## Intentionally without dedicated CSF

- Brand internals: `MsqdxCornerBox`, `MsqdxLogoMark`, cutdown tokens (covered via BrandCorner)
- `shell/railDock` helpers (non-visual utilities)

## Related

- Spec atomic: `specs/domain/msqdx-ui-storybook-atomic.md`
- Paths: `knowledge/paths.md`
