import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { COLORS } from './theme';

export const InputField = ({ label, value, onChangeText, placeholder, secureTextEntry,
    keyboardType, error, icon, }) => {

    const [focused, setFocused] = useState(false);
    const borderAnim = useRef(new Animated.Value(0)).current;

    const handleFocus = () => {
        setFocused(true);
        Animated.timing(borderAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setFocused(false);
        Animated.timing(borderAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const borderColor = borderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [
            error ? COLORS.error : '#E2E8F0',
            error ? COLORS.error : COLORS.primary,
        ],
    });

    return (
        <View style={inputStyles.wrapper}>
            {label ? <Text style={inputStyles.label}>{label}</Text> : null}
            <Animated.View style={[
                inputStyles.inputContainer,
                { borderColor },
                error && inputStyles.inputError,
            ]}>
                {icon && (
                    <View style={inputStyles.iconWrapper}>
                        {icon}
                    </View>
                )}
                <TextInput
                    style={inputStyles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#A0AEC0"
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
    wrapper: {
        marginBottom: 18,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: 7,
        letterSpacing: 0.1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 12,
        borderWidth: 1.5,
        paddingHorizontal: 14,
        height: 52,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    inputError: {
        backgroundColor: '#FFF5F5',
    },
    iconWrapper: {
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: COLORS.textPrimary,
        height: '100%',
    },
    errorText: {
        fontSize: 12,
        color: COLORS.error,
        marginTop: 5,
        marginLeft: 2,
    },
});