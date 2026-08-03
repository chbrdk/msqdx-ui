# Panel magazine alignment (2026-08-03)

**Problem:** Panels still looked like soft admin cards while Lede / FilterRow / SectionChrome read as magazine.

**Root cause:** Legacy `.module-panel` in `components.css` applied `--surface-2` wash + `--radius-panel`. Variant selectors (`.ds-panel--*`) lost the cascade to `.ds-panel.module-panel` / that alias.

**Fix:**
1. `.module-panel` → magazine-neutral (top hairline, fill-free, square).
2. Variants as `.ds-panel.ds-panel--*` (specificity-safe).
3. Wash only on `variant="default"`.
4. AUDION `.audion-magazine-band.ds-panel` → vertical pad only, no side card pad.

See `knowledge/components/lede-filter-panel.md`.
