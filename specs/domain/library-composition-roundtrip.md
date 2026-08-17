# Library ↔ Composition round-trip (Storybook as catalog SSOT)

**Status:** Accepted · **Date:** 2026-08-17 · **Implements:** Phases 1–8 (catalog completeness, pin display, promote dry-run, GitHub PR, WC compile, auto fan-out, catalog-driven palette/renderer, extend primitive).  
**Product:** `@msqdx/ui` catalog + CREATION compositions  
**Knowledge:** `knowledge/library-composition-roundtrip.md`  
**Consumers:** creation-v3 `specs/domain/library-composition-roundtrip.md` · MagazineTemplate `creation-v3/specs/domain/magazine-template.md`  
**Staging catalog:** `https://ds.projects-a.plygrnd.tech` (`URL_MSQDX_UI_STORYBOOK`) · Coolify `rtxcfh4gtxi6yba5l70fu177`

## Purpose

Keep the **design-system library** as the single source of truth for primitives, Print/Mag twins, tokens, stories, and tests. CREATION **migrates onto** that library, **authors instances**, and **promotes** reusable results back into the library as git-diffable code. Storybook is the always-on **catalog view** of that git SHA — never a second store.

This is the Zaoly two-layer model applied to v3: Library (dev-owned) vs Composition (designer-owned). Both are code. Writes that change the library MUST be reviewable diffs on `chbrdk/msqdx-ui`.

## Locked decisions

1. **Write SSOT = `msqdx-ui` git** (`packages/ui` source + CSF stories + MDX + tests). Storybook staging is a static build of a SHA. Apps never write into Storybook.
2. **Composition SSOT = CREATION scene / MagazineTemplate snapshot.** Collection-scoped instance graph. May bind Brandion tokens and `dataSlot`s. MUST NOT become a parallel primitive catalog.
3. **Palette ⊆ catalog.** Every type CREATION can insert MUST exist as a Storybook catalog entry at the pinned `MSQDX_UI_REF`. Missing primitive → `pnpm ds:add` in `msqdx-ui` first.
4. **Promote is explicit.** Inspector edits stay on the scene until a designer/dev runs Promote. Promote opens a **PR on `msqdx-ui`**, never a silent push to `main`, never a Coolify write.
5. **Reject, don't guess.** If a scene edit cannot be expressed as a contract-valid library change (new primitive without spec, Collection-only branding, off-surface CSS, or an inspector field the generator cannot patch onto the primitive), Promote MUST fail with a machine- and human-readable reason (Zaoly Art. 7). Missing **named props** on an existing catalog type are P4 (extend), not silent drop.
6. **Tokens only for designer styling.** Promote of paint MUST use Brandion/DTCG paths or existing library CSS variables — no new raw hex defaults in the library from the editor.
7. **Web Components are a compile target**, not a second SSOT. Near-term catalog is React `@msqdx/ui`. A future WC wrapper MAY emit Custom Elements from the same source; CREATION MUST NOT export ad-hoc WCs that bypass the catalog.
8. **Fan-out from one SHA.** After merge to `msqdx-ui` `main`: (a) Storybook Coolify **auto-rebuilds** from git push (PR preview before merge), (b) a pin-bump PR opens on CREATION (`MSQDX_UI_REF`), (c) human merges that PR (Zaoly HITL) and CREATION Coolify auto-deploys. Creation scenes keep working against the old pin until the pin-bump PR is merged. No auto-merge.
9. **Catalog is the palette.** CREATION insertable types are `CATALOG` entries with `insert !== 'docs'`. The canvas renderer MUST look up `catalogComponent(id)` for types without a hand-written switch case. Missing primitive → `pnpm ds:add`, never a second Creation component set.

## Three layers (do not collapse)

| Layer | Owns | Mutable in CREATION? | Lands in Storybook? |
|-------|------|----------------------|---------------------|
| **Library** | PrintCover, MagCover, Button, tokens, stories | No (read-only primitives) | Yes — that *is* the catalog |
| **Composition** | Scene graph, slots, published MagazineTemplate | Yes | Only if **promoted** as a Template/Print story |
| **Instance bind** | Brandion pack, `dataSlot` report data, Collection id | Yes | Never (fixtures only) |

MagazineTemplate publish (Phase 4) stays **composition**: immutable snapshot for Plexon bind. It is not a library write. A later Promote MAY copy a snapshot into a Storybook Template story.

## Migrate (inbound → library)

Goal: stop app-local twins. Classify each surface **keep / reshape / drop**.

| Source today | Target | Rule |
|--------------|--------|------|
| `@msqdx/ui` Print* / Mag* | stay | Catalog already SSOT |
| CREATION `lib/magazine-pdf` adapter | stay in app | Scene → Mag Document is product packing, not a primitive |
| Plexon hardcoded `eqc-magazine-pdf.tsx` | consume MagazineTemplate | Layout chrome must already exist as Print/Mag twins |
| App-local chrome that matches a catalog primitive | delete local, import `@msqdx/ui` | Pin `MSQDX_UI_REF` |
| Pattern with no catalog type | `pnpm ds:add` + spec + stories + tests | Then palette may show it |
| Zaoly WC / `*.zaoly.html` | map to catalog type or drop | No second WC library |

WHEN a CREATION palette type has no Storybook `Print/` or component story, migrate MUST add the story before calling the type library-complete.

## Author (composition, not library)

CREATION editor:

- Instantiates catalog types at `MSQDX_UI_REF`.
- Writes instance props / tokenBindings / print-lane overrides onto the scene.
- Downloads Mag PDF from the **live scene** (composition export).
- Publishes MagazineTemplate for consumers (composition snapshot).

WHEN the inspector shows a control, Mag/HTML twins MUST honor it **or** the control MUST be hidden (capability matrix). That is composition fidelity, not a library write.

## Promote (outbound → library git → Storybook)

Four promote kinds. Each produces a PR, not a live mutation.

### P1 — Instance override → library default

Designer wants PrintCover default `title` size / gap to match what they authored.

- Allowed: contract props that the primitive already exposes; story `args` update; optional CSS variable default in `print.css` / Mag theme.
- Forbidden: Collection Brandion hex; report `dataSlot` copy; Mag-only hacks that HTML cannot twin.

### P2 — Composition → catalog Template story

Designer wants the Quick Check magazine **deck** as a reusable Storybook Template (HTML Print deck + documented Mag twin).

- Writes `*.stories.tsx` fixture from a **sanitized** scene (no Collection ids, no live URLs, fixture slot copy).
- Does **not** create a new primitive unless the graph is a repeated molecule.
- Records `msqdxUiRef` in story meta so the fixture is SHA-accurate.

### P3 — New primitive

Designer invented structure the catalog cannot represent.

- MUST run `pnpm ds:add` path: spec under `specs/domain/` → component + stories + mdx + test + catalog entry.
- Off-contract structure → **Dev-track** (reject in editor; human implements in `msqdx-ui`).

### P4 — Extend primitive API

Designer set a Creation inspector field (alignment family) the library component does not yet expose as a named prop.

- Allowed keys (closed): `textAlign`, `align`, `justify`, `alignItems`, `justifyContent`, `alignSelf`, `alignContent`. Values MUST be the contract enums. No invented CSS.
- CREATION keeps the richer inspector. Types without a full contract still expose this closed alignment set (not name-only).
- Promote P1 on a node that has such a field MUST upgrade to P4 (no extra button). MUST NOT drop the field.
- Writes generator-shaped: (1) named prop + style apply on `packages/ui/src/components/{Type}.tsx`, (2) `{Type}.promoted.stories.tsx` args, (3) `{Type}.promoted.extend.test.tsx`. MUST NOT overwrite human Default stories.
- WHEN the source is not a single `components/{Type}.tsx` (Print bundle, union props, missing needles), Promote MUST reject `extend-unrepresentable` — Dev-track, don't guess.
- After merge: Storybook shows the same alignment; pin-bump HITL for CREATION staging.

## Promote pipeline (git-native)

```
CREATION scene
  → validate (component contract + capability matrix + no Collection secrets)
  → promote proposal (kind P1|P2|P3|P4 + file ops)
  → GitHub PR on chbrdk/msqdx-ui
  → review / CI (stories, tests, catalog completeness)
  → Coolify Storybook PR preview (is_preview_deployments_enabled)
  → merge main (library HITL)
  → Coolify Storybook auto-deploy (rtxcfh4gtxi6yba5l70fu177, is_auto_deploy_enabled)
  → pin-bump PR on chbrdk/creation-v3 (MSQDX_UI_REF)
  → merge pin-bump PR (consumer HITL)
  → CREATION Coolify auto-deploy
```

WHEN Promote cannot emit a deterministic file op (span-accurate story/args or generator-shaped primitive files), the system MUST reject.

WHEN a MagazineTemplate is published, the snapshot SHOULD record `msqdxUiRef` (the SHA the authoring app was pinned to) so consumers and later Promotes know the library generation.

## Fan-out after library merge

| Target | Mechanism | Path keys |
|--------|-----------|-----------|
| Storybook PR preview | Coolify GitHub App UI (`preview_url_template`; API PATCH `is_preview_deployments_enabled` not allowed) | `URL_MSQDX_UI_STORYBOOK` · `rtxcfh4gtxi6yba5l70fu177` · `is_preview_deployments_enabled` |
| Storybook staging | Coolify auto-deploy on `main` push | same UUID · `is_auto_deploy_enabled` · force `POST /deploy` is fallback only |
| CREATION pin | GitHub Action pin-bump PR (no auto-merge) | `chbrdk/creation-v3` · Dockerfile `MSQDX_UI_REF` · `paths.msqdxUiRefDefault` |
| CREATION staging | Coolify auto-deploy after pin-bump merge | creation-v3 `uk1t9tnsqo65vlpzo2vwq0u2` |
| Plexon / Audion / Checkion / Brandion | same pin pattern (manual until a pin-bump exists) | each app `Dockerfile` / sibling clone |
| WC dist (future) | compile from same `packages/ui/src` | not a second repo catalog |

## Requirements (EARS)

1. WHERE a type is insertable in CREATION, a Storybook catalog entry MUST exist for that type at the pinned SHA.
2. WHEN a designer edits a scene, the system MUST persist composition only (scene / draft template) and MUST NOT mutate `msqdx-ui` source.
3. WHEN Phase-3 dry-run succeeds, the system MUST return a proposal with `writesGit: false` and MUST NOT mutate git. WHEN Phase-4 Promote succeeds, the system MUST open or update a git PR on `msqdx-ui` containing only generator-shaped or args-shaped diffs.
4. WHEN Promote would write Collection branding or report payload into the library, the system MUST reject.
5. WHEN `msqdx-ui` `main` gains a SHA, Storybook staging MUST be rebuildable from that SHA without CREATION runtime.
6. WHEN a consumer ships UI from the library, it MUST pin `MSQDX_UI_REF` (or package version) — floating `main` at Docker build without a recorded SHA is forbidden for production islands.
7. WHERE Web Components are required, they MUST be generated from `@msqdx/ui` source; CREATION MUST NOT be the WC SSOT.
8. WHEN `msqdx-ui` `main` is pushed, Storybook staging MUST auto-rebuild from that SHA (Coolify `is_auto_deploy_enabled`). Force-deploy remains operator fallback only.
9. WHEN a Promote PR is open, Storybook MUST be preview-deployable (`is_preview_deployments_enabled`) without writing `main`.
10. WHEN `msqdx-ui` `main` gains a SHA, a pin-bump PR MUST open or update on `chbrdk/creation-v3` changing only `MSQDX_UI_REF` (Dockerfile + `paths.msqdxUiRefDefault`). The PR MUST NOT auto-merge.
11. WHERE a `CATALOG` entry has `insert` `canvas`, `print-twin`, or `template`, CREATION MUST be able to insert it (print-twin inserts the Print export; template inserts the documented fragment root). WHERE `insert` is `docs`, CREATION MUST NOT insert it.
12. WHEN CREATION renders a catalog type with no hand-written scene switch case, it MUST call `catalogComponent(type)` and MUST NOT invent a parallel primitive. WHEN that lookup is null and the type is not docs, the renderer MUST show an unsupported marker (reject, don't guess).
13. WHEN a designer sets a closed extendable inspector field that the primitive does not yet expose, Promote MUST emit P4 (API + promoted story args + extend test) and MUST NOT drop the field. WHEN the patch is not span-accurate, Promote MUST reject `extend-unrepresentable`.

## Non-goals (this proposal)

- Pixel-perfect HTML≡PDF (existing Mag twin policy).
- Editor writing Storybook static files on the Coolify volume.
- Auto-merge Promotes to `main`.
- Replacing MagazineTemplate consume (Plexon still binds published snapshots).
- Auto-merge Promotes or Coolify Storybook writes from CREATION.

## Phase 1 — Print palette ⊆ catalog

CREATION insertable Print* types MUST have a Storybook `Print/` catalog id equal to the scene `type` (`PrintPage`, `PrintChipRow`, `PrintPersonaCard`, …). `PrintQuickCheck` is catalog-only (composed deck), not a palette type.

## Phase 2 — Pin display (CREATION)

CREATION MUST expose the resolved `MSQDX_UI_REF` SHA on `/settings` and `GET /api/health` (`msqdxUiRef`). Env `MSQDX_UI_REF` (Docker ARG/ENV) wins; else the Dockerfile default recorded in `paths.msqdxUiRefDefault`. Floating `main` without a SHA is forbidden on production images.

## Phase 3 — Promote dry-run (CREATION)

`POST /api/library/promote/dry-run` body `{ kind: "P1"|"P2"|"P3", scene, nodeId?, msqdxUiRef? }`.

- MUST NOT write files or open PRs.
- P1: `nodeId` required; emit args-shaped file ops for contract layout/type props only.
- P2: emit a sanitized Template story proposal (`packages/ui/src/print/…`); strip Collection ids, live URLs, report `dataSlot` payloads (keep keys).
- P3: always reject with `dev-track`.
- Reject raw hex paint (`collection-branding`) and unknown types (`dev-track`).
- Response `{ ok, issues?, proposal? }` — `proposal.writesGit` is always `false` in Phase 3.
- File ops MAY include deterministic `contents` (preview only).

## Phase 4 — Promote PR (CREATION → `chbrdk/msqdx-ui`)

`POST /api/library/promote` same body as dry-run.

- MUST run the Phase-3 validator first. P3 stays `dev-track`.
- MUST materialize generator-shaped files only (P1: `*.promoted.stories.tsx` args; P2: `PrintPromotedTemplate.stories.tsx` sanitized fixture). MUST NOT overwrite human Default stories.
- WHEN GitHub is configured (`GITHUB_TOKEN`), the system MUST open or update a PR on `chbrdk/msqdx-ui` from branch `promote/…` targeting `main`. MUST NOT push to `main`. MUST NOT deploy Storybook / Coolify.
- WHEN GitHub is unconfigured, the system MUST reject with `github-unconfigured` and MUST NOT write git.
- WHEN a PR for the same promote branch already exists, the system MUST update that branch/PR (idempotent).
- Successful response `{ ok, proposal }` with `proposal.writesGit: true` and `proposal.pullRequest` `{ htmlUrl, number, branch }`.

## Phase 5 — WC compile (msqdx-ui)

WHERE Web Components are required, they MUST be compiled from `@msqdx/ui` `CATALOG` + `packages/ui/src` (`specs/domain/wc-compile.md`). CREATION MUST NOT be the WC SSOT. Output is git-diffable under `packages/ui/src/wc/generated/`. Job: `pnpm wc:compile`.

## Phase 6 — Auto fan-out (HITL = merge)

- Storybook Coolify `rtxcfh4gtxi6yba5l70fu177`: `is_auto_deploy_enabled` on `main`. Promote PRs MUST be preview-deployable (`is_preview_deployments_enabled`); this Coolify API rejects that field on PATCH — enable PR previews in the GitHub App source UI (`preview_url_template` `{{pr_id}}.{{domain}}`). Operator force-deploy (`POST /deploy` `{ force: true }`) is fallback only (`knowledge/staging-coolify-storybook.md`).
- GitHub Action `.github/workflows/pin-bump-creation.yml` on `main` opens/updates `pin/msqdx-ui-<sha>` on `chbrdk/creation-v3`. Secret `CREATION_GITHUB_TOKEN` (Contents + Pulls on creation-v3 only). MUST NOT merge. MUST NOT deploy Coolify from this repo.
- CREATION Coolify `uk1t9tnsqo65vlpzo2vwq0u2`: `is_auto_deploy_enabled` so merging the pin-bump PR is the only consumer HITL.

## Phase 7 — Catalog-driven palette + generic renderer

- `CatalogEntry.insert`: `canvas` \| `print-twin` \| `template` \| `docs` (computed when omitted). Mag HTML canvas uses Print twins (`PRINT_MAG_TWINS`). Foundation `tokens` / `typography` / `motion`, MagOverview, ChatCatalog, BrandionTokenStudio are `docs`. PrintQuickCheck is `template` (fragment root `PrintPage`). `ChannelLane` is a catalog id (canvas).
- `catalogComponent(id)` in `@msqdx/ui` maps catalog ids to barrel React components. Completeness: every non-`docs` id has a function export.
- CREATION palette is generated from `insertableCatalogEntries()` grouped by `CatalogLayer`. Scene switch stays for existing Print/slot types; **default** uses `catalogComponent`. Inspector: types without a component contract still expose the closed P4 alignment set (Creation stays the richer editor). Unknown CSS outside that set is rejected. New primitives remain P3/Dev-track.

## Phase 8 — Extend primitive (P4)

Closed alignment inspector fields that the library type does not name MUST Promote as P4: patch `components/{Type}.tsx` (prop + style), write `{Type}.promoted.stories.tsx` args, write `{Type}.promoted.extend.test.tsx`. HITL remains merge. Unpatchable sources → `extend-unrepresentable`.

## Phases

| Phase | Deliverable | Status |
|-------|-------------|--------|
| 0 | Spec + knowledge pointers | done |
| 1 | Catalog completeness: CREATION Print* palette ↔ Storybook `Print/` | done |
| 2 | Show pinned `MSQDX_UI_REF` in CREATION settings + health | done |
| 3 | Promote proposal JSON + dry-run validate (no GitHub) | done |
| 4 | GitHub PR for P1/P2; P3 stays `ds:add` / Dev-track | done |
| 5 | WC compile job from the same catalog SHA | done |
| 6 | Storybook auto-deploy + PR preview + Creation pin-bump HITL | this wave |
| 7 | Catalog registry + CREATION palette/renderer from `CATALOG` | this wave |
| 8 | P4 extend primitive (inspector field → named library prop) | this wave |
