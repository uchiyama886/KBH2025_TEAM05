import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PostCard from './PostCard';
import AuthContext from '../../hooks/useAuthContext'

const Timeline = ({
  posts,
  session,
  commentText,
  onPraise,
  onAddComment,
  onCommentChange,
}) => {
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