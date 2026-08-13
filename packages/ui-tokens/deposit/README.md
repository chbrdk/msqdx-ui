# MSQ DX DTCG deposit (mirror)

**Canonical import file for Brandion:** `brandion-v3/packs/msq-dx-deposit.dtcg.json`  
This mirror is kept in sync by Brandion `ds:deposit:regenerate` / D6 drift tests for DS package discoverability.

**Drift CI (D6):** `pnpm test:ds-deposit-drift` (or `vitest run deposit/drift.test.ts`) — asserts brand hex + key semantics match `@msqdx/ui-tokens`.  
Regenerate from brandion-v3: `npm run ds:deposit:regenerate` — operator `brandion-v3/knowledge/ds-deposit-d6-operator.md`.

Program: **DS-DEPOSIT** — `brandion-v3/knowledge/ds-tokens-as-plexon-project.md`  
Values SoT: `packages/ui-tokens/src/*` (`msqdxBrand`, spacing, radii, typography, motion, `msqdxDark`)

Do not import this into CREATION directly — CREATION consumes Brandion `active-pack` only.
