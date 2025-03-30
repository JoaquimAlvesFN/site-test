"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Plus, Trash2 } from "lucide-react"
import { getBusinessSection, updateBusinessSection } from "@/app/admin/actions"
import { ImageSelector } from "./image-selector"
import type { BusinessSectionData } from "@/lib/db"

export function BusinessSectionForm() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<BusinessSectionData | null>(null)
  const [features, setFeatures] = useState<{ icon: string; title: string; description: string }[]>([])
  const [benefits, setBenefits] = useState<string[]>([])

  // Ícones disponíveis
  const availableIcons = [
    "Building2",
    "Users",
    "BarChart",
    "Shield",
    "Play",
    "Tv",
    "MapPin",
    "Wifi",
    "Zap",
    "Clock",
    "Check",
    "Award",
    "Star",
    "Heart",
    "ThumbsUp",
    "Gift",
  ]

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getBusinessSection() || [];
        setFormData(data)
        setFeatures(data.features as { icon: string; title: string; description: string }[])
        setBenefits(data.benefits as string[])
      } catch (error) {
        console.error("Erro ao carregar dados da seção de negócios:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados da seção de negócios.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  function handleChange(field: keyof BusinessSectionData, value: any) {
    if (!formData) return
    setFormData({ ...formData, [field]: value })
  }

  function handleFeatureChange(index: number, field: keyof (typeof features)[0], value: string) {
    const newFeatures = [...features]
    newFeatures[index] = { ...newFeatures[index], [field]: value }
    setFeatures(newFeatures)
  }

  function addFeature() {
    setFeatures([...features, { icon: "Building2", title: "", description: "" }])
  }

  function removeFeature(index: number) {
    const newFeatures = [...features]
    newFeatures.splice(index, 1)
    setFeatures(newFeatures)
  }

  function handleBenefitChange(index: number, value: string) {
    const newBenefits = [...benefits]
    newBenefits[index] = value
    setBenefits(newBenefits)
  }

  function addBenefit() {
    setBenefits([...benefits, ""])
  }

  function removeBenefit(index: number) {
    const newBenefits = [...benefits]
    newBenefits.splice(index, 1)
    setBenefits(newBenefits)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData) return

    setIsSubmitting(true)

    try {
      // Atualizar o formData com os recursos e benefícios atualizados
      const updatedData = {
        ...formData,
        features: features.filter((f) => f.title.trim() !== ""),
        benefits: benefits.filter((b) => b.trim() !== ""),
      }

      await updateBusinessSection(updatedData)

      toast({
        title: "Seção atualizada com sucesso!",
        description: "A seção de negócios foi atualizada na página inicial.",
      })
    } catch (error) {
      console.error("Erro ao salvar seção de negócios:", error)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar a seção de negócios.",
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
          <Label>Recursos</Label>
          <div className="space-y-4 mt-2">
            {features.map((feature, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Recurso #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                </div>

                <div>
                  <Label htmlFor={`feature-title-${index}`}>Título</Label>
                  <Input
                    id={`feature-title-${index}`}
                    value={feature.title}
                    onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`feature-description-${index}`}>Descrição</Label>
                  <Input
                    id={`feature-description-${index}`}
                    value={feature.description}
                    onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`feature-icon-${index}`}>Ícone</Label>
                  <Select value={feature.icon} onValueChange={(value) => handleFeatureChange(index, "icon", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um ícone" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableIcons.map((icon) => (
                        <SelectItem key={icon} value={icon}>
                          {icon}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFeature} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Recurso
            </Button>
          </div>
        </div>

        <div>
          <Label>Benefícios</Label>
          <div className="space-y-2 mt-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                  placeholder={`Benefício ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeBenefit(index)}
                  className="flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addBenefit} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Benefício
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

