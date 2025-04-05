"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function AdminIndexPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Redirecionar para o dashboard se estiver autenticado
    if (!isLoading && isAuthenticated) {
      router.replace("/admin/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Renderizar uma página de carregamento ou nada enquanto redireciona
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecionando para o Dashboard...</p>
      </div>
    </div>
  );
}

