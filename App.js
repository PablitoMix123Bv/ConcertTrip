import  React, { useContext } from 'react';
import { AuthProvider } from './src/context/AuthContext';
// import LoginScreen from './src/screens/LoginScreen';
import MyTicketsScreen from './src/screens/MyTicketsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ActivityIndicator, View} from 'react-native';
import {AuthContext} from './src/context/AuthContext';

const RootNavigation = () => {
  const { user , loading } = useContext( AuthContext );
  
  // Pantalla de carga
  if (loading) {
    // return (
    //   <View style = {{flex: 1, justifyContent: 'center'}}>
    //     <ActivityIndicator size = "large" color = "#6200EE"/>
    //   </View>
    // );
    return null;
  }
  
  return <MyTicketsScreen/>;
  // return user ? <MyTicketsScreen/> : <LoginScreen/>
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
