/**
 * Neo-Brutalist Design System Constants
 * Inspired by the Stitch StoryTime project design
 */

export const Colors = {
    // Backgrounds
    mintGreen: '#ECFDF5',
    softBlue: '#DBEAFE',
    softPink: '#FCE7F3',

    // Accents
    limeGreen: '#84CC16',
    brightBlue: '#3B82F6',
    vibrantYellow: '#FBBF24',

    // Neutrals
    black: '#000000',
    white: '#FFFFFF',
    lightCream: '#FEF9C3',
    gray: '#6B7280',
    lightGray: '#9CA3AF',
    darkGray: '#374151',
} as const;

export const Typography = {
    sizes: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 28,
        '4xl': 32,
        '5xl': 40,
        '6xl': 48,
        '7xl': 56,
        '8xl': 64,
        '9xl': 72,
    },
    weights: {
        normal: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
        extrabold: '800' as const,
    },
    letterSpacing: {
        tight: -0.5,
        normal: 0,
        wide: 0.5,
        wider: 1,
        widest: 2,
    },
} as const;

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 40,
    '6xl': 48,
} as const;

export const Borders = {
    width: {
        thin: 2,
        medium: 3,
        thick: 4,
    },
    radius: {
        none: 0,
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        full: 999,
    },
} as const;

export const Shadows = {
    // Hard shadows (no blur) - Neo-Brutalist style
    small: {
        shadowColor: Colors.black,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
    },
    medium: {
        shadowColor: Colors.black,
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    large: {
        shadowColor: Colors.black,
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 8,
    },
    xlarge: {
        shadowColor: Colors.black,
        shadowOffset: { width: 12, height: 12 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 12,
    },
} as const;

// Helper function to create colored shadows
export const createColoredShadow = (color: string, size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium') => {
    const baseShadow = Shadows[size];
    return {
        ...baseShadow,
        shadowColor: color,
    };
};
