import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/theme.js';

const TabNavigator = ({ texto }) => {
    return(
        <View style = {styles.TabNavigatorContainer}>
            <Text style = {styles.txtTab}>{texto}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    TabNavigatorContainer: {
        borderRadius: 10,
        backgroundColor: COLORS.primaryDark,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: "baseline"
    },
    txtTab: {
        fontWeight: "bold",
        color: "#fff"
    }
});
export default TabNavigator;