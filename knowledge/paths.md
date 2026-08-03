# Paths and URLs

- Repo root: `/Users/christoph.bordeck/Desktop/GITHUB/msqdx-ui`
- UI package: `packages/ui`
- Token package: `packages/ui-tokens`
- Storybook config: `packages/ui/.storybook`
- Storybook preview (loads `src/styles.css` + theme toolbar): `packages/ui/.storybook/preview.tsx`
- Storybook focus shim (10.5 Illegal invocation): `packages/ui/.storybook/restoreNativeFocus.ts`
- Storybook local: `http://localhost:6006/` (dev: `pnpm storybook` from repo root, or `packages/ui` binary)
- Storybook output: `packages/ui/storybook-static`
- Storybook container port: **6006** (static nginx; `Dockerfile` + `docker/nginx-storybook.conf`)
- Storybook staging URL: `https://msqdx-ui.projects-a.plygrnd.tech` (`URL_MSQDX_UI_STORYBOOK`)
- Storybook Coolify runbook: `knowledge/staging-coolify-storybook.md`
- Storybook local always-on: `docker compose up --build -d` → `http://localhost:6006/`
- Storybook coverage audit (2026-08-03): `knowledge/storybook-coverage-audit-2026-08-03.md`
- Magazine character challenge (DS vs AUDION/CHECKION): `knowledge/magazine-character-challenge-2026-08-03.md`
- Lede / FilterRow / Panel magazine cutover: `knowledge/components/lede-filter-panel.md`
- Button magazine defaults: `knowledge/components/button-magazine.md` · spec `specs/domain/msqdx-ui-button.md`
- Lede spec: `specs/domain/msqdx-ui-lede.md` · FilterRow: `specs/domain/msqdx-ui-filter-row.md`
- Lede primitive: `packages/ui/src/components/Lede.tsx` · FilterRow: `packages/ui/src/components/FilterRow.tsx`
- Component generator: `scripts/ds-add.mjs`
- Generator test: `scripts/ds-add.test.mjs`
- Cursor rule: `.cursor/rules/msqdx-ui.mdc`
- Cursor skill: `.cursor/skills/msqdx-ui-add-component/SKILL.md`
- Primary consumer today: `/Users/christoph.bordeck/Desktop/GITHUB/msqdx-echon/v3/apps/web-ui`
- Legacy MUI repo kept separate: `/Users/christoph.bordeck/Desktop/GITHUB/msqdx-design-system`

- Shared shell spec: `specs/domain/msqdx-ui-app-shell.md`
- Shared app frame primitive: `packages/ui/src/components/AppFrame.tsx`
- Shared nav rail primitive: `packages/ui/src/components/NavRail.tsx`
- Shared brand corner primitive: `packages/ui/src/components/BrandCorner.tsx`

- Field / forms specs: `specs/domain/msqdx-ui-field.md` · `specs/domain/msqdx-ui-forms.md`
- Extended (Dialog / ConfirmDialog): `specs/domain/msqdx-ui-extended.md`
- Field CSS: `packages/ui/src/css/field.css`
- Forms knowledge: `knowledge/forms-edit-wave.md` · `knowledge/msqdx-ui-field.md`
- AUDION pilot: `/Users/christoph.bordeck/Desktop/GITHUB/audion-v3`

- Chat chrome spec: `specs/domain/msqdx-ui-chat-chrome.md`
- Chat chrome knowledge: `knowledge/msqdx-ui-chat-chrome.md`
- Chat CSS: `packages/ui/src/css/chat.css` (`.chat-panel-open`, `.chat-send-icon`)
- Chat CSS guard: `packages/ui/src/chatChrome.test.ts`
- IconSend · IconShare · IconHistory · IconMoodboard · IconMic · IconVideo: `packages/ui/src/components/icons.tsx`
- Flyout: `packages/ui/src/components/Flyout.tsx` · spec `specs/domain/msqdx-ui-flyout.md` · knowledge `knowledge/components/flyout.md`

- CardActions (equal-width magazine card footers): `packages/ui/src/components/CardActions.tsx` · CSS `.ds-card-actions` in `packages/ui/src/css/components.css` · spec `specs/domain/msqdx-ui-card-actions.md` · knowledge `knowledge/components/card-actions.md`

- Shared overview surfaces spec: `specs/domain/msqdx-ui-overview-surfaces.md`
- Shared top status primitive: `packages/ui/src/components/TopStatus.tsx`
- Shared KPI strip primitive: `packages/ui/src/components/KpiStrip.tsx`
- Shared pipeline panel primitive: `packages/ui/src/components/PipelinePanel.tsx`
- Shared status meter panel primitive: `packages/ui/src/components/StatusMeterPanel.tsx`
