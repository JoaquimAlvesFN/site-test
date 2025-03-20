"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

// Adicionar a importação das ações do servidor
import { createTestimonial, updateTestimonial } from "@/app/admin/actions"

interface TestimonialFormProps {
  testimonialData?: {
    id?: number
    quote: string
    author: string
    role: string
    rating: number
    active: boolean
  }
}

export function TestimonialForm({ testimonialData }: TestimonialFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    quote: testimonialData?.quote || "",
    author: testimonialData?.author || "",
    role: testimonialData?.role || "",
    rating: testimonialData?.rating || 5,
    active: testimonialData?.active ?? true,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleRatingChange(value: string) {
    setFormData((prev) => ({ ...prev, rating: Number.parseInt(value) }))
  }

  function handleSwitchChange(checked: boolean) {
    setFormData((prev) => ({ ...prev, active: checked }))
  }

  // Modificar a função handleSubmit para chamar as ações do servidor
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const testimonialPayload = {
        ...formData,
      }

      if (testimonialData?.id) {
        await updateTestimonial(testimonialData.id, testimonialPayload)
        toast({
          title: "Depoimento atualizado com sucesso!",
          description: `O depoimento de "${formData.author}" foi atualizado e já está disponível no site.`,
        })
      } else {
        await createTestimonial(testimonialPayload)
        toast({
          title: "Depoimento criado com sucesso!",
          description: `O depoimento de "${formData.author}" foi criado e já está disponível no site.`,
        })
      }

      router.push("/admin/testimonials")
      router.refresh()
    } catch (error) {
      console.error("Failed to save testimonial:", error)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o depoimento.",
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
          <Label htmlFor="quote">Depoimento</Label>
          <Textarea id="quote" name="quote" value={formData.quote} onChange={handleChange} rows={4} required />
        </div>

        <div>
          <Label htmlFor="author">Nome do Cliente</Label>
          <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="role">Tipo de Cliente</Label>
          <Input
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Ex: Cliente SKY Plus"
            required
          />
        </div>

        <div>
          <Label>Avaliação</Label>
          <RadioGroup
            value={formData.rating.toString()}
            onValueChange={handleRatingChange}
            className="flex space-x-4 mt-2"
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                <Label htmlFor={`rating-${rating}`}>
                  {rating} {rating === 1 ? "estrela" : "estrelas"}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="active" checked={formData.active} onCheckedChange={handleSwitchChange} />
          <Label htmlFor="active">Depoimento ativo</Label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/testimonials")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}

