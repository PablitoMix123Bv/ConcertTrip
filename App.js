import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationMenu from './src/components/menu';
import Ticket from './src/components/Ticket';
import {COLORS} from "./src/constants/theme";

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <Ticket
          artisName = "Bad Bunny" 
          stadium = "Estadio GNP" 
          locationPoint = "Plaza patio"
          date = "15 de Diciembre" 
          agency = "Qro Trips"
          rideType = "Viaje redondo"
          price = {600}
        />
      <NavigationMenu/>
    </View>      
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
