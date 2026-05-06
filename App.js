import  React, { useContext } from 'react';
import {ActivityIndicator, View} from 'react-native';
import AgencyDetailScreen from './src/screens/AgencyDetailScreen';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
// import LoginScreen from './src/screens/LoginScreen';
import MyTicketsScreen from './src/screens/MyTicketsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './src/components/TabNavigator';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const { user , loading } = useContext( AuthContext );
  
  // Pantalla de carga
  if (loading) return null;
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        {user ? (
        // Stack de la app
        <>
          <Stack.Screen name = "MisTickets" component = {MyTicketsScreen}/>
          <Stack.Screen name = "DetalleAgencia" component = {AgencyDetailScreen}/>
        </>
        ) : (
          // Stack de Autenticación
          <Stack.Screen name = "DetalleAgencia" component = {AgencyDetailScreen}/>
          // <Stack.Screen name = "MisTickets" component = {MyTicketsScreen}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default function App() {
  //Extracción de los datos de "vigilante"
  // const {user, loading} = useContext(AuthContext);

  // 2. Ternario de Navegación (La puerta lógica)
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <RootNavigation/>        
      </SafeAreaProvider>
    </AuthProvider>
  );  
}
