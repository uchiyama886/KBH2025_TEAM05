import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { usePost } from '../../hooks/usePost';
import Postlist from '../../components/organisms/PostList';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../../components/molecules/CustomAlert';

const PostPage = () => {
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  // 変更: selectedEmojisを配列として初期化
  const [selectedEmojis, setSelectedEmojis] = useState([]); 
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const { createPost, loading } = usePost(); 
  const navi = useNavigation();

  const handleCloseAlert = () => {
    setAlertVisible(false);
    if (alertMessage === '投稿が完了しました！') {
      navi.navigate('Timeline');
    }
  };

  const handlePost = async () => {
    // 変更: selectedEmojisが空でないかを確認
    if (!description || !selectedCategory || selectedEmojis.length === 0) { 
      setAlertMessage('内容、カテゴリー、スタンプをすべて選択してください。');
      setAlertVisible(true);
      return;
    }
    
    try {
      // 変更: createPostにselectedEmojisの配列を渡す
      const isSuccess = await createPost(description, [selectedCategory], selectedEmojis); 

      if (isSuccess) {
        setAlertMessage('投稿が完了しました！');
        setDescription('');
        setSelectedCategory(null);
        setSelectedEmojis([]); // 変更: 選択された絵文字をクリア
      } else {
        setAlertMessage('投稿に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      console.error('投稿処理で予期せぬエラー:', error);
      setAlertMessage('投稿中にエラーが発生しました。');
    } finally {
      setAlertVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Postlist
        description={description}
        setDescription={setDescription}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        // 変更: selectedEmojisとsetSelectedEmojisを渡す
        selectedEmojis={selectedEmojis}
        setSelectedEmojis={setSelectedEmojis}
        handlePost={handlePost}
        loading={loading}
      />
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16 },
});

export default PostPage;