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
import { Plus, Trash2, MoveUp, MoveDown } from "lucide-react"
import { getWhyChooseFeatures, createWhyChooseFeature, updateWhyChooseFeature } from "@/app/admin/actions"
import type { WhyChooseFeature } from "@/lib/db"

export function WhyChooseFeaturesForm() {
  const [isLoading, setIsLoading] = useState(true)
  const [features, setFeatures] = useState<WhyChooseFeature[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Ícones disponíveis
  const availableIcons = [
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
    "Headphones",
    "Phone",
  ]

  useEffect(() => {
    async function loadFeatures() {
      try {
        const data = await getWhyChooseFeatures()
        setFeatures(data)
      } catch (error) {
        console.error("Erro ao carregar recursos:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os recursos.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadFeatures()
  }, [])

  function handleChange(id: number, field: keyof WhyChooseFeature, value: any) {
    setFeatures((prev) => prev.map((feature) => (feature.id === id ? { ...feature, [field]: value } : feature)))
  }

  function addFeature() {
    // Encontrar a maior ordem atual
    const maxOrder = features.length > 0 ? Math.max(...features.map((f) => f.order)) : 0

    // Criar um novo recurso com ID temporário negativo
    const newFeature: WhyChooseFeature = {
      id: -Date.now(), // ID temporário negativo
      title: "",
      description: "",
      icon: "Shield",
      order: maxOrder + 1,
      active: true,
      updatedAt: new Date().toISOString(),
    }

    setFeatures((prev) => [...prev, newFeature])
  }

  function removeFeature(id: number) {
    setFeatures((prev) => prev.filter((feature) => feature.id !== id))
  }

  function moveFeature(id: number, direction: "up" | "down") {
    setFeatures((prev) => {
      const index = prev.findIndex((feature) => feature.id === id)
      if (index === -1) return prev

      const newFeatures = [...prev]

      if (direction === "up" && index > 0) {
        // Trocar com o item anterior
        const temp = { ...newFeatures[index] }
        newFeatures[index] = { ...newFeatures[index - 1], order: temp.order }
        newFeatures[index - 1] = { ...temp, order: newFeatures[index].order }
        return newFeatures.sort((a, b) => a.order - b.order)
      }

      if (direction === "down" && index < prev.length - 1) {
        // Trocar com o próximo item
        const temp = { ...newFeatures[index] }
        newFeatures[index] = { ...newFeatures[index + 1], order: temp.order }
        newFeatures[index + 1] = { ...temp, order: newFeatures[index].order }
        return newFeatures.sort((a, b) => a.order - b.order)
      }

      return prev
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Processar cada recurso
      for (const feature of features) {
        if (feature.id < 0) {
          // Novo recurso (ID temporário negativo)
          const { id, ...featureData } = feature
          await createWhyChooseFeature(featureData)
        } else {
          // Recurso existente
          await updateWhyChooseFeature(feature.id, feature)
        }
      }

      // Recarregar os recursos após salvar
      const updatedFeatures = await getWhyChooseFeatures()
      setFeatures(updatedFeatures)

      toast({
        title: "Recursos salvos com sucesso!",
        description: "Os recursos foram atualizados na página inicial.",
      })
    } catch (error) {
      console.error("Erro ao salvar recursos:", error)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar os recursos.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="text-center py-4">Carregando recursos...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {features.map((feature) => (
          <div key={feature.id} className="border p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Recurso #{feature.order}</h3>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => moveFeature(feature.id, "up")}
                  disabled={features.indexOf(feature) === 0}
                >
                  <MoveUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => moveFeature(feature.id, "down")}
                  disabled={features.indexOf(feature) === features.length - 1}
                >
                  <MoveDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeFeature(feature.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor={`title-${feature.id}`}>Título</Label>
              <Input
                id={`title-${feature.id}`}
                value={feature.title}
                onChange={(e) => handleChange(feature.id, "title", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor={`description-${feature.id}`}>Descrição</Label>
              <Textarea
                id={`description-${feature.id}`}
                value={feature.description}
                onChange={(e) => handleChange(feature.id, "description", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`icon-${feature.id}`}>Ícone</Label>
                <Select value={feature.icon} onValueChange={(value) => handleChange(feature.id, "icon", value)}>
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

              <div className="flex items-center space-x-2 pt-8">
                <Switch
                  id={`active-${feature.id}`}
                  checked={feature.active}
                  onCheckedChange={(checked) => handleChange(feature.id, "active", checked)}
                />
                <Label htmlFor={`active-${feature.id}`}>Ativo</Label>
              </div>
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addFeature} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Recurso
        </Button>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}

