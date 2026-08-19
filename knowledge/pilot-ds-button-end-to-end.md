# `ds-button` End-to-End Pilot (CREATION → Promote → Storybook)

## Pilot goal
Edit `ds-button` in CREATION and verify that the visually relevant promoted story in `msqdx-ui` updates and renders with the same token-driven state in Storybook.

## Single pilot surface in CREATION
Authoritative pilot composition (Gallery — loadable via editor):
- `apps/demo/compositions/components.zaoly.html` (editor path key: `galleryCompositionFs`)

In that composition the `ds-button` has node id `n_gallery_btn` and is configured as:
- `variant="primary"`, `label="Button"`
- responsive `radius` token bindings (`token(radius.xl)` default, sm/md/lg overrides)

> **Note:** `push-frame.zaoly.html` exists on disk but is **not** registered in the editor's `PATHS` object and cannot be opened from the CREATION UI. Use the Gallery composition instead.

## Single promoted entry in Storybook (`msqdx-ui`)
Promoted story file (P1 output):
- `packages/ui/src/components/Button.promoted.stories.tsx`

It exports:
- `Promoted` story (meta title: `Promoted/Button`)

## Where the runtime token bindings are applied
Storybook preview decorator reads `parameters.tokenBindings` from promoted stories and applies them on the rendered DOM:
- Decorator entry: `packages/ui/.storybook/preview.tsx`
- Runtime binder: `packages/ui/src/storybook/promotedTokenBindings.tsx`

Current scope of mappings (enough for the pilot):
- Button: `tokenBindings.color` → CSS var override for `--accent`, `tokenBindings.radius` → inline `borderRadius`
- Text: `tokenBindings.typography.heading.h1` + `tokenBindings.color.neutral.700` (used by the existing promoted Text story)

## Promote/emit trace (where the promoted story file is generated)
Per the round-trip spec, CREATION “Promote” opens/updates a PR against `chbrdk/msqdx-ui` that contains generator-shaped promoted outputs:
- Promoted file convention: `packages/ui/src/components/{Type}.promoted.stories.tsx`
- Meta fields: `parameters.msqdxUiRef` + `parameters.tokenBindings`

Validate the API contract against:
- `specs/domain/library-composition-roundtrip.md` (Phase 3/4 + promote pipeline)
- `knowledge/library-composition-roundtrip.md` (same, consumer-focused)

## Step-by-step workflow (do this for each verification run)
1. Open CREATION and load the **Gallery** composition:
   - `apps/demo/compositions/components.zaoly.html` (listed as „Zaoly v1 — Atomic Design" in the editor)
2. Select the `ds-button` node (id `n_gallery_btn`, label „Button").
3. Make one small change on a token-bindable field (so it becomes visible):
   - label text (e.g. `Go` → `Next`)
   - radius (default `radius` is token-bindable)
   - primary color token (token-bindable `color`)
4. Promote from the inspector for that node (P1 / instance override).
5. Wait for the generated PR against `chbrdk/msqdx-ui` to be merged.
6. In Storybook, open the promoted story:
   - Search for story title `Promoted/Button` and select the `Promoted` export.
   - (Canonical deck URL base is tracked in `msqdx-ui/knowledge/paths.md` as `URL_MSQDX_UI_STORYBOOK`.)
7. Confirm visual parity: the button’s radius and fill color should match what you see in CREATION.

## What to do when verification fails
- If Storybook updates but the styling does not change, the promoted story may be missing the token-bindable field in `parameters.tokenBindings`.
- If tokenBindings exist but the bridge doesn’t apply, extend the mapping in:
  - `packages/ui/src/storybook/promotedTokenBindings.tsx`

