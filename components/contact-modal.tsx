"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ContactForm } from "@/components/contact-form"
import { toast } from "@/components/ui/use-toast"

interface ContactModalProps {
  trigger: React.ReactNode
  title?: string
  description?: string
  packageId?: number
  defaultInterest?: "tv" | "internet" | "combo"
}

export function ContactModal({
  trigger,
  title = "Solicitar Contato",
  description = "Preencha o formulário abaixo e entraremos em contato o mais breve possível.",
  packageId,
  defaultInterest = "tv",
}: ContactModalProps) {
  const [open, setOpen] = useState(false)

  function handleSuccess() {
    // Mostrar toast de sucesso
    toast({
      title: "Solicitação enviada com sucesso!",
      description: "Nossa equipe entrará em contato com você em breve.",
      variant: "default",
    })

    // Fechar o modal após envio bem-sucedido
    setTimeout(() => {
      setOpen(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ContactForm packageId={packageId} defaultInterest={defaultInterest} onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

