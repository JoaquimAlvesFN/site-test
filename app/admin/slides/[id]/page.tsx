import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SlideForm } from "@/components/admin/slide-form"
import { notFound } from "next/navigation"
import { getHeroSlide } from "@/app/admin/actions"

interface SlideEditPageProps {
  params: {
    id: string
  }
}

export default async function SlideEditPage({ params }: SlideEditPageProps) {
  requireAuth()

  // Handle new slide case
  if (params.id === "new") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/slides">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Novo Slide</h1>
            <p className="text-muted-foreground">Adicione um novo slide ao carrossel da página inicial</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Slide</CardTitle>
          </CardHeader>
          <CardContent>
            <SlideForm />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Converter ID para número
  const id = Number.parseInt(params.id)

  // Verificar se o ID é válido
  if (isNaN(id)) {
    console.error(`Invalid slide ID: ${params.id}`)
    notFound()
  }

  // Dados estáticos para garantir que a página funcione
  const staticSlides = [
    {
      id: 1,
      title: "Economize sem abrir mão da diversão",
      subtitle: "Assine agora com taxa de adesão por apenas",
      price: "1,90",
      cta: "Assine já",
      image: "/placeholder.svg?height=600&width=800",
      features: ["Mais de 200 canais", "Esportes ao vivo", "Filmes e séries"],
      tag: "OFERTA LIMITADA",
      order: 1,
      active: true,
    },
    {
      id: 2,
      title: "Internet + TV em um só lugar",
      subtitle: "Combo completo a partir de",
      price: "149,90",
      cta: "Conheça os combos",
      image: "/placeholder.svg?height=600&width=800",
      features: ["Internet de alta velocidade", "TV com os melhores canais", "Instalação grátis"],
      tag: "COMBO EXCLUSIVO",
      speedBadge: "300 Mega",
      order: 2,
      active: true,
    },
    {
      id: 3,
      title: "SKY Pré-pago sem fidelidade",
      subtitle: "Recarga a partir de",
      price: "69,90",
      cta: "Saiba mais",
      image: "/placeholder.svg?height=600&width=800",
      features: ["Sem análise de crédito", "Recarregue quando quiser", "Mais de 80 canais"],
      tag: "SEM MENSALIDADE",
      order: 3,
      active: false,
    },
  ]

  // Tentar obter o slide do banco de dados
  let slideData = await getHeroSlide(id)

  // Se não encontrar no banco de dados, procurar nos dados estáticos
  // if (!slideData) {
  //   slideData = staticSlides.find((slide) => slide.id === id)

  //   // Se ainda não encontrar, retornar 404
  //   if (!slideData) {
  //     console.error(`Slide with ID ${id} not found`)
  //     notFound()
  //   }
  // }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/slides">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Editar Slide</h1>
          <p className="text-muted-foreground">Edite as informações do slide {slideData.title || `#${id}`}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Slide</CardTitle>
        </CardHeader>
        <CardContent>
          <SlideForm slideData={slideData} />
        </CardContent>
      </Card>
    </div>
  )
}

