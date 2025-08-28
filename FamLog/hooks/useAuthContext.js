import { createContext, useContext } from 'react';

// AuthContextを作成
export const AuthContext = createContext();

// コンテキストを使用するためのカスタムフック
export const useAuthContext = () => {
  return useContext(AuthContext);
};