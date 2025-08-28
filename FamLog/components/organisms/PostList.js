import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// usePostのインポートを削除

import UserInfo from '../molecules/UserInfo';
import CategorySelector from '../molecules/CategorySelector';
import CommitMessageDisplay from '../molecules/CommitMessageDisplay';
import StampSelector from '../molecules/StampSelector';
import PostButton from '../molecules/PostButton';
import PostInput from '../molecules/PostInput';
import CustomAlert from '../molecules/CustomAlert';

// 変更: propsとしてselectedEmojisとsetSelectedEmojisを受け取る
const Postlist = ({ 
  description,
  setDescription,
  selectedCategory,
  setSelectedCategory,
  selectedEmojis, // 変更
  setSelectedEmojis, // 変更
  handlePost,
  loading,
}) => {
  const navi = useNavigation();

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
        <PostInput 
          description={description}
          setDescription={setDescription}
        />
        <CategorySelector
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        {/* 変更: selectedEmojisとonSelectEmojiを渡す */}
        <StampSelector
          selectedEmojis={selectedEmojis} 
          onSelectEmoji={setSelectedEmojis} 
        />
        <CommitMessageDisplay commitMessage={commitMessage} />
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