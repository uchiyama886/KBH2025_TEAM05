import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { usePost } from '../../hooks/usePost'; // 変更: usePostフックをインポート
import Postlist from '../../components/organisms/PostList';
import { useNavigation } from '@react-navigation/native';

const PostPage = () => {
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  // 変更: usePostフックを呼び出す
  const { createPost, loading } = usePost(); 
  const navi = useNavigation();

  const generateCommitMessage = () => {
    if (!description || !selectedCategory) {
      return '';
    }
    return `feat(${selectedCategory}): ${description.substring(0, 20)}...`;
  };

  // 変更: 実際の投稿処理
  const handlePost = async () => {
    if (!description || !selectedCategory || !selectedEmoji) {
      Alert.alert('エラー', '内容、カテゴリー、スタンプをすべて選択してください。');
      return;
    }
    
    // 変更: usePostから返された createPost 関数を呼び出す
    const newPost = await createPost(description, [selectedCategory], selectedEmoji);

    if (newPost) {
      Alert.alert('成功', '投稿が完了しました！');
      setDescription('');
      setSelectedCategory(null);
      setSelectedEmoji(null);
      // 投稿成功後、タイムラインページに遷移
      navi.navigate('Timeline');
    } else {
      Alert.alert('エラー', '投稿に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Postlist
        description={description}
        setDescription={setDescription}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedEmoji={selectedEmoji}
        setSelectedEmoji={setSelectedEmoji}
        handlePost={handlePost}
        loading={loading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16 },
});

export default PostPage;