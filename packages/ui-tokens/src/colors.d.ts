import { msqdxRoles, msqdxRolesDark } from './roles';
export type ChartTokens = {
    muted: string;
    accent: string;
    ok: string;
    ink: string;
    grid: string;
    tipBg: string;
    tipBorder: string;
    tipFg: string;
};
export type SemanticTheme = {
    bg0: string;
    bg1: string;
    ink: string;
    muted: string;
    accent: string;
    line: string;
    danger: string;
    ok: string;
    warn: string;
    surface: string;
    surface2: string;
    chart: ChartTokens;
    roles: typeof msqdxRoles | typeof msqdxRolesDark;
};
/** Trial light (legacy theme id `msqdx`) */
export declare const msqdxLight: SemanticTheme;
/** Trial dark (legacy `msqdx-dark`) */
export declare const msqdxDark: SemanticTheme;
/**
 * msqdx-ui light — same brand, clearer surfaces + soft panel radius via CSS.
 */
export declare const msqdxV2Light: SemanticTheme;
/**
 * msqdx-ui dark — slightly clearer elevated surfaces than trial dark.
 */
export declare const msqdxV2Dark: SemanticTheme;
export declare const forestChart: ChartTokens;
