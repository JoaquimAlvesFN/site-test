import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import Link from "next/link"
import { Plus, Edit, Star } from "lucide-react"
import { TestimonialDeleteButton } from "@/components/admin/testimonial-delete-button"

export default async function TestimonialsPage() {
  requireAuth()

  // Para o demo, vamos usar dados estáticos
  const testimonials = [
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Depoimentos</h1>
          <p className="text-muted-foreground">Gerencie os depoimentos de clientes exibidos no site</p>
        </div>
        <Button asChild>
          <Link href="/admin/testimonials/new">
            <Plus className="h-4 w-4 mr-2" />
            Novo Depoimento
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className={!testimonial.active ? "opacity-60" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>{testimonial.author}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/testimonials/${testimonial.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <TestimonialDeleteButton id={testimonial.id} />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
                {!testimonial.active && (
                  <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">Inativo</span>
                )}
              </div>
              <blockquote className="text-muted-foreground italic mb-4">"{testimonial.quote}"</blockquote>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

