import { supabase } from '../utils/supabase';

export const useComment = () => {
  const addComment = async (postId, userId, commentContent) => {
    try {
      if (!commentContent || commentContent.trim() === '') {
        console.error('コメントの内容が空です。');
        return false;
      }
      const { data, error } = await supabase
        .from('comments')
        .insert([
          { post_id: postId, user_id: userId, content: commentContent }
        ]);

      if (error) {
        throw error;
      }

      console.log('コメントが正常に保存されました:', data);
      return true;
    } catch (err) {
      console.error('コメントの保存に失敗しました:', err.message);
      return false;
    }
  };

  return { addComment };
};