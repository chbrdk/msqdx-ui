# Brandion → msqdx-ui promotion (2026-08-10)

## Verdict

Promote **shared chrome** from Brandion Measured / Studio into `@msqdx/ui` + Storybook. Keep **domain contracts** (token parse/stringify, TypedFields, findings engines) app-local.

## Promoted (Storybook in msqdx-ui)

| Primitive | Layer | Storybook | Brandion source / consumer |
|-----------|-------|-----------|----------------------------|
| `MagazineContentsNav` | Molecules | `Molecules/MagazineContentsNav` | Guideline Studio Contents nav |
| `MarkerCanvas` | Organisms | `Organisms/MarkerCanvas` | Findings / Lab evidence markers |
| `FormSection` | Molecules | `Molecules/FormSection` | Token Add/Edit dialog (`design-token-studio`) |
| `EntityCard` | Molecules | `Molecules/EntityCard` | TokenCard face chrome |
| `AddTile` | Atoms | `Atoms/AddTile` | Token grid “+ Add” tile |
| `SwatchStrip` | Atoms | `Atoms/SwatchStrip` | Chapter teaser color strip |
| *(composition)* | Templates | `Templates/BrandionTokenStudio` | Board + Add dialog lookalike |

Brandion consumes these via `apps/web/lib/msqdx-ui.ts` (2026-08-10 wire-up).

## Stay app-local (do not dump into msqdx-ui)

`TokenTypedFields` / DTCG parse, AnalysisRunPanel, FindingsWorkspace, DetectionLabPanel, ComplianceRulesStudio, FixtureKitMenu, guideline hubs, asset upload. Flip-card animation / channel metrics stay Brandion.

## Staging Storybook

Live: `https://ds.projects-a.plygrnd.tech` (`URL_MSQDX_UI_STORYBOOK`) after Coolify redeploy of `msqdx-ui`.

Suggested paths after deploy:

- `/story/templates-brandiontokenstudio--board-and-dialog`
- `/story/molecules-formsection--stacked-dialog-body`
- `/story/molecules-entitycard--color-preview`
- `/story/atoms-addtile--default`
