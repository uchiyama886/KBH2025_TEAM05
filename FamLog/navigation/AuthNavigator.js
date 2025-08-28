import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthPage from '../screens/Auth/AuthPage';
import SignOnPage from '../screens/Auth/SignOnPage'; // SignOnをインポート

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthPage} />
      <Stack.Screen name="SignOn" component={SignOnPage} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;