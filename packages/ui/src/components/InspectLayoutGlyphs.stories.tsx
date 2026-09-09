import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  GridColumnGlyph,
  GridSpanGlyph,
  MediaFitGlyph,
  SizeModeGlyph,
  columnGlyphForPresetLabel,
  mediaFitLabel,
} from './InspectLayoutGlyphs'
import {
  AutoFlowGlyph,
  BgPositionGlyph,
  BorderStyleGlyph,
  CellParkGlyph,
  ClipPresetGlyph,
  DistributeGlyph,
  FlowDirectionGlyph,
  OverflowGlyph,
  PositionGlyph,
  WrapGlyph,
} from './InspectLayoutGlyphsExtra'
import { IconBox, IconColumns, IconMaximize, IconMinimize, IconStretch } from './icons'
import { Text } from './Text'

const meta = {
  title: 'Foundation/Inspect Layout Glyphs',
  parameters: {
    docs: {
      description: {
        component:
          'Inspect diagrams tuned to Foundation Lucide icons (16px, ~1.5 stroke, soft ink fills). Accents use `--accent`. Compare with Icons via the Vs Icons story; switch the theme toolbar for light/dark.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Tile({
  label,
  children,
  active,
}: {
  label: string
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <div
      className={active ? 'ds-inspect-glyph-tile is-active' : 'ds-inspect-glyph-tile'}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        minWidth: 48,
        padding: '6px 8px',
        borderRadius: 6,
        border: active
          ? '1px solid color-mix(in srgb, var(--accent) 55%, var(--line))'
          : '1px solid var(--line)',
        background: active
          ? 'color-mix(in srgb, var(--accent) 12%, transparent)'
          : 'var(--bg1)',
        color: 'var(--ink)',
        fontSize: 11,
      }}
    >
      {children}
      <span>{label}</span>
    </div>
  )
}

export const SizeModes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Text role="meta">Width axis</Text>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['hug', 'fill', 'fixed'] as const).map((id, i) => (
          <Tile key={id} label={id} active={i === 1}>
            <SizeModeGlyph id={id} axis="width" />
          </Tile>
        ))}
      </div>
      <Text role="meta">Height axis</Text>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['hug', 'fill', 'fixed'] as const).map((id) => (
          <Tile key={id} label={id}>
            <SizeModeGlyph id={id} axis="height" />
          </Tile>
        ))}
      </div>
    </div>
  ),
}

export const MediaFit: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {(['cover', 'contain', 'auto', 'fill', 'none', 'scale-down'] as const).map((id, i) => (
        <Tile key={id} label={mediaFitLabel(id)} active={i === 0}>
          <MediaFitGlyph id={id} />
        </Tile>
      ))}
    </div>
  ),
}

export const GridColumns: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {[
        '1 Col',
        '2 Col',
        '3 Col',
        '4 Col',
        '6 Col',
        '12 Col',
        'Auto-Fit',
        'Auto-Fill',
        '1 : 2',
        '2 : 1',
        'Sidebar',
        '3-Pane',
      ].map((label, i) => (
        <Tile key={label} label={label} active={i === 2}>
          <GridColumnGlyph id={columnGlyphForPresetLabel(label)} />
        </Tile>
      ))}
    </div>
  ),
}

export const GridSpan: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Text role="meta">Column span</Text>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['span-auto', 'span-1', 'span-2', 'span-3', 'span-4', 'span-full'] as const).map(
          (id) => (
            <Tile key={id} label={id.replace('span-', '')}>
              <GridSpanGlyph id={id} axis="col" />
            </Tile>
          ),
        )}
      </div>
      <Text role="meta">Row span</Text>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['span-auto', 'span-1', 'span-2', 'span-3', 'span-full'] as const).map((id) => (
          <Tile key={id} label={id.replace('span-', '')}>
            <GridSpanGlyph id={id} axis="row" />
          </Tile>
        ))}
      </div>
    </div>
  ),
}

export const AllFamilies: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <Text role="title">Size</Text>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <SizeModeGlyph id="hug" />
          <SizeModeGlyph id="fill" />
          <SizeModeGlyph id="fixed" />
        </div>
      </div>
      <div>
        <Text role="title">Fit</Text>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <MediaFitGlyph id="cover" />
          <MediaFitGlyph id="contain" />
          <MediaFitGlyph id="fill" />
        </div>
      </div>
      <div>
        <Text role="title">Grid</Text>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <GridColumnGlyph id="cols-3" />
          <GridColumnGlyph id="sidebar" />
          <GridSpanGlyph id="span-2" axis="col" />
        </div>
      </div>
    </div>
  ),
}

/** Side-by-side with Foundation Lucide icons — optical parity check. */
export const VsIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 16,
        color: 'var(--ink)',
      }}
    >
      {[
        {
          label: 'Columns',
          icons: [<IconColumns key="i" />, <GridColumnGlyph key="g" id="cols-3" />],
        },
        {
          label: 'Stretch / Fill',
          icons: [<IconStretch key="i" />, <SizeModeGlyph key="g" id="fill" axis="width" />],
        },
        {
          label: 'Box / Fixed',
          icons: [<IconBox key="i" />, <SizeModeGlyph key="g" id="fixed" axis="width" />],
        },
        {
          label: 'Min / Hug',
          icons: [<IconMinimize key="i" />, <SizeModeGlyph key="g" id="hug" axis="width" />],
        },
        {
          label: 'Max / Cover',
          icons: [<IconMaximize key="i" />, <MediaFitGlyph key="g" id="cover" />],
        },
      ].map((row) => (
        <div
          key={row.label}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: 12,
            border: '1px solid var(--line)',
            borderRadius: 8,
            background: 'var(--bg1)',
          }}
        >
          <Text role="meta">{row.label}</Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>{row.icons}</div>
        </div>
      ))}
    </div>
  ),
}


export const DistributeAndPark: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Tile label="Packed">
          <DistributeGlyph id="packed" />
        </Tile>
        <Tile label="Even" active>
          <DistributeGlyph id="even" />
        </Tile>
      </div>
      <Text role="meta">Cell park (horizontal)</Text>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['start', 'center', 'end', 'stretch'] as const).map((id) => (
          <Tile key={id} label={id}>
            <CellParkGlyph id={id} axis="h" />
          </Tile>
        ))}
      </div>
    </div>
  ),
}

export const FlowWrapAutoFlow: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {(['row', 'column', 'row-reverse', 'column-reverse'] as const).map((id) => (
        <Tile key={id} label={id}>
          <FlowDirectionGlyph id={id} />
        </Tile>
      ))}
      <Tile label="nowrap">
        <WrapGlyph id="nowrap" />
      </Tile>
      <Tile label="wrap">
        <WrapGlyph id="wrap" />
      </Tile>
      {(['row', 'column', 'dense'] as const).map((id) => (
        <Tile key={`af-${id}`} label={`flow ${id}`}>
          <AutoFlowGlyph id={id} />
        </Tile>
      ))}
    </div>
  ),
}

export const PositionOverflowBorder: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {(['static', 'relative', 'absolute', 'fixed', 'sticky'] as const).map((id) => (
        <Tile key={id} label={id}>
          <PositionGlyph id={id} />
        </Tile>
      ))}
      {(['visible', 'hidden', 'scroll', 'auto'] as const).map((id) => (
        <Tile key={`o-${id}`} label={id}>
          <OverflowGlyph id={id} />
        </Tile>
      ))}
      {(['solid', 'dashed', 'dotted', 'none'] as const).map((id) => (
        <Tile key={`b-${id}`} label={id}>
          <BorderStyleGlyph id={id} />
        </Tile>
      ))}
    </div>
  ),
}

export const BgPosAndClip: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['center', 'top', 'bottom', 'left', 'right'] as const).map((id) => (
          <Tile key={id} label={id}>
            <BgPositionGlyph id={id} />
          </Tile>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(
          [
            'none',
            'slant-bottom',
            'slant-bottom-flip',
            'slant-top',
            'trapezoid',
            'parallelogram',
          ] as const
        ).map((id) => (
          <Tile key={id} label={id}>
            <ClipPresetGlyph id={id} />
          </Tile>
        ))}
      </div>
    </div>
  ),
}

export const Catalog: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, color: 'var(--ink)' }}>
      <SizeModeGlyph id="hug" />
      <SizeModeGlyph id="fill" />
      <SizeModeGlyph id="fixed" />
      <MediaFitGlyph id="cover" />
      <DistributeGlyph id="even" />
      <CellParkGlyph id="center" axis="h" />
      <FlowDirectionGlyph id="row" />
      <WrapGlyph id="wrap" />
      <AutoFlowGlyph id="dense" />
      <PositionGlyph id="sticky" />
      <OverflowGlyph id="hidden" />
      <BorderStyleGlyph id="dashed" />
      <BgPositionGlyph id="top" />
      <ClipPresetGlyph id="trapezoid" />
      <GridColumnGlyph id="cols-3" />
      <GridSpanGlyph id="span-2" axis="col" />
    </div>
  ),
}
