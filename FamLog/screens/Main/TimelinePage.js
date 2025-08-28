import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFetchPosts } from '../../hooks/useFetchPosts';
import { usePraise } from '../../hooks/usePraise';
import { useAuth } from '../../hooks/useAuth';
import { useComment } from '../../hooks/useComment';
import PraiseHistory from '../../components/molecules/PraiseHistory';

const TimelinePage = () => {
  const { posts: initialPosts, loading, error } = useFetchPosts();
  const { addPraise } = usePraise();
  const { addComment } = useComment();
  const { session } = useAuth();
  const [timelinePosts, setTimelinePosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  

  useEffect(() => {
    if (initialPosts) {
      setTimelinePosts(initialPosts);
    }
  }, [initialPosts]);

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
                      // praises_idをpraiser_idに修正
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
    console.log(userId,content);
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
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <View style={styles.brandRow}>
              <Text>Family-Sync</Text>
            </View>
        </View>

        <FlatList
          data={timelinePosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.userRow}>
                <Text style={styles.avatar}>{item.users?.profile_image_url}</Text>
                <Text style={styles.userName}>{item.users?.name}</Text>
              </View>
              <Text style={styles.message}>{item.content}</Text>

              <View style={styles.praiseSection}>
                {session ? (
                  <TouchableOpacity onPress={() => handlePraise(item.id)}>
                    <Text style={styles.praiseIcon}>❤️</Text>
                  </TouchableOpacity>
                ) : null}
                <Text style={styles.praiseCount}>
                  {item.praises?.length || 0}
                </Text>
              </View>
              
              <PraiseHistory praises={item.praises} />

              <View style={styles.commentSection}>
                {item.comments && item.comments.length > 0 && (
                  <View style={styles.commentList}>
                    {item.comments.map((comment, index) => (
                      <View key={index} style={styles.commentItem}>
                        <Text style={styles.commentUser}>{comment.users?.name || '不明'}:</Text>
                        <Text style={styles.commentContent}>{comment.content}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {session ? (
                  <View style={styles.commentInputRow}>
                    <TextInput
                      style={styles.commentInput}
                      placeholder="コメントを追加..."
                      value={commentText[item.id] || ''}
                      onChangeText={(text) => setCommentText(prev => ({ ...prev, [item.id]: text }))}
                    />
                    <TouchableOpacity 
                      style={styles.commentSendButton}
                      onPress={() => handleAddComment(item.id)}
                    >
                      <Text style={styles.commentSendText}>送信</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          )}
          contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />

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
  praiseSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  praiseIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  praiseCount: {
    fontSize: 16,
    color: '#888',
  },
  commentSection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  commentList: {
    marginBottom: 10,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  commentUser: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 12,
    color: '#333',
  },
  commentContent: {
    fontSize: 12,
    color: '#555',
    flexShrink: 1,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
  },
  commentSendButton: {
    backgroundColor: '#FF8DA1',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  commentSendText: {
    color: '#fff',
    fontWeight: 'bold',
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