import { supabase } from './supabase'; // Imports the main Supabase client

/**
 * Uploads an image to Supabase Storage.
 * @param {object} file - The image file to upload (e.g., from an image picker).
 * @param {string} bucketName - The name of the storage bucket.
 * @param {string} filePath - The path where the file will be stored in the bucket.
 * @returns {Promise<object>} - The result of the upload operation.
 */
export const uploadImage = async (file, bucketName, filePath) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw error;
  }
};

/**
 * Creates a public URL for a file in Supabase Storage.
 * @param {string} bucketName - The name of the storage bucket.
 * @param {string} filePath - The path to the file in the bucket.
 * @returns {string|null} - The public URL of the file.
 */
export const getPublicUrl = (bucketName, filePath) => {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data?.publicUrl || null;
};