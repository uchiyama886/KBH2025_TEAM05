import React, { useEffect } from 'react'; // 変更: useStateを削除
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePost } from '../../hooks/usePost'; // usePostを削除し、必要な場合のみインポート

import UserInfo from '../molecules/UserInfo';
import CategorySelector from '../molecules/CategorySelector';
import CommitMessageDisplay from '../molecules/CommitMessageDisplay';
import StampSelector from '../molecules/StampSelector';
import PostButton from '../molecules/PostButton';
import PostInput from '../molecules/PostInput';
import CustomAlert from '../molecules/CustomAlert';

// 変更: propsとして状態と関数を受け取る
const Postlist = ({ 
  description,
  setDescription,
  selectedCategory,
  setSelectedCategory,
  selectedEmoji,
  setSelectedEmoji,
  handlePost,
  loading,
}) => {
  // useStateフックをすべて削除
  const navi = useNavigation();

  // コミットメッセージを生成する関数
  const generateCommitMessage = (desc, category) => {
    if (desc.trim() === '' || !category) {
      return '';
    }
    const categoryPrefix = category === 'その他' ? 'chore' : 'feat';
    return `${categoryPrefix}(${category}): ${desc}`;
  };

  const commitMessage = generateCommitMessage(description, selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoContainer}>
        <UserInfo />
      </View>
      <ScrollView style={styles.content}>
        {/* 投稿内容 */}
        <PostInput 
          description={description}
          setDescription={setDescription}
        />
        {/* カテゴリー */}
        <CategorySelector
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        {/* スタンプ */}
        <StampSelector
          selectedEmoji={selectedEmoji}
          onSelectEmoji={setSelectedEmoji}
        />
        {/* コミットメッセージ */}
        <CommitMessageDisplay commitMessage={commitMessage} />
        {/* 投稿ボタン */}
        <PostButton onPress={handlePost} loading={loading} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe6f2',
  },
  userInfoContainer: {
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});

export default Postlist;