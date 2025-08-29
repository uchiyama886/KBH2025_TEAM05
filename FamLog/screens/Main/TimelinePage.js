import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFetchPosts } from '../../hooks/useFetchPosts';
import { usePraise } from '../../hooks/usePraise';
import { useComment } from '../../hooks/useComment';
import { useFocusEffect } from '@react-navigation/native';
import Timeline from '../../components/organisms/Timeline';
import { useAuth } from '../../hooks/useAuth';

const TimelinePage = () => {
  const { posts: initialPosts, loading, error, fetchPosts } = useFetchPosts();
  const { addPraise } = usePraise();
  const { addComment } = useComment();
  const { session } = useAuth(); // useAuthフックを使ってsessionを取得する
  const [timelinePosts, setTimelinePosts] = useState([]);
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    if (initialPosts) {
      setTimelinePosts(initialPosts);
    }
  }, [initialPosts]);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [fetchPosts])
  );

  const handlePraise = useCallback(async (postId) => {
    const userId = session?.user?.id;
    if (userId) {
      const success = await addPraise(postId, userId);
      if (success) {
        setTimelinePosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? {
                  ...post,
                  praises: [
                    ...post.praises,
                    {
                      created_at: new Date().toISOString(),
                      praiser_id: userId,
                      users: { name: session.user.name || "あなた" }
                    }
                  ]
                }
              : post
          )
        );
      }
    }
  }, [addPraise, session]);

  const handleAddComment = useCallback(async (postId) => {
    const userId = session?.user?.id;

    const content = commentText[postId];
    console.log(userId, content);
    if (userId && content && content.trim() !== '') {
      const success = await addComment(postId, userId, content);
      if (success) {
        setTimelinePosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? {
                  ...post,
                  comments: [
                    ...post.comments,
                    { created_at: new Date().toISOString(), content: content, users: { name: session.user.name || "あなた" } }
                  ]
                }
              : post
          )
        );
        setCommentText(prev => ({ ...prev, [postId]: '' }));
      } else {
        console.error('コメントが送信できませんでした！');
      }
    } else {
      console.error('userIdかcontentが空です！');
    }
  }, [addComment, commentText, session]);

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
        <Timeline
          posts={timelinePosts}
          session={session}
          commentText={commentText}
          onPraise={handlePraise}
          onAddComment={handleAddComment}
          onCommentChange={(postId, text) => setCommentText(prev => ({ ...prev, [postId]: text }))}
        />
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