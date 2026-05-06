import { StyleSheet } from "react-native";
import { COLORS } from '../constants/theme';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        backgroundColor: COLORS.borders,
        // paddingBottom: 80,
        width: "100%",
    }
});

export default globalStyles;