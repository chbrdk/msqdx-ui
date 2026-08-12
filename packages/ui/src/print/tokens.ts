/**
 * Print magazine tokens — HTML twin of plexon `pdf/magazine/tokens.ts`.
 * Keep values in sync when changing the PDF kit.
 */
export const printMagColors = {
  ink: '#111111',
  inkSoft: '#3a3a3a',
  muted: '#6b6b6b',
  line: '#d8d8d8',
  paper: '#ffffff',
  wash: '#f6f6f5',
  accent: '#00ca55',
  accentInk: '#007a33',
  neg: '#c23b2a',
  warn: '#b45309',
  track: '#e8e8e6',
  donut: ['#111111', '#00ca55', '#5a5a5a', '#9a9a9a', '#c23b2a', '#3a7bd5', '#b45309', '#6b6b6b'],
} as const
