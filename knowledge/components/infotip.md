# InfoTip

Molecule: borderless compact `IconInfo` trigger + hover/focus `Tooltip`. Spec: `specs/domain/msqdx-ui-infotip.md`.

## Usage

- Pass short tip `content` and a required `label` (aria-label).
- Trigger is borderless with a 12px icon (`.ds-infotip__trigger`).
- Bubble is wider (~22rem) with smaller type than default Tooltip.
- Bubble keeps sentence case (`text-transform: none`) even under uppercase magazine labels.
- Tooltip portals to `document.body`, sits tightly above the icon, and flips below only when the top edge has no room.
- Apps own bilingual glossaries; DS stays language-agnostic.
- Pair beside metric/jargon labels — not every control.

## Consumers

- checkion-v3: `LabelWithTip` / `help-tips.ts` catalog.
