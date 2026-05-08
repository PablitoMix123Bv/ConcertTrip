import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/theme.js';

const TabNavigator = ({ texto , onPress, estaActivo }) => {
    return(
        <TouchableOpacity
            onPress = {onPress}
            style = {[styles.TabNavigatorContainer, estaActivo && styles.tabActivo]}
        >
            <Text style = {estaActivo ? styles.textoClaro : styles.textoOscuro}>{texto}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    TabNavigatorContainer: {
        borderRadius: 20,
        backgroundColor: COLORS.secondary,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    tabActivo: {
        backgroundColor: COLORS.primaryDark
    },
    textoClaro: {
        fontWeight: "bold",
        color: COLORS.textSecondary
    },
    textoOscuro: {
        color: COLORS.primaryDark,
        fontWeight: "bold"
    }
});
export default TabNavigator;