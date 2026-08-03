# Staging — Coolify Storybook (`msqdx-ui`)

## Target

Deploy an **always-on static Storybook** for the central design system into Coolify island **msqdx-v3-staging**, next to plexon-v3 / audion-v3 / checkion-v3.

| Item | Value |
|------|--------|
| Coolify project | `msqdx-ecosystem-v3` |
| Environment | `staging` |
| App name | `msqdx-ui-storybook` |
| GitHub source | `chbrdk/msqdx-ui`, branch `main` |
| Dockerfile | repo root `Dockerfile` |
| Base directory | `/` |
| Container port | **6006** |
| Domain (suggested) | `https://msqdx-ui.projects-a.plygrnd.tech` (`URL_MSQDX_UI_STORYBOOK`) |
| Runtime secrets | **none** (static nginx; no DB/auth) |

Hierarchy context: `plexon-v3/knowledge/coolify-v3-staging-runbook.md`.

## What the image does

1. `pnpm install --frozen-lockfile` (workspace: `@msqdx/ui-tokens` + `@msqdx/ui`)
2. `pnpm build` → package dist
3. `pnpm build-storybook` → `packages/ui/storybook-static`
4. nginx serves that folder on port **6006**

Product app Dockerfiles that **clone** this repo for sibling source are unrelated and unchanged.

## Coolify attach checklist

1. Project `msqdx-ecosystem-v3` → Environment `staging`
2. New Application `msqdx-ui-storybook`
3. Source: GitHub `chbrdk/msqdx-ui`, branch `main`
4. Build pack: **Dockerfile**, path `Dockerfile`, base `/`
5. Domains: `msqdx-ui.projects-a.plygrnd.tech` (TLS via Coolify)
6. Ports: expose **6006** (match `EXPOSE` in Dockerfile)
7. Env: optional only — see below → Deploy

## Env (Coolify)

No required runtime secrets. Optional documentation placeholders (do not invent real secrets):

```
PORT=6006
URL_MSQDX_UI_STORYBOOK=https://msqdx-ui.projects-a.plygrnd.tech
```

`PORT` is already baked into nginx (`listen 6006`); Coolify port mapping must match **6006**. Public URL is for operators / docs only — the static site does not read env at runtime.

## Smoke checklist

1. `GET https://msqdx-ui.projects-a.plygrnd.tech/` → Storybook manager HTML
2. `GET https://msqdx-ui.projects-a.plygrnd.tech/healthz` → `ok`
3. Browser: open a few catalog stories (tokens, Button, Lede, …)
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
