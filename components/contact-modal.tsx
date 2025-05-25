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
import { PessoaFisicaForm } from "@/components/pessoa-fisica-form"
import { PessoaJuridicaForm } from "@/components/pessoa-juridica-form"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ContactModalProps {
  trigger: React.ReactNode
  title?: string
  description?: string
  packageId?: number
  defaultInterest?: "tv" | "internet" | "combo"
  produto?: string
  tipoPessoa?: 'fisica' | 'juridica'
}

export function ContactModal({
  trigger,
  title = "Solicitar Contato",
  description = "Preencha o formulário abaixo e entraremos em contato o mais breve possível.",
  packageId,
  defaultInterest = "tv",
  produto,
  tipoPessoa: initialTipoPessoa,
}: ContactModalProps) {
  const [open, setOpen] = useState(false)
  const [tipoPessoa, setTipoPessoa] = useState<'fisica' | 'juridica'>(initialTipoPessoa || 'fisica')

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
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <Tabs value={tipoPessoa} onValueChange={(value) => setTipoPessoa(value as 'fisica' | 'juridica')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fisica">Pessoa Física</TabsTrigger>
              <TabsTrigger value="juridica">Pessoa Jurídica</TabsTrigger>
            </TabsList>
          </Tabs>
        </DialogHeader>
        <div className="py-4 max-h-[70vh] overflow-y-auto">
          {tipoPessoa === 'juridica' ? (
            <PessoaJuridicaForm onSuccess={handleSuccess} produto={produto} />
          ) : (
            <PessoaFisicaForm onSuccess={handleSuccess} produto={produto} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

