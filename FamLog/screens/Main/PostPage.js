// 投稿ページ
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const PostPage = () => {
  const [postContent, setPostContent] = useState('');

  const handlePost = () => {
    if (postContent.trim() !== '') {
      console.log('投稿内容:', postContent);
      // 投稿ロジックは後で追加します
      setPostContent(''); // 入力欄をクリア
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>新しい「できた！」を投稿</Text>
      <TextInput
        style={styles.input}
        placeholder="今日の「できた！」を入力してください"
        multiline
        value={postContent}
        onChangeText={setPostContent}
      />
      <Button title="投稿する" onPress={handlePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
});

export default PostPage;