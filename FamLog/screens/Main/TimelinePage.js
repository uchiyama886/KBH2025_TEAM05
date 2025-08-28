import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFetchPosts } from '../../hooks/useFetchPosts';

const TimelinePage = () => {
  const { posts, loading, error } = useFetchPosts();

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
  console.log(posts);
  return (
    <LinearGradient colors={["#FFE6F0", "#E6F0FF"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Replace this with a Header component */}
        <View style={styles.header}>
            <View style={styles.brandRow}>
              <Text>Family-Sync</Text>
            </View>
        </View>

        {/* Timeline */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.userRow}>
                <Text style={styles.avatar}>{item.users.profile_image_url}</Text>
                <Text style={styles.userName}>{item.users.name}</Text>
                <Text style={styles.message}>{item.content}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Replace this with a Footer component */}
        <View style={styles.bottomNav}>
          <Text>Footer</Text>
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
  message: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
    lineHeight: 20,
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
});

export default TimelinePage;