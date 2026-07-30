import { msqdxBrand } from './brand';
import { msqdxRoles, msqdxRolesDark } from './roles';
/** Trial light (legacy theme id `msqdx`) */
export const msqdxLight = {
    bg0: msqdxBrand.neutral,
    bg1: '#ffffff',
    ink: '#0f172a',
    muted: '#475569',
    accent: msqdxBrand.orange,
    line: 'rgba(0, 0, 0, 0.12)',
    danger: '#ef4444',
    ok: msqdxBrand.green,
    warn: msqdxBrand.yellow,
    surface: 'rgba(255, 255, 255, 0.92)',
    surface2: '#ffffff',
    chart: {
        muted: '#64748b',
        accent: msqdxBrand.orange,
        ok: msqdxBrand.green,
        ink: '#0f172a',
        grid: 'rgba(15, 23, 42, 0.12)',
        tipBg: '#ffffff',
        tipBorder: 'rgba(0, 0, 0, 0.12)',
        tipFg: '#0f172a',
    },
    roles: msqdxRoles,
};
/** Trial dark (legacy `msqdx-dark`) */
export const msqdxDark = {
    bg0: '#0f0f0f',
    bg1: '#1a1a1a',
    ink: '#ffffff',
    muted: '#a3a3a3',
    accent: msqdxBrand.orange,
    line: 'rgba(255, 255, 255, 0.12)',
    danger: '#f87171',
    ok: msqdxBrand.green,
    warn: msqdxBrand.yellow,
    surface: 'rgba(26, 26, 26, 0.92)',
    surface2: '#262626',
    chart: {
        muted: '#a3a3a3',
        accent: msqdxBrand.orange,
        ok: msqdxBrand.green,
        ink: '#ffffff',
        grid: 'rgba(255, 255, 255, 0.12)',
        tipBg: '#1a1a1a',
        tipBorder: 'rgba(255, 255, 255, 0.16)',
        tipFg: '#ffffff',
    },
    roles: msqdxRolesDark,
};
/**
 * msqdx-ui light — same brand, clearer surfaces + soft panel radius via CSS.
 */
export const msqdxV2Light = {
    ...msqdxLight,
    bg0: '#f6f4ee',
    bg1: '#ffffff',
    surface: 'rgba(255, 255, 255, 0.96)',
    surface2: '#faf9f6',
};
/**
 * msqdx-ui dark — slightly clearer elevated surfaces than trial dark.
 */
export const msqdxV2Dark = {
    ...msqdxDark,
    bg0: '#0c0c0c',
    bg1: '#161616',
    surface: 'rgba(22, 22, 22, 0.96)',
    surface2: '#222222',
    chart: {
        ...msqdxDark.chart,
        tipBg: '#161616',
    },
};
export const forestChart = {
    muted: '#9aab9e',
    accent: '#c4a35a',
    ok: '#6a9b7a',
    ink: '#e8efe9',
    grid: 'rgba(232, 239, 233, 0.16)',
    tipBg: '#1a221e',
    tipBorder: 'rgba(232, 239, 233, 0.12)',
    tipFg: '#e8efe9',
};
