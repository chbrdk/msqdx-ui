# MSQDX UI — Waveform

**Status:** Active  
**Layer:** Molecules

## Purpose

Presentational waveform strip from normalized peak samples (0–1). Drawing/data generation stays in the app or is passed as `peaks`.

## API

- `peaks: readonly number[]`
- `progressPct?: number` — optional fill overlay
- `height?: number` — CSS px default 32

## Acceptance

1. Renders SVG bars from peaks.
2. No audio decoding in the DS.
