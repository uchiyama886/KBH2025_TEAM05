// タイムラインページ
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// ダミーデータ
const DUMMY_POSTS = [
  { id: '1', name: 'お父さん', content: '今日のゴミ出し完了！', date: '2時間前' },
  { id: '2', name: 'お母さん', content: '夕飯の準備ができたよ！', date: '1時間前' },
  { id: '3', name: '子ども', content: '宿題終わったー！', date: '30分前' },
];

const PostCard = ({ name, content, date }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

const TimelineScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>タイムライン</Text>
      <FlatList
        data={DUMMY_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            name={item.name}
            content={item.content}
            date={item.date}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    marginTop: 10,
  },
});

export default TimelineScreen;