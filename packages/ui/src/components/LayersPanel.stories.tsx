import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { LayersPanel, type LayersPanelItem } from './LayersPanel'

const DEMO_TREE: LayersPanelItem[] = [
  {
    id: 'root',
    label: 'Page',
    type: 'Stack',
    children: [
      { id: 'title', label: 'Hero title', type: 'Text' },
      {
        id: 'card',
        label: 'Feature card',
        type: 'Card',
        children: [
          { id: 'cta', label: 'Get started', type: 'Button' },
          { id: 'img', label: 'Hero image', type: 'Image' },
        ],
      },
      { id: 'input', label: 'Email', type: 'Input' },
    ],
  },
]

const meta = {
  title: 'Organisms/LayersPanel',
  component: LayersPanel,
  parameters: {
    docs: {
      description: {
        component:
          'Scene structure tree for composition editors. Apps map domain nodes to { id, label, type?, children? }.',
      },
    },
  },
} satisfies Meta<typeof LayersPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Layers',
    items: DEMO_TREE,
    selectedId: 'title',
  },
}

export const Nested: Story = {
  name: 'Nested selection',
  render: function NestedStory() {
    const [selectedId, setSelectedId] = useState<string | null>('cta')
    return (
      <div style={{ maxWidth: '16rem', border: '1px solid var(--border, #ddd)' }}>
        <LayersPanel
          title="Layers"
          items={DEMO_TREE}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
    )
  },
}

export const Empty: Story = {
  args: {
    title: 'Layers',
    items: [],
    emptyLabel: 'No layers',
  },
}

export const WithReorder: Story = {
  name: 'With sibling reorder',
  render: function ReorderStory() {
    const [selectedId, setSelectedId] = useState<string | null>('title')
    const [items, setItems] = useState<LayersPanelItem[]>(DEMO_TREE)

    const reorderSiblings = (
      list: LayersPanelItem[],
      id: string,
      direction: 'up' | 'down',
    ): LayersPanelItem[] => {
      const idx = list.findIndex((n) => n.id === id)
      if (idx >= 0) {
        const swap = direction === 'up' ? idx - 1 : idx + 1
        if (swap < 0 || swap >= list.length) return list
        const next = [...list]
        const tmp = next[idx]!
        next[idx] = next[swap]!
        next[swap] = tmp
        return next
      }
      return list.map((n) =>
        n.children
          ? { ...n, children: reorderSiblings(n.children, id, direction) }
          : n,
      )
    }

    return (
      <div style={{ maxWidth: '16rem', border: '1px solid var(--border, #ddd)' }}>
        <LayersPanel
          title="Layers"
          items={items}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onReorder={(id, direction) =>
            setItems((prev) => reorderSiblings(prev, id, direction))
          }
        />
      </div>
    )
  },
}
