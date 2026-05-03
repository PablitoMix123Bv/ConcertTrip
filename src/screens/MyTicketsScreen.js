import { StyleSheet, ScrollView, View } from 'react-native';
import NavigationMenu from '../components/menu';
import Ticket from '../components/Ticket';
import {COLORS} from "../constants/theme";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const MyTicketsScreen = () => {
  return (
    <SafeAreaView style = {styles.container}>
        {/* <View style={styles.container}> */}
            <ScrollView style = {[styles.scrollContent]} contentContainerStyle = {{alignItems: 'center'}}>
                <Ticket
                    artisName = "Bad Bunny" 
                    stadium = "Estadio GNP" 
                    locationPoint = "Plaza patio"
                    date = "15 de Diciembre" 
                    agency = "Qro Trips"
                    rideType = "Viaje redondo"
                    price = {600}
                />
            </ScrollView>
            <NavigationMenu/>
        {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 80,
    width: "100%",
    // backgroundColor: "green"
  }
});

export default MyTicketsScreen;