# AGENTS.md — MSQDX UI

1. Specs first. Update `specs/domain/` before changing public primitives.
2. New or missing primitive: scaffold it here via `pnpm ds:add <Name> --layer atoms|molecules|organisms`.
3. Never invent one-off app chrome when a central primitive belongs here.
4. No hardcoded paths/URLs; document new canonical locations in `knowledge/paths.md`.
5. Every primitive change ships with stories and tests.
6. Keep `@msqdx/ui` generic. App/domain pages, charts, product routing, and data hooks stay in the consuming app.
7. Always-on Storybook staging: static image via root `Dockerfile` (port **6006**); operator notes in `knowledge/staging-coolify-storybook.md`; live FQDN `https://ds.projects-a.plygrnd.tech` (`URL_MSQDX_UI_STORYBOOK`).
