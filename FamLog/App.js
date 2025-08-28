import 'react-native-url-polyfill/auto';
import React, { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { ENABLE_AUTH } from '@env';

import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import { useProfile } from './hooks/useProfile';

export default function App() {
  // sessionオブジェクトの代わりにuserオブジェクトを直接格納する
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // フックのルールに従い、useProfileは条件文の外で呼び出す
  useProfile();

  useEffect(() => {
    if (ENABLE_AUTH === 'true') {
      // 現在のユーザー情報を取得する非同期関数
      const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        setLoading(false);
      };

      fetchUser();
      
      // 認証状態の変更を監視するリスナー
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        // onAuthStateChangeからはsessionが返るので、そこからuserを取り出す
        setUser(session?.user ?? null);
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
  // userオブジェクトがnullでないかで認証状態を判断する
  const isAuthenticated = user !== null;

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