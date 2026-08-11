# ChatStepList

Domain-free assistant **workflow progress** rows.

**Spec:** `specs/domain/msqdx-ui-chat-step-list.md`  
**Storybook:** `Molecules/ChatStepList` · `Organisms/ChatCatalog`

## Usage

```tsx
import { ChatBlockPanel, ChatStepList } from '@msqdx/ui'

<ChatBlockPanel title="Workflow" eyebrow="steps">
  <ChatStepList
    steps={[
      { id: 's1', label: 'Research', status: 'done' },
      { id: 's2', label: 'Personas', status: 'running', progress: 60 },
      { id: 's3', label: 'Journey', status: 'pending' },
    ]}
  />
</ChatBlockPanel>
```

Maps from Plexon generative block `step_list`. Running steps use shared `Spinner`.
