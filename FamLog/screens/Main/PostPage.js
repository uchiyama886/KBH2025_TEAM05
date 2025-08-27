import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { usePost } from '../../hooks/usePost';
import PostHeader from '../../components/molecules/PostHeader';
import UserInfo from '../../components/molecules/UserInfo';
import PostInput from '../../components/molecules/PostInput';
import CategorySelector from '../../components/molecules/CategorySelector';
import CommitMessageDisplay from '../../components/molecules/CommitMessageDisplay';
import StampSelector from '../../components/molecules/StampSelector';
import PostButton from '../../components/molecules/PostButton';

const PostScreen = () => {
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
      <PostHeader />
      <ScrollView style={styles.content}>
        <UserInfo />
        <PostInput 
          description={description} 
          setDescription={setDescription} 
        />
        <CategorySelector 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
        <CommitMessageDisplay 
          commitMessage={commitMessage} 
        />
        <StampSelector 
          selectedEmoji={selectedEmoji} 
          onSelectEmoji={setSelectedEmoji} 
        />
      </ScrollView>
      <PostButton 
        onPress={handlePost} 
        loading={loading} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16 },
});

export default PostScreen;