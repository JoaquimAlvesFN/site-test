"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { HeroSlide } from "@/lib/db"
import { createHeroSlide, updateHeroSlide } from "@/app/admin/actions"
import { toast } from "@/components/ui/use-toast"
import { ImageSelector } from "./image-selector"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Input } from "@/components/ui/input"

interface SlideFormProps {
  slideData?: HeroSlide
}

export function SlideForm({ slideData }: SlideFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Configuração padrão para manter a compatibilidade da aplicação
  const defaultFeatures = ["Imagem Carrossel"]
  const defaultTitle = "Imagem de Carrossel"
  const defaultSubtitle = "Slide carrossel"
  const defaultCta = "Ver mais"
  const defaultPrice = "0"
  
  const [formData, setFormData] = useState({
    title: slideData?.title || defaultTitle,
    subtitle: slideData?.subtitle || defaultSubtitle,
    price: slideData?.price || defaultPrice,
    cta: slideData?.cta || defaultCta,
    image: slideData?.image || "/placeholder.svg?height=600&width=800",
    mobileImage: slideData?.mobileImage || "/placeholder.svg?height=600&width=800",
    tag: slideData?.tag || "",
    speedBadge: slideData?.speedBadge || "",
    order: slideData?.order || 1,
    active: slideData?.active ?? true,
  })

  function handleSwitchChange(name: string, checked: boolean) {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  function handleOrderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, order: parseInt(value) }))
  }

  function handleImageChange(url: string) {
    setFormData((prev) => ({ ...prev, image: url }))
  }

  function handleMobileImageChange(url: string) {
    setFormData((prev) => ({ ...prev, mobileImage: url }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const slidePayload = {
        ...formData,
        features: defaultFeatures.join(','),
      }

      if (slideData?.id) {
        await updateHeroSlide(slideData.id, slidePayload)
        toast({
          title: "Imagem atualizada com sucesso!",
          description: `A imagem do carrossel foi atualizada e já está disponível na página inicial.`,
        })
      } else {
        await createHeroSlide(slidePayload)
        toast({
          title: "Imagem adicionada com sucesso!",
          description: `A imagem foi adicionada ao carrossel da página inicial.`,
        })
      }

      router.push("/admin/slides")
      router.refresh()
    } catch (error) {
      console.error("Failed to save slide:", error)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um problema ao salvar a imagem do carrossel.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Tabs defaultValue="edit" className="w-full">
      <TabsList className="mb-6 grid grid-cols-2">
        <TabsTrigger value="edit">Editar Imagem</TabsTrigger>
        <TabsTrigger value="preview">Visualizar</TabsTrigger>
      </TabsList>

      <TabsContent value="edit">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-medium">Imagem do Carrossel (Desktop)</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Selecione uma imagem para exibir no carrossel da página inicial em dispositivos desktop.
                  </p>
                  <div className="border rounded-lg p-4 bg-gradient-to-r from-slate-50 to-slate-100">
                    <ImageSelector 
                      value={formData.image} 
                      onChange={handleImageChange} 
                      label="Selecionar Imagem Desktop"
                    />
                    {formData.image && (
                      <div className="mt-4 relative aspect-video">
                        <Image 
                          src={formData.image} 
                          alt="Preview da imagem desktop" 
                          className="rounded-md object-cover shadow-md"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Recomendado: Imagem de alta qualidade com resolução mínima de 1200x800px
                  </p>
                </div>

                <div>
                  <Label className="text-lg font-medium">Imagem do Carrossel (Mobile)</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Selecione uma imagem para exibir no carrossel da página inicial em dispositivos móveis.
                  </p>
                  <div className="border rounded-lg p-4 bg-gradient-to-r from-slate-50 to-slate-100">
                    <ImageSelector 
                      value={formData.mobileImage} 
                      onChange={handleMobileImageChange} 
                      label="Selecionar Imagem Mobile"
                    />
                    {formData.mobileImage && (
                      <div className="mt-4 relative aspect-video">
                        <Image 
                          src={formData.mobileImage} 
                          alt="Preview da imagem mobile" 
                          className="rounded-md object-cover shadow-md"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Recomendado: Imagem de alta qualidade com resolução mínima de 800x1200px
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="order">Ordem no carrossel</Label>
                    <Input
                      id="order"
                      type="number"
                      value={formData.order}
                      onChange={handleOrderChange}
                      required
                      min={1}
                      className="mt-2"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Define a ordem de exibição da imagem no carrossel
                    </p>
                  </div>
                  
                  <div className="flex flex-col justify-end">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="active"
                        checked={formData.active}
                        onCheckedChange={(checked) => handleSwitchChange("active", checked)}
                      />
                      <Label htmlFor="active">Imagem ativa</Label>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Desative para remover temporariamente a imagem do carrossel
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/slides")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-slate-800 hover:bg-slate-700">
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </TabsContent>
      
      <TabsContent value="preview">
        <div className="space-y-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium">Pré-visualização da Imagem</h3>
            <p className="text-sm text-muted-foreground">Veja como a imagem será exibida no carrossel</p>
          </div>
          
          <Card className="overflow-hidden shadow-md border-slate-200">
            <CardContent className="p-6 bg-gradient-to-b from-slate-100 to-slate-200">
              <div className="max-w-3xl mx-auto relative aspect-[21/9]">
                <Image
                  src={formData.image || "/placeholder.svg"}
                  alt="Preview da imagem do carrossel (Desktop)"
                  className="object-cover rounded-lg shadow-lg"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="mt-6 max-w-xs mx-auto relative aspect-[9/16]">
                <Image
                  src={formData.mobileImage || "/placeholder.svg"}
                  alt="Preview da imagem do carrossel (Mobile)"
                  className="object-cover rounded-lg shadow-lg"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div>
              {!formData.active && (
                <p className="text-yellow-600 text-sm font-medium">
                  Esta imagem não está ativa e não será exibida no carrossel
                </p>
              )}
            </div>
            <Button onClick={() => router.push("/admin/slides")} className="bg-slate-800 hover:bg-slate-700">
              Voltar para lista
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

