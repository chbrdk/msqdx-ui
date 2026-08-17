# Library ↔ Composition round-trip

**Status:** Accepted · **Date:** 2026-08-17 · Phases 1–8 (catalog completeness, pin display, promote dry-run, GitHub PR, WC compile, auto fan-out, catalog-driven palette, extend primitive).  
**Spec:** `specs/domain/library-composition-roundtrip.md` · WC `specs/domain/wc-compile.md`

Storybook is the **catalog you look at**. Git in this repo is the **catalog you write**. CREATION never saves “into Storybook”; Promote writes a PR here, then Coolify rebuilds Storybook from `main`.

## Staging

| Item | Value |
|------|--------|
| Catalog FQDN | `https://ds.projects-a.plygrnd.tech` (`URL_MSQDX_UI_STORYBOOK`) |
| Coolify | `msqdx-ui:main-rapp` · `rtxcfh4gtxi6yba5l70fu177` |
| Auto-deploy | `is_auto_deploy_enabled` on `main` push |
| PR preview | Coolify GitHub App UI (API PATCH `is_preview_deployments_enabled` not allowed on this instance) · template `{{pr_id}}.{{domain}}` |
| Force fallback | `POST /deploy` `{ uuid, force: true }` — `knowledge/staging-coolify-storybook.md` |
| Print deck | `?path=/story/print-quickcheck--magazine-deck` |
| WC compile | `pnpm wc:compile` → `packages/ui/src/wc/generated/manifest.ts` · import `@msqdx/ui/wc` |
| Catalog registry | `packages/ui/src/storybook/catalog.ts` + `catalog-registry.ts` · `catalogComponent(id)` |
| Pin-bump Action | `.github/workflows/pin-bump-creation.yml` · secret `CREATION_GITHUB_TOKEN` · consumer `chbrdk/creation-v3` |

## Operator loop

1. Change primitive / story in `packages/ui` (`pnpm ds:add` for new types). Register the export in `catalog-registry.ts`.
2. Open a PR. Coolify Storybook **preview** builds from the branch (HITL = review the PR).
3. Merge to `chbrdk/msqdx-ui` `main` — Storybook staging auto-deploys (~70s). Do not force-deploy unless the webhook missed.
4. Action opens/updates `pin/msqdx-ui-<sha>` on `chbrdk/creation-v3` (Dockerfile `MSQDX_UI_REF` + `paths.msqdxUiRefDefault`). Merge that PR (second HITL). CREATION auto-deploys.
5. CREATION `POST /api/library/promote/dry-run` validates; `POST /api/library/promote` opens/updates the PR (never `main`, never Coolify).
6. After catalog changes, run `pnpm wc:compile` so WC tags stay SHA-accurate.

## Catalog insert modes

| `insert` | Canvas | Example |
|----------|--------|---------|
| `canvas` | yes | `Button`, `ChatBlockPanel`, `ChannelLane` |
| `print-twin` | inserts Print export | `MagCover` → `PrintCover` |
| `template` | fragment root | `PrintQuickCheck` → `PrintPage` |
| `docs` | no | `tokens`, `typography`, `motion`, `MagOverview`, `ChatCatalog`, `BrandionTokenStudio` |

## Do not

- Treat a CREATION scene as a new DS component.
- Copy Collection tokens or EQC report rows into stories (fixtures only).
- Deploy Storybook from CREATION’s repo.
- Auto-merge Promote PRs or pin-bump PRs.
- Treat CREATION as the WC SSOT.

Consumer notes: `creation-v3/knowledge/library-composition-roundtrip.md`
