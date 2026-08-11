# Journey ↔ chat blocks (Audion)

**Date:** 2026-08-11 (updated)  
**Related:** `audion-v3/knowledge/journeys-chat-gaps.md` · `audion-v3/packages/contracts/src/journeys.ts`

## Verdict

**Phase strip, moment list, and quote list shipped.** Compose validate frictions/recs via existing `ChatBlockList` / generative finding + recommendation blocks.

## Mapping

| Journey concern | Chat chrome / block |
|-----------------|---------------------|
| Phase outline | `ChatPhaseStrip` / `phase_strip` |
| Typed moments | `ChatMomentList` / `moment_list` |
| Validate quotes | `ChatQuoteList` / `quote_list` |
| Validate frictions / recs | `finding_list` / `recommendation_list` |
| Deep link | `link_list` → Audion journey URL |
| Persona / Zielgruppe | `ChatEntityGrid` |
| Tool run progress | `ChatStepList` |

## Plexon builders

- `buildJourneyOutlineBlocks` — phases + moments  
- `buildJourneyDetailLayout` — outline + quotes + findings + recs + link  

Wire from Audion journey fetch / validate tools when handlers land (no dedicated journey intent handler yet).

## Still product-owned

Audion phase slider, UX agent canvas, moments merge HITL, validate scorer, quote deep-links into Audion Chat.
