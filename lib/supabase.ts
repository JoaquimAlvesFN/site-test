import { createClient } from '@supabase/supabase-js';

// These values should be in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Function to upload image to Supabase Storage
export async function uploadImageToSupabase(file: File): Promise<string | null> {
  try {
    // Log to help debug if needed
    console.log('File to upload:', file.name, file.type, file.size);
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-").toLowerCase()}`;
    const filePath = `uploads/${fileName}`;
    
    console.log('Uploading to path:', filePath);
    
    // Upload the file
    const { data, error } = await supabase.storage
      .from('images') // Your bucket name
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true, // Changed to true to overwrite if exists
      });

    if (error) {
      console.error('Error uploading image to Supabase:', error);
      return null;
    }

    console.log('Upload successful, data:', data);

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    console.log('Public URL:', urlData.publicUrl);
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in uploadImageToSupabase:', error);
    return null;
  }
} 