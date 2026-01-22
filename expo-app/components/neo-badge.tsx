import { View, StyleSheet, type ViewStyle } from 'react-native';
import { ThemedText } from './themed-text';
import { Colors, Borders, Shadows, Typography, Spacing, createColoredShadow } from '@/constants/design-constants';

export type NeoBadgeProps = {
    text: string;
    rotation?: number;
    shadowColor?: 'blue' | 'green' | 'yellow' | 'black';
    style?: ViewStyle;
};

export function NeoBadge({
    text,
    rotation = -2,
    shadowColor = 'green',
    style,
}: NeoBadgeProps) {
    const colorMap = {
        blue: Colors.brightBlue,
        green: Colors.limeGreen,
        yellow: Colors.vibrantYellow,
        black: Colors.black,
    };

    const shadow = createColoredShadow(colorMap[shadowColor], 'small');

    return (
        <View
            style={[
                styles.badge,
                shadow,
                { transform: [{ rotate: `${rotation}deg` }] },
                style,
            ]}>
            <ThemedText style={styles.text}>{text}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        backgroundColor: Colors.black,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderWidth: Borders.width.thin,
        borderColor: Colors.black,
        borderRadius: Borders.radius.none,
        alignSelf: 'center',
    },
    text: {
        color: Colors.white,
        fontSize: Typography.sizes.xl,
        fontWeight: Typography.weights.bold,
        letterSpacing: Typography.letterSpacing.widest,
    },
});
