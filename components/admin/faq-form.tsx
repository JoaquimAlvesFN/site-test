"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

// Adicionar a importação das ações do servidor
import { createFaq, updateFaq } from "@/app/admin/actions"

interface FaqFormProps {
  faqData?: {
    id?: number
    question: string
    answer: string
    order: number
    active: boolean
  }
}

export function FaqForm({ faqData }: FaqFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    question: faqData?.question || "",
    answer: faqData?.answer || "",
    order: faqData?.order || 1,
    active: faqData?.active ?? true,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSwitchChange(checked: boolean) {
    setFormData((prev) => ({ ...prev, active: checked }))
  }

  // Modificar a função handleSubmit para chamar as ações do servidor
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const faqPayload = {
        ...formData,
        order: parseInt(formData.order.toString()),
      }

      if (faqData?.id) {
        await updateFaq(faqData.id, faqPayload)
        toast({
          title: "Pergunta atualizada com sucesso!",
          description: "A pergunta frequente foi atualizada e já está disponível no site.",
        })
      } else {
        await createFaq(faqPayload)
        toast({
          title: "Pergunta criada com sucesso!",
          description: "A pergunta frequente foi criada e já está disponível no site.",
        })
      }

      router.push("/admin/faqs")
      router.refresh()
    } catch (error) {
      console.error("Failed to save FAQ:", error)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar a pergunta.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="question">Pergunta</Label>
          <Input id="question" name="question" value={formData.question} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="answer">Resposta</Label>
          <Textarea id="answer" name="answer" value={formData.answer} onChange={handleChange} rows={5} required />
        </div>

        <div>
          <Label htmlFor="order">Ordem</Label>
          <Input
            id="order"
            name="order"
            type="number"
            value={formData.order}
            onChange={handleChange}
            required
            min={1}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="active" checked={formData.active} onCheckedChange={handleSwitchChange} />
          <Label htmlFor="active">Pergunta ativa</Label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/faqs")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}

