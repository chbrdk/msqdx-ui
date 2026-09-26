# Cleanup inventory — msqdx-ui

**Date:** 2026-09-26  
**Inventor:** suite-cleanup (Inventor)  
**Playbook:** `plexon-v3/knowledge/suite-cleanup.md` · local backlog: `knowledge/keep-drop-backlog.md`

Focus this pass: stale `creation-*-bump.md` operator notes, dual token/type artifacts, obsolete or duplicated mapping knowledge. Generated build outputs stay **reshape** unless unused by `package.json` / package scripts.

| Path | Klasse | Nachweis | Notes |
|---|---|---|---|
| `knowledge/creation-inspect-chrome-bump.md` | reshape | Inbound: `knowledge/paths.md` L27, chain refs in E7/E9 docs; superseded by E7–E11 waves | Root inspect wave (2026-08-12). Pin SHAs stale vs creation-v3 Dockerfile. Fold into one CREATION pin/changelog doc; then trim `paths.md` bullets. |
| `knowledge/creation-layers-panel-bump.md` | reshape | Inbound: `paths.md` L28, `creation-editor-chrome-e7-bump.md`, `creation-layers-panel-e8-bump.md` | Intermediate layers wave; content duplicated in E8 + multi-bump. Consolidate before drop. |
| `knowledge/creation-editor-chrome-e7-bump.md` | reshape | Inbound: `paths.md` L29, `creation-layers-panel-e8-bump.md` | E7 operator note; keep until single bump index replaces per-wave files. |
| `knowledge/creation-layers-panel-e8-bump.md` | reshape | Inbound: `paths.md` L30, `knowledge/components/layers-panel.md` L41, E9/multi-bump priors | Still the best layers DnD reference; merge into consolidated bump doc rather than isolated delete. |
| `knowledge/creation-inspect-chrome-e9-bump.md` | reshape | Inbound: `paths.md` L31, E10 prior link | TokenPicker compact wave; chain-only after E10/E11. |
| `knowledge/creation-inspect-chrome-e10-bump.md` | reshape | Inbound: `paths.md` L32, E11 prior; **obsolete** lucide narrative vs `specs/domain/msqdx-ui-icon-language.md` | Documents lucide lockfile/icon slots — contradicts current Wave icon policy. Rewrite or archive when consolidating bumps. |
| `knowledge/creation-inspect-chrome-e11-bump.md` | defer | **Not** listed in `paths.md`; only E10 back-link | Latest inspect chain entry (lucide-era). Add to consolidated doc or one `paths.md` line after reshape; not `drop_safe` until consumer pins documented elsewhere. |
| `knowledge/creation-layers-panel-multi-bump.md` | drop_safe | No `paths.md` entry; only self + E8 prior ref; creation-v3 owns mirror note in file body | P63 multi-select wave. Safe after Gatekeeper confirms creation-v3 `knowledge/paths.md` holds pin SSOT (not msqdx-ui wave files). |
| `knowledge/ds-keep-mapping.md` | reshape | `paths.md` L24; `packages/ui/src/ds-keep-mapping.test.ts`; keep-drop “may still be historical” | Zaoly 70-tag → `@msqdx/ui` table (2026-08-12). SoT is now `catalog.ts` + specs; mapping still useful for tag aliases but `ds-icon` row cites lucide — update or supersede with catalog gap list, then downgrade to reference-only. |
| `knowledge/ds-deposit-component-semantic-map.json` | keep | `pnpm test:ds-deposit-drift`; `ds-deposit-semantic-map.test.ts`; many `*.mdx` “Tokens consumed” | Local mirror of Brandion canonical JSON (`canonical` field in JSON). Dual artifact is intentional for drift CI — do not drop without moving drift to brandion-only checkout in CI. |
| `knowledge/ds-deposit-component-semantic-map.md` | keep | Same as JSON; cited from component MDX | Human view of D5 map; not obsolete vs Brandion SSOT. |
| `knowledge/web-system-tokens.md` | keep | Spec `specs/domain/web-system-tokens.md`; Layer-0 migration table | Alt→neu CSS mapping still operator-facing; not superseded by deposit alone. |
| `packages/ui-tokens/src/*.d.ts` (13 files + `index.d.ts`) | reshape | `@msqdx/ui-tokens` `main`/`types` → `dist/*` (`package.json`); `build` = `tsc`; `dist/` gitignored | Committed declarations duplicate `tsc` emit. **Not** `drop_safe` until pipeline proven: consumers import package entry only, no tooling reads `src/*.d.ts`. Remove dual tree in a dedicated reshape wave. |
| `packages/ui-tokens/dist/` | keep | Produced by `pnpm -r build`; not committed (`.gitignore`) | Expected publish artifact; keep generated, not in git. |
| `packages/ui/dist/` | keep | `@msqdx/ui` `build` script; exports default to `dist/*` | Same as ui-tokens; gitignored build output. |
| `packages/ui/src/wc/generated/manifest.ts` | reshape | Root `package.json` `wc:compile`; `wc-compile.test.ts` asserts manifest ≡ compile | Git-diffable generated **source** (spec Phase 5). Regenerate via job — do not `drop_safe`. Optional reshape: emit under `dist/wc/` later if spec changes. |
| `packages/ui/package.json` exports `./mag`, `./wc` with `"import": "./src/..."` | reshape | Sibling-app source imports; `react-types-dedupe.md` | Dual dist vs src export paths for bundler dev — align with dist-only when Docker/sibling import story is unified. |
| `knowledge/storybook-coverage-audit-2026-08-03.md` | defer | `paths.md` L55; `msqdx-ui-completeness.md`; `catalogCompleteness.test.ts` is live guard | Point-in-time audit; superseded in practice by catalog test. Archive or fold one paragraph into completeness doc before drop. |
| `knowledge/pilot-ds-button-end-to-end.md` | defer | References `Button.promoted.stories.tsx`, round-trip spec | Zaoly-era pilot (Gallery composition); promote pipeline still active — historical steps may mislead (push-frame PATHS note). Reshape into “promote smoke” or drop after Phase 6 pin-bump docs own the flow. |
| `knowledge/library-composition-roundtrip.md` | keep | Spec sibling + `library-composition-roundtrip.test.ts`; `paths.md` | Consumer-focused companion to `specs/domain/library-composition-roundtrip.md` — not obsolete mapping duplicate. |

## Summary counts (candidates only)

| Klasse | Rows |
|---|---|
| keep | 5 |
| reshape | 10 |
| defer | 3 |
| drop_safe | 1 (conditional on creation-v3 pin SSOT) |

Gatekeeper: promote `creation-layers-panel-multi-bump.md` to `suite-cleanup-drop-safe.md` only after creation-v3 path check; do **not** batch-delete bump chain until `paths.md` + consolidated doc land.
