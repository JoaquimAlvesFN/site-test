"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { ImageSelector } from "./image-selector"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  getCompanyInfo, 
  updateCompanyInfo, 
  getCompanyFacilities, 
  updateCompanyFacility,
  getAllSettings,
  updateSetting
} from "@/app/admin/actions"

// Define facility type based on the database model
type Facility = {
  id: number
  image: string
  alt: string
  title: string
  location: string
  order: number
  active: boolean
  updatedAt: string
}

export function InstitucionalImagesForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // State data for the form
  const [heroImages, setHeroImages] = useState({
    heroImage: "/placeholder.svg?height=600&width=800",
    heroImageAlt: "SKY Sede",
    heroImageCaption: "Sede SKY Brasil",
    heroImageLocation: "São Paulo, SP",
  })

  const [aboutImages, setAboutImages] = useState({
    image1: "/placeholder.svg?height=300&width=300",
    image1Alt: "Escritório SKY",
    image2: "/placeholder.svg?height=300&width=300",
    image2Alt: "Equipe SKY",
    image3: "/placeholder.svg?height=620&width=300",
    image3Alt: "Central de Operações SKY",
  })

  const [facilitiesImages, setFacilitiesImages] = useState<Facility[]>([])

  // Fetch data from the database on component mount
  useEffect(() => {
    async function loadData() {
      try {
        // Fetch company info
        const companyInfoData = await getCompanyInfo()
        
        if (companyInfoData) {
          setHeroImages({
            heroImage: companyInfoData.heroImage || "/placeholder.svg?height=600&width=800",
            heroImageAlt: companyInfoData.heroImageAlt || "SKY Sede",
            heroImageCaption: companyInfoData.heroImageCaption || "Sede SKY Brasil",
            heroImageLocation: companyInfoData.heroImageLocation || "São Paulo, SP",
          })
        }

        // Fetch about section images from settings
        const settingsData = await getAllSettings()
        if (settingsData) {
          setAboutImages({
            image1: settingsData.aboutImage1,
            image1Alt: settingsData.aboutImage1Alt,
            image2: settingsData.aboutImage2,
            image2Alt: settingsData.aboutImage2Alt,
            image3: settingsData.aboutImage3,
            image3Alt: settingsData.aboutImage3Alt,
          })
        }

        // Fetch facilities
        const facilitiesData = await getCompanyFacilities()
        if (facilitiesData && facilitiesData.length > 0) {
          setFacilitiesImages(facilitiesData)
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading institutional data:", error)
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar as informações institucionais.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

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

    const heroData: any = {}
      // if (heroImages.heroImage) {
        heroData.heroImage = heroImages.heroImage
        // heroData.heroImageAlt = heroImages.heroImageAlt
        // heroData.heroImageCaption = heroImages.heroImageCaption
        // heroData.heroImageLocation = heroImages.heroImageLocation
      // }

    try {
      // Verificar se há imagens anexadas
      // const hasHeroImage = heroImages.heroImage && heroImages.heroImage !== "/placeholder.svg?height=600&width=800"
      // const hasAboutImages = (
      //   (aboutImages.image1 && aboutImages.image1 !== "/placeholder.svg?height=300&width=300") ||
      //   (aboutImages.image2 && aboutImages.image2 !== "/placeholder.svg?height=300&width=300") ||
      //   (aboutImages.image3 && aboutImages.image3 !== "/placeholder.svg?height=620&width=300")
      // )
      // const hasFacilityImages = facilitiesImages.some(
      //   facility => facility.image && facility.image !== "/placeholder.svg?height=300&width=300"
      // )

      // if (!hasHeroImage && !hasAboutImages && !hasFacilityImages) {
      //   toast({
      //     title: "Nenhuma imagem anexada",
      //     description: "Por favor, anexe pelo menos uma imagem antes de salvar.",
      //     variant: "destructive",
      //   })
      //   setIsSubmitting(false)
      //   return
      // }

      // Update company info for hero section if values exist

      
      // if (Object.keys(heroData).length > 0) {
      const result = await updateCompanyInfo(heroData)
      // }

      // Save about section images to settings if they exist
      if (aboutImages.image1) await updateSetting("aboutImage1", aboutImages.image1)
      if (aboutImages.image2) await updateSetting("aboutImage2", aboutImages.image2) 
      if (aboutImages.image3) await updateSetting("aboutImage3", aboutImages.image3)

      // Update each facility if it has data
      // for (const facility of facilitiesImages) {
      //   if (facility.image && facility.image !== "/placeholder.svg?height=300&width=300") {
      //     const facilityData: any = {
      //       image: facility.image,
      //       alt: facility.alt,
      //       title: facility.title,
      //       location: facility.location
      //     }
      //     await updateCompanyFacility(facility.id, facilityData)
      //   }
      // }

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

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="hero">Imagem Principal</TabsTrigger>
          {/* <TabsTrigger value="about">Seção Sobre</TabsTrigger> */}
          {/* <TabsTrigger value="facilities">Instalações</TabsTrigger> */}
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <div>
            <Label>Imagem Principal</Label>
            <ImageSelector 
              value={heroImages.heroImage} 
              onChange={(value) => handleHeroChange("heroImage", value)} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Imagem 1</Label>
              <ImageSelector 
                value={aboutImages.image1} 
                onChange={(value) => handleAboutChange("image1", value)} 
              />
              {/* <div className="mt-2">
                <Label htmlFor="image1Alt">Texto Alternativo</Label>
                <Input
                  id="image1Alt"
                  value={aboutImages.image1Alt}
                  onChange={(e) => handleAboutChange("image1Alt", e.target.value)}
                  required
                />
              </div> */}
            </div>

            <div>
              <Label>Imagem 2</Label>
              <ImageSelector 
                value={aboutImages.image2} 
                onChange={(value) => handleAboutChange("image2", value)} 
              />
              {/* <div className="mt-2">
                <Label htmlFor="image2Alt">Texto Alternativo</Label>
                <Input
                  id="image2Alt"
                  value={aboutImages.image2Alt}
                  onChange={(e) => handleAboutChange("image2Alt", e.target.value)}
                  required
                />
              </div> */}
            </div>

            <div>
              <Label>Imagem 3</Label>
              <ImageSelector 
                value={aboutImages.image3} 
                onChange={(value) => handleAboutChange("image3", value)} 
              />
              {/* <div className="mt-2">
                <Label htmlFor="image3Alt">Texto Alternativo</Label>
                <Input
                  id="image3Alt"
                  value={aboutImages.image3Alt}
                  onChange={(e) => handleAboutChange("image3Alt", e.target.value)}
                  required
                />
              </div> */}
            </div>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="heroImageAlt">Texto Alternativo</Label>
              <Input
                id="heroImageAlt"
                value={heroImages.heroImageAlt}
                onChange={(e) => handleHeroChange("heroImageAlt", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="heroImageCaption">Legenda</Label>
              <Input
                id="heroImageCaption"
                value={heroImages.heroImageCaption}
                onChange={(e) => handleHeroChange("heroImageCaption", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="heroImageLocation">Localização</Label>
              <Input
                id="heroImageLocation"
                value={heroImages.heroImageLocation}
                onChange={(e) => handleHeroChange("heroImageLocation", e.target.value)}
                required
              />
            </div>
          </div> */}
        </TabsContent>

        {/* <TabsContent value="about" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Imagem 1</Label>
              <ImageSelector 
                value={aboutImages.image1} 
                onChange={(value) => handleAboutChange("image1", value)} 
              />
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
              <ImageSelector 
                value={aboutImages.image2} 
                onChange={(value) => handleAboutChange("image2", value)} 
              />
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
              <ImageSelector 
                value={aboutImages.image3} 
                onChange={(value) => handleAboutChange("image3", value)} 
              />
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
        </TabsContent> */}

        {/* <TabsContent value="facilities" className="space-y-6">
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
        </TabsContent> */}
      </Tabs>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}

