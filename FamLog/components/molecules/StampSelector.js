import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const emojis = ['👍', '✨', '🎉', '🚀', '💡', '🤔', '🙌', '💯', '🔥', '👀', '✅', '🌈'];

// 変更: selectedEmojisは配列を受け取り、onSelectEmojiも配列を返すように変更
const StampSelector = ({ selectedEmojis, onSelectEmoji }) => {
  const handleSelectEmoji = (emoji) => {
    // 既に選択されているかチェック
    const isSelected = selectedEmojis.includes(emoji);

    if (isSelected) {
      // 既に選択されている場合は、その絵文字を配列から削除
      onSelectEmoji(selectedEmojis.filter(e => e !== emoji));
    } else {
      // 選択されていない場合は、配列に追加
      onSelectEmoji([...selectedEmojis, emoji]);
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedEmojis.includes(item);
    return (
      <TouchableOpacity
        style={[styles.emojiButton, isSelected && styles.selectedEmojiButton]}
        onPress={() => handleSelectEmoji(item)}
      >
        <Text style={styles.emojiText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>スタンプ</Text>
      <FlatList
        data={emojis}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={6} // 1行に表示する絵文字の数
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap', // 折り返しを有効にする
    marginBottom: 8,
  },
  emojiButton: {
    padding: 8,
    margin: 4,
    borderRadius: 20,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40, // ボタンの幅を固定
    height: 40, // ボタンの高さを固定
  },
  selectedEmojiButton: {
    backgroundColor: '#FF69B4', // 選択時の背景色
  },
  emojiText: {
    fontSize: 20,
  },
});

export default StampSelector;