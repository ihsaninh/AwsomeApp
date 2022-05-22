import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Routes } from '../constants/Routes';

import LoginScreen from '../screens/Login/Login.screen';
import HomeScreen from '../screens/Home/Home.screen';
import WebviewScreen from '../screens/Webview/Webview.screen';
import UsersScreen from '../screens/Users/Users.screen';

const Stack = createNativeStackNavigator();

const commonHeaderStyle = {
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  headerTitleStyle: {
    color: '#2B637B',
    fontFamily: 'Poppins-SemiBold',
    fontsize: 18,
  },
};

function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Login}
      screenOptions={{
        animation: 'fade_from_bottom',
      }}>
      <Stack.Screen
        name={Routes.Login}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Routes.Home}
        component={HomeScreen}
        options={commonHeaderStyle}
      />
      <Stack.Screen
        name={Routes.Webview}
        component={WebviewScreen}
        options={commonHeaderStyle}
      />
      <Stack.Screen
        name={Routes.Users}
        component={UsersScreen}
        options={commonHeaderStyle}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
