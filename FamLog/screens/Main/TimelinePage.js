import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator, // ローディング表示用
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useFetchPosts } from '../../hooks/useFetchPosts'

// このファイルは、本来であればアトミックデザインの「ページ」に相当します。
// 以下の各コンポーネントを独立したファイルに切り出すことを推奨します。
const PostCard = ({ item, toggleLike, addComment }) => (
  <View style={styles.card}>
    {/* ユーザー行 */}
    <View style={styles.userRow}>
      <Text style={styles.avatar}>{item.public.users.avatar}</Text>
      <Text style={styles.userName}>{item.public.users.name}</Text>
      <Text style={styles.timeText}>{item.created_at}</Text>
    </View>

    {/* メッセージ本文 */}
    <Text style={styles.message}>{item.content}</Text>

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

const TimelinePage = () => {
  const { posts, loading, error } = useFetchPosts(); // APIからデータを取得

  // いいねボタン押下 (ロジックは保持)
  const toggleLike = (id) => {
    // データベース連携ロジックをここに追加
  };

  // コメントボタン押下 (ロジックは保持)
  const addComment = (id) => {
    // データベース連携ロジックをここに追加
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
          renderItem={({ item }) => (
            <PostCard item={item} toggleLike={toggleLike} addComment={addComment} />
          )}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#FF8DA1",
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
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
    elevation: 4,
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