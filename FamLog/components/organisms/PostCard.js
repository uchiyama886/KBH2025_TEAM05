import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'; // Imageをインポート
import InteractionSection from '../molecules/InteractionSection';

const PostCard = ({
  post,
  session,
  commentText,
  onPraise,
  onAddComment,
  onCommentChange,
}) => {
  return (
    <View style={styles.card}>
      {/* ユーザー情報とメッセージ */}
      <View style={styles.userRow}>
        {/* プロフィールアイコンの表示ロジックを追加 */}
        {post.users?.profile_image_url ? (
          <Image
            source={{ uri: post.users.profile_image_url }}
            style={styles.profileImage}
          />
        ) : (
          // アイコンがない場合のプレースホルダー
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {post.users?.name ? post.users.name.charAt(0) : '？'}
            </Text>
          </View>
        )}
        <Text style={styles.userName}>{post.users?.name}</Text>
      </View>
      <Text style={styles.message}>{post.content}</Text>

      {/* インタラクションセクション */}
      <InteractionSection
        postId={post.id}
        praises={post.praises}
        comments={post.comments}
        session={session}
        commentText={commentText[post.id] || ''}
        onPraise={onPraise}
        onAddComment={onAddComment}
        onCommentChange={(text) => onCommentChange(post.id, text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  // プロフィール画像のスタイル
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  // プレースホルダーのスタイル
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#888',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    fontWeight: "bold",
    color: "#333",
  },
  message: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
    lineHeight: 20,
  },
});

export default PostCard;