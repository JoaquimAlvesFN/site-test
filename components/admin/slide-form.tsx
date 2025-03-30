"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { HeroSlide } from "@/lib/db"
import { createHeroSlide, updateHeroSlide } from "@/app/admin/actions"
import { toast } from "@/components/ui/use-toast"
import { ImageSelector } from "./image-selector"

interface SlideFormProps {
  slideData?: HeroSlide
}

export function SlideForm({ slideData }: SlideFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [features, setFeatures] = useState<string[]>((slideData?.features as string[]) || [""])

  const [formData, setFormData] = useState({
    title: slideData?.title || "",
    subtitle: slideData?.subtitle || "",
    price: slideData?.price || "",
    cta: slideData?.cta || "Assine já",
    image: slideData?.image || "/placeholder.svg?height=600&width=800",
    tag: slideData?.tag || "",
    speedBadge: slideData?.speedBadge || "",
    order: slideData?.order || 1,
    active: slideData?.active ?? true,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSwitchChange(name: string, checked: boolean) {
    setFormData((prev) => ({ ...prev, [name]: checked }))
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

  function handleImageChange(url: string) {
    setFormData((prev) => ({ ...prev, image: url }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Filter out empty features
      const filteredFeatures = features.filter((f) => f.trim() !== "")

      const slidePayload = {
        ...formData,
        features: filteredFeatures.join(','),
      }

      if (slideData?.id) {
        await updateHeroSlide(slideData.id, slidePayload)
        toast({
          title: "Slide atualizado com sucesso!",
          description: `O slide "${formData.title}" foi atualizado e já está disponível no carrossel da página inicial.`,
        })
      } else {
        await createHeroSlide(slidePayload)
        toast({
          title: "Slide criado com sucesso!",
          description: `O slide "${formData.title}" foi criado e já está disponível no carrossel da página inicial.`,
        })
      }

      router.push("/admin/slides")
      router.refresh()
    } catch (error) {
      console.error("Failed to save slide:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="subtitle">Subtítulo</Label>
          <Input id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="price">Preço</Label>
          <Input id="price" name="price" value={formData.price} onChange={handleChange} required />
          <p className="text-sm text-muted-foreground mt-1">Formato: 89,90 (sem o R$)</p>
        </div>

        <div>
          <Label htmlFor="cta">Texto do Botão</Label>
          <Input id="cta" name="cta" value={formData.cta} onChange={handleChange} required />
        </div>

        <div>
          <Label>Imagem</Label>
          <div className="mt-1">
            <ImageSelector value={formData.image} onChange={handleImageChange} />
          </div>
        </div>

        <div>
          <Label htmlFor="tag">Tag (opcional)</Label>
          <Input id="tag" name="tag" value={formData.tag} onChange={handleChange} placeholder="OFERTA LIMITADA" />
        </div>

        <div>
          <Label htmlFor="speedBadge">Badge de Velocidade (opcional)</Label>
          <Input
            id="speedBadge"
            name="speedBadge"
            value={formData.speedBadge}
            onChange={handleChange}
            placeholder="300 Mega"
          />
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
          <Switch
            id="active"
            checked={formData.active}
            onCheckedChange={(checked) => handleSwitchChange("active", checked)}
          />
          <Label htmlFor="active">Slide ativo</Label>
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
                  disabled={features.length <= 1}
                >
                  -
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFeature} className="w-full">
              Adicionar Característica
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/slides")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}

