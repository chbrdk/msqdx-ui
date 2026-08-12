import type { Meta, StoryObj } from '@storybook/react-vite'
import { PrintChapter, PrintPage, PrintRankedList } from './PrintPrimitives'

const meta = {
  title: 'Print/Chapter',
  component: PrintChapter,
  tags: ['print', 'magazine'],
} satisfies Meta<typeof PrintChapter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <PrintPage>
      <PrintChapter
        eyebrow="Domain-Scan"
        title="Domain & Barrierefreiheit"
        lede="beispiel.de"
      >
        <PrintRankedList
          items={[
            { label: 'Form without submit button', meta: '50×' },
            { label: 'Img with empty alt', meta: '49×' },
          ]}
        />
      </PrintChapter>
    </PrintPage>
  ),
}
