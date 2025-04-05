import { supabase } from "./supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Fixed admin credentials (in a real app, these would be in the database)
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD_HASH = "$2b$10$rBJlYSrUhUXIBtIvZlDSJOJMOVBB.JK.vtB5xJJyZOhCnXcXEcKIm" // 'admin123'

// Verifica se o usuário está autenticado
export async function isAuthenticated() {
  try {
    // Verificar a sessão do usuário usando o Supabase
    const { data: { session } } = await supabase.auth.getSession();
    return session !== null;
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    return false;
  }
}

// Login com email e senha usando Supabase
export async function login(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    // Retorna sucesso se o login for bem-sucedido
    return { success: true, data };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return { success: false, message: "Ocorreu um erro ao tentar fazer login" };
  }
}

// Logout usando Supabase
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Erro ao fazer logout:", error);
      return { success: false, message: error.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return { success: false, message: "Ocorreu um erro ao tentar fazer logout" };
  }
}

// Verificação de permissão para rotas protegidas
export async function requireAuth() {
  const isLoggedIn = await isAuthenticated();
  
  if (!isLoggedIn) {
    redirect('/admin/login');
  }
  
  return true;
}

