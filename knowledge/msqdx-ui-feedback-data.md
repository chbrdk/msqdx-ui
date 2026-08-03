# MSQ DX v2 — Toast / DataTable / Avatar (2026-07-28)

**Spec:** `specs/domain/msqdx-ui-feedback-data.md`  
**CSS:** `design-system/css/extended.css` (`.ds-avatar` · `.ds-toast*` · `.ds-table*`)

| Primitive | Use |
|-----------|-----|
| `Avatar` | Face / initials — default **square** (magazine); `shape="round"` for lists |
| `ToastProvider` + `useToast().push()` | Transient status (polite) / errors (assertive) |
| `DataTable` | Compact tabular lists with optional column sort |

Product SoT Wave E — `msqdx-ui-product-sot.md`.

**Consumers:** `SourcesPage` (table + avatar + toast) · Waves detect (toast) · OpsStrip (Alert/LoadingText) · Research/Signals/Waves empties (EmptyState).
