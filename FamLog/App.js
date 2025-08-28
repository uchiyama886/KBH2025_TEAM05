import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useAuth } from './hooks/useAuth';

import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';

export default function App() {

  const { session } = useAuth();
  
  return (
    <NavigationContainer>
      {session ? <AppNavigator/> : <AuthNavigator/> } 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});