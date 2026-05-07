import React, { useState, useContext, useRef } from 'react';
import {
    View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Animated,
    Dimensions, StatusBar, KeyboardAvoidingView, Platform, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { InputField } from '../constants/input';
import { AuthContext } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const cardAnim = useRef(new Animated.Value(30)).current;
    const cardOpacity = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(cardAnim, { toValue: 0, duration: 450, useNativeDriver: true }),
            Animated.timing(cardOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
        ]).start();
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!form.email.trim())
            newErrors.email = 'El correo es obligatorio.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
            newErrors.email = 'El formato del correo no es válido.';
        if (!form.password)
            newErrors.password = 'La contraseña es obligatoria.';
        else if (form.password.length < 6)
            newErrors.password = 'Mínimo 6 caracteres.';
        return newErrors;
    };

    const handleLogin = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
        setErrors({});
        setLoading(true);
        try {
            await login(form.email.trim(), form.password);
        } catch (error) {
            let mensaje = 'Ocurrió un error. Intenta de nuevo.';
            if (error.code === 'auth/user-not-found' ||
                error.code === 'auth/wrong-password' ||
                error.code === 'auth/invalid-credential')
                mensaje = 'Correo o contraseña incorrectos.';
            else if (error.code === 'auth/too-many-requests')
                mensaje = 'Demasiados intentos. Espera un momento.';
            else if (error.code === 'auth/network-request-failed')
                mensaje = 'Sin conexión. Revisa tu internet.';
            else if (error.message)
                mensaje = error.message;
            Alert.alert('Error al iniciar sesión', mensaje);
        } finally { setLoading(false); }
    };

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    };

    return (
        <View style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.header}>
                    <View style={styles.logoCircle}>
                        <Image
                            source={require('../../assets/ConcerTripLogo.png')}
                            style={styles.logoImage}
                            resizeMode="cover"
                        />
                    </View>
                    <Text style={styles.appName}>ConcertTrip</Text>
                    <Text style={styles.headerSub}>Bienvenido de vuelta</Text>
                </View>

                <Animated.View style={[
                    styles.card,
                    { transform: [{ translateY: cardAnim }], opacity: cardOpacity }
                ]}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <Text style={styles.cardTitle}>Inicia sesión</Text>
                        <Text style={styles.cardSub}>Ingresa tus datos para continuar</Text>

                        <InputField
                            label="Correo electrónico"
                            value={form.email}
                            onChangeText={v => updateField('email', v)}
                            placeholder="correo@ejemplo.com"
                            keyboardType="email-address"
                            icon={<Ionicons name="mail-outline" size={18} color={COLORS.secondary} />}
                            error={errors.email}
                        />
                        <InputField
                            label="Contraseña"
                            value={form.password}
                            onChangeText={v => updateField('password', v)}
                            placeholder="Tu contraseña"
                            secureTextEntry
                            icon={<Ionicons name="lock-closed-outline" size={18} color={COLORS.secondary} />}
                            error={errors.password}
                        />

                        <TouchableOpacity
                            style={styles.forgotRow}
                            onPress={() => Alert.alert('Recuperar contraseña', 'Función disponible próximamente.')}
                        >
                            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btnLogin, loading && styles.btnDisabled]}
                            activeOpacity={0.85}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            {loading
                                ? <ActivityIndicator color={COLORS.white} />
                                : <Text style={styles.btnLoginText}>Iniciar sesión</Text>
                            }
                        </TouchableOpacity>

                        <View style={styles.separatorRow}>
                            <View style={styles.separatorLine} />
                            <Text style={styles.separatorText}>o</Text>
                            <View style={styles.separatorLine} />
                        </View>

                        <TouchableOpacity
                            style={styles.registerRow}
                            onPress={() => navigation?.navigate('Register')}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.registerText}>
                                ¿No tienes cuenta?{' '}
                                <Text style={styles.registerLink}>Regístrate</Text>
                            </Text>
                        </TouchableOpacity>

                    </ScrollView>
                </Animated.View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
    },

    header: { alignItems: 'center', paddingTop: 24, paddingBottom: 32 },
    logoCircle: {
        width: 130, height: 130, borderRadius: 65,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)',
        overflow: 'hidden', marginBottom: 14,
    },
    logoImage: {
        width: 140,
        height: 140
    },
    appName: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.white,
        letterSpacing: -0.3
    },
    headerSub: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.65)',
        marginTop: 4
    },
    card: {
        flex: 1,
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 8,
    },
    scrollContent: {
        paddingHorizontal: 28,
        paddingTop: 32,
        paddingBottom: 40,
        flexGrow: 1,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 6
    },
    cardSub: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginBottom: 28,
        lineHeight: 19
    },

    forgotRow: {
        alignSelf: 'flex-end',
        marginTop: -8,
        marginBottom: 20
    },
    forgotText: {
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: '600'
    },
    btnLogin: {
        backgroundColor: COLORS.primary,
        borderRadius: 14, paddingVertical: 16,
        alignItems: 'center', marginBottom: 20,
        shadowColor: COLORS.primaryDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25, shadowRadius: 8, elevation: 4,
    },
    btnDisabled: {
        opacity: 0.7
    },
    btnLoginText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.white,
        letterSpacing: 0.3
    },
    separatorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 12
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.borders
    },
    separatorText: {
        fontSize: 13,
        color: COLORS.textSecondary
    },
    registerRow: {
        alignItems: 'center',
        paddingVertical: 8
    },
    registerText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        fontWeight: '500'
    },
    registerLink: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '700'
    },
});