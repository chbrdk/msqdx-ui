# Field / Input chrome (2026-07-29)

Shared face for all MSQ DX products (AUDION, ECHON, …):

- **Label** `.ds-field-label`: `0.62rem`, uppercase, `--accent`
- **Control**: transparent bg · light frame `color-mix(ink 6%)` · firm bottom `--ink`
- **Focus**: light accent frame + bottom `--accent` · **no** focus glow ring
- **Invalid**: danger bottom rule
- **`Input block`**: width only — pass `className="search-input"` for legacy toolbar alias

Source: `packages/ui/src/css/field.css`  
Specs: `specs/domain/msqdx-ui-field.md`, `specs/domain/msqdx-ui-forms.md`
