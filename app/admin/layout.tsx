"use client"

import type React from "react"
import { useEffect } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const isLoginPage = pathname === "/admin/login"

  // Redirecionar baseado no estado de autenticação
  useEffect(() => {
    // Se não estiver carregando e:
    // - não estiver na página de login e não estiver autenticado => redirecionar para login
    // - estiver na página de login e estiver autenticado => redirecionar para admin
    if (!isLoading) {
      if (!isLoginPage && !isAuthenticated) {
        router.replace("/admin/login")
      } else if (isLoginPage && isAuthenticated) {
        router.replace("/admin")
      }
    }
  }, [isAuthenticated, isLoading, isLoginPage, router])

  // Página de login tem layout simples
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-slate-100">
        {children}
      </div>
    )
  }

  // Mostrar spinner durante carregamento
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, não mostrar nada até o redirecionamento
  if (!isAuthenticated) {
    return null;
  }

  // Qualquer outra página admin mostra o sidebar
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-auto">
        {children}
      </div>
    </div>
  )
}

