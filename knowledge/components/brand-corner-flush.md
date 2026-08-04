# BrandCorner flush edge (2026-08-03)

**Issue:** 1px gap on top + right of the plaque vs viewport.

**Cause:** `.brand-corner-box` in `frame.css` still had `border: 1px solid var(--line)` (+ soft shadow). Ultra-wide cutout styles set fill/`top:0;right:0` but did not clear the border, so a hairline showed at the flush edges.

**Fix:** `border: 0; box-shadow: none` on `.brand-corner-box`; `.brand-corner` fixed at `top: 0; right: 0` in both `frame.css` and `ultra-wide.css`.

Corner radii / cutdowns stay on `MsqdxCornerBox` inline styles.
