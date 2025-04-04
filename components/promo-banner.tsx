"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { getAllSettings } from "@/app/admin/actions"

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const [settings, setSettings] = useState({
    promo_banner_text: "",
    promo_banner_link: "",
    promo_banner_active: "false"
  })

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getAllSettings()
        
        setSettings({
          promo_banner_text: data.promo_banner_text || "",
          promo_banner_link: data.promo_banner_link || "",
          promo_banner_active: data.promo_banner_active || "false"
        })
      } catch (error) {
        console.error("Error loading promo banner settings:", error)
      }
    }

    loadSettings()
  }, [])

  return (
    // {settings?.promo_banner_active === "true" && (
    settings?.promo_banner_active === "true" && (
      <div className="bg-[#00205B] text-white py-2 relative">
        <div className="container text-center text-sm">
          <span className="font-medium">{settings?.promo_banner_text}</span>{" "}
          <Link href={settings?.promo_banner_link || "#contact"} className="underline font-medium">
            Saiba mais
          </Link>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
          aria-label="Fechar banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
    // )} 
  )
}

