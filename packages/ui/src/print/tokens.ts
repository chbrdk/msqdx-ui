/**
 * Print magazine tokens — HTML twin of plexon `pdf/magazine/tokens.ts`.
 * Keep values in sync when changing the PDF kit.
 */
export const printMagColors = {
  ink: '#141414',
  inkSoft: '#3a3a38',
  muted: '#6e6e6a',
  line: '#dddcd7',
  paper: '#f8f7f4',
  wash: '#efeee9',
  accent: '#00ca55',
  accentInk: '#007a33',
  neg: '#c23b2a',
  warn: '#b45309',
  track: '#e6e5e0',
  donut: ['#141414', '#00ca55', '#5a5a5a', '#9a9a9a', '#c23b2a', '#3a7bd5', '#b45309', '#6b6b6b'],
} as const
