import { Text, View } from '@react-pdf/renderer'
import { useMagTheme } from './MagTheme'

export type MagRankedItem = {
  label: string
  meta?: string
}

type MagRankedListProps = {
  items: MagRankedItem[]
  startIndex?: number
  /** Magazine two-column flow within the content measure. */
  columns?: 1 | 2
  /** Tighter rows for persona tiles and nested lists. */
  compact?: boolean
}

function splitColumns(items: MagRankedItem[]): [MagRankedItem[], MagRankedItem[]] {
  const mid = Math.ceil(items.length / 2)
  return [items.slice(0, mid), items.slice(mid)]
}

function RankedColumn({
  items,
  startIndex,
  compact,
  styles,
}: {
  items: MagRankedItem[]
  startIndex: number
  compact: boolean
  styles: ReturnType<typeof useMagTheme>['styles']
}) {
  return (
    <View style={{ width: '100%' }}>
      {items.map((item, i) => (
        <View
          key={`${item.label}-${i}`}
          style={compact ? styles.rankedRowCompact : styles.rankedRow}
          wrap={false}
        >
          <Text style={compact ? styles.rankedIndexCompact : styles.rankedIndex}>
            {String(startIndex + i).padStart(2, '0')}
          </Text>
          <View style={styles.rankedTextCol}>
            <Text style={compact ? styles.rankedLabelCompact : styles.rankedLabel}>
              {item.label}
            </Text>
            {item.meta ? (
              <Text
                style={
                  compact
                    ? [styles.meta, styles.rankedMetaCompact, { marginTop: 3 }]
                    : [styles.meta, { marginTop: 3 }]
                }
              >
                {item.meta}
              </Text>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  )
}

export function MagRankedList({
  items,
  startIndex = 1,
  columns = 1,
  compact = false,
}: MagRankedListProps) {
  const { styles } = useMagTheme()
  if (!items.length) return null

  if (columns === 2 && items.length > 1) {
    const [left, right] = splitColumns(items)
    const pad = 12
    return (
      <View style={[styles.twoColRow, { marginTop: compact ? 2 : 6 }]}>
        <View style={[styles.twoColCell, { paddingRight: pad }]}>
          <RankedColumn items={left} startIndex={startIndex} compact={compact} styles={styles} />
        </View>
        <View style={[styles.twoColCell, { paddingLeft: pad }]}>
          <RankedColumn
            items={right}
            startIndex={startIndex + left.length}
            compact={compact}
            styles={styles}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={{ marginTop: compact ? 2 : 6, width: '100%' }}>
      <RankedColumn items={items} startIndex={startIndex} compact={compact} styles={styles} />
    </View>
  )
}
