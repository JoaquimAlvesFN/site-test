"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import { ExternalLink } from "lucide-react"
import { ImageUploader } from "@/components/admin/image-uploader"
import { getImages } from "@/app/admin/actions"
import Image from "next/image"
import { ImageDeleteButton } from "@/components/admin/image-delete-button"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { StorageUsage } from "@/components/admin/storage-usage"

export default function ImagesPage() {
  requireAuth()
  const [images, setImages] = useState<any[]>([]);
  const router = useRouter();

  const fetchImages = useCallback(async () => {
    const result = await getImages();
    setImages(result || []);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Função para recarregar imagens após o upload
  const handleImageUploaded = useCallback(() => {
    fetchImages();
    router.refresh();
  }, [fetchImages, router]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Banco de Imagens</h1>
          <p className="text-muted-foreground">Gerencie as imagens utilizadas no site</p>
        </div>
        <Button onClick={fetchImages} variant="outline" size="sm">
          Atualizar
        </Button>
      </div>

      <StorageUsage />

      <Card>
        <CardHeader>
          <CardTitle>Upload de Imagens</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUploader onUploadComplete={handleImageUploaded} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Imagens Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          {images && images.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma imagem encontrada. Faça upload de imagens para começar.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images?.map((image) => (
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

