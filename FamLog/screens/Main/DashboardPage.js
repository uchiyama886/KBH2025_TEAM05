// ダッシュボードページ
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ダッシュボード</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>貢献度グラフ（ここをグラフに置き換えます）</Text>
        <Text>グラフが表示される予定です。</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>今週のMVP</Text>
        <Text>お母さんが今週のMVPです！</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DashboardScreen;