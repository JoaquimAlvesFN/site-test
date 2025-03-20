"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getAllSettings } from "@/app/admin/actions"

interface DynamicLogoProps {
  type: "header" | "footer"
  fallbackSrc: string
  className?: string
}

export function DynamicLogo({ type, fallbackSrc, className = "h-10 w-auto" }: DynamicLogoProps) {
  const [logoSrc, setLogoSrc] = useState(fallbackSrc)

  useEffect(() => {
    async function loadLogo() {
      try {
        const settings = await getAllSettings()
        const settingKey = type === "header" ? "header_logo" : "footer_logo"

        if (settings[settingKey] && settings[settingKey].trim() !== "") {
          setLogoSrc(settings[settingKey])
        }
      } catch (error) {
        console.error(`Error loading ${type} logo:`, error)
        // Em caso de erro, manter o fallback
      }
    }

    loadLogo()
  }, [type, fallbackSrc])

  return (
    <Image
      src={logoSrc || "/placeholder.svg"}
      alt="Sky Logo"
      width={120}
      height={40}
      className={className}
      priority={type === "header"}
    />
  )
}

