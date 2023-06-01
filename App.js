import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoggedInHome from './screens/LoggedInHome';
import Forum from './screens/Forum';
import Profile from './screens/Profile';
import Report from './screens/Report';
import Booking from './screens/Booking';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Logga in" component={HomeScreen} />
        <Stack.Screen name="Inloggad" component={LoggedInHome} />
        <Stack.Screen name="Forum" component={Forum} />
        <Stack.Screen name="Profil" component={Profile} />
        <Stack.Screen name="Felanmälan" component={Report} />
        <Stack.Screen name="Boka tvättid" component={Booking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
