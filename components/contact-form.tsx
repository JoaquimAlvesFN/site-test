"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { saveContact } from "@/app/actions"
import { toast } from "@/components/ui/use-toast"

interface ContactFormProps {
  packageId?: number
  defaultInterest?: "tv" | "internet" | "combo"
  onSuccess?: () => void
}

export function ContactForm({ packageId, defaultInterest = "tv", onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    cep: "",
    interest: defaultInterest,
    packageId: packageId,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await saveContact(formData)

      if (result.success) {
        toast({
          title: "Solicitação enviada com sucesso!",
          description: "Recebemos sua solicitação e entraremos em contato em breve.",
          variant: "default",
        })

        // Limpar formulário
        setFormData({
          name: "",
          phone: "",
          email: "",
          cep: "",
          interest: defaultInterest,
          packageId: packageId,
        })

        // Callback de sucesso
        if (onSuccess) {
          onSuccess()
        }
      } else {
        toast({
          title: "Erro",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="block text-sm font-medium mb-1">
          Nome Completo
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Seu nome"
          required
        />
      </div>
      <div>
        <Label htmlFor="phone" className="block text-sm font-medium mb-1">
          Telefone
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="(00) 00000-0000"
          required
        />
      </div>
      <div>
        <Label htmlFor="email" className="block text-sm font-medium mb-1">
          E-mail
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="seu@email.com"
        />
      </div>
      <div>
        <Label htmlFor="cep" className="block text-sm font-medium mb-1">
          CEP
        </Label>
        <Input
          id="cep"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="00000-000"
          required
        />
      </div>
      <div>
        <Label htmlFor="interest" className="block text-sm font-medium mb-1">
          Interesse
        </Label>
        <select
          id="interest"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="tv">TV por Assinatura</option>
          <option value="internet">Internet</option>
          <option value="combo">Combo (TV + Internet)</option>
        </select>
      </div>
      <Button type="submit" className="w-full bg-[#E30613] hover:bg-[#c00511]" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Solicitar Contato"}
      </Button>
      <p className="text-xs text-muted-foreground text-center mt-4">
        Ao enviar, você concorda com nossa política de privacidade e termos de uso.
      </p>
    </form>
  )
}

