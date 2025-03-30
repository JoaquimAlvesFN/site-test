import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import Link from "next/link"
import { Plus, Edit } from "lucide-react"
import { SlideDeleteButton } from "@/components/admin/slide-delete-button"
import Image from "next/image"
import { getActiveHeroSlides } from "../actions"

export default async function SlidesPage() {
  requireAuth()

  // Para o demo, vamos usar dados estáticos
  // const slides = [
  //   {
  //     id: 1,
  //     title: "Economize sem abrir mão da diversão",
  //     subtitle: "Assine agora com taxa de adesão por apenas",
  //     price: "1,90",
  //     features: ["Mais de 200 canais", "Esportes ao vivo", "Filmes e séries"],
  //     tag: "OFERTA LIMITADA",
  //     image: "/placeholder.svg?height=600&width=800",
  //     order: 1,
  //     active: true,
  //   },
  //   {
  //     id: 2,
  //     title: "Internet + TV em um só lugar",
  //     subtitle: "Combo completo a partir de",
  //     price: "149,90",
  //     features: ["Internet de alta velocidade", "TV com os melhores canais", "Instalação grátis"],
  //     tag: "COMBO EXCLUSIVO",
  //     image: "/placeholder.svg?height=600&width=800",
  //     order: 2,
  //     active: true,
  //   },
  //   {
  //     id: 3,
  //     title: "SKY Pré-pago sem fidelidade",
  //     subtitle: "Recarga a partir de",
  //     price: "69,90",
  //     features: ["Sem análise de crédito", "Recarregue quando quiser", "Mais de 80 canais"],
  //     tag: "SEM MENSALIDADE",
  //     image: "/placeholder.svg?height=600&width=800",
  //     order: 3,
  //     active: false,
  //   },
  // ]

  const slides = await getActiveHeroSlides()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Slides do Banner Principal</h1>
          <p className="text-muted-foreground">Gerencie os slides do carrossel na página inicial</p>
        </div>
        <Button asChild>
          <Link href="/admin/slides/new">
            <Plus className="h-4 w-4 mr-2" />
            Novo Slide
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {slides.map((slide) => (
          <Card key={slide.id} className={!slide.active ? "opacity-60" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>{slide.title}</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/slides/${slide.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <SlideDeleteButton id={slide.id} />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="relative aspect-video rounded-md overflow-hidden">
                  <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Subtítulo</p>
                      <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Preço</p>
                      <p className="text-sm text-muted-foreground">R$ {slide.price}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Características</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {slide.features.split(',').map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Tag</p>
                      <p className="text-sm text-muted-foreground">{slide.tag || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Ordem</p>
                      <p className="text-sm text-muted-foreground">{slide.order}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-sm text-muted-foreground">{slide.active ? "Ativo" : "Inativo"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

