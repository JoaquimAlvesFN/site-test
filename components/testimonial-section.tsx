import { getAllTestimonialActive } from "@/app/admin/actions"
import { Star } from "lucide-react"

interface TestimonialProps {
  quote: string
  author: string
  role: string
  rating: number
}

function TestimonialCard({ quote, author, role, rating }: TestimonialProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <div className="mb-4 flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          ))}
        </div>
        <p className="mb-4 text-gray-700">{quote}</p>
      </div>
      <div>
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  )
}

export async function TestimonialSection() {
  // Usar dados estáticos para evitar erros com o banco de dados mock
  // const testimonials = [
  //   {
  //     id: 1,
  //     quote: "Excelente serviço! A instalação foi rápida e o sinal é perfeito. Recomendo a todos.",
  //     author: "Carlos Silva",
  //     role: "Cliente desde 2019",
  //     rating: 5,
  //     active: true,
  //   },
  //   {
  //     id: 2,
  //     quote: "Ótima variedade de canais e o aplicativo SKY Play é muito prático para assistir em qualquer lugar.",
  //     author: "Ana Oliveira",
  //     role: "Cliente desde 2020",
  //     rating: 4,
  //     active: true,
  //   },
  //   {
  //     id: 3,
  //     quote: "Atendimento ao cliente excepcional. Tive um problema e resolveram rapidamente.",
  //     author: "Pedro Santos",
  //     role: "Cliente desde 2018",
  //     rating: 5,
  //     active: true,
  //   },
  // ]

  const testimonials = await getAllTestimonialActive()

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">O que nossos clientes dizem</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Veja os depoimentos de quem já escolheu a SKY para sua casa ou empresa
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

