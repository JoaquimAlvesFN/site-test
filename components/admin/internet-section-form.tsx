"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Plus, Trash2 } from "lucide-react"
import { getInternetSection, updateInternetSection } from "@/app/admin/actions"
import { ImageSelector } from "./image-selector"
import type { InternetSectionData } from "@/lib/db"

export function InternetSectionForm() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<InternetSectionData | null>(null)
  const [features, setFeatures] = useState<string[]>([])

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getInternetSection()
        setFormData(data)
        setFeatures(data.features as string[])
      } catch (error) {
        console.error("Erro ao carregar dados da seção de internet:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados da seção de internet.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  function handleChange(field: keyof InternetSectionData, value: any) {
    if (!formData) return
    setFormData({ ...formData, [field]: value })
  }

  function handleFeatureChange(index: number, value: string) {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  function addFeature() {
    setFeatures([...features, ""])
  }

  function removeFeature(index: number) {
    const newFeatures = [...features]
    newFeatures.splice(index, 1)
    setFeatures(newFeatures)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData) return

    setIsSubmitting(true)

    try {
      // Atualizar o formData com os recursos atualizados
      const updatedData = {
        ...formData,
        features: features.filter((f) => f.trim() !== ""),
      }

      await updateInternetSection(updatedData)

      toast({
        title: "Seção atualizada com sucesso!",
        description: "A seção de internet foi atualizada na página inicial.",
      })
    } catch (error) {
      console.error("Erro ao salvar seção de internet:", error)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar a seção de internet.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading || !formData) {
    return <div className="text-center py-4">Carregando dados...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
            required
          />
        </div>

        <div>
          <Label>Imagem</Label>
          <ImageSelector value={formData.image} onChange={(value) => handleChange("image", value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Preço</Label>
            <Input id="price" value={formData.price} onChange={(e) => handleChange("price", e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="speedBadge">Badge de Velocidade</Label>
            <Input
              id="speedBadge"
              value={formData.speedBadge}
              onChange={(e) => handleChange("speedBadge", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cta">Texto do Botão</Label>
            <Input id="cta" value={formData.cta} onChange={(e) => handleChange("cta", e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="ctaLink">Link do Botão</Label>
            <Input
              id="ctaLink"
              value={formData.ctaLink}
              onChange={(e) => handleChange("ctaLink", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="active"
            checked={formData.active}
            onCheckedChange={(checked) => handleChange("active", checked)}
          />
          <Label htmlFor="active">Seção ativa</Label>
        </div>

        <div>
          <Label>Características</Label>
          <div className="space-y-2 mt-2">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`Característica ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeFeature(index)}
                  className="flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFeature} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Característica
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}

