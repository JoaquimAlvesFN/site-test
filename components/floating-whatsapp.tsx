"use client"

import { useState } from "react"
import Link from "next/link"
import { Zap, X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useQuery } from "@tanstack/react-query"
import { supabaseQueries } from "@/lib/supabase-queries"

function handleWhatsAppClick() {
  toast({
    title: "Redirecionando para WhatsApp",
    description: "Você será redirecionado para o WhatsApp para falar com um consultor.",
  })
}

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: settings } = useQuery(supabaseQueries.getSettings)
  const whatsappNumber = settings?.footer_contact_whatsapp || "5511999999999"

  return (
    <div className="fixed bottom-10 right-4 z-50 mb-4 p-4 rounded-lg w-25">
      {/* {isOpen && (
        <div className="mb-4 p-4 bg-white rounded-lg shadow-lg w-64 border border-gray-200 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="font-medium mb-2">Olá! 👋</p>
          <p className="text-sm text-gray-600 mb-3">
            Quer saber mais sobre os pacotes SKY? Fale com um de nossos consultores.
          </p>
          
        </div>
      )} */}
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        aria-label="WhatsApp"
      > */}
        <Link
            href={`https://wa.me/${whatsappNumber}?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20pacotes%20SKY`}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2 text-sm"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
          >
            <Zap className="h-4 w-4" />
          </Link>
      {/* </button> */}
    </div>
  )
}

