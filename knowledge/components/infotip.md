# InfoTip

Molecule: borderless compact `IconInfo` trigger + hover/focus `Tooltip`. Spec: `specs/domain/msqdx-ui-infotip.md`.

## Usage

- Pass short tip `content` and a required `label` (aria-label).
- Trigger is borderless with a 12px icon (`.ds-infotip__trigger`).
- Apps own bilingual glossaries; DS stays language-agnostic.
- Pair beside metric/jargon labels — not every control.

## Consumers

- checkion-v3: `LabelWithTip` / `help-tips.ts` catalog.
