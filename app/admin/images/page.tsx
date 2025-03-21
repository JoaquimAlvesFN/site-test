"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import { ExternalLink } from "lucide-react"
import { ImageUploader } from "@/components/admin/image-uploader"
import { getImages } from "@/app/admin/actions"
import Image from "next/image"
import { ImageDeleteButton } from "@/components/admin/image-delete-button"

export default async function ImagesPage() {
  requireAuth()

  // Buscar imagens do banco de dados
  const images = [
    {
      id: 1,
      name: "hero-banner.jpg",
      url: "/uploads/hero-banner.jpg",
      size: 245000,
      createdAt: "2023-04-15T10:30:00.000Z",
      updatedAt: "2023-04-15T10:30:00.000Z",
    },
    {
      id: 2,
      name: "sky-logo.png",
      url: "/uploads/sky-logo.png",
      size: 32000,
      createdAt: "2023-04-16T14:20:00.000Z",
      updatedAt: "2023-04-16T14:20:00.000Z",
    },
    {
      id: 3,
      name: "internet-promo.jpg",
      url: "/uploads/internet-promo.jpg",
      size: 178000,
      createdAt: "2023-04-17T09:15:00.000Z",
      updatedAt: "2023-04-17T09:15:00.000Z",
    },
  ];
  // await getImages()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Banco de Imagens</h1>
          <p className="text-muted-foreground">Gerencie as imagens utilizadas no site</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload de Imagens</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUploader />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Imagens Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          {images.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma imagem encontrada. Faça upload de imagens para começar.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images.map((image) => (
                <div key={image.id} className="border rounded-md overflow-hidden group relative">
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
                    <p className="text-xs text-muted-foreground">{new Date(image.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-7 w-7 bg-white/80 hover:bg-white"
                      onClick={() => {
                        navigator.clipboard.writeText(image.url)
                        // Você pode adicionar um toast aqui para notificar o usuário
                      }}
                      title="Copiar URL"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                    <ImageDeleteButton id={image.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

