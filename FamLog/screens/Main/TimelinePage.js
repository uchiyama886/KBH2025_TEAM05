import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// 仮の投稿データ
const initialPosts = [
  {
    id: "1",
    user: "お母さん",
    avatar: "👩🏻",
    category: "cooking",
    time: "6時間前",
    message: "feat(cooking)：新しいレシピで夕食を作成",
    likes: 4,
    comments: 1,
    liked: false,
    color: "#FF8C42",
  },
  {
    id: "2",
    user: "お父さん",
    avatar: "🧑🏻",
    category: "garden",
    time: "1日前",
    message: "refactor(garden)：庭の植物の手入れを改善",
    likes: 2,
    comments: 0,
    liked: false,
    color: "#4A90E2",
  },
  {
    id: "3",
    user: "太郎",
    avatar: "🧒🏻",
    category: "homework",
    time: "2時間前",
    message: "feat(homework)：算数の宿題を自律的に完了",
    likes: 3,
    comments: 1,
    liked: true,
    color: "#50C878",
  },
];

const TimelinePage = () => {
  const [posts, setPosts] = useState(initialPosts);

  // いいねボタン押下
  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? Math.max(0, p.likes - 1) : p.likes + 1,
            }
          : p
      )
    );
  };

  // コメントボタン押下（今回は数を+1するだけ）
  const addComment = (id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, comments: p.comments + 1 } : p))
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* ユーザー行 */}
      <View style={styles.userRow}>
        <Text style={styles.avatar}>{item.avatar}</Text>
        <Text style={styles.userName}>{item.user}</Text>

        <View style={[styles.categoryTag, { backgroundColor: item.color }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>

        <Text style={styles.timeText}>{item.time}</Text>
      </View>

      {/* メッセージ本文 */}
      <Text style={styles.message}>{item.message}</Text>

      {/* アクションボタン */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => toggleLike(item.id)}
        >
          <Ionicons
            name={item.liked ? "heart" : "heart-outline"}
            size={18}
            color="#FF4D8D"
          />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => addComment(item.id)}
        >
          <Ionicons name="chatbubble-outline" size={18} color="#9C27B0" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={["#FFE6F0", "#E6F0FF"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* ヘッダー */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <Ionicons name="heart-outline" size={24} color="#DF4B78" />
            <Text style={styles.brandText}>Family-Sync</Text>
          </View>
          <Ionicons name="notifications-outline" size={24} color="#444" />
        </View>

        {/* タイムライン */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />

        {/* ボトムナビ */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home-outline" size={22} color="#fff" />
            <Text style={styles.navText}>タイムライン</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="add-circle-outline" size={22} color="#fff" />
            <Text style={styles.navText}>投稿</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="bar-chart-outline" size={22} color="#fff" />
            <Text style={styles.navText}>ダッシュボード</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
    marginLeft: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4, // Android影
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    fontSize: 22,
    marginRight: 6,
  },
  userName: {
    fontWeight: "bold",
    marginRight: 8,
    color: "#333",
  },
  categoryTag: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  categoryText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  timeText: {
    marginLeft: "auto",
    fontSize: 12,
    color: "#777",
  },
  message: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: "row",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  actionText: {
    marginLeft: 4,
    color: "#555",
  },
  bottomNav: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FF8DA1",
    borderRadius: 28,
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 2,
  },
});

export default TimelinePage;
