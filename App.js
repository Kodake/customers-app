import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetallesCliente from './views/DetallesCliente';

const Stack = createNativeStackNavigator();

//Definir tema

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3a86ff',
    accent: '#023e8a'
  }
}

const App = () => {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: theme.colors.primary
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}  >

            <Stack.Screen
              name="Inicio"
              component={Inicio}
            />

            <Stack.Screen name="NuevoCliente" component={NuevoCliente} options={{ title: 'Nuevo Cliente' }} />

            <Stack.Screen name="DetallesCliente" component={DetallesCliente} options={{ title: 'Detalles Cliente' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}

export default App;