"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-[#00205B] text-white py-2 relative">
      <div className="container text-center text-sm">
        <span className="font-medium">Oferta Especial:</span> Assine hoje e ganhe 30 dias de Paramount+ grátis!{" "}
        <Link href="#contact" className="underline font-medium">
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
}

