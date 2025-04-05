"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated, isLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Usuário já autenticado, redirecionando para dashboard");
      router.replace("/admin");
    }
  }, [isAuthenticated, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Usar a função de login do contexto
      const result = await login(email, password);

      if (!result.success) {
        setError(result.error || "Falha ao fazer login");
        setIsSubmitting(false);
        return;
      }

      console.log("Login bem-sucedido, redirecionando para dashboard...");
      router.replace("/admin");
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Ocorreu um erro ao tentar fazer login");
      setIsSubmitting(false);
    }
  }
  
  // Mostrar spinner enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login Administrativo</CardTitle>
          <CardDescription>Entre com suas credenciais para acessar o painel administrativo</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm font-medium text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <p className="text-sm text-muted-foreground">
            Este é um painel administrativo protegido. Apenas usuários autorizados podem acessar.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

