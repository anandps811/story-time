import { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ThemedText } from '@/components/themed-text';
import { NeoButton } from '@/components/neo-button';
import { NeoInput } from '@/components/neo-input';
import { NeoCard } from '@/components/neo-card';
import { NeoBadge } from '@/components/neo-badge';
import { Colors, Spacing } from '@/constants/design-constants';

export default function RegisterScreen() {
    const insets = useSafeAreaInsets();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = () => {
        setError(null);

        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        console.log('Register:', { name, email, password });

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Navigate to main app after successful registration
            // router.replace('/(tabs)');
        }, 1000);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    {
                        paddingTop: Math.max(insets.top, 20),
                        paddingBottom: Math.max(insets.bottom, 20),
                    },
                ]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                bounces={false}>
                <View style={styles.mainWrapper}>
                    {/* Decorative Background Elements */}
                    <View style={styles.decorativeStar}>
                        <MaterialIcons name="star" size={140} color={Colors.vibrantYellow} style={{ opacity: 0.2 }} />
                    </View>
                    <View style={styles.decorativeCloud}>
                        <MaterialIcons name="cloud" size={120} color={Colors.white} style={{ opacity: 0.3 }} />
                    </View>

                    <View style={styles.mainContent}>
                        {/* Badge */}
                        <NeoBadge text="Join the Fun!" shadowColor="yellow" />

                        {/* Title */}
                        <ThemedText style={styles.title}>SIGN UP</ThemedText>
                        <View style={styles.titleUnderline} />

                        {/* Form Card */}
                        <NeoCard shadowColor="green" shadowSize="xlarge">
                            {/* Background Decoration */}
                            <View style={styles.cardDecoration}>
                                <MaterialIcons name="auto-stories" size={200} color={Colors.black} style={{ opacity: 0.05 }} />
                            </View>

                            <View style={styles.form}>
                                {/* Name Input */}
                                <NeoInput
                                    label="NAME"
                                    icon="person"
                                    placeholder="Your name"
                                    value={name}
                                    onChangeText={setName}
                                    autoCapitalize="words"
                                    autoComplete="name"
                                />

                                {/* Email Input */}
                                <NeoInput
                                    label="EMAIL"
                                    icon="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                />

                                {/* Password Input */}
                                <NeoInput
                                    label="PASSWORD"
                                    icon="lock"
                                    placeholder="••••••••"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                    autoComplete="password"
                                />

                                {/* Confirm Password Input */}
                                <NeoInput
                                    label="CONFIRM PASSWORD"
                                    icon="lock"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                    autoComplete="password"
                                />

                                {/* Error Message */}
                                {error && (
                                    <View style={styles.errorContainer}>
                                        <ThemedText style={styles.errorText}>{error}</ThemedText>
                                    </View>
                                )}

                                {/* Submit Button */}
                                <NeoButton
                                    title={isLoading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
                                    onPress={handleRegister}
                                    variant="secondary"
                                    disabled={isLoading}
                                    icon={!isLoading ? 'arrow-forward' : undefined}
                                    style={styles.submitButton}
                                />

                                {/* Divider */}
                                <View style={styles.divider}>
                                    <View style={styles.dividerLine} />
                                    <ThemedText style={styles.dividerText}>OR</ThemedText>
                                    <View style={styles.dividerLine} />
                                </View>

                                {/* Login Link */}
                                <View style={styles.loginContainer}>
                                    <ThemedText style={styles.loginText}>Already have an account?</ThemedText>
                                    <Link href="/(auth)/login" asChild>
                                        <NeoButton
                                            title="LOG IN"
                                            onPress={() => { }}
                                            variant="tertiary"
                                        />
                                    </Link>
                                </View>
                            </View>
                        </NeoCard>

                        {/* Fun Message */}
                        <View style={styles.funMessage}>
                            <ThemedText style={styles.funMessageText}>
                                Let's create magical stories together! ✨📚
                            </ThemedText>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.softBlue,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: Spacing.lg,
        minHeight: '85%',
        justifyContent: 'center',
    },
    mainWrapper: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    decorativeStar: {
        position: 'absolute',
        top: 60,
        right: 40,
        zIndex: 1,
        transform: [{ rotate: '12deg' }],
    },
    decorativeCloud: {
        position: 'absolute',
        bottom: 100,
        left: 30,
        zIndex: 1,
        transform: [{ rotate: '-8deg' }],
    },
    mainContent: {
        zIndex: 10,
        alignItems: 'center',
        paddingTop: Spacing.xl,
        paddingBottom: Spacing.xl,
        width: '100%',
        maxWidth: 500,
    },
    title: {
        fontSize: Platform.select({ ios: 72, android: 64, default: 72 }),
        fontWeight: 'bold',
        color: Colors.black,
        marginTop: Spacing['2xl'],
        marginBottom: Spacing.sm,
        letterSpacing: 1,
        lineHeight: Platform.select({ ios: 65, android: 58, default: 65 }),
        textAlign: 'center',
    },
    titleUnderline: {
        height: 8,
        width: 96,
        backgroundColor: Colors.black,
        borderRadius: 999,
        marginBottom: Spacing['5xl'],
        alignSelf: 'center',
    },
    cardDecoration: {
        position: 'absolute',
        bottom: -40,
        right: -40,
        opacity: 0.05,
    },
    form: {
        position: 'relative',
        zIndex: 10,
    },
    errorContainer: {
        marginBottom: Spacing.lg,
    },
    errorText: {
        color: '#DC2626',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    submitButton: {
        marginTop: Spacing.lg,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Spacing['2xl'],
        gap: Spacing.lg,
    },
    dividerLine: {
        flex: 1,
        height: 4,
        backgroundColor: Colors.black,
    },
    dividerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.gray,
        letterSpacing: 0.5,
    },
    loginContainer: {
        alignItems: 'center',
    },
    loginText: {
        fontSize: 18,
        color: Colors.darkGray,
        marginBottom: Spacing.lg,
    },
    funMessage: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: Spacing.lg,
        borderWidth: 2,
        borderColor: Colors.black,
        transform: [{ rotate: '1deg' }],
        shadowColor: Colors.black,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
        marginTop: Spacing['4xl'],
        width: '100%',
        maxWidth: 500,
    },
    funMessageText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black,
        textAlign: 'center',
    },
});
