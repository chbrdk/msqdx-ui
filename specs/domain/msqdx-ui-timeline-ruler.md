# MSQDX UI — TimelineRuler / TimelineTrack / TimelineClip

**Status:** Active  
**Layer:** Molecules  
**Family:** Timeline shell (no edit graph)

## Purpose

Domain-free timeline chrome:

- **TimelineRuler** — tick marks / labels along a time axis
- **TimelineTrack** — labeled lane that hosts clips
- **TimelineClip** — absolute-positioned clip block (`left` / `width` as %)

Edit history, snap, ripple, and media decoding stay in the app.

## API (summary)

- `TimelineRuler`: `marks: { id, label, offsetPct }[]`, optional `playheadPct`
- `TimelineTrack`: `label`, `children` (clips)
- `TimelineClip`: `label?`, `leftPct`, `widthPct`, `active?`, `tone?`

## Acceptance

1. No dependency on VIDEON Cut models.
2. Apps compose these inside product timeline views.
