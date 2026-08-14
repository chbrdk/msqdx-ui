# DS-DEPOSIT D5 — Component semantic consume map

**Canonical JSON + human table:** `brandion-v3/knowledge/ds-deposit-component-semantic-map.json` · `…/ds-deposit-component-semantic-map.md`  
**Local copy (keep in sync):** `knowledge/ds-deposit-component-semantic-map.json`  
**Date:** 2026-08-14 · **Wave:** D5

Storybook MDX **Tokens consumed** sections cite this file. Enums stay React API — do not mint `button.variant.ghost` leaves.

Layer 0 CSS (`packages/ui/src/css/*.css`) remains paint SoT. This map only documents which deposited Brandion paths those class modifiers already consume.

Example: Button `variant=primary` → `--accent` → `color.action.primary` (background). Foreground `#1a150c` is hardcoded (not a leaf).

See brandion-v3 human doc for the full verified table and uncovered chrome.
