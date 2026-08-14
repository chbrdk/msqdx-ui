import { createContext, useContext, useMemo, type ReactNode } from 'react'
import {
  mergeMagazineColors,
  type MagazineColorOverrides,
  type MagazineColors,
} from '../magazine/colors'
import { createMagStyles, magColors, magStyles } from './tokens'

export type MagThemeValue = {
  colors: MagazineColors
  styles: ReturnType<typeof createMagStyles>
}

const defaultTheme: MagThemeValue = {
  colors: magColors,
  styles: magStyles,
}

const MagThemeContext = createContext<MagThemeValue>(defaultTheme)

/**
 * Optional Mag color theme for PDF documents.
 * Apps resolve Brandion (or other) packs → overrides; Mag primitives stay Brandion-agnostic.
 */
export function MagThemeProvider({
  colors: colorOverrides,
  children,
}: {
  colors?: MagazineColorOverrides | MagazineColors | null
  children: ReactNode
}) {
  const value = useMemo<MagThemeValue>(() => {
    if (!colorOverrides) return defaultTheme
    const colors = mergeMagazineColors(colorOverrides)
    return { colors, styles: createMagStyles(colors) }
  }, [colorOverrides])

  return <MagThemeContext.Provider value={value}>{children}</MagThemeContext.Provider>
}

export function useMagTheme(): MagThemeValue {
  return useContext(MagThemeContext)
}
