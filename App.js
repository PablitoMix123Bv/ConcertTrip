import React, { useContext, useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
// ================ PANTALLAS USUARIO AUTENTICADO  ================ 
import AgencyDetailScreen from './src/screens/AgencyDetailScreen';
import MyTicketsScreen from './src/screens/MyTicketsScreen';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthProvider, AuthContext } from './src/context/AuthContext';

// Pantallas 
import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();

// Navegación para usuarios NO autenticados 
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

// Navegación para usuarios autenticados
const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* Pantalla temporal mientras no tienes el Home */}
    <Stack.Screen name="Agency" component={AgencyDetailScreen} />
    <Stack.Screen name="MyTickets" component={MyTicketsScreen} />
  </Stack.Navigator>
);

// ─── Componente raíz que decide qué mostrar 
const RootNavigation = () => {
  const { user, loading } = useContext(AuthContext);
  const [splashDone, setSplashDone] = useState(false);

  // Mientras Firebase verifica la sesión, mostramos el Splash
  if (loading || !splashDone) {
    return (
      <SplashScreen
        onFinish={() => setSplashDone(true)}
      />
    );
  }

  // Si hay sesión activa → pantallas de la app
  // Si no → pantallas de auth (Welcome, Login, Register)
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

// ─── Raíz de la app 
export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </AuthProvider>
  );
}