import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../../utils/supabase'; // Correct import path
import { useNavigation } from '@react-navigation/native';

const SignOnPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signUp({ email, password });

    if (authError) {
      setLoading(false);
      Alert.alert('サインアップエラー', authError.message);
      return;
    }

    if (data.user) {
      // ユーザー情報の挿入
      const { error: insertError } = await supabase
        .from('users')
        .insert([{
          id: data.user.id,
          name: '新規ユーザー',
          role: 'child',
          profile_image_url: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        }]);

      if (insertError) {
        setLoading(false);
        Alert.alert('データ登録エラー', 'ユーザー情報の登録中に問題が発生しました。');
        console.error('ユーザーデータ挿入エラー:', insertError);
        return;
      }
    }

    setLoading(false);
    // サインアップが成功したら、App.jsのロジックが自動的に画面を切り替えます
    Alert.alert('登録完了', 'アカウントが作成されました！');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>新規登録</Text>
      <TextInput
        style={styles.input}
        placeholder="メールアドレス"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? <ActivityIndicator color="#fff" /> : '登録'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>ログイン画面に戻る</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backText: {
    marginTop: 20,
    color: '#007bff',
  },
});

export default SignOnPage;