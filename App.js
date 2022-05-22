import * as React from 'react';
import { StyleSheet } from 'react-native';
import { enableLatestRenderer } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from './src/context/User.context';

enableLatestRenderer();

export default function App() {
  return (
    <UserProvider>
      <GestureHandlerRootView style={Styles.container}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </UserProvider>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
