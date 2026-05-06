import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import globalStyles from '../styles/globalStyles'
import TabNavigator from '../components/TabNavigator';
import NavigationMenu from '../components/menu';
import { SafeAreaView } from 'react-native-safe-area-context';


const AgencyDetailScreen = () => {
    return(
        <SafeAreaView style = {globalStyles.container}>
            <ScrollView style = {globalStyles.scrollContent}>
                <TabNavigator
                    texto= "Acerca de nosostros"
                />
            </ScrollView>
            <NavigationMenu/>
        </SafeAreaView>
    );
}

export default AgencyDetailScreen;