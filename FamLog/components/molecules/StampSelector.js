import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const emojis = ['📚', '🧹', '🍳', '🏃', '📖', '🎮', '🎨', '🎵', '🌱', '🎯'];

const StampSelector = ({ selectedEmoji, onSelectEmoji }) => {
  return (
    <View style={styles.stampCard}>
      <Text style={styles.label}>スタンプを選択 🤸</Text>
      <View style={styles.stampContainer}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.stampButton,
              selectedEmoji === emoji && styles.selectedStampButton,
            ]}
            onPress={() => onSelectEmoji(emoji)}
          >
            <Text style={styles.emojiText}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default StampSelector;