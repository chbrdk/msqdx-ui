import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ExpressionField } from './ExpressionField'

const meta = {
  title: 'Molecules/ExpressionField',
  component: ExpressionField,
  args: {
    label: 'Path',
    value: '{{ scan.overallScore }}',
    hint: 'Bare path or {{ expression }}',
  },
} satisfies Meta<typeof ExpressionField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: function InteractiveRender() {
    const [value, setValue] = useState('scan.overallScore')
    return (
      <ExpressionField
        label="Compare path"
        value={value}
        onChange={setValue}
        hint="Click JsonTree leaves to insert"
      />
    )
  },
}
