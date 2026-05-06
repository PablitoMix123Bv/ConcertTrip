import React, { useState, useContext, useRef } from 'react';
import {
    View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, Animated,
    Dimensions, StatusBar, KeyboardAvoidingView, Platform, ActivityIndicator,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from "../constants/theme";
import { InputField, inputStyles } from "../constants/input";
import { AuthContext } from '../context/AuthContext';

const { width, height } = Dimensions.get('window');

// ─── Pantalla principal 
export default function RegisterScreen({ navigation }) {
    const { signUp } = useContext(AuthContext);

    // ── Estado del formulario 
    const [form, setForm] = useState({
        nombre: '',
        email: '',
        ciudad: '',
        password: '',
    });
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

    // ── Validación
    const validate = () => {
        const newErrors = {};
        if (!form.nombre.trim())
            newErrors.nombre = 'El nombre es obligatorio.';
        if (!form.email.trim())
            newErrors.email = 'El correo es obligatorio.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
            newErrors.email = 'El formato del correo no es válido.';
        if (!form.ciudad.trim())
            newErrors.ciudad = 'La ciudad es obligatoria.';
        if (!form.password)
            newErrors.password = 'La contraseña es obligatoria.';
        else if (form.password.length < 6)
            newErrors.password = 'Mínimo 6 caracteres.';
        return newErrors;
    };

    // ── Envío del formulario
    const handleRegister = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setLoading(true);

        try {
            await signUp({
                email: form.email.trim(),
                password: form.password,
                nombre: form.nombre.trim(),
                ciudad: form.ciudad.trim(),
                rol: 'usuario',           // siempre 'usuario' al registrarse
            });
            // El AuthContext y el navegador redirigen automáticamente al detectar sesión
        } catch (error) {
            let mensaje = 'Ocurrió un error. Intenta de nuevo.';
            if (error.code === 'auth/email-already-in-use')
                mensaje = 'Este correo ya está registrado.';
            else if (error.code === 'auth/network-request-failed')
                mensaje = 'Sin conexión. Revisa tu internet.';
            Alert.alert('Error al registrarse', mensaje);
        } finally {
            setLoading(false);
        }
    };

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    };

    return (
        <SafeAreaView style={styles.safe}>
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
                    <Text style={styles.headerSub}>Crea tu cuenta</Text>
                </View>

                {/* ── Card del formulario ── */}
                <Animated.View style={[
                    styles.card,
                    { transform: [{ translateY: cardAnim }], opacity: cardOpacity }
                ]}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <Text style={styles.cardTitle}>Datos de tu cuenta</Text>
                        <Text style={styles.cardSub}>
                            Solo necesitamos lo básico para comenzar
                        </Text>

                        <InputField
                            label="Nombre completo"
                            value={form.nombre}
                            onChangeText={v => updateField('nombre', v)}
                            placeholder="Ej. PablitoMix"
                            icon="👤"
                            error={errors.nombre}
                        />
                        <InputField
                            label="Correo electrónico"
                            value={form.email}
                            onChangeText={v => updateField('email', v)}
                            placeholder="correo@ejemplo.com"
                            keyboardType="email-address"
                            icon="✉️"
                            error={errors.email}
                        />
                        <InputField
                            label="Ciudad"
                            value={form.ciudad}
                            onChangeText={v => updateField('ciudad', v)}
                            placeholder="Ej. Querétaro"
                            icon="📍"
                            error={errors.ciudad}
                        />
                        <InputField
                            label="Contraseña"
                            value={form.password}
                            onChangeText={v => updateField('password', v)}
                            placeholder="Mínimo 6 caracteres"
                            secureTextEntry
                            icon="🔒"
                            error={errors.password}
                        />

                        {/* Nota de campos opcionales */}
                        <View style={styles.infoRow}>
                            <Text style={styles.infoText}>
                                💡 Puedes completar tu perfil después con más datos personales como teléfono, fecha de nacimiento, etc.
                            </Text>
                        </View>

                        {/* Botón registrar */}
                        <TouchableOpacity
                            style={[styles.btnRegister, loading && styles.btnDisabled]}
                            activeOpacity={0.85}
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            {loading
                                ? <ActivityIndicator color={COLORS.white} />
                                : <Text style={styles.btnRegisterText}>Crear cuenta</Text>
                            }
                        </TouchableOpacity>

                        {/* Link a login */}
                        <TouchableOpacity
                            style={styles.loginRow}
                            onPress={() => navigation?.navigate('Login')}
                        >
                            <Text style={styles.loginText}>
                                ¿Ya tienes cuenta?{' '}
                                <Text style={styles.loginLink}>Inicia sesión</Text>
                            </Text>
                        </TouchableOpacity>

                    </ScrollView>
                </Animated.View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },

    // ── Header ────────────────────────────────────────────────────────────────
    header: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 28,
    },
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
    appName: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.white,
        letterSpacing: -0.3,
    },
    headerSub: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.65)',
        marginTop: 3,
    },

    // ── Card formulario ───────────────────────────────────────────────────────
    card: {
        flex: 1,
        backgroundColor: COLORS.backgroundBase,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        overflow: 'hidden',
    },
    scrollContent: {
        padding: 28,
        paddingBottom: 40,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    cardSub: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginBottom: 24,
        lineHeight: 18,
    },

    // ── Info nota ─────────────────────────────────────────────────────────────
    infoRow: {
        backgroundColor: COLORS.cards,
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.borders,
    },
    infoText: {
        fontSize: 12,
        color: COLORS.textPrimary,
        lineHeight: 18,
    },

    // ── Botón principal ───────────────────────────────────────────────────────
    btnRegister: {
        backgroundColor: COLORS.primaryDark,
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: COLORS.primaryDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    btnDisabled: {
        opacity: 0.7,
    },
    btnRegisterText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.white,
        letterSpacing: 0.2,
    },

    // ── Link a login ──────────────────────────────────────────────────────────
    loginRow: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
        marginHorizontal: -28,
        paddingHorizontal: 28,
    },
    loginText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        fontWeight: '600',
        textAlign: 'center',
        width: '100%',
    },
    loginLink: {
        color: COLORS.primary,
        fontWeight: '700',
    },
});