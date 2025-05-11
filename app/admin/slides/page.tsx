import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import Link from "next/link"
import { Plus, Edit, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react"
import { SlideDeleteButton } from "@/components/admin/slide-delete-button"
import Image from "next/image"
import { getActiveHeroSlides } from "../actions"
import { Badge } from "@/components/ui/badge"

export default async function SlidesPage() {
  requireAuth()

  const slides = await getActiveHeroSlides()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Imagens do Carrossel</h1>
          <p className="text-muted-foreground">Gerencie as imagens exibidas no carrossel da página inicial</p>
        </div>
        <Button asChild>
          <Link href="/admin/slides/new">
            <Plus className="h-4 w-4 mr-2" />
            Nova Imagem
          </Link>
        </Button>
      </div>
      
      <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-4 rounded-lg border border-slate-200">
        <p className="text-sm mb-2"><strong>Dica:</strong> As imagens são exibidas em um carrossel na página inicial.</p>
        <p className="text-sm">Adicione múltiplas imagens para criar uma apresentação dinâmica dos seus produtos e promoções.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <Card key={slide.id} className={!slide.active ? "opacity-60 border-dashed" : "shadow-md hover:shadow-lg transition-shadow duration-200"}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
              <Image 
                src={slide.image || "/placeholder.svg"} 
                alt={`Imagem ${slide.order}`}
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                {slide.active ? (
                  <Badge className="bg-green-600 shadow-sm" variant="default">
                    <Eye className="h-3 w-3 mr-1" />
                    Visível
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-white/80 shadow-sm">
                    <EyeOff className="h-3 w-3 mr-1" />
                    Oculto
                  </Badge>
                )}
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-black/0 p-3 flex justify-between items-center">
                <div className="text-white font-medium">
                  Ordem: {slide.order}
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:text-white hover:bg-white/20 transition-colors" asChild>
                    <Link href={`/admin/slides/${slide.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <SlideDeleteButton id={slide.id} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {slides.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-gradient-to-r from-slate-50 to-slate-100">
          <h3 className="text-lg font-medium mb-2">Nenhuma imagem encontrada</h3>
          <p className="text-muted-foreground mb-4">Adicione imagens para criar um carrossel na página inicial.</p>
          <Button asChild>
            <Link href="/admin/slides/new">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar primeira imagem
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

