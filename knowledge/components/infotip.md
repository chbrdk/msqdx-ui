# InfoTip

Molecule: ghost `IconInfo` trigger + hover/focus `Tooltip`. Spec: `specs/domain/msqdx-ui-infotip.md`.

## Usage

- Pass short tip `content` and a required `label` (aria-label).
- Apps own bilingual glossaries; DS stays language-agnostic.
- Pair beside metric/jargon labels — not every control.

## Consumers

- checkion-v3: `LabelWithTip` / `help-tips.ts` catalog.
