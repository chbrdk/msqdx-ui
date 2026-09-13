# MSQDX UI — Print report primitives (chip tone · callout · table align · steps)

**Status:** Accepted — Phase A–E **Implemented** (2026-09-13)  
**Wave id:** `W-PRINT-REPORT-ATOMS` · Mag kit amendment **P92**  
**Layer:** Print (HTML) ↔ Mag (PDF) twins  
**Trigger:** Agent-authored print/report decks (Creation + Plexon craft playbooks) need structured emphasis without custom SVG/HTML that Mag silently drops  
**Consumers:** creation-v3 editor canvas + Mag PDF flatten · plexon Assistant print playbooks  
**Depends:** `specs/domain/msqdx-ui-mag-pdf-kit.md` (P78–P91) · `knowledge/print-magazine-twins.md`  
**Knowledge:** `knowledge/print-report-primitives-wave.md`  
**Creation companion:** `creation-v3/specs/domain/print-report-primitives-consume.md`

## Purpose

Extend the **existing** Print/Mag atom set so agent and human authors can express:

1. Multi-state chip rows (progress / emphasis),  
2. Wash callout bands (not only pull-quotes),  
3. Per-column table alignment (esp. numeric EUR columns),  
4. Simple numbered process steps (no free-form diagram engine),

…with **HTML canvas ≡ Mag PDF** parity (WYSIWYG-P1 rule: show in inspect only if both sides honor it).

## Non-goals

- Generic diagram / SVG / fan-out / zig-zag primitives  
- JoyConf- or brand-specific pink as Mag default (Brandion print pack owns accent)  
- Digital `SiteTable` / Site Kit tables (PrintTable stays magazine-only)  
- Inventing PrintChip variants **before** DS props exist (supersedes CREATION `editor-inspect.md` P54 freeze **after** this wave lands in DS)  
- Changing EQC packing models in plexon

## Architecture principles (locked)

1. **DS first** — HTML `Print*` + Mag `Mag*` + shared CSS/tokens in `msqdx-ui`; Creation only inspect + flatten.  
2. **Twin or hide** — every new enum/prop MUST paint on `.msqdx-print-*` **and** Mag twin, or stay out of inspect.  
3. **Theme tokens, not hex** — tones map to `magazineColors` / CSS vars (`--print-ink`, `--print-line`, `--print-wash`, accent). No free hex on tone props.  
4. **One scene writer** — agent uses `insert_child` / `set_prop` on typed nodes; no parallel HTML blob for Mag-bound pages.  
5. **Eval before thrash** — Creation smoke + Mag kit Drift-CI + one plexon print-playbook fixture gate score.

## Keep / reshape / drop

| Item | Decision | Note |
|------|----------|------|
| `PrintChip` / `MagChip` | **Keep + extend** | Add `tone` |
| `PrintPullQuote` | **Keep** | Quote semantics unchanged |
| Wash / band callouts | **Add** `PrintCallout` / `MagCallout` | Do not overload PullQuote |
| `PrintTable` / `MagTable` | **Keep + extend** | `columnAlign` (+ Mag cell align) |
| Process diagrams | **Add** `PrintSteps` / `MagSteps` (Phase D) | Linear steps only |
| Custom SVG in PrintPage | **Drop** for Mag smoke | Still skipped by flatten |

---

## Phase A — `PrintChip` tone

**Status:** Implemented

### Prop

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `tone` | `'default' \| 'muted' \| 'accent' \| 'solid'` | `default` | Shell prop on `PrintChip` (not on label Text child) |

### Visual contract

| Tone | HTML / Mag intent |
|------|-------------------|
| `default` | Current outline chip (border `--print-line`, ink text) |
| `muted` | Soft wash fill, muted ink, no strong border |
| `accent` | Accent wash / accent border; ink or accentInk for text |
| `solid` | Filled accent (or ink) with contrasting text — max emphasis |

Accent color comes from Mag theme / Brandion print pack — **not** hardcoded JoyConf pink.

### Deliverables

- `PrintChip` prop + `print.css` modifiers (e.g. `.msqdx-print-chip--accent`)  
- `MagChip` `tone` → `createMagStyles` chip variants  
- Stories + unit tests; twin map unchanged (same twin, new prop)  
- Amend `msqdx-ui-mag-pdf-kit.md` § Instance tones → **P92 chip tones**

### Acceptance A

1. Four tones render differently in Storybook Print + Mag smoke PDF.  
2. Unknown / missing `tone` → `default` (backward compatible).  
3. Drift-CI still green.

---

## Phase B — `PrintCallout` / `MagCallout`

**Status:** Implemented

### Why new type

PullQuote = attributed quote + bar. Report wash boxes (“only contact fields crossed”) are **not** quotes. Overloading `variant` on PullQuote confuses inspect and agent playbooks.

### Shape

| Piece | Contract |
|-------|----------|
| Type | `PrintCallout` (container or identity leaf with slotted body) |
| Slots | `label?` (eyebrow) · `body` (required) |
| Prop `variant` | `'wash' \| 'emphasize' \| 'quiet'` (default `wash`) |
| Twin | `MagCallout` |

### Visual contract

| Variant | Intent |
|---------|--------|
| `wash` | Full-measure band, soft fill (`wash` / paper tint), bold body |
| `emphasize` | Stronger fill or accent edge; still one band |
| `quiet` | Hairline + muted body (secondary note) |

### Deliverables

- `ds:add` or hand twin following Print/Mag conventions  
- Catalog + palette group Print  
- Creation consume in companion spec Phase B  
- Twin row in `twins.ts` + knowledge matrix

### Acceptance B

1. Callout appears in Print Storybook + Mag PDF.  
2. Non-Print parent auto-wrap rules unchanged (P38).  
3. Agent can `insert_child` type `PrintCallout` without HTML import.

---

## Phase C — `PrintTable` column alignment

**Status:** Implemented

### Prop

| Prop | Type | Default |
|------|------|---------|
| `columnAlign` | `Array<'left' \| 'center' \| 'right'>` | omit → all `left` (current) |

Length SHOULD match column count; when shorter, remaining columns inherit `left`; when longer, extras ignored.

### Mapping

- **HTML:** `text-align` on `th`/`td` per column index (canvas grain / print.css).  
- **Mag:** MagTable already supports per-cell `cellStyles` / `textAlign` (P88/P90) — flatten MUST derive from `columnAlign[i]` when cell-level align unset.  
- **Inspect:** enum list or compact column align control on `PrintTable` shell (not per Text child) so agents set one prop.

### Non-goal C

Per-cell override UI beyond existing Text `textAlign` — cell-level still wins if set (document precedence: cell > column > default).

### Acceptance C

1. Three-column table with `['left','left','right']` shows right-aligned third column in canvas **and** Mag PDF.  
2. Capability matrix row updated (`columnAlign` = **Y**).  
3. Silent-drop test fails if Mag ignores the prop.

---

## Phase D — `PrintSteps` / `MagSteps` (optional, after A–C)

**Status:** Implemented

### Shape

| Piece | Contract |
|-------|----------|
| Type | `PrintSteps` |
| Children | ordered step rows (`RankedRow` or dedicated `PrintStep` with `label` + `detail` slots) |
| Props | `orientation: 'horizontal' \| 'vertical'` (default `horizontal`) · `emphasisIndex?: number` (0-based; highlight one step) |
| Twin | `MagSteps` |

### Visual contract

Numbered nodes + short labels; emphasis step uses accent fill (theme). **No** branching, fan-out, or free coordinates.

### Acceptance D

1. 4-step horizontal row with `emphasisIndex: 2` paints in HTML + Mag.  
2. Playbook documents Steps as the only process primitive for Mag-bound decks.

---

## Phase E — Consumer wiring (Creation + Plexon)

**Status:** Implemented

Tracked in Creation companion + Plexon knowledge (not duplicated here):

1. Creation: inspect catalog, defaults, flatten, capability matrix, tests.  
2. Plexon: amend `creation_print_magazine_v1` / `creation_print_report_v1` to prefer Chip tone · Callout · columnAlign · Steps; forbid Custom-HTML diagrams for Mag smoke.  
3. Optional craft-eval brief: “print report with emphasized step + numeric column”.

---

## Sequencing

```
A PrintChip tone
  → B PrintCallout
  → C PrintTable columnAlign
  → D PrintSteps (optional)
  → E Creation inspect/flatten + Plexon playbooks
```

Do not start Creation inspect for tones until DS Storybook + Mag smoke exist (P54 freeze remains until A ships).

## Rollout

1. Specs (this doc + Creation companion + knowledge).  
2. Implement A in `msqdx-ui` → pin bump Creation.  
3. Creation consume A → Mag PDF smoke.  
4. B → C → (D) same pattern.  
5. Plexon playbook + one fixture test last.

## Acceptance (wave complete)

1. Phases A–C green (D optional).  
2. Twin map + Drift-CI + Creation silent-drop tests green.  
3. Capability matrix lists every new prop as **Y**.  
4. Print playbooks no longer instruct agents to fake emphasis with Site* / raw HTML inside `PrintPage`.
