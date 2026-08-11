# Journey ↔ chat blocks (Audion)

**Date:** 2026-08-11 (updated)  
**Related:** `audion-v3/knowledge/journeys-chat-gaps.md` · `audion-v3/packages/contracts/src/journeys.ts`

## Verdict

**Phase strip + moment list shipped in DS.** Personas/audiences remain on `ChatEntityGrid`. Workflow progress stays on `ChatStepList`.

## Mapping

| Journey concern | Chat chrome |
|-----------------|-------------|
| Phase outline | `ChatPhaseStrip` · Storybook `molecules-chatphasestrip--in-panel` |
| Typed moments | `ChatMomentList` · `molecules-chatmomentlist--in-panel` |
| Persona / Zielgruppe | `ChatEntityGrid` |
| Validate frictions / recs | `ChatBlockList` |
| Tool run progress | `ChatStepList` |

## Plexon generative types

- `phase_strip` → `UiPhaseStrip` → `ChatPhaseStrip`
- `moment_list` → `UiMomentList` → `ChatMomentList`

## Still product-owned

Audion phase slider, UX agent canvas, moments merge HITL, validate scorer, quote deep-links.
