import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


// ---------------------------
// 既存のファイルを統合
// ---------------------------

// PostHeader.js のコードを直接貼り付け


const PostHeader = () => {
  return (
    <View style={headerStyles.header}>
      <TouchableOpacity style={headerStyles.iconButton}>
        <Ionicons name="menu-outline" size={28} color="#000" />
      </TouchableOpacity>
      <View style={headerStyles.centerContainer}>
        <Ionicons name="heart" size={24} color="#FF69B4" style={headerStyles.heartIcon} />
        <Text style={headerStyles.titleText}>Family-Sync</Text>
      </View>
      <TouchableOpacity style={headerStyles.iconButton}>
        <Ionicons name="notifications-outline" size={28} color="#000" />
        <View style={headerStyles.notificationDot} />
      </TouchableOpacity>
    </View>
  );
};
const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    marginRight: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF69B4',
  },
});

// UserInfo.js のコードを直接貼り付け
const UserInfo = () => {
  return (
    <View style={userInfoStyles.userInfoSection}>
      {/* ダミーのアバター */}
      <View style={userInfoStyles.avatarPlaceholder} />
      <View>
        <Text style={userInfoStyles.userName}>太郎</Text>
        <View style={userInfoStyles.committerBadge}>
          <Text style={userInfoStyles.committerText}>コミッター</Text>
        </View>
      </View>
    </View>
  );
};

const userInfoStyles = StyleSheet.create({
  userInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16, // PostHeaderと統一
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  committerBadge: {
    backgroundColor: '#b3e0ff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  committerText: {
    fontSize: 12,
  },
});

// CategorySelector.js のコードを直接貼り付け
const categories = ['宿題', 'お手伝い', '料理', '運動', '読書', 'その他'];
const CategorySelector = ({ selectedCategory, onSelectCategory }) => {
  return (
    <View style={categoryStyles.categoryCard}>
      <Text style={categoryStyles.label}>カテゴリーを選択</Text>
      <View style={categoryStyles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              categoryStyles.categoryButton,
              selectedCategory === category && categoryStyles.selectedCategoryButton,
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              style={[
                categoryStyles.categoryText,
                selectedCategory === category && categoryStyles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const categoryStyles = StyleSheet.create({
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  categoryText: {
    fontSize: 14,
  },
  selectedCategoryButton: {
    backgroundColor: '#ff99b3',
  },
  selectedCategoryText: {
    color: '#fff',
  },
});

// CommitMessageDisplay.js のコードを直接貼り付け
const CommitMessageDisplay = ({ commitMessage }) => {
  return (
    <>
      {/* AI Suggestion Section */}
      <View style={commitStyles.aiSuggestionCard}>
        <Text style={commitStyles.aiText}>
          上に何をしたか入力すると、AIがコミットメッセージを提案します！
        </Text>
      </View>

      {/* Commit Message Section */}
      <View style={commitStyles.commitCard}>
        <Text style={commitStyles.label}>コミットメッセージ</Text>
        <TextInput
          style={commitStyles.commitMessageInput}
          value={commitMessage}
          placeholder="feat(category): あなたの行動"
          placeholderTextColor="#a0a0a0"
          multiline
          editable={false}
        />
      </View>
    </>
  );
};
const commitStyles = StyleSheet.create({
  aiSuggestionCard: {
    backgroundColor: '#f0e0ff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  aiText: {
    color: '#6a0dad',
    textAlign: 'center',
  },
  commitCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commitMessageInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
  },
});

// StampSelector.js のコードを直接貼り付け
const emojis = ['📚', '🧹', '�', '🏃', '📖', '🎮', '🎨', '🎵', '🌱', '🎯'];
const StampSelector = ({ selectedEmoji, onSelectEmoji }) => {
  return (
    <View style={stampStyles.stampCard}>
      <Text style={stampStyles.label}>スタンプを選択 🤸</Text>
      <View style={stampStyles.stampContainer}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            style={[
              stampStyles.stampButton,
              selectedEmoji === emoji && stampStyles.selectedStampButton,
            ]}
            onPress={() => onSelectEmoji(emoji)}
          >
            <Text style={stampStyles.emojiText}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const stampStyles = StyleSheet.create({
  stampCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stampContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
  },
  stampButton: {
    width: 40,
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedStampButton: {
    borderWidth: 2,
    borderColor: '#ff99b3',
  },
  emojiText: {
    fontSize: 24,
  },
});

// PostButton.js のコードを直接貼り付け
const PostButton = ({ onPress, loading }) => {
  return (
    <TouchableOpacity
      style={[buttonStyles.postButton, loading && buttonStyles.postButtonDisabled]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={buttonStyles.postButtonText}>投稿</Text>
      )}
    </TouchableOpacity>
  );
};
const buttonStyles = StyleSheet.create({
  postButton: {
    backgroundColor: '#FF69B4',
    padding: 16,
    borderRadius: 25,
    marginHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButtonDisabled: {
    backgroundColor: '#ff99b3',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// PostInput.js のコードを直接貼り付け
const PostInput = ({ description, setDescription }) => {
  return (
    <View style={inputStyles.inputCard}>
      <Text style={inputStyles.label}>何をしましたか？ ✨</Text>
      <TextInput
        style={inputStyles.textInput}
        placeholder="例: 算数の宿題, 部屋の掃除, 料理の手伝い..."
        placeholderTextColor="#a0a0a0"
        multiline
        value={description}
        onChangeText={setDescription}
      />
    </View>
  );
};
const inputStyles = StyleSheet.create({
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
  },
});

// カスタムポップアップコンポーネント
const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={alertStyles.overlay}>
        <View style={alertStyles.container}>
          <Text style={alertStyles.message}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={alertStyles.okButton}>
            <Text style={alertStyles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const alertStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#FF69B4',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  okButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

// ---------------------------
// Postlist.js コンポーネント本体
// ---------------------------
const Postlist = ({ navigation }) => {
  // useStateフックを定義して、入力状態と投稿の状態を管理
  const [postData, setPostData] = useState({
    description: '',
    category: null,
    emoji: null,
    commitMessage: '',
  });
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const navi = useNavigation();

  // ポップアップを閉じる関数
  const handleCloseAlert = () => {
    setAlertVisible(false);
    // 投稿完了メッセージが表示されている場合、タイムラインに遷移
    if (alertMessage === '投稿が完了しました！' && navigation) {
      navi.navigate('TimelinePage');
    }
  };

  // コミットメッセージを生成する関数
  const generateCommitMessage = (desc, category) => {
    if (desc.trim() === '' || !category) {
      return '';
    }
    const categoryPrefix = category === 'その他' ? 'chore' : 'feat';
    return `${categoryPrefix}(${category}): ${desc}`;
  };

  // 投稿データを更新する関数
  const handleUpdatePostData = (field, value) => {
    setPostData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handlePost = () => {
    // 投稿内容とカテゴリーが空でないかをチェック
    if (postData.description.trim() === '' || !postData.category) {
      setAlertMessage('投稿内容とカテゴリーを選択してください。');
      setAlertVisible(true);
      return;
    }

    setLoading(true);
    console.log('投稿内容:', postData);

    // ダミーの処理終了
    setTimeout(() => {
      setLoading(false);
      setPostData({
        description: '',
        category: null,
        emoji: null,
        commitMessage: '',
      });
      setAlertMessage('投稿が完了しました！');
      setAlertVisible(true);
    }, 2000);
  };

  // descriptionまたはselectedCategoryが変更されたらコミットメッセージを更新
  React.useEffect(() => {
    const newCommitMessage = generateCommitMessage(postData.description, postData.category);
    handleUpdatePostData('commitMessage', newCommitMessage);
  }, [postData.description, postData.category]);

  return (
    <SafeAreaView style={styles.container}>
      <PostHeader />
      <View style={styles.userInfoContainer}>
        <UserInfo />
      </View>
      <ScrollView style={styles.content}>
        {/* 投稿内容 */}
        <PostInput 
          description={postData.description}
          setDescription={(desc) => handleUpdatePostData('description', desc)}
        />
        {/* カテゴリー */}
        <CategorySelector
          selectedCategory={postData.category}
          onSelectCategory={(category) => handleUpdatePostData('category', category)}
        />
        {/* スタンプ */}
        <StampSelector
          selectedEmoji={postData.emoji}
          onSelectEmoji={(emoji) => handleUpdatePostData('emoji', emoji)}
        />
        {/* コミットメッセージ */}
        <CommitMessageDisplay commitMessage={postData.commitMessage} />
        {/* 投稿ボタン */}
        <PostButton onPress={handlePost} loading={loading} />
      </ScrollView>
      {/* カスタムポップアップ */}
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe6f2', // 薄ピンク色
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
