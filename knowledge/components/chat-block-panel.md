# ChatBlockPanel

Domain-free assistant **message block shell** (eyebrow + compact title + body).

**Spec:** `specs/domain/msqdx-ui-chat-block-panel.md`  
**Storybook:** `Molecules/ChatBlockPanel` · composed catalog `Organisms/Chat/Catalog`

## Usage

```tsx
import { ChatBlockPanel, ChatBlockList } from '@msqdx/ui'

<ChatBlockPanel title="Erkenntnisse" eyebrow="findings">
  <ChatBlockList items={[{ title: '…', description: '…', badge: 'Warnung', tone: 'warning' }]} />
</ChatBlockPanel>
```

Typography: title `@xl`, list titles `@lg`, prose `meta`.
