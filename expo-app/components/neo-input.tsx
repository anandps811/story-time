import { View, TextInput, StyleSheet, type TextInputProps, type ViewStyle } from 'react-native';
import { ThemedText } from './themed-text';
import { Colors, Borders, Shadows, Typography, Spacing } from '@/constants/design-constants';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export type NeoInputProps = TextInputProps & {
    label: string;
    icon?: keyof typeof MaterialIcons.glyphMap;
    containerStyle?: ViewStyle;
};

export function NeoInput({
    label,
    icon,
    containerStyle,
    style,
    ...textInputProps
}: NeoInputProps) {
    return (
        <View style={[styles.container, containerStyle]}>
            <ThemedText style={styles.label}>{label}</ThemedText>
            <View style={styles.inputWrapper}>
                {icon && (
                    <MaterialIcons
                        name={icon}
                        size={24}
                        color={Colors.lightGray}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    style={[styles.input, icon && styles.inputWithIcon, style]}
                    placeholderTextColor={Colors.lightGray}
                    {...textInputProps}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing['2xl'],
    },
    label: {
        fontSize: Typography.sizes['2xl'],
        fontWeight: Typography.weights.bold,
        color: Colors.black,
        marginBottom: Spacing.md,
        letterSpacing: Typography.letterSpacing.wide,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: Borders.width.thin,
        borderColor: Colors.black,
        borderRadius: Borders.radius.md,
        paddingHorizontal: Spacing.lg,
        minHeight: 56,
        backgroundColor: Colors.lightCream,
        ...Shadows.small,
    },
    icon: {
        marginRight: Spacing.md,
    },
    input: {
        flex: 1,
        fontSize: Typography.sizes.lg,
        color: Colors.black,
        paddingVertical: Spacing.lg,
    },
    inputWithIcon: {
        paddingLeft: 0,
    },
});
