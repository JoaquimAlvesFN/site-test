import type React from "react"
import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if we're on the client side
  const isClient = typeof window !== "undefined"

  // Only check for login page on client side
  const isLoginPage = isClient ? window.location.pathname === "/admin/login" : false

  // Skip auth check for login page
  if (isClient && !isLoginPage && !isAuthenticated()) {
    redirect("/admin/login")
  }

  // For login page, render without layout
  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-auto">{children}</div>
    </div>
  )
}

