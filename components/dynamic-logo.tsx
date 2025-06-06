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
  return (
    <Image
      src="/logo-sky.png"
      alt="Sky Logo"
      width={120}
      height={40}
      className={className}
      priority={true}
    />
  )
}

