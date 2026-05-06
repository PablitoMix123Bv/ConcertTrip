import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions, StatusBar, } from 'react-native';
import { COLORS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

// ─── SplashScreen
export default function SplashScreen({ onFinish }) {

    const contentY = useRef(new Animated.Value(24)).current;  // sube desde abajo
    const contentOp = useRef(new Animated.Value(0)).current;   // fade in
    const barWidth = useRef(new Animated.Value(0)).current;   // barra de progreso
    const barOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // 1. Contenido (logo + texto) sube y aparece juntos — simple y elegante
        Animated.parallel([
            Animated.timing(contentY, { toValue: 0, duration: 700, useNativeDriver: true }),
            Animated.timing(contentOp, { toValue: 1, duration: 700, useNativeDriver: true }),
        ]).start();

        // 2. Barra de progreso aparece y se llena — usa useNativeDriver: false
        //    porque anima 'width' que no es soportado por el driver nativo
        Animated.sequence([
            Animated.timing(barOpacity, {
                toValue: 1,
                duration: 300,
                delay: 400,
                useNativeDriver: false,
            }),
            Animated.timing(barWidth, {
                toValue: 100,
                duration: 1600,
                useNativeDriver: false,
            }),
        ]).start(() => {
            // Cuando la barra llega al 100%, avisa al App.js que terminó
            setTimeout(() => onFinish?.(), 200);
        });
    }, []);

    // Interpolamos el valor numérico (0-100) a porcentaje de ancho
    const barWidthInterpolated = barWidth.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

            {/* ── Contenido central — logo + nombre + slogan ── */}
            <Animated.View style={[
                styles.content,
                {
                    opacity: contentOp,
                    transform: [{ translateY: contentY }],
                }
            ]}>
                {/* Círculo del logo — mismo tamaño y estilo que WelcomeScreen */}
                <View style={styles.logoCircle}>
                    <Image
                        source={require('../../assets/ConcerTripLogo.png')}
                        style={styles.logoImage}
                        resizeMode="cover"
                    />
                </View>

                <Text style={styles.appName}>ConcertTrip</Text>
                <Text style={styles.slogan}>El viaje también es parte del show</Text>
            </Animated.View>

            {/* ── Barra de progreso en la parte baja ── */}
            <Animated.View style={[styles.barWrapper, { opacity: barOpacity }]}>
                <View style={styles.barTrack}>
                    <Animated.View style={[styles.barFill, { width: barWidthInterpolated }]} />
                </View>
                <Text style={styles.loadingText}>Cargando...</Text>
            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,  // fondo azul liso, sin círculos
        alignItems: 'center',
        justifyContent: 'center',         // todo centrado verticalmente
        paddingBottom: 60,
    },

    // ── Bloque central ────────────────────────────────────────────────────────
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    // ── Logo — igual que en WelcomeScreen ────────────────────────────────────
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
    // ── Texto ─────────────────────────────────────────────────────────────────
    appName: {
        fontSize: 32,
        fontWeight: '700',
        color: COLORS.white,
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    slogan: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 0.3,
        textAlign: 'center',
        paddingHorizontal: 32,
    },

    // ── Barra de progreso ─────────────────────────────────────────────────────
    barWrapper: {
        width: '100%',
        paddingHorizontal: 48,
        alignItems: 'center',
        gap: 10,
    },
    barTrack: {
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        backgroundColor: COLORS.gold,     // dorado — consistente con la paleta
        borderRadius: 2,
    },
    loadingText: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 0.5,
    },
});