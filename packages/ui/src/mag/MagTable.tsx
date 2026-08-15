import { Text, View } from '@react-pdf/renderer'
import { useMagTheme } from './MagTheme'

type MagTableProps = {
  columns: string[]
  rows: Array<Array<string | number | null>>
  /** Instance typography for header cells (Creation P88). */
  headStyle?: Record<string, string | number>
  /** Instance typography applied to all body cells. */
  cellStyle?: Record<string, string | number>
  /** Optional per-cell body styles [row][col]. */
  cellStyles?: Array<Array<Record<string, string | number> | undefined>>
  /** Row vertical rhythm in pt (inspect gap). */
  gap?: number
}

type TextAlign = 'left' | 'center' | 'right' | 'justify'

/** react-pdf: textAlign only shows when Text spans the cell measure (P90). */
const CELL_TEXT_STRETCH = { width: '100%' as const }

function textAlignOf(style?: Record<string, string | number>): TextAlign | undefined {
  const raw = style?.textAlign
  if (typeof raw !== 'string') return undefined
  const v = raw.trim().toLowerCase()
  if (v === 'left' || v === 'center' || v === 'right' || v === 'justify') return v
  return undefined
}

function cellAlignItems(
  style?: Record<string, string | number>,
): 'flex-start' | 'center' | 'flex-end' | undefined {
  const ta = textAlignOf(style)
  if (ta === 'center') return 'center'
  if (ta === 'right') return 'flex-end'
  if (ta === 'left') return 'flex-start'
  return undefined
}

export function MagTable({
  columns,
  rows,
  headStyle,
  cellStyle,
  cellStyles,
  gap,
}: MagTableProps) {
  const { styles } = useMagTheme()
  const width = `${100 / Math.max(columns.length, 1)}%`
  const rowPad = gap != null ? { paddingVertical: Math.max(2, gap / 2) } : undefined
  const headAlign = cellAlignItems(headStyle)
  const bodyAlign = cellAlignItems(cellStyle)
  return (
    <View style={{ width: '100%' }}>
      <View style={styles.tableHeader}>
        {columns.map((col) => (
          <View
            key={col}
            style={[
              { width, paddingRight: 4, minWidth: 0 },
              headAlign ? { alignItems: headAlign } : undefined,
            ]}
          >
            <Text style={[styles.tableHeadCell, CELL_TEXT_STRETCH, headStyle]}>{col}</Text>
          </View>
        ))}
      </View>
      {rows.map((row, ri) => (
        <View key={ri} style={[styles.tableRow, rowPad]} wrap={false}>
          {columns.map((_, ci) => {
            const perCell = cellStyles?.[ri]?.[ci]
            const align = cellAlignItems(perCell) ?? bodyAlign
            return (
              <View
                key={ci}
                style={[
                  { width, paddingRight: 4, minWidth: 0 },
                  align ? { alignItems: align } : undefined,
                ]}
              >
                <Text style={[styles.tableCell, CELL_TEXT_STRETCH, cellStyle, perCell]}>
                  {row[ci] == null || row[ci] === '' ? '–' : String(row[ci])}
                </Text>
              </View>
            )
          })}
        </View>
      ))}
    </View>
  )
}
