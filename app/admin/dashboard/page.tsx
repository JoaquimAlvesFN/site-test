"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Package, Tv, MessageSquare, Image, Users } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function AdminDashboard() {
  const { user } = useAuth();

  // Inicializar contadores com valores padrão
  // const stats = [
  //   {
  //     title: "Pacotes",
  //     value: 6,
  //     icon: <Package className="h-5 w-5" />,
  //     href: "/admin/packages",
  //     color: "bg-blue-500",
  //   },
  //   {
  //     title: "Canais",
  //     value: 6,
  //     icon: <Tv className="h-5 w-5" />,
  //     href: "/admin/channels",
  //     color: "bg-green-500",
  //   },
  //   {
  //     title: "FAQs",
  //     value: 5,
  //     icon: <MessageSquare className="h-5 w-5" />,
  //     href: "/admin/faqs",
  //     color: "bg-purple-500",
  //   },
  //   {
  //     title: "Depoimentos",
  //     value: 4,
  //     icon: <Users className="h-5 w-5" />,
  //     href: "/admin/testimonials",
  //     color: "bg-yellow-500",
  //   },
  //   {
  //     title: "Slides",
  //     value: 3,
  //     icon: <Image className="h-5 w-5" />,
  //     href: "/admin/slides",
  //     color: "bg-red-500",
  //   },
  // ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <p className="text-muted-foreground">Gerencie o conteúdo do site SKY Pacotes</p>
        {user && (
          <p className="text-sm mt-2 text-green-600">
            Conectado como: <span className="font-medium">{user.email}</span>
          </p>
        )}
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className={`${stat.color} text-white rounded-t-lg p-4`}>{stat.icon}</CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-2xl">{stat.value}</CardTitle>
                <CardDescription>{stat.title}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Guia Rápido</CardTitle>
            <CardDescription>Como gerenciar o conteúdo do site</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              <li>Use o menu lateral para navegar entre as seções</li>
              <li>Adicione, edite ou remova conteúdo em cada seção</li>
              <li>As alterações são aplicadas imediatamente no site</li>
              <li>Você pode visualizar o site a qualquer momento clicando em "Ver Site"</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações Gerais</CardTitle>
            <CardDescription>Ajuste as configurações globais do site</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between py-2 border-b">
                <span>Informações de Contato</span>
                <Link href="/admin/settings" className="text-sm bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded">
                  Editar
                </Link>
              </li>
              <li className="flex items-center justify-between py-2 border-b">
                <span>Banner Promocional</span>
                <Link href="/admin/settings" className="text-sm bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded">
                  Editar
                </Link>
              </li>
              <li className="flex items-center justify-between py-2">
                <span>Redes Sociais</span>
                <Link href="/admin/settings" className="text-sm bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded">
                  Editar
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 