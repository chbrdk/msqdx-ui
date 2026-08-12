# TokenPicker

Dense inspect control that **binds a property to a token path**. Never free CSS / `#hex` / `px`.

**Spec:** `specs/domain/msqdx-ui-token-picker.md`  
**Storybook:** `Organisms/TokenPicker`

## Variants

| `variant` | Behaviour |
|-----------|-----------|
| `compact` (default) | Current strip (swatch + path + optional −/+ / clear). Option list is a popover. |
| `list` | Always-open dense list under the strip (Storybook / debug). |

CREATION `/editor` MUST use compact (the default). Do not pass `list` in the inspect rail.

## Rules

- `onChange` emits `option.path` only.
- Clear goes through `onClear`, not `onChange('')`.
- Swatch `preview` is display-only.
