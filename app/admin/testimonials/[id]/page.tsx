import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { TestimonialForm } from "@/components/admin/testimonial-form"
import { notFound } from "next/navigation"
import { getTestimonial } from "@/app/admin/actions"

interface TestimonialEditPageProps {
  params: {
    id: string
  }
}

export default async function TestimonialEditPage({ params }: TestimonialEditPageProps) {
  requireAuth()

  // Handle new testimonial case
  if (params.id === "new") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/testimonials">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Novo Depoimento</h1>
            <p className="text-muted-foreground">Adicione um novo depoimento de cliente ao site</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Depoimento</CardTitle>
          </CardHeader>
          <CardContent>
            <TestimonialForm />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Converter ID para número
  const id = Number.parseInt(params.id)

  // Verificar se o ID é válido
  if (isNaN(id)) {
    console.error(`Invalid testimonial ID: ${params.id}`)
    notFound()
  }

  // Dados estáticos para garantir que a página funcione
  const staticTestimonials = [
    {
      id: 1,
      quote:
        "Assinei a SKY há 2 anos e a qualidade do sinal é excelente. Mesmo em dias de chuva forte, raramente tenho problemas.",
      author: "Carlos Silva",
      role: "Cliente SKY Plus",
      rating: 5,
      active: true,
    },
    {
      id: 2,
      quote: "O atendimento ao cliente é muito bom. Tive um problema técnico e resolveram no mesmo dia. Recomendo!",
      author: "Ana Oliveira",
      role: "Cliente SKY Premium",
      rating: 5,
      active: true,
    },
    {
      id: 3,
      quote:
        "Optei pelo plano pré-pago e funciona perfeitamente para minha necessidade. Recarrego a cada 3 meses e economizo.",
      author: "Roberto Santos",
      role: "Cliente SKY Pré 90",
      rating: 4,
      active: true,
    },
    {
      id: 4,
      quote: "Estou muito satisfeito com a variedade de canais. Minha família inteira encontra algo para assistir.",
      author: "Mariana Costa",
      role: "Cliente SKY Plus",
      rating: 4,
      active: false,
    },
  ]

  // Tentar obter o depoimento do banco de dados
  let testimonialData = await getTestimonial(id)

  // Se não encontrar no banco de dados, procurar nos dados estáticos
  if (!testimonialData) {
    testimonialData = staticTestimonials.find((testimonial) => testimonial.id === id)

    // Se ainda não encontrar, retornar 404
    if (!testimonialData) {
      console.error(`Testimonial with ID ${id} not found`)
      notFound()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/testimonials">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Editar Depoimento</h1>
          <p className="text-muted-foreground">
            Edite as informações do depoimento de {testimonialData.author || `#${id}`}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Depoimento</CardTitle>
        </CardHeader>
        <CardContent>
          <TestimonialForm testimonialData={testimonialData} />
        </CardContent>
      </Card>
    </div>
  )
}

