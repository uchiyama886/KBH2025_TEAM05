import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmojiList = ({ emojis }) => {
  if (!emojis || emojis.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {emojis.map((emoji, index) => (
        <Text key={index} style={styles.emoji}>
          {emoji}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  emoji: {
    fontSize: 24,
    marginRight: 6,
  },
});

export default EmojiList;