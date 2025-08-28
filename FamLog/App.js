import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useAuth } from './hooks/useAuth';
import { AuthContext } from './hooks/useAuthContext';

import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';

export default function App() {
  const { session } = useAuth();
  
  return (
    <AuthContext.Provider value={{ session }}>
      <NavigationContainer>
        {session ? <AppNavigator/> : <AuthNavigator/> } 
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});