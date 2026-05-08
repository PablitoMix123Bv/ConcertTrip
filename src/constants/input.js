import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { COLORS } from './theme';

export const InputField = ({ label, value, onChangeText, placeholder,
    secureTextEntry, keyboardType, error, icon }) => {

    const [focused, setFocused] = useState(false);
    const borderAnim = useRef(new Animated.Value(0)).current;

    const handleFocus = () => {
        setFocused(true);
        Animated.timing(borderAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start();
    };
    const handleBlur = () => {
        setFocused(false);
        Animated.timing(borderAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start();
    };

    const borderColor = borderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [error ? COLORS.error : COLORS.borders, COLORS.primary],
    });

    return (
        <View style={inputStyles.wrapper}>
            <Text style={inputStyles.label}>{label}</Text>
            <Animated.View style={[inputStyles.inputContainer, { borderColor }]}>
                {icon && <Text style={inputStyles.icon}>{icon}</Text>}
                <TextInput
                    style={inputStyles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.secondary}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType || 'default'}
                    autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </Animated.View>
            {error ? <Text style={inputStyles.errorText}>{error}</Text> : null}
        </View>
    );
};

export const inputStyles = StyleSheet.create({
    wrapper: { marginBottom: 16 },
    label: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 6, letterSpacing: 0.1 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 12, borderWidth: 1.5, paddingHorizontal: 14, height: 52 },
    icon: { fontSize: 16, marginRight: 10 },
    input: { flex: 1, fontSize: 15, color: COLORS.textPrimary, height: '100%' },
    errorText: { fontSize: 12, color: COLORS.error, marginTop: 4, marginLeft: 4 },
});