import { View, FlatList, StyleSheet } from 'react-native';
import PostCard from './PostCard';
import { useAuth } from '../../hooks/useAuth'; // useAuthをインポートする

const Timeline = ({
  posts,
  // session, <= Propsとして渡す必要はなくなります
  commentText,
  onPraise,
  onAddComment,
  onCommentChange,
}) => {
  // sessionをpropsで受け取るのではなく、ここで取得する
  const { session } = useAuth();

  const renderItem = ({ item }) => (
    <PostCard
      post={item}
      session={session}
      commentText={commentText}
      onPraise={onPraise}
      onAddComment={onAddComment}
      onCommentChange={onCommentChange}
    />
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.flatListContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    padding: 20,
    paddingBottom: 120,
  },
});

export default Timeline;