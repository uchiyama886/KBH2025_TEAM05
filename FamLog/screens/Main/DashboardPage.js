import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { BarChart, PieChart } from "react-native-chart-kit";

import { useFetchPosts } from "../../hooks/useFetchPosts";
import SummaryModal from '../../components/organisms/SummaryModal';

const screenWidth = Dimensions.get("window").width;

// ... (getChartData, calculateMVP, getCategoryChartData, getEmojiChartData の関数は省略) ...
const getChartData = (posts) => {
  const contributionMap = {};
  const today = new Date();
  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  const labels = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const day = daysOfWeek[date.getDay()];
    contributionMap[day] = 0;
    labels.push(day);
  }

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

const calculateMVP = (posts) => {
  const commitCounts = {};
  posts.forEach((post) => {
    const userId = post.user_id;
    if (commitCounts[userId]) {
      commitCounts[userId].commits++;
    } else {
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

const getCategoryChartData = (posts) => {
  const categoryMap = {};
  posts.forEach((post) => {
    if (post.tags) {
      if (categoryMap[post.tags]) {
        categoryMap[post.tags]++;
      } else {
        categoryMap[post.tags] = 1;
      }
    }
  });

  const labels = Object.keys(categoryMap);
  const data = labels.map((tag) => categoryMap[tag]);

  return {
    labels: labels,
    datasets: [
      {
        data: data,
      },
    ],
  };
};

const getEmojiChartData = (posts) => {
  const emojiMap = {};
  posts.forEach((post) => {
    if (post.emojis && Array.isArray(post.emojis)) {
      post.emojis.forEach((emoji) => {
        if (emojiMap[emoji]) {
          emojiMap[emoji]++;
        } else {
          emojiMap[emoji] = 1;
        }
      });
    }
  });

  const sortedEmojis = Object.entries(emojiMap)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5);

  const data = sortedEmojis.map(([emoji, count], index) => ({
    name: emoji,
    population: count,
    color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  return data;
};

const DashboardPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const { posts, loading, error } = useFetchPosts();
  const chartData = getChartData(posts);
  const mvp = calculateMVP(posts);
  const categoryChartData = getCategoryChartData(posts);
  const emojiChartData = getEmojiChartData(posts);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

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
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>今週のがんばり</Text>
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

            <Text style={styles.sectionTitle}>使われたカテゴリー</Text>
            <View style={styles.chartContainer}>
              <BarChart
                data={categoryChartData}
                width={screenWidth - 40}
                height={220}
                yAxisLabel=""
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
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

            <Text style={styles.sectionTitle}>使われた絵文字</Text>
            <View style={styles.chartContainer}>
              <PieChart
                data={emojiChartData}
                width={screenWidth - 40}
                height={220}
                chartConfig={{
                  color: (opacity = 1) => `rgba(255, 141, 161, ${opacity})`,
                }}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                absolute
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
        </ScrollView>
        <Pressable style={styles.playButton} onPress={handleOpenModal}>
          <Ionicons name="play-circle" size={60} color="#FF8DA1" />
        </Pressable>
        
        {/* SummaryModalにデータを渡す */}
        <SummaryModal 
          isVisible={isModalVisible} 
          onClose={handleCloseModal}
          chartData={chartData}
          mvp={mvp}
          categoryChartData={categoryChartData}
          emojiChartData={emojiChartData}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
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
    padding: 20,
    paddingBottom: 80,
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
  playButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default DashboardPage;