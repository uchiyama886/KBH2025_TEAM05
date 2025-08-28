// useFetchPosts.js

import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // postsテーブルと、postsテーブルのuser_idに関連付けられたusersテーブルのデータを取得
        const { data, error } = await supabase
          .from('posts')
          .select('*, public.users(name, avatar_url)') // 修正点
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setPosts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // ... (リアルタイムリスナーのコードはそのまま) ...
  }, []);

  return { posts, loading, error };
};