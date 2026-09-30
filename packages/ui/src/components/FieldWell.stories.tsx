import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ExpressionField } from './ExpressionField'
import { FieldWell, FieldWellStack } from './FieldWell'

const meta = {
  title: 'Molecules/FieldWell',
  component: FieldWell,
  args: {
    role: 'Value',
    bound: false,
  },
} satisfies Meta<typeof FieldWell>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  render: function EmptyRender() {
    const [value, setValue] = useState('')
    return (
      <FieldWell role="Value" bound={Boolean(value.trim())}>
        <ExpressionField
          value={value}
          onChange={setValue}
          placeholder="Drop a measure or pick from the list"
          suggestions={[
            { value: 'kpi:revenue', label: 'Revenue' },
            { value: 'kpi:orders', label: 'Orders' },
          ]}
        />
      </FieldWell>
    )
  },
}

export const BoundWithHint: Story = {
  args: {
    role: 'Category',
    hint: 'Drop or pick a column to break the chart into categories.',
    bound: true,
  },
  render: (args) => (
    <FieldWell {...args}>
      <ExpressionField value="dataset:sales.region" onChange={() => {}} />
    </FieldWell>
  ),
}

export const DropActive: Story = {
  args: {
    role: 'Dataset',
    dropActive: true,
    bound: false,
  },
  render: (args) => (
    <FieldWell {...args}>
      <ExpressionField value="" onChange={() => {}} placeholder="Drop dataset" />
    </FieldWell>
  ),
}

export const ChartBindStack: Story = {
  render: function ChartBindStackRender() {
    const [value, setValue] = useState('kpi:revenue')
    const [category, setCategory] = useState('')
    return (
      <div className="ds-inspect-density" style={{ maxWidth: '22rem', padding: '0.75rem' }}>
        <FieldWellStack>
          <FieldWell role="Value" bound={Boolean(value.trim())}>
            <ExpressionField
              value={value}
              onChange={setValue}
              suggestions={[{ value: 'kpi:revenue', label: 'Revenue' }]}
            />
          </FieldWell>
          <FieldWell
            role="Category"
            bound={Boolean(category.trim())}
            hint="Optional breakdown column."
          >
            <ExpressionField value={category} onChange={setCategory} placeholder="Drop column" />
          </FieldWell>
        </FieldWellStack>
      </div>
    )
  },
}
