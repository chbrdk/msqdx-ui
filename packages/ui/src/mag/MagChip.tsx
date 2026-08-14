import type { ReactNode } from 'react'
import { Text, View } from '@react-pdf/renderer'
import { useMagTheme } from './MagTheme'

export function MagChip({ children }: { children: ReactNode }) {
  const { styles } = useMagTheme()
  return <Text style={styles.chip}>{children}</Text>
}

export function MagChipRow({ children }: { children: ReactNode }) {
  const { styles } = useMagTheme()
  return <View style={styles.chipRow}>{children}</View>
}
