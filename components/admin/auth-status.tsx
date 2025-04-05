"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function AuthStatus() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function checkSession() {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error("Erro ao verificar sessão:", error)
          return
        }
        
        if (data.session?.user?.email) {
          console.log("Usuário autenticado:", data.session.user.email)
          setUserEmail(data.session.user.email)
        } else {
          console.log("Nenhum usuário autenticado")
          setUserEmail(null)
        }
      } catch (err) {
        console.error("Erro ao verificar status de autenticação:", err)
      } finally {
        setLoading(false)
      }
    }
    
    checkSession()
    
    // Configurar listener para mudanças na autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Evento de auth:", event)
        setUserEmail(session?.user?.email || null)
      }
    )
    
    return () => {
      // Limpar o listener ao desmontar o componente
      authListener.subscription.unsubscribe()
    }
  }, [])
  
  if (loading) {
    return <p className="text-sm text-gray-500">Verificando autenticação...</p>
  }
  
  if (!userEmail) {
    return <p className="text-sm text-orange-500">Não autenticado</p>
  }
  
  return (
    <p className="text-sm text-green-600">
      Conectado como: <span className="font-medium">{userEmail}</span>
    </p>
  )
} 