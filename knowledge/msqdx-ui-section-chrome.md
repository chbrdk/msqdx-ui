# MSQ DX v2 — SectionChrome

**Spec:** `specs/domain/msqdx-ui-section-chrome.md`  
**Component:** `apps/web-ui/src/components/SectionChrome.tsx`  
**Storybook:** Components → SectionChrome  
**Typography:** title → `--type-2xl` / `--weight-thin` · meta → type tokens

```tsx
import { SectionChrome } from '../components/SectionChrome'

<SectionChrome title="Waves" quiet as="h3" meta="12" metaTone="accent" />
```

Quiet = nested headers (no icon, uppercase title). Prefer `<Button>` in `action`.  
`metaTone="accent"` for brand count badges (uses `--accent`).

## Related

- ADR 0028 §3 / §16 · `msqdx-ui-typography.md` · `msqdx-ui-accordion.md` · `dashboard-visual-system.md` · `storybook-web-ui.md`
