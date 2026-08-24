# MarkdownProse — `@msqdx/ui`

## Status
Accepted (August 2026). Shared renderer for LLM / GEO answer bodies in CHECKION and Plexon.

## Purpose
GEO and competitive-LLM answers arrive as **GitHub-flavoured Markdown** (headings, tables, lists, links). Plain text or `pre-wrap` renders raw `**` and `| col |` — unusable in magazine dossiers.

## Primitive
`MarkdownProse` — molecule in `packages/ui/src/components/MarkdownProse.tsx`.

| Prop | Type | Default |
|------|------|---------|
| `children` | `string` | required |
| `className` | `string` | — |
| `as` | `'div' \| 'blockquote' \| 'article'` | `'div'` |

## Pipeline
- `react-markdown` + `remark-gfm` (tables, task lists, strikethrough, autolinks)
- `rehype-sanitize` (no raw HTML injection)
- Root class: `.ds-markdown-prose` (+ optional product hook classes)

## Consumers
- CHECKION `geo-queries-panel` → `AnswerDetail` prose
- Plexon EQC `EventQuickCheckCitationSection` + `EventQuickCheckLlmAnswerDialog`
- Optional later: replace Plexon `AssistantChatAnswer` custom parser (out of scope here)

## Non-goals
- Full MDX / custom components in markdown
- PDF-specific layout (print twins use existing Mag paths)
