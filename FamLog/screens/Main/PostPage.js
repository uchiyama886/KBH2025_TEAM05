import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PostScreen = () => {
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const generateCommitMessage = () => {
    if (!description || !selectedCategory) {
      return '';
    }
    return `feat(${selectedCategory}): ${description.substring(0, 20)}...`;
  };
  const commitMessage = generateCommitMessage();

  const handlePost = () => {
    const postData = {
      description: description,
      category: selectedCategory,
      emoji: selectedEmoji,
      commitMessage: commitMessage,
      timestamp: new Date().toISOString(),
    };
    console.log('投稿データ:', postData);
    // 実際にデータを記録するAPIを呼び出す
    // 例: create_note(title=commitMessage, text_content=description)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>投稿を作成</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.userInfoSection}>
          <View style={styles.avatarPlaceholder} />
          <View>
            <Text style={styles.userName}>太郎</Text>
            <View style={styles.committerBadge}>
              <Text style={styles.committerText}>コミッター</Text>
            </View>
          </View>
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.label}>何をしましたか？ ✨</Text>
          <TextInput
            style={styles.textInput}
            placeholder="例: 算数の宿題, 部屋の掃除, 料理の手伝い..."
            placeholderTextColor="#a0a0a0"
            multiline
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.categoryCard}>
          <Text style={styles.label}>カテゴリーを選択</Text>
          <View style={styles.categoryContainer}>
            {['宿題', 'お手伝い', '料理', '運動', '読書', 'その他'].map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategoryButton,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.aiSuggestionCard}>
          <Text style={styles.aiText}>
            上に何をしたか入力すると、AIがコミットメッセージを提案します！
          </Text>
        </View>

        <View style={styles.commitCard}>
          <Text style={styles.label}>コミットメッセージ</Text>
          <TextInput
            style={styles.commitMessageInput}
            value={commitMessage}
            placeholder="feat(category): あなたの行動"
            placeholderTextColor="#a0a0a0"
            multiline
            editable={false}
          />
        </View>

        <View style={styles.stampCard}>
          <Text style={styles.label}>スタンプを選択 🤸</Text>
          <View style={styles.stampContainer}>
            {['📚', '🧹', '🍳', '🏃', '📖', '🎮', '🎨', '🎵', '🌱', '🎯'].map((emoji, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.stampButton,
                  selectedEmoji === emoji && styles.selectedStampButton,
                ]}
                onPress={() => setSelectedEmoji(emoji)}
              >
                <Text style={styles.emojiText}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.postButton}
        onPress={handlePost}
      >
        <Text style={styles.postButtonText}>コミットを投稿</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 16 },
  content: { padding: 16 },
  userInfoSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatarPlaceholder: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#e0e0e0', marginRight: 10 },
  userName: { fontSize: 18, fontWeight: 'bold' },
  committerBadge: { backgroundColor: '#b3e0ff', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, marginTop: 4, alignSelf: 'flex-start' },
  committerText: { fontSize: 12 },
  inputCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  textInput: { minHeight: 100, textAlignVertical: 'top', fontSize: 16 },
  categoryCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#e0e0e0' },
  categoryText: { fontSize: 14 },
  selectedCategoryButton: { backgroundColor: '#ff99b3' },
  selectedCategoryText: { color: '#fff' },
  aiSuggestionCard: { backgroundColor: '#f0e0ff', borderRadius: 16, padding: 20, marginBottom: 20, alignItems: 'center' },
  aiText: { color: '#6a0dad', textAlign: 'center' },
  commitCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  commitMessageInput: { minHeight: 80, textAlignVertical: 'top', backgroundColor: '#f9f9f9', borderRadius: 8, padding: 10 },
  stampCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  stampContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 10 },
  stampButton: { width: 40, height: 40, backgroundColor: '#e0e0e0', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  selectedStampButton: { borderWidth: 2, borderColor: '#ff99b3' },
  emojiText: { fontSize: 24 },
  postButton: { backgroundColor: 'pink', padding: 16, borderRadius: 25, marginHorizontal: 16, marginBottom: 20, alignItems: 'center' },
  postButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default PostScreen;