# MSQDX UI

Central React + CSS-variable design system extracted from ECHON V3.

Packages:
- `@msqdx/ui-tokens` — token exports
- `@msqdx/ui` — shared primitives, CSS layers, Storybook catalog

Commands:
- `pnpm install`
- `pnpm build`
- `pnpm test`
- `pnpm storybook`
- `pnpm build-storybook`
- `pnpm ds:add ButtonLike --layer atoms`

Always-on Storybook (static nginx, port **6006**):
- Local: `docker compose up --build -d` → http://localhost:6006/
- Coolify: `knowledge/staging-coolify-storybook.md`
- Staging URL: `https://ds.projects-a.plygrnd.tech` (`URL_MSQDX_UI_STORYBOOK`)
