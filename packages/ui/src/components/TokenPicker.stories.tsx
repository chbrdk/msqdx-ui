import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { TokenPicker } from './TokenPicker'

const COLOR_OPTIONS = [
  { path: 'color.accent', preview: '#224455', label: 'color.accent' },
  { path: 'color.muted', preview: '#666666', label: 'color.muted' },
  { path: 'color.surface', preview: '#f4f4f4', label: 'color.surface' },
  { path: 'color.danger', preview: '#b33', label: 'color.danger' },
]

const meta = {
  title: 'Organisms/TokenPicker',
  component: TokenPicker,
  args: {
    value: 'color.accent',
    options: COLOR_OPTIONS,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Dense token-path picker for inspect fields. Values are token paths only — no free CSS entry.',
      },
    },
  },
} satisfies Meta<typeof TokenPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithClear: Story = {
  render: function WithClearStory() {
    const [value, setValue] = useState<string | null>('color.accent')
    return (
      <TokenPicker
        label="Fill"
        options={COLOR_OPTIONS}
        value={value}
        onChange={setValue}
        onClear={() => setValue(null)}
      />
    )
  },
}

export const AllowNone: Story = {
  render: function AllowNoneStory() {
    const [value, setValue] = useState<string | null>(null)
    return (
      <TokenPicker
        label="Border color"
        options={COLOR_OPTIONS}
        value={value}
        onChange={setValue}
        onClear={() => setValue(null)}
        allowNone
        noneLabel="None"
      />
    )
  },
}

export const DenseList: Story = {
  args: {
    label: 'Space',
    value: 'space.md',
    options: [
      { path: 'space.xs', label: 'space.xs' },
      { path: 'space.sm', label: 'space.sm' },
      { path: 'space.md', label: 'space.md' },
      { path: 'space.lg', label: 'space.lg' },
      { path: 'space.xl', label: 'space.xl' },
      { path: 'space.2xl', label: 'space.2xl' },
    ],
  },
}
