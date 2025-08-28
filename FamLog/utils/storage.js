import { supabase } from "./supabase";

export const uploadImage = async (file) => {
  // supabase.storage.from('your-bucket').upload(...) のロジック
};

export const downloadImage = async (path) => {
  // supabase.storage.from('your-bucket').download(...) のロジック
};