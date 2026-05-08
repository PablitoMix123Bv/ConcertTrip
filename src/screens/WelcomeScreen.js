import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, StatusBar, Image, } from 'react-native';
import { COLORS } from "../constants/theme";
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {

    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.8)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleY = useRef(new Animated.Value(20)).current;
    const sloganOpacity = useRef(new Animated.Value(0)).current;
    const buttonsOpacity = useRef(new Animated.Value(0)).current;
    const buttonsY = useRef(new Animated.Value(30)).current;
    const circleScale1 = useRef(new Animated.Value(0)).current;
    const circleScale2 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            // Círculos decorativos aparecen primero
            Animated.parallel([
                Animated.spring(circleScale1, { toValue: 1, friction: 6, useNativeDriver: true }),
                Animated.spring(circleScale2, { toValue: 1, friction: 6, delay: 100, useNativeDriver: true }),
            ]),
            Animated.parallel([
                Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
                Animated.spring(logoScale, { toValue: 1, friction: 7, useNativeDriver: true }),
            ]),
            // Título
            Animated.parallel([
                Animated.timing(titleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                Animated.timing(titleY, { toValue: 0, duration: 400, useNativeDriver: true }),
            ]),
            // Slogan
            Animated.timing(sloganOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
            // Botones
            Animated.parallel([
                Animated.timing(buttonsOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                Animated.timing(buttonsY, { toValue: 0, duration: 400, useNativeDriver: true }),
            ]),
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

            <View style={styles.background}>

                {/* Círculos decorativos de fondo */}
                <Animated.View style={[
                    styles.circleTop,
                    { transform: [{ scale: circleScale1 }] }
                ]} />
                <Animated.View style={[
                    styles.circleBottom,
                    { transform: [{ scale: circleScale2 }] }
                ]} />

                {/* ── Contenido central ── */}
                <View style={styles.content}>

                    {/* Logo */}
                    <Animated.View style={[
                        styles.logoContainer,
                        { opacity: logoOpacity, transform: [{ scale: logoScale }] }
                    ]}>
                        <View style={styles.logoCircle}>
                            <Image
                                source={require('../../assets/ConcerTripLogo.png')}
                                style={styles.logoImage}
                                resizeMode="cover"
                            />
                        </View>
                    </Animated.View>

                    {/* Nombre de la app */}
                    <Animated.Text style={[
                        styles.appName,
                        { opacity: titleOpacity, transform: [{ translateY: titleY }] }
                    ]}>
                        ConcertTrip
                    </Animated.Text>

                    {/* Slogan */}
                    <Animated.Text style={[styles.slogan, { opacity: sloganOpacity }]}>
                        El viaje también es parte del show
                    </Animated.Text>

                    {/* Puntitos decorativos */}
                    <Animated.View style={[styles.dotsRow, { opacity: sloganOpacity }]}>
                        {[0, 1, 2].map(i => (
                            <View
                                key={i}
                                style={[styles.dot, i === 1 && styles.dotActive]}
                            />
                        ))}
                    </Animated.View>
                </View>

                {/* ── Botones ── */}
                <Animated.View style={[
                    styles.buttonsContainer,
                    { opacity: buttonsOpacity, transform: [{ translateY: buttonsY }] }
                ]}>

                    {/* Botón Registrarse */}
                    <TouchableOpacity
                        style={styles.btnPrimary}
                        activeOpacity={0.85}
                        onPress={() => navigation?.navigate('Register')}
                    >
                        <Text style={styles.btnPrimaryText}>Regístrate</Text>
                    </TouchableOpacity>

                    {/* Botón Iniciar sesión */}
                    <TouchableOpacity
                        style={styles.btnSecondary}
                        activeOpacity={0.85}
                        onPress={() => navigation?.navigate('Login')}
                    >
                        <Text style={styles.btnSecondaryText}>Iniciar sesión</Text>
                    </TouchableOpacity>

                    {/* Texto terminos y condiciones*/}
                    <Text style={styles.legalText}>
                        Al continuar aceptas nuestros{' '}
                        <Text style={styles.legalLink}>Términos y condiciones</Text>
                    </Text>

                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    background: {
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 40,
    },

    // Círculos decorativos 
    circleTop: {
        position: 'absolute',
        top: -height * 0.08,
        right: -width * 0.2,
        width: width * 0.75,
        height: width * 0.75,
        borderRadius: width * 0.375,
        backgroundColor: COLORS.primaryDark,
        opacity: 0.5,
    },
    circleBottom: {
        position: 'absolute',
        bottom: -height * 0.06,
        left: -width * 0.25,
        width: width * 0.85,
        height: width * 0.85,
        borderRadius: width * 0.425,
        backgroundColor: COLORS.primaryDark,
        opacity: 0.4,
    },

    // Contenido central
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },

    // Logo
    logoContainer: {
        marginBottom: 24,
    },
    logoCircle: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
        overflow: 'hidden',
    },
    logoImage: {
        width: 140,
        height: 140,
    },
    // Tipografía
    appName: {
        fontSize: 32,
        fontWeight: '700',
        color: COLORS.white,
        letterSpacing: -0.5,
        marginBottom: 10,
    },
    slogan: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.75)',
        letterSpacing: 0.2,
        marginBottom: 20,
    },

    // Puntitos decorativos
    dotsRow: {
        flexDirection: 'row',
        gap: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.35)',
    },
    dotActive: {
        backgroundColor: COLORS.gold,
        width: 18,
    },

    // Botones
    buttonsContainer: {
        width: '100%',
        paddingHorizontal: 32,
        gap: 12,
        alignItems: 'center',
    },
    btnPrimary: {
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    btnPrimaryText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.primary,
        letterSpacing: 0.2,
    },
    btnSecondary: {
        width: '100%',
        backgroundColor: 'transparent',
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    btnSecondaryText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.white,
        letterSpacing: 0.2,
    },
    legalText: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.45)',
        textAlign: 'center',
        marginTop: 4,
    },
    legalLink: {
        color: 'rgba(255,255,255,0.7)',
        textDecorationLine: 'underline',
    },
});