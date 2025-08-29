import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const PostButton = ({ onPress, loading }) => {
  return (
    <TouchableOpacity
      style={[styles.postButton, loading && styles.postButtonDisabled]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.postButtonText}>頑張りをとうこう</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default PostButton;