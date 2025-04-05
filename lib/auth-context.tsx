"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { useRouter } from "next/navigation";

// Tipo para o estado do usuário
type UserState = {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Tipo para o contexto de autenticação
type AuthContextType = UserState & {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
};

// Criar o contexto com um valor padrão
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: async () => {},
});

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

// Provedor do contexto de autenticação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UserState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const router = useRouter();

  // Verificar a sessão quando o componente montar
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          console.log("Usuário autenticado:", data.session.user.email);
          setState({
            user: data.session.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          console.log("Nenhum usuário autenticado");
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    // Verificar sessão inicial
    checkSession();

    // Configurar listener para mudanças de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Evento de autenticação:", event);
        
        if (session) {
          console.log("Usuário autenticado após evento:", session.user.email);
          setState({
            user: session.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          console.log("Nenhum usuário autenticado após evento");
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      }
    );

    // Limpar listener ao desmontar
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Função de login
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Erro no login:", error.message);
        return { success: false, error: error.message };
      }

      console.log("Login bem-sucedido:", data);
      setState({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error: any) {
      console.error("Erro no login:", error);
      return { success: false, error: error.message };
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      router.replace("/admin/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Valor do contexto
  const value = {
    ...state,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 