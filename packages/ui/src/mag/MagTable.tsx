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
  return (
    <View style={{ width: '100%' }}>
      <View style={styles.tableHeader}>
        {columns.map((col) => (
          <View key={col} style={{ width, paddingRight: 4, minWidth: 0 }}>
            <Text style={[styles.tableHeadCell, headStyle]}>{col}</Text>
          </View>
        ))}
      </View>
      {rows.map((row, ri) => (
        <View key={ri} style={[styles.tableRow, rowPad]} wrap={false}>
          {columns.map((_, ci) => (
            <View key={ci} style={{ width, paddingRight: 4, minWidth: 0 }}>
              <Text style={[styles.tableCell, cellStyle, cellStyles?.[ri]?.[ci]]}>
                {row[ci] == null || row[ci] === '' ? '–' : String(row[ci])}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}
