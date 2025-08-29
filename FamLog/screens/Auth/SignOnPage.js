import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../../utils/supabase';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../../components/molecules/CustomAlert';

const SignOnPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // モーダルの状態を管理するuseStateを追加
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    setLoading(true);
    setAlertVisible(false); // 新しい試行前にアラートを非表示にする

    const { data, error: authError } = await supabase.auth.signUp({ email, password });

    if (authError) {
      setLoading(false);
      setAlertMessage(authError.message);
      setIsSuccess(false);
      setAlertVisible(true);
      return;
    }

    if (data.user) {
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('id')
        .eq('id', data.user.id)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
          setLoading(false);
          setAlertMessage('ユーザー情報の確認中に問題が発生しました。');
          setIsSuccess(false);
          setAlertVisible(true);
          console.error('ユーザーデータ確認エラー:', fetchError);
          return;
      }

      if (!existingUser) {
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
          setAlertMessage('ユーザー情報の登録中に問題が発生しました。');
          setIsSuccess(false);
          setAlertVisible(true);
          console.error('ユーザーデータ挿入エラー:', insertError);
          return;
        }
      }
    }

    setLoading(false);
    setAlertMessage('アカウントが正常に作成されました！');
    setIsSuccess(true);
    setAlertVisible(true);
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
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
      
      {/* CustomAlert コンポーネントをレンダリング */}
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={handleCloseAlert}
        isSuccess={isSuccess}
      />
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