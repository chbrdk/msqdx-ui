# ChatMetricGrid

Domain-free assistant **KPI tile grid** (label + value + optional unit/hint/tone).

**Spec:** `specs/domain/msqdx-ui-chat-metric-grid.md`  
**Storybook:** `Molecules/ChatMetricGrid` · `Organisms/ChatCatalog`

## Usage

```tsx
import { ChatBlockPanel, ChatMetricGrid } from '@msqdx/ui'

<ChatBlockPanel title="GEO Kennzahlen" eyebrow="metrics">
  <ChatMetricGrid
    items={[
      { label: 'GEO Score', value: 62, unit: '/100', tone: 'warning' },
      { label: 'Citations', value: 3, tone: 'error' },
    ]}
  />
</ChatBlockPanel>
```

Maps from Plexon generative block `metric_grid`.
