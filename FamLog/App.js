import 'react-native-url-polyfill/auto';
import React, { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { ENABLE_AUTH } from '@env'; // 環境変数をインポート

import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import { useProfile } from './hooks/useProfile';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // 認証機能が有効な場合のみ、プロファイルフックを呼び出す
  if (ENABLE_AUTH === 'true') {
    useProfile();
  }

  useEffect(() => {
    if (ENABLE_AUTH === 'true') {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const isAuthEnabled = ENABLE_AUTH === 'true';
  const isAuthenticated = session && session.user;

  return (
    <NavigationContainer>
      {isAuthEnabled ? (isAuthenticated ? <AppNavigator /> : <AuthNavigator />) : <AppNavigator />}
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