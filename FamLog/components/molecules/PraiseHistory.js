// FamLog/components/molecules/PraiseHistory.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const PraiseHistory = ({ praises }) => {
  if (!praises || praises.length === 0) {
    return null; // いいねがない場合は何も表示しない
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>いいねしたユーザー</Text>
      <FlatList
        data={praises}
        keyExtractor={(item) => item.users.name + item.created_at}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.userName}>{item.users.name}</Text>
            <Text style={styles.date}>{new Date(item.created_at).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  userName: {
    fontSize: 14,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

export default PraiseHistory;