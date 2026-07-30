/**
 * MSQ DX brand hex — local mirror for ECHON (no @msqdx/react).
 * Knowledge: msqdx-ui-design-system.md · ui-msqdx-trial.md
 */
export const msqdxBrand = {
  purple: '#b638ff',
  yellow: '#fef14d',
  pink: '#f256b6',
  pinkOnLight: '#d5108a',
  orange: '#ff6a3b',
  green: '#00ca55',
  blue: '#3080ff',
  black: '#000000',
  white: '#ffffff',
  neutral: '#f8f6f0',
  greyLight: '#d4d2d2',
} as const

export type MsqdxBrandKey = keyof typeof msqdxBrand
