import { View, StyleSheet, type ViewStyle, type ViewProps } from 'react-native';
import { Colors, Borders, createColoredShadow, Spacing } from '@/constants/design-constants';

export type NeoCardProps = ViewProps & {
    shadowColor?: 'blue' | 'green' | 'yellow' | 'black';
    shadowSize?: 'small' | 'medium' | 'large' | 'xlarge';
    children: React.ReactNode;
};

export function NeoCard({
    shadowColor = 'blue',
    shadowSize = 'xlarge',
    children,
    style,
    ...viewProps
}: NeoCardProps) {
    const colorMap = {
        blue: Colors.brightBlue,
        green: Colors.limeGreen,
        yellow: Colors.vibrantYellow,
        black: Colors.black,
    };

    const shadow = createColoredShadow(colorMap[shadowColor], shadowSize);

    return (
        <View
            style={[styles.card, shadow, style]}
            {...viewProps}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        borderWidth: Borders.width.thick,
        borderColor: Colors.black,
        borderRadius: Borders.radius.xl,
        padding: Spacing['4xl'],
        position: 'relative',
        overflow: 'hidden',
    },
});
