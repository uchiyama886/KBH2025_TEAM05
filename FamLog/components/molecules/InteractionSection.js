import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import PraiseHistory from './PraiseHistory';

const InteractionSection = ({
  postId,
  praises,
  comments,
  session,
  commentText,
  onPraise,
  onAddComment,
  onCommentChange,
}) => {
  // ログインしているユーザーがすでに「いいね」しているか判定
  const hasPraised = praises?.some(praise => praise.praiser_id === session?.user?.id);

  return (
    <View style={styles.container}>
      {/* いいねセクション */}
      <View style={styles.praiseSection}>
        {session ? (
          <TouchableOpacity
            onPress={() => onPraise(postId)}
            disabled={hasPraised} // 既にいいねしている場合はボタンを無効化
          >
            <Text style={[styles.praiseIcon, hasPraised && styles.praisedIcon]}>
              ❤️
            </Text>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.praiseCount}>
          {praises?.length || 0}
        </Text>
      </View>

      <PraiseHistory praises={praises} />

      {/* コメントセクション */}
      <View style={styles.commentSection}>
        {comments && comments.length > 0 && (
          <View style={styles.commentList}>
            {comments.map((comment, index) => (
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
              value={commentText}
              onChangeText={onCommentChange}
            />
            <TouchableOpacity 
              style={styles.commentSendButton}
              onPress={() => onAddComment(postId)}
            >
              <Text style={styles.commentSendText}>送信</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  praiseSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  praiseIcon: {
    fontSize: 24,
    marginRight: 8,
    color: 'grey', // いいねしていないときのデフォルトの色
  },
  praisedIcon: {
    color: 'red', // いいね済みの色
  },
  praiseCount: {
    fontSize: 16,
    color: '#888',
  },
  commentSection: {
    marginTop: 10,
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
});

export default InteractionSection;