# ChatKeyValueList

Domain-free assistant **label → value** rows.

**Spec:** `specs/domain/msqdx-ui-chat-key-value-list.md`  
**Storybook:** `Molecules/ChatKeyValueList` · `Organisms/ChatCatalog`

## Usage

```tsx
import { ChatBlockPanel, ChatKeyValueList } from '@msqdx/ui'

<ChatBlockPanel title="Details" eyebrow="details">
  <ChatKeyValueList
    items={[
      { label: 'Projekt', value: 'Demo Website' },
      { label: 'Domain', value: 'example.com' },
    ]}
  />
</ChatBlockPanel>
```

Maps from Plexon generative block `key_value_list`.
