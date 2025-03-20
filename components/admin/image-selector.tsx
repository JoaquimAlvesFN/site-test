"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getImages } from "@/app/admin/actions"
import Image from "next/image"
import { ImagePlus, X } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ImageSelectorProps {
  value: string
  onChange: (value: string) => void
  label?: string
}

export function ImageSelector({ value, onChange, label = "Selecionar Imagem" }: ImageSelectorProps) {
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function loadImages() {
      try {
        const data = await getImages()
        setImages(data)
      } catch (error) {
        console.error("Erro ao carregar imagens:", error)
      } finally {
        setLoading(false)
      }
    }

    if (open) {
      loadImages()
    }
  }, [open])

  const filteredImages = images.filter((image) => image.name.toLowerCase().includes(search.toLowerCase()))

  const handleSelectImage = (url: string) => {
    onChange(url)
    setOpen(false)
  }

  const handleClearImage = () => {
    onChange("")
  }

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium">{label}</p>}

      <div className="flex items-center gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" type="button">
              <ImagePlus className="h-4 w-4 mr-2" />
              Selecionar Imagem
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Banco de Imagens</DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <Input
                placeholder="Buscar imagens..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4"
              />

              {loading ? (
                <div className="text-center py-8">Carregando imagens...</div>
              ) : filteredImages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {search ? "Nenhuma imagem encontrada para esta busca." : "Nenhuma imagem disponível."}
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-1">
                  {filteredImages.map((image) => (
                    <div
                      key={image.id}
                      className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                        value === image.url ? "ring-2 ring-primary" : "hover:border-primary"
                      }`}
                      onClick={() => handleSelectImage(image.url)}
                    >
                      <div className="aspect-square relative">
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={image.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-2 bg-white border-t">
                        <p className="text-xs font-medium truncate" title={image.name}>
                          {image.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {value && (
          <div className="relative h-10 w-10 border rounded-md overflow-hidden">
            <Image src={value || "/placeholder.svg"} alt="Selected image" fill className="object-cover" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full"
              onClick={handleClearImage}
              type="button"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {value && <p className="text-xs text-muted-foreground truncate">{value}</p>}
    </div>
  )
}

