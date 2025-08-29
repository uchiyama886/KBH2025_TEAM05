import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { AuthProvider, useAuth } from './hooks/useAuth'; // AuthProviderとuseAuthをインポート

import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';

function RootNavigation() {
  const { session } = useAuth(); // useAuthからセッション状態を取得

  return (
    <NavigationContainer>
      {session ? <AppNavigator/> : <AuthNavigator/> } 
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});