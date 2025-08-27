import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const PostInput = ({ description, setDescription }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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

export default PostInput;