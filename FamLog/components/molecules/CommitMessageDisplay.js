import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const CommitMessageDisplay = ({ commitMessage }) => {
  return (
    <>
      {/* AI Suggestion Section */}
      <View style={styles.aiSuggestionCard}>
        <Text style={styles.aiText}>
          上に何をしたか入力すると、AIがコミットメッセージを提案します！
        </Text>
      </View>

      {/* Commit Message Section */}
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
    </>
  );
};

const styles = StyleSheet.create({
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

export default CommitMessageDisplay;