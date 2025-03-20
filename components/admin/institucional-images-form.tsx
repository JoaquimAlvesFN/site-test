"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { ImageSelector } from "./image-selector"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function InstitucionalImagesForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Dados de exemplo para o formulário
  const [heroImages, setHeroImages] = useState({
    mainImage: "/placeholder.svg?height=600&width=800",
    mainImageAlt: "SKY Sede",
    mainImageCaption: "Sede SKY Brasil",
    mainImageLocation: "São Paulo, SP",
  })

  const [aboutImages, setAboutImages] = useState({
    image1: "/placeholder.svg?height=300&width=300",
    image1Alt: "Escritório SKY",
    image2: "/placeholder.svg?height=300&width=300",
    image2Alt: "Equipe SKY",
    image3: "/placeholder.svg?height=620&width=300",
    image3Alt: "Central de Operações SKY",
  })

  const [facilitiesImages, setFacilitiesImages] = useState([
    {
      id: 1,
      image: "/placeholder.svg?height=400&width=600",
      alt: "Sede Corporativa",
      title: "Sede Corporativa",
      location: "São Paulo, SP",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=400&width=600",
      alt: "Centro de Operações",
      title: "Centro de Operações",
      location: "Rio de Janeiro, RJ",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=400&width=600",
      alt: "Centro de Distribuição",
      title: "Centro de Distribuição",
      location: "Barueri, SP",
    },
    {
      id: 4,
      image: "/placeholder.svg?height=400&width=600",
      alt: "Centro de Tecnologia",
      title: "Centro de Tecnologia",
      location: "Campinas, SP",
    },
    {
      id: 5,
      image: "/placeholder.svg?height=400&width=600",
      alt: "Central de Atendimento",
      title: "Central de Atendimento",
      location: "Salvador, BA",
    },
    {
      id: 6,
      image: "/placeholder.svg?height=400&width=600",
      alt: "Escritório Regional",
      title: "Escritório Regional",
      location: "Recife, PE",
    },
  ])

  function handleHeroChange(field: string, value: string) {
    setHeroImages((prev) => ({ ...prev, [field]: value }))
  }

  function handleAboutChange(field: string, value: string) {
    setAboutImages((prev) => ({ ...prev, [field]: value }))
  }

  function handleFacilityChange(id: number, field: string, value: string) {
    setFacilitiesImages((prev) =>
      prev.map((facility) => (facility.id === id ? { ...facility, [field]: value } : facility)),
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulação de envio de dados
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Imagens salvas com sucesso!",
        description: "As imagens da página institucional foram atualizadas.",
      })
    } catch (error) {
      console.error("Erro ao salvar imagens:", error)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as imagens.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="hero">Imagem Principal</TabsTrigger>
          <TabsTrigger value="about">Seção Sobre</TabsTrigger>
          <TabsTrigger value="facilities">Instalações</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <div>
            <Label>Imagem Principal</Label>
            <ImageSelector value={heroImages.mainImage} onChange={(value) => handleHeroChange("mainImage", value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="mainImageAlt">Texto Alternativo</Label>
              <Input
                id="mainImageAlt"
                value={heroImages.mainImageAlt}
                onChange={(e) => handleHeroChange("mainImageAlt", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="mainImageCaption">Legenda</Label>
              <Input
                id="mainImageCaption"
                value={heroImages.mainImageCaption}
                onChange={(e) => handleHeroChange("mainImageCaption", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="mainImageLocation">Localização</Label>
              <Input
                id="mainImageLocation"
                value={heroImages.mainImageLocation}
                onChange={(e) => handleHeroChange("mainImageLocation", e.target.value)}
                required
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Imagem 1</Label>
              <ImageSelector value={aboutImages.image1} onChange={(value) => handleAboutChange("image1", value)} />
              <div className="mt-2">
                <Label htmlFor="image1Alt">Texto Alternativo</Label>
                <Input
                  id="image1Alt"
                  value={aboutImages.image1Alt}
                  onChange={(e) => handleAboutChange("image1Alt", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Imagem 2</Label>
              <ImageSelector value={aboutImages.image2} onChange={(value) => handleAboutChange("image2", value)} />
              <div className="mt-2">
                <Label htmlFor="image2Alt">Texto Alternativo</Label>
                <Input
                  id="image2Alt"
                  value={aboutImages.image2Alt}
                  onChange={(e) => handleAboutChange("image2Alt", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Imagem 3</Label>
              <ImageSelector value={aboutImages.image3} onChange={(value) => handleAboutChange("image3", value)} />
              <div className="mt-2">
                <Label htmlFor="image3Alt">Texto Alternativo</Label>
                <Input
                  id="image3Alt"
                  value={aboutImages.image3Alt}
                  onChange={(e) => handleAboutChange("image3Alt", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-6">
          {facilitiesImages.map((facility) => (
            <div key={facility.id} className="border p-4 rounded-lg space-y-4">
              <h3 className="font-medium">Instalação {facility.id}</h3>

              <div>
                <Label>Imagem</Label>
                <ImageSelector
                  value={facility.image}
                  onChange={(value) => handleFacilityChange(facility.id, "image", value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`alt-${facility.id}`}>Texto Alternativo</Label>
                  <Input
                    id={`alt-${facility.id}`}
                    value={facility.alt}
                    onChange={(e) => handleFacilityChange(facility.id, "alt", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`title-${facility.id}`}>Título</Label>
                  <Input
                    id={`title-${facility.id}`}
                    value={facility.title}
                    onChange={(e) => handleFacilityChange(facility.id, "title", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`location-${facility.id}`}>Localização</Label>
                  <Input
                    id={`location-${facility.id}`}
                    value={facility.location}
                    onChange={(e) => handleFacilityChange(facility.id, "location", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}

