import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import Icon from 'react-native-vector-icons/Feather';

const DashboardPage = () => {
  const weeklyActivityData = [
    { day: '月', commits: 3 },
    { day: '火', commits: 5 },
    { day: '水', commits: 2 },
    { day: '木', commits: 8 },
    { day: '金', commits: 4 },
    { day: '土', commits: 6 },
    { day: '日', commits: 7 },
  ];

  const rankingData = [
    { rank: 1, name: '太郎', relation: '子', commits: 2, avgLikes: 2.0, icon: '👦' },
    { rank: 2, name: 'お父さん', relation: '親', commits: 1, avgLikes: 2.0, icon: '👨' },
    { rank: 3, name: 'お母さん', relation: '親', commits: 1, avgLikes: 4.0, icon: '👩' },
    { rank: 4, name: '花子', relation: '子', commits: 1, avgLikes: 2.0, icon: '👧' },
  ];

  const screenWidth = Dimensions.get('window').width;

  return (
    <LinearGradient colors={['#fff5f7', '#f0f7ff']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ヘッダー */}
        <View style={styles.header}>
          <Icon name="menu" size={26} color="#ff66b2" />
          <Text style={styles.headerTitle}>ダッシュボード</Text>
          <Icon name="bell" size={26} color="#ff66b2" />
        </View>

<View style={styles.cardRow}>
  {/* 今月のコミット - 緑グラデーション */}
  <LinearGradient
    colors={['#b2f7ef', '#5dd39e']}
    style={[styles.card, styles.topCard]}
  >
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>今月のコミット</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* アイコンをFeatherから変更 */}
        <Icon name="bar-chart-2" size={36} color="#2e8b57" />
        <Text style={[styles.cardValue, { color: '#2e8b57', marginLeft: 8 }]}>
          12
        </Text>
      </View>
    </View>
  </LinearGradient>

  {/* 自律性指数 - 紫グラデーション */}
  <LinearGradient
    colors={['#d6c6ff', '#a066ff']}
    style={[styles.card, styles.topCard]}
  >
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>自律性指数</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* アイコンをFeatherから変更 */}
        <Icon name="award" size={36} color="#6a0dad" />
        <Text style={[styles.cardValue, { color: '#6a0dad', marginLeft: 8 }]}>
          60%
        </Text>
      </View>
    </View>
  </LinearGradient>
</View>


        {/* 今週のMVP */}
        <LinearGradient colors={['#fff7d6', '#fff0b3']} style={[styles.card, styles.mvpCard]}>
          <Text style={styles.mvpTitle}>今週のMVP</Text>
          <View style={styles.mvpContent}>
            <Text style={styles.mvpIcon}>👦</Text>
            <View style={styles.mvpInfo}>
              <Text style={styles.mvpName}>太郎</Text>
              <Text style={styles.mvpCommits}>2回のコミット</Text>
              <Text style={styles.mvpMessage}>🌟 素晴らしい週でした！</Text>
            </View>
            <Text style={styles.trophyIcon}>🏆</Text>
          </View>
        </LinearGradient>

        {/* 週間アクティビティ */}
        <View style={[styles.card, { minHeight: 300 }]}>
          <Text style={styles.sectionTitle}>週間アクティビティ</Text>
          <VictoryChart domainPadding={20} width={screenWidth - 40} height={240}>
            <VictoryAxis
              tickValues={weeklyActivityData.map(d => d.day)}
              style={{
                axis: { stroke: "transparent" },
                ticks: { stroke: "transparent" },
                tickLabels: { fontSize: 14, padding: 5, fill: "#555" }
              }}
            />
            <VictoryBar
              data={weeklyActivityData}
              x="day"
              y="commits"
              barRatio={0.7}
              labels={({ datum }) => datum.commits}
              labelComponent={<VictoryLabel dy={-10} />}
              style={{
                data: {
                  fill: ({ index }) =>
                    ['#ff9aa2', '#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#c7ceea', '#a5dee5'][index],
                  fillOpacity: 0.95,
                },
              }}
            />
          </VictoryChart>
        </View>

        {/* ランキング */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>家族貢献度ランキング</Text>
          {rankingData.map((item, index) => (
            <View key={index} style={styles.rankingItem}>
              <Text style={styles.rankingIcon}>{item.icon}</Text>
              <Text style={styles.rankingNumber}>{item.rank}</Text>
              <View style={styles.rankingInfo}>
                <Text style={styles.rankingName}>
                  {item.name} <Text style={styles.relation}>{item.relation}</Text>
                </Text>
                <Text style={styles.rankingDetails}>
                  {item.commits}コミット 平均{item.avgLikes}いいね
                </Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${(item.commits / 2) * 100}%` }]} />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* 子供の自律性成長 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>子供の自律性成長</Text>

          {/* プログレスバー */}
          <Text style={{ fontSize: 14, marginBottom: 5, color: '#666' }}>今月の自律的行動: 70%</Text>
          <View style={styles.progressBarLarge}>
            <View style={[styles.progressFillLarge, { width: '70%' }]} />
          </View>

          {/* 行動の対比カード */}
          <View style={styles.behaviorRow}>
            <View style={[styles.behaviorBox, { backgroundColor: '#ffe0f0' }]}>
              <Text style={styles.behaviorLabel}>自律的行動</Text>
              <Text style={styles.behaviorValue}>15回</Text>
            </View>
            <View style={[styles.behaviorBox, { backgroundColor: '#e0f7ff' }]}>
              <Text style={styles.behaviorLabel}>親の行動</Text>
              <Text style={styles.behaviorValue}>5回</Text>
            </View>
          </View>
        </View>

        {/* AIレポート再生ボタン */}
        <TouchableOpacity style={{ marginBottom: 30 }}>
          <LinearGradient
            colors={['#ff66b2', '#a066ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.reportButton}
          >
            <Text style={styles.reportButtonText}>AIレポートを再生 ▶︎</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingTop: 20, paddingBottom: 20,
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#ff66b2' },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  card: {
    borderRadius: 20, padding: 20, marginBottom: 20,
    backgroundColor: '#fff', boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
  },
  topCard: { flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 },
  cardContent: { alignItems: 'center' },
  cardTitle: { fontSize: 14, color: '#666', marginBottom: 5 },
  cardValue: { fontSize: 34, fontWeight: 'bold', color: '#333' },
  mvpCard: { marginBottom: 20 },
  mvpTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#444' },
  mvpContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  mvpIcon: { fontSize: 40, marginRight: 15 },
  mvpInfo: { flex: 1 },
  mvpName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  mvpCommits: { fontSize: 14, color: '#888', marginTop: 2 },
  mvpMessage: { fontSize: 14, color: '#ff66b2', marginTop: 5 },
  trophyIcon: { fontSize: 32 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#444' },
  rankingItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', padding: 15,
    borderRadius: 15, marginBottom: 12,
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  rankingIcon: { fontSize: 28, marginRight: 8 },
  rankingNumber: { fontSize: 18, fontWeight: 'bold', width: 30, textAlign: 'center', marginRight: 10, color: '#ff66b2' },
  rankingInfo: { flex: 1 },
  rankingName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  relation: { fontSize: 12, color: '#999', fontWeight: 'normal' },
  rankingDetails: { fontSize: 12, color: '#777' },
  progressBar: { height: 6, backgroundColor: '#eee', borderRadius: 3, marginTop: 5, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#ff9aa2', borderRadius: 3 },

  progressBarLarge: { height: 12, backgroundColor: '#eee', borderRadius: 6, marginBottom: 15, overflow: 'hidden' },
  progressFillLarge: { height: '100%', backgroundColor: '#ff66b2', borderRadius: 6 },

  behaviorRow: { flexDirection: 'row', justifyContent: 'space-between' },
  behaviorBox: {
    flex: 1, padding: 15, borderRadius: 12, alignItems: 'center',
    marginHorizontal: 5, boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  },
  behaviorLabel: { fontSize: 14, color: '#555', marginBottom: 5 },
  behaviorValue: { fontSize: 20, fontWeight: 'bold', color: '#333' },

  reportButton: {
    borderRadius: 30, paddingVertical: 15, alignItems: 'center',
    justifyContent: 'center',
  },
  reportButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default DashboardPage;
