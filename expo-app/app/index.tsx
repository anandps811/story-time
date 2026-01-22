import { StyleSheet, View, Platform } from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { NeoButton } from '@/components/neo-button';
import { NeoCard } from '@/components/neo-card';
import { NeoBadge } from '@/components/neo-badge';
import { Colors, Spacing } from '@/constants/design-constants';

export default function Index() {
    const insets = useSafeAreaInsets();

    return (
        <ThemedView style={[styles.container, { paddingTop: Math.max(insets.top, 20) }]}>
            {/* Decorative Background Elements */}
            <View style={styles.decorativeCloud}>
                <MaterialIcons name="cloud" size={140} color={Colors.white} style={{ opacity: 0.25 }} />
            </View>
            <View style={styles.decorativeStar1}>
                <MaterialIcons name="star" size={100} color={Colors.vibrantYellow} style={{ opacity: 0.3 }} />
            </View>
            <View style={styles.decorativeStar2}>
                <MaterialIcons name="auto-stories" size={120} color={Colors.brightBlue} style={{ opacity: 0.2 }} />
            </View>

            <View style={styles.content}>
                {/* Badge */}
                <NeoBadge text="READY TO READ?" shadowColor="yellow" rotation={-3} />

                {/* Hero Title */}
                <ThemedText style={styles.heroTitle}>STORY</ThemedText>
                <ThemedText style={styles.heroTitle}>TIME</ThemedText>
                <View style={styles.titleUnderline} />

                {/* Description Card */}
                <NeoCard shadowColor="blue" shadowSize="large" style={styles.descriptionCard}>
                    <View style={styles.cardIcon}>
                        <MaterialIcons name="menu-book" size={48} color={Colors.brightBlue} />
                    </View>
                    <ThemedText style={styles.descriptionText}>
                        Create magical, personalized stories for kids with the power of AI!
                    </ThemedText>
                </NeoCard>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <Link href="/(auth)/register" asChild>
                        <NeoButton
                            title="GET STARTED"
                            onPress={() => { }}
                            variant="secondary"
                            icon="arrow-forward"
                            style={styles.primaryButton}
                        />
                    </Link>

                    <Link href="/(auth)/login" asChild>
                        <NeoButton
                            title="LOG IN"
                            onPress={() => { }}
                            variant="primary"
                            style={styles.secondaryButton}
                        />
                    </Link>
                </View>

                {/* Features */}
                <View style={styles.featuresContainer}>
                    <View style={styles.feature}>
                        <MaterialIcons name="auto-awesome" size={32} color={Colors.vibrantYellow} />
                        <ThemedText style={styles.featureText}>AI-Powered</ThemedText>
                    </View>
                    <View style={styles.feature}>
                        <MaterialIcons name="child-care" size={32} color={Colors.limeGreen} />
                        <ThemedText style={styles.featureText}>Kid-Friendly</ThemedText>
                    </View>
                    <View style={styles.feature}>
                        <MaterialIcons name="favorite" size={32} color="#EF4444" />
                        <ThemedText style={styles.featureText}>Educational</ThemedText>
                    </View>
                </View>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mintGreen,
        position: 'relative',
        overflow: 'hidden',
    },
    decorativeCloud: {
        position: 'absolute',
        top: 100,
        left: -20,
        zIndex: 1,
        transform: [{ rotate: '-15deg' }],
    },
    decorativeStar1: {
        position: 'absolute',
        top: 60,
        right: 30,
        zIndex: 1,
        transform: [{ rotate: '20deg' }],
    },
    decorativeStar2: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        zIndex: 1,
        transform: [{ rotate: '-10deg' }],
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.lg,
        zIndex: 10,
    },
    heroTitle: {
        fontSize: Platform.select({ ios: 80, android: 72, default: 80 }),
        fontWeight: 'bold',
        color: Colors.black,
        letterSpacing: 2,
        lineHeight: Platform.select({ ios: 75, android: 68, default: 75 }),
        textAlign: 'center',
        textShadowColor: Colors.vibrantYellow,
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 0,
    },
    titleUnderline: {
        height: 10,
        width: 120,
        backgroundColor: Colors.black,
        borderRadius: 999,
        marginTop: Spacing.md,
        marginBottom: Spacing['5xl'],
    },
    descriptionCard: {
        width: '100%',
        maxWidth: 500,
        marginBottom: Spacing['4xl'],
        alignItems: 'center',
    },
    cardIcon: {
        marginBottom: Spacing.lg,
    },
    descriptionText: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.black,
        textAlign: 'center',
        lineHeight: 30,
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 500,
        gap: Spacing.lg,
        marginBottom: Spacing['4xl'],
    },
    primaryButton: {
        width: '100%',
    },
    secondaryButton: {
        width: '100%',
    },
    featuresContainer: {
        flexDirection: 'row',
        gap: Spacing['2xl'],
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: Spacing.lg,
    },
    feature: {
        alignItems: 'center',
        gap: Spacing.sm,
        backgroundColor: Colors.white,
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.xl,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.black,
        shadowColor: Colors.black,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
    },
    featureText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.black,
        letterSpacing: 0.5,
    },
});
