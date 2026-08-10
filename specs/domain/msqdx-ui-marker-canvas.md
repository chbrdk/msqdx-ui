# MSQDX UI — MarkerCanvas

**Status:** Accepted — 2026-08-10  
**Layer:** Organisms  
**Origin:** Brandion Findings document canvas / Detection Lab region overlays (generic paint layer)  
**Catalog:** Storybook → Organisms/MarkerCanvas  
**Knowledge:** `knowledge/components/marker-canvas.md`

## Purpose

Present a media frame (image or custom paint slot) with **normalized** rectangular markers for evidence / region review.

Apps own PDF rasterization, fixture paints, and domain hit payloads — this primitive owns layout, marker chrome, selection, and click routing.

## Non-goals

- PDF.js / Brandion `EvidenceAnchor` contracts.
- Rule evaluation UI / findings dossier.
- OCR or measure pipelines.

## API

```tsx
<MarkerCanvas
  src="/fixtures/page.png"
  alt="Page preview"
  markers={[
    { id: 'm1', x: 0.1, y: 0.2, w: 0.25, h: 0.1, tone: 'fail', label: 'Color' },
    { id: 'm2', x: 0.4, y: 0.5, w: 0.3, h: 0.08, tone: 'pass', selected: true },
  ]}
  onMarkerActivate={(id) => console.log(id)}
/>
```

| Prop | Notes |
|------|--------|
| `src` | Optional image URL / data URL |
| `alt` | Image alt (default empty decorative) |
| `media` | Optional ReactNode instead of / with `src` (canvas paint slot) |
| `markers` | Normalized boxes `x,y,w,h` in **0–1** of media box |
| `tone` | `neutral` \| `pass` \| `fail` \| `warn` |
| `selected` | Emphasize one marker |
| `onMarkerActivate` | Click / keyboard activate by id |
| `empty` | Shown when no `src`/`media` and no markers |
| `showMarkers` | Default `true` |

## Tokens / CSS

`.ds-marker-canvas*` — frame uses `--line`, `--radius-md`, `--bg1`; marker tones map to `--danger` / `--success` / `--warn` / `--accent`.

## Accessibility

- Frame is a region with optional `aria-label`.
- Markers are buttons when activatable; otherwise presentational.
- Keyboard: Enter/Space on focused marker.

## Acceptance

1. Stories: ImageWithMarkers, SelectedFail, Empty, MediaSlot (div paint), HiddenMarkers.
2. Unit test: click fires `onMarkerActivate` with id; selected class applied.
3. No Brandion/Checkion imports inside the package.
4. Catalog + barrel export.

## Consumers

- Brandion Findings / Detection Lab (wrap existing PDF paint)
- Future Checkion capture overlays
