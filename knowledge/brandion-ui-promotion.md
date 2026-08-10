# Brandion → msqdx-ui promotion (2026-08-10)

## Verdict

Most Brandion Measured / Lab / GSM UI is **app-domain composition** on existing `@msqdx/ui` primitives (`Dialog`, `ToggleGroup`, `Field`, `Text`, `ChatOverlay`, …). Wave 24 Collection Flow nodes live in **Plexon** on existing Flow\* shells — not Brandion Storybook.

## Promoted this wave (Storybook in msqdx-ui)

| Primitive | Layer | Storybook | Brandion source |
|-----------|-------|-----------|-----------------|
| `MagazineContentsNav` | Molecules | `Molecules/MagazineContentsNav` | `guideline-studio-shell.tsx` Contents nav (+ Checkion twin) |
| `MarkerCanvas` | Organisms | `Organisms/MarkerCanvas` | Findings / Lab region overlay pattern |

## Stay app-local (do not copy into msqdx-ui)

AnalysisRunPanel, FindingsWorkspace, DetectionLabPanel, DesignTokenStudio, ComplianceRulesStudio, TokenTypedFields, FixtureKitMenu, guideline/project hubs, asset upload control.

GSM magazine rebuild explicitly listed **new `@msqdx/ui` primitives as a non-goal** for that wave; these two promotions are cross-product chrome only.

## Staging Storybook

Live: `https://ds.projects-a.plygrnd.tech` (`URL_MSQDX_UI_STORYBOOK`) after Coolify redeploy of `msqdx-ui`.
