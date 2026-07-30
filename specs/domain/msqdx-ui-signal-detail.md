# MSQ DX v2 — Signal detail (Briefing chrome parity)

**Status:** Accepted — 2026-07-28  
**ADR:** 0028 §18  
**Implements:** `apps/web-ui/src/pages/SignalDetailPage.tsx`  
**Knowledge:** `knowledge/msqdx-ui-signal-detail.md`  
**Reference pilot:** `BriefingDetailPage.tsx` (shared `signal-*` layout)

## Goals

1. `/signals/:id` uses the same **DS chrome language** as magazine briefings: Text roles, SectionChrome/quiet labels, Hint, motion `--motion-reveal`, nav flex + separators.
2. Keep Signal **domain content** distinct: ranked ScoreBars (no spider), geo, entities, tags, similar, full article extract, metadata footer.
3. Spec → page migrate → tests → knowledge/ADR.

## Non-goals

- Clone Briefing radar / CitationScoreBars / ChatAnswer magazine OL chrome onto Signal.
- Rewrite article extraction / junk gate.
- Chat sheet chrome (separate spec `msqdx-ui-chat-chrome.md`).

## Shared layout (preserve)

| Block | Classes |
|-------|---------|
| Shell | `.panel.signal-detail` · max-width 58rem |
| Nav | `.signal-nav` (+ `.briefing-nav` flex pattern) |
| Hero | `.signal-hero` · `.signal-title` · `.labeled-facets` |
| Pullquote | `.signal-pullquote` |
| Stage | `.signal-stage` · `.stage-panel` |
| Sections | `.detail-block` |

## DS contract

| Surface | Treatment |
|---------|-----------|
| Title | `<Text role="headline" as="h2" className="signal-title">` |
| Subheads | `<SectionChrome quiet as="h3">` **or** `<Text role="label" as="h3">` |
| Hints | `<Text role="hint">` / `<Hint>` |
| Meta / loading / empty | `<Text role="meta">` / `<LoadingText>` / `<EmptyState>` |
| Errors | `<Alert tone="error">` |
| Motion | `.ds-motion-reveal` (remove page `.reveal`) |
| Nav | flex + `.briefing-nav-sep`; optional `<Button variant="link">` copy |
| CTAs | Research via `researchHref` (paths config — no hardcoded URLs) |

## Explicit keep different

| Signal | Briefing |
|--------|----------|
| SentimentBand | Eyebrow label |
| ScoreBars only | Radar + bars |
| Article extract | ChatAnswer magazine |
| Similar / entities / tags / meta grid | Citations / tool trace |

## Acceptance

1. Hero title has `ds-text-headline` + `signal-title`.
2. Stage/detail subheads + hints use DS Text/SectionChrome — no raw rem/weight in page.
3. Enter motion uses `.ds-motion-reveal`; no `.reveal` on this page.
4. Nav uses briefing-style separators; research/back links preserved.
5. Loading/error use LoadingText/Alert (or Text meta).
6. Domain viz unchanged in behavior (ScoreBars, similar, article include_content).
7. Vitest asserts DS class contracts.
8. Knowledge + completeness + ADR §18 linked.

## Migration

- Next: Chat chrome spec · optional article-well soft tokenize.
