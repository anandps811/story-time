import { TouchableOpacity, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { ThemedText } from './themed-text';
import { Colors, Borders, Shadows, Typography, Spacing } from '@/constants/design-constants';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export type NeoButtonProps = {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'tertiary';
    disabled?: boolean;
    icon?: keyof typeof MaterialIcons.glyphMap;
    style?: ViewStyle;
    textStyle?: TextStyle;
};

export function NeoButton({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    icon,
    style,
    textStyle,
}: NeoButtonProps) {
    const buttonStyle = [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'tertiary' && styles.tertiary,
        disabled && styles.disabled,
        style,
    ];

    const textStyleCombined = [
        styles.text,
        variant === 'primary' && styles.primaryText,
        variant === 'secondary' && styles.secondaryText,
        variant === 'tertiary' && styles.tertiaryText,
        textStyle,
    ];

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}>
            <ThemedText style={textStyleCombined}>{title}</ThemedText>
            {icon && (
                <MaterialIcons
                    name={icon}
                    size={28}
                    color={variant === 'tertiary' ? Colors.black : Colors.white}
                    style={styles.icon}
                />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: Borders.radius.md,
        paddingVertical: Spacing['2xl'],
        paddingHorizontal: Spacing['2xl'],
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: Borders.width.thin,
        borderColor: Colors.black,
        ...Shadows.small,
    },
    primary: {
        backgroundColor: Colors.brightBlue,
    },
    secondary: {
        backgroundColor: Colors.limeGreen,
    },
    tertiary: {
        backgroundColor: Colors.white,
    },
    disabled: {
        opacity: 0.6,
    },
    text: {
        fontSize: Typography.sizes['2xl'],
        fontWeight: Typography.weights.bold,
        letterSpacing: Typography.letterSpacing.wider,
    },
    primaryText: {
        color: Colors.white,
    },
    secondaryText: {
        color: Colors.white,
    },
    tertiaryText: {
        color: Colors.black,
    },
    icon: {
        marginLeft: Spacing.sm,
    },
});
