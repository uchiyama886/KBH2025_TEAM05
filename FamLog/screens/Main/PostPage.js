import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { usePost } from '../../hooks/usePost';
import CategorySelector from '../../components/molecules/CategorySelector';
import UserInfo from '../../components/molecules/UserInfo';
import CommitMessageDisplay from '../../components/molecules/CommitMessageDisplay';
import StampSelector from '../../components/molecules/StampSelector';
import Postlist from '../../components/organisms/PostList'

const PostPage = () => {
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const { createPost, loading } = usePost();

  const generateCommitMessage = () => {
    if (!description || !selectedCategory) {
      return '';
    }
    return `feat(${selectedCategory}): ${description.substring(0, 20)}...`;
  };
  const commitMessage = generateCommitMessage();

  const handlePost = async () => {
    if (!description || !selectedCategory || !selectedEmoji) {
      Alert.alert('エラー', '内容、カテゴリー、スタンプをすべて選択してください。');
      return;
    }

    const newPost = await createPost(description, [selectedCategory], selectedEmoji);

    if (newPost) {
      Alert.alert('成功', '投稿が完了しました！');
      setDescription('');
      setSelectedCategory(null);
      setSelectedEmoji(null);
    } else {
      Alert.alert('エラー', '投稿に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>       
        <Postlist />
      
        
        
      </ScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16 },
});

export default PostPage;