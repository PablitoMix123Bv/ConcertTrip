import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import globalStyles from '../styles/globalStyles'
import TabNavigator from '../components/TabNavigator';
import NavigationMenu from '../components/menu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import ReviewCard from '../components/ReviewCard';

const AgencyDetailScreen = () => {
    
    const [tabSeleccionado, setTabSeleccionado] = useState("Acerca de nosotros"); //Estado inicial por defecto

    // Renderización en base a la selección
    const renderContenido = () => {
        switch(tabSeleccionado) {
            case 'Acerca de nosotros' : return <Text>Descripción de Qro Trips</Text>;
            case 'Reseñas' : return <ReviewCard/>;// Componente de comentarios
            case 'Viaje' : return <Text>Sección de viaje</Text>;//Datos del viaje
            default: return null;
        }
    }

    return(
        <SafeAreaView style = {globalStyles.container}>
            <View style = {styles.tabBar}>
                <TabNavigator
                    texto= "Acerca de nosostros"
                    onPress={() => setTabSeleccionado("Acerca de nosotros")}
                    estaActivo={tabSeleccionado === "Acerca de nosotros"}
                />
                <TabNavigator
                    texto= "Reseñas"
                    onPress={() => setTabSeleccionado("Reseñas")}
                    estaActivo={tabSeleccionado === "Reseñas"}
                />
                <TabNavigator
                    texto= "Viaje"
                    onPress={() => setTabSeleccionado("Viaje")}
                    estaActivo={tabSeleccionado === "Viaje"}
                />
            </View>
            <ScrollView style = {globalStyles.scrollContent} contentContainerStyle = {{alignItems: "center"}}>    
                {renderContenido()}
            </ScrollView>
            <NavigationMenu/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        alignSelf: "baseline",
        marginHorizontal: 30,
    }
});

export default AgencyDetailScreen;