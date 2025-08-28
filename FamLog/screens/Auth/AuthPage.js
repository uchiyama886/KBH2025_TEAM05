import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../../utils/supabase'; // Correct import path
import { useNavigation } from '@react-navigation/native';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    navigation.navigate('SignOn');
  };

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMessage('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      // ログインが成功すると、App.jsが自動でナビゲーションを切り替えます
      Alert.alert('ログイン成功', 'タイムラインに移動します。');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ようこそ！</Text>
      
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

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
        onPress={handleSignIn}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? <ActivityIndicator color="#fff" /> : 'ログイン'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>新規登録</Text>
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
  errorContainer: {
    backgroundColor: '#ffdddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: '#d9534f',
    fontWeight: 'bold',
    textAlign: 'center',
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
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#e0e0e0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AuthPage;