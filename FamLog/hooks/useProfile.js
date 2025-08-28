import { useEffect } from 'react';
import { supabase } from '../utils/supabase'; // supabaseへのパスを調整してください

export const useProfile = () => {
  useEffect(() => {
    // 認証状態の変更を監視します
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        // ユーザーがログインしたら、プロフィール情報を取得または作成する
        const { data: userProfile, error } = await supabase
          .from('users')
          .select('id')
          .eq('id', session.user.id)
          .single();

        if (error && error.code === 'PGRST116') { // ユーザーが存在しない場合
          console.log('新規ユーザーを登録します');
          // 新しいユーザーをusersテーブルに挿入
          await supabase.from('users').insert([
            {
              id: session.user.id,
              name: session.user.email, // 初期の名前をメールアドレスに設定
              // roleとprofile_image_urlはここでは設定しません
            },
          ]);
        } else if (error) {
          console.error('ユーザー情報の取得に失敗しました:', error);
        } else {
          console.log('既存のユーザー情報が見つかりました:', userProfile);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
};