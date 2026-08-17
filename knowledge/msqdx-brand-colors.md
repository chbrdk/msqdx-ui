# MSQ DX brand colors

**Canonical source:** `msqdx-ui/packages/ui-tokens/src/brand.ts` (`msqdxBrand`)  
**Also:** msqdx.com extract in `msqdx-design-system/packages/react/knowledge/msqdx-com-tokens.md`  
**Storybook:** `https://ds.projects-a.plygrnd.tech`

## Brand hex

| Token | Hex |
|-------|-----|
| purple | `#b638ff` |
| yellow | `#fef14d` |
| pink | `#f256b6` |
| pinkOnLight | `#d5108a` |
| orange | `#ff6a3b` |
| green | `#00ca55` |
| blue | `#3080ff` |
| black | `#000000` |
| white | `#ffffff` |
| neutral | `#f8f6f0` |
| greyLight | `#d4d2d2` |

## Theme accents (semantic)

Default UI `--accent` = **orange** `#ff6a3b` (`msqdxLight` / `msqdxDark`).  
`--ok` = green, `--warn` = yellow.

Pipeline status CSS (`:root, [data-theme='msqdx']` in `packages/ui/src/css/tokens.css`) mirrors `msqdxStatus`: `--status-completed` … `--status-failed-enrich`. Creation Promote maps `color.status.pipeline.category_queued` → `var(--status-category-queued)` (`#fef14d`, same hex as `--warn`, dedicated var so unique pipeline hexes are not guessed onto `--ok`/`--warn`/`--danger`).

Do not invent product accents in chat — cite this file or `@msqdx/ui-tokens`.
