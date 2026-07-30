# Storybook — product UI Atomic catalog (2026-07-28)

Isolated view of ECHON V3 UI (Foundation → Pages). **Not** the live app.

**Spec:** `specs/domain/msqdx-ui-storybook-atomic.md`  
**Map:** `specs/domain/msqdx-ui-catalog-map.md`  
**Runtime inventory:** `apps/web-ui/src/storybook/catalog.ts`

## Run

```bash
cd apps/web-ui
pnpm storybook
```

Open: `web.storybook_base_url` in `config/paths.yaml` (default `http://127.0.0.1:6006`).

Toolbar: switch `data-theme` (`msqdx-dark`, `msqdx`, `msqdx-ui*`, `forest`).

## Paths (no hardcoded hosts)

| Knob | Where |
|------|--------|
| Port | `web.storybook_port` → `VITE_STORYBOOK_PORT` |
| URL | `web.storybook_base_url` → `VITE_STORYBOOK_BASE_URL` |
| App reference | `paths.storybookBaseUrl` / `paths.storybookPort` |

## Stack

- Storybook **10.5.x** + `@storybook/react-vite`
- Addons: docs, a11y
- Global CSS: `src/index.css`
- Decorators: `QueryClientProvider` + `ThemeProvider` + `LocaleProvider` + `MemoryRouter` + theme globals

## Atomic hierarchy

| Layer | Title prefix | Examples |
|-------|--------------|----------|
| Foundation | `Foundation/` | Tokens, Typography, Motion, Icons |
| Atoms | `Atoms/` | Button, Text, Input, Select, … |
| Molecules | `Molecules/` | Field, Panel, CategoryBars, … |
| Organisms | `Organisms/` | RankedList, NavRail, ChatPanel, viz panels |
| Templates | `Templates/` | AppShell, ChatOverlay |
| Pages | `Pages/` | Overview … Sources |

Each entry: co-located `*.stories.tsx` + `*.mdx` (Overview / Anatomy / Usage / Do–Don’t / Accessibility / Related). Every CSF module exports `Default`.

## Guards

```bash
pnpm exec vitest run src/storybook/
pnpm build-storybook
```

- `catalogCompleteness.test.ts` — inventory ↔ files
- `storySmoke.test.tsx` — render CSF exports
- `storybook.test.ts` — paths + config
- `restoreNativeFocus.test.ts` — Storybook 10.5 `Illegal invocation` focus shim

### Storybook 10.5 focus bug

Docs pages can throw `TypeError: Illegal invocation` on `HTMLElement.prototype.focus` (addon-docs / react-aria). Cause: Storybook 10.5 focus instrumentation (#35503). Workaround: `.storybook/restoreNativeFocus.ts` (loaded from `preview.tsx`). Remove after upgrading past the release that includes #35528.

## Build static

```bash
pnpm build-storybook   # → storybook-static/ (gitignored)
```

## Related

- Design system: `msqdx-ui-design-system.md`
- Atomic hub: `msqdx-ui-storybook-atomic.md`
- Completeness: `msqdx-ui-completeness.md`
- ADR 0028 §21
- URLs index: `urls-and-paths.md`
