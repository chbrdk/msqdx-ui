# Button magazine defaults (2026-08-03)

Product CTAs were already **square** and **larger** via local CSS (`CardActions`, collection create, CHECKION launch). That language is now the `@msqdx/ui` Button default.

| Default | Value |
|---------|-------|
| `shape` | `square` (`border-radius: 0`) |
| `size` | `md` (min-height 2.5rem) |

- `lg` = launch CTA scale (ex CHECKION `.checkion-launch-compose__actions .ds-btn`)
- `pill` = chat send only
- `buttonClassName()` for `NextLink` / bare anchors
- `href` on `<Button>` renders an `<a>`

Products: prefer `<Link><Button/></Link>` or `buttonClassName` — do not hand-roll `.ds-btn--*` strings.
