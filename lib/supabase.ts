import { createClient } from '@supabase/supabase-js';

// These values should be in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL! || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('As variáveis de ambiente SUPABASE_URL e SUPABASE_SERVICE_KEY não estão configuradas.');
}

// Criar o cliente Supabase com persistência de sessão
export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function para verificar o status de autenticação
export async function getSessionInfo() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Erro ao obter sessão:', error);
      return null;
    }
    return data.session;
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    return null;
  }
}

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
    
    // Upload the file através do cliente seguro
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('Error uploading image to Supabase:', error);
      return null;
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error in uploadImageToSupabase:', error);
    return null;
  }
} 