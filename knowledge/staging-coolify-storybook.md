# Staging — Coolify Storybook (`msqdx-ui`)

## Status (2026-08-17) — Phase 6 auto-deploy

Coolify `msqdx-ui:main-rapp` (`rtxcfh4gtxi6yba5l70fu177`): `is_auto_deploy_enabled` via API PATCH (200). GitHub webhook is connected (`source` `chbrdk/msqdx-ui` `main`). This Coolify API rejects `is_preview_deployments_enabled` on PATCH ("field is not allowed"); `preview_url_template` is already `{{pr_id}}.{{domain}}` — enable PR previews in the Coolify GitHub App UI if needed. Force `POST /deploy` is fallback only.

## Target

Deploy an **always-on static Storybook** for the central design system into Coolify island **msqdx-v3-staging**, next to plexon-v3 / audion-v3 / checkion-v3.

| Item | Value |
|------|--------|
| Coolify project | `msqdx-ecosystem-v3` |
| Environment | `staging` |
| App name | `msqdx-ui-storybook` / Coolify `msqdx-ui:main-rapp` |
| Coolify UUID | `rtxcfh4gtxi6yba5l70fu177` |
| GitHub source | `chbrdk/msqdx-ui`, branch `main` |
| Dockerfile | repo root `Dockerfile` |
| Base directory | `/` |
| Container port | **6006** |
| Domain (live) | `https://ds.projects-a.plygrnd.tech` (Coolify `msqdx-ui:main-rapp`) |
| Domain (alias placeholder) | `URL_MSQDX_UI_STORYBOOK` — prefer live FQDN above; `msqdx-ui.projects-a.plygrnd.tech` may be unset/503 |
| Auto-deploy | `is_auto_deploy_enabled` on git push to `main` (Phase 6) |
| PR preview | Coolify GitHub App UI (`preview_url_template` `{{pr_id}}.{{domain}}`). API PATCH `is_preview_deployments_enabled` is not allowed on this instance |
| Runtime secrets | **none** (static nginx; no DB/auth) |
| Pin-bump secret | Repo secret `CREATION_GITHUB_TOKEN` (Actions only; Contents + Pulls on `chbrdk/creation-v3`) |


Hierarchy context: `plexon-v3/knowledge/coolify-v3-staging-runbook.md`.

## What the image does

1. `pnpm install --frozen-lockfile` + `pnpm rebuild esbuild` (workspace: `@msqdx/ui-tokens` + `@msqdx/ui`)
2. `pnpm build` → package dist
3. `pnpm build-storybook` → `packages/ui/storybook-static` (`NODE_OPTIONS=--max-old-space-size=4096`)
4. nginx serves that folder on port **6006**

Product app Dockerfiles that **clone** this repo for sibling source are unrelated and unchanged.

## Build pitfalls (pnpm 10 + Coolify)

- **esbuild postinstall must run.** pnpm 10 ignores dependency build scripts by default (`Ignored build scripts: esbuild`). Root `package.json` allowlists via `pnpm.onlyBuiltDependencies: ["esbuild"]`; the Dockerfile also runs `pnpm rebuild esbuild` after install. Without the native binary, Vite/Storybook fails during chunk transform/render (often exit **255**, log truncated after “rendering chunks”).
- **Do not** set `dangerouslyAllowAllBuilds` unless a broader allowlist is impractical — prefer the esbuild allowlist.
- **Heap:** Storybook build uses `NODE_OPTIONS=--max-old-space-size=4096` (same class of Coolify OOM mitigation as plexon-v3). Raising much higher can trigger cgroup OOM instead.
- **Docker context size (~0.6–1.5 MB)** is expected: `.dockerignore` drops `node_modules`, `dist`, `knowledge`, `specs`. Storybook config lives under `packages/ui/.storybook` and is copied with `COPY packages` — it is not excluded.

## Redeploy

**Default:** merge to `main` → Coolify auto-deploys this UUID (`is_auto_deploy_enabled`). GitHub App webhook on `chbrdk/msqdx-ui` must stay connected in Coolify (operator UI; no token in git). `preview_url_template` is `{{pr_id}}.{{domain}}`; this Coolify API version rejects PATCH `is_preview_deployments_enabled` — toggle PR previews in the GitHub App source UI if a Promote PR should get a preview host.

Force fallback when the webhook missed:

```http
POST https://coolify.plygrnd.tech/api/v1/deploy
{ "uuid": "rtxcfh4gtxi6yba5l70fu177", "force": true }
```

API base: `https://coolify.plygrnd.tech/api/v1` (`URL_COOLIFY_API`). Recipe: plexon-v3 `knowledge/coolify-deploy-api.md`.

Stories to verify: `Atoms/Stack`, `Atoms/Card`, `Organisms/CanvasViewport`, `Organisms/ComponentPalette`, `Organisms/TokenPicker`.



1. Project `msqdx-ecosystem-v3` → Environment `staging`
2. New Application `msqdx-ui-storybook`
3. Source: GitHub `chbrdk/msqdx-ui`, branch `main`
4. Build pack: **Dockerfile**, path `Dockerfile`, base `/`
5. Domains: `ds.projects-a.plygrnd.tech` (TLS via Coolify; live app `msqdx-ui:main-rapp`)
6. Ports: expose **6006** (match `EXPOSE` in Dockerfile)
7. Env: optional only — see below → Deploy

## Env (Coolify)

No required runtime secrets. Optional documentation placeholders (do not invent real secrets):

```
PORT=6006
URL_MSQDX_UI_STORYBOOK=https://ds.projects-a.plygrnd.tech
```

`PORT` is already baked into nginx (`listen 6006`); Coolify port mapping must match **6006**. Public URL is for operators / docs only — the static site does not read env at runtime.

## Smoke checklist

1. `GET https://ds.projects-a.plygrnd.tech/` → Storybook manager HTML
2. `GET https://ds.projects-a.plygrnd.tech/healthz` → `ok`
3. Browser: open catalog stories including **Organisms/ChatOverlay** (DockEnd, ComposedPanel)
4. Confirm product apps (audion-v3 / checkion-v3) still build; they pin/clone source separately

## Local Docker / compose

```bash
docker build -t msqdx-ui-storybook .
docker run --rm -p 6006:6006 msqdx-ui-storybook
# or
docker compose up --build -d
```

Open `http://localhost:6006/`.

## Status

Dockerfile + nginx + compose + this runbook ready. Live Coolify attach needs operator credentials (not in-repo).
