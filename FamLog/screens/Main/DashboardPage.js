import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";

// useFetchPostsをインポート
import { useFetchPosts } from "../../hooks/useFetchPosts";

// 画面の幅を取得
const screenWidth = Dimensions.get("window").width;

/**
 * 投稿データから貢献度グラフ用のデータを生成
 * @param {Array} posts - 取得した投稿データ
 * @returns {{labels: Array, datasets: Array}}
 */
const getChartData = (posts) => {
  const contributionMap = {};
  const today = new Date();
  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  const labels = [];

  // 過去7日間の日付をキーとして初期化
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const day = daysOfWeek[date.getDay()];
    contributionMap[day] = 0;
    labels.push(day);
  }

  // データを日付ごとに集計
  posts.forEach((post) => {
    const date = new Date(post.created_at);
    const day = daysOfWeek[date.getDay()];
    if (contributionMap.hasOwnProperty(day)) {
      contributionMap[day]++;
    }
  });

  const data = labels.map(day => contributionMap[day]);

  return {
    labels: labels,
    datasets: [
      {
        data: data,
      },
    ],
  };
};

/**
 * 貢献度が最も高いユーザーを計算（今週のMVP）
 * @param {Array} posts - 取得した投稿データ
 * @returns {{name: string, commits: number}|null} MVPのユーザー情報、またはnull
 */
const calculateMVP = (posts) => {
  const commitCounts = {};
  posts.forEach((post) => {
    const userId = post.user_id;
    if (commitCounts[userId]) {
      commitCounts[userId].commits++;
    } else {
      // ユーザー情報がネストされていると仮定
      commitCounts[userId] = {
        name: post.users.name,
        commits: 1,
      };
    }
  });

  let maxCommits = 0;
  let mvp = null;

  for (const userId in commitCounts) {
    if (commitCounts[userId].commits > maxCommits) {
      maxCommits = commitCounts[userId].commits;
      mvp = commitCounts[userId];
    }
  }

  return mvp;
};

const DashboardPage = () => {
  // useFetchPostsフックを使用してデータを取得
  const { posts, loading, error } = useFetchPosts();
  const chartData = getChartData(posts);
  const mvp = calculateMVP(posts);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF8DA1" />
        <Text style={styles.loadingText}>データを読み込み中...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>エラーが発生しました: {error.message}</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#FFE6F0", "#E6F0FF"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>今週の貢献度</Text>
          <View style={styles.chartContainer}>
            <BarChart
              data={chartData}
              width={screenWidth - 40}
              height={220}
              yAxisLabel=""
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(223, 75, 120, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(68, 68, 68, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForBackgroundLines: {
                  strokeDasharray: "",
                },
              }}
              style={styles.chart}
            />
          </View>

          <View style={styles.mvpContainer}>
            <Text style={styles.sectionTitle}>今週のMVP</Text>
            {mvp ? (
              <View style={styles.mvpCard}>
                <Ionicons name="trophy-outline" size={30} color="#FFD700" />
                <Text style={styles.mvpText}>{mvp.name}</Text>
                <Text style={styles.mvpCommitsText}>{mvp.commits}投稿</Text>
              </View>
            ) : (
              <Text>今週の投稿はありません</Text>
            )}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE6F0",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#444",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 60,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 15,
  },
  chartContainer: {
    borderRadius: 16,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
  },
  mvpContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  mvpCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  mvpText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
  mvpCommitsText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#888",
  },
});

export default DashboardPage;