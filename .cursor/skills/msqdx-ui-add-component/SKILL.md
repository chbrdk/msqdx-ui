---
name: msqdx-ui-add-component
description: Adds or evolves a central MSQ DX UI primitive in the msqdx-ui repo. Use when a consuming app is missing a reusable button, field, panel, table, feedback primitive, or other shared chrome and the component belongs in the central design system.
disable-model-invocation: true
---

# MSQDX UI Add Component

1. Confirm the primitive belongs in `msqdx-ui` and is not app/domain-specific.
2. Read the closest spec in `specs/domain/` and update or add a matching `msqdx-ui-*.md` spec first.
3. Run `pnpm ds:add <Name> --layer atoms|molecules|organisms` in the repo root.
4. Implement the generated component using token variables and `ds-*` classes only.
5. Fill in the generated story, MDX docs, and test.
6. Export the primitive from `packages/ui/src/index.ts` and confirm `packages/ui/src/storybook/catalog.ts` stays accurate.
7. Consume the primitive from apps via `@msqdx/ui`; never recreate it locally.
