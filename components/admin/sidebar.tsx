"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Tv,
  MessageSquare,
  Users,
  Image,
  Settings,
  LogOut,
  ExternalLink,
  PhoneCall,
  FootprintsIcon,
  ImageIcon,
  Building,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { user, logout } = useAuth()

  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Página Inicial",
      href: "/admin/homepage",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Pacotes",
      href: "/admin/packages",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Canais",
      href: "/admin/channels",
      icon: <Tv className="h-5 w-5" />,
    },
    {
      title: "FAQs",
      href: "/admin/faqs",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Depoimentos",
      href: "/admin/testimonials",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Slides",
      href: "/admin/slides",
      icon: <Image className="h-5 w-5" />,
    },
    {
      title: "Contatos",
      href: "/admin/contacts",
      icon: <PhoneCall className="h-5 w-5" />,
    },
    {
      title: "Imagens",
      href: "/admin/images",
      icon: <ImageIcon className="h-5 w-5" />,
    },
    {
      title: "Rodapé",
      href: "/admin/footer",
      icon: <FootprintsIcon className="h-5 w-5" />,
    },
    {
      title: "Institucional",
      href: "/admin/institucional",
      icon: <Building className="h-5 w-5" />,
    },
    {
      title: "Configurações",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  async function handleLogout() {
    try {
      if (isLoggingOut) return; // Evitar múltiplos cliques
      
      setIsLoggingOut(true);
      
      // Usar a função de logout do contexto
      await logout();
      
      // O redirecionamento é feito dentro da função logout do contexto
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Erro ao fazer logout. Por favor, tente novamente.");
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="w-64 bg-[#00205B] text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-[#00205B]/20">
        <h2 className="text-xl font-bold">SKY Pacotes</h2>
        <p className="text-sm text-white/70">Painel Administrativo</p>
        {user && (
          <p className="text-xs mt-2 text-white/50 truncate">
            {user.email}
          </p>
        )}
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-[#00205B]/20 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Ver Site</span>
        </Link>

        <Button
          variant="ghost"
          className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>
        </Button>
      </div>
    </div>
  )
}

