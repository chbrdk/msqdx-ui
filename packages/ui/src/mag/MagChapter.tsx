import type { ReactNode } from 'react'
import { Text, View } from '@react-pdf/renderer'
import { useMagTheme } from './MagTheme'

type MagChapterProps = {
  eyebrow: string
  title: string
  lede?: string
  /** Print folio index, e.g. "02" */
  index?: string
  /** Second+ module on a packed page — hairline + air above. */
  stacked?: boolean
  children?: ReactNode
  break?: boolean
}

export function MagChapter({
  eyebrow,
  title,
  lede,
  index,
  stacked = false,
  children,
  break: pageBreak,
}: MagChapterProps) {
  const { styles } = useMagTheme()
  return (
    <View
      style={[styles.chapterGap, stacked ? styles.chapterStacked : undefined]}
      break={pageBreak}
    >
      {index ? <Text style={styles.chapterIndex}>{index}</Text> : null}
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.headline}>{title}</Text>
      <View style={styles.accentRule} />
      {lede ? <Text style={styles.lede}>{lede}</Text> : null}
      {children}
    </View>
  )
}
