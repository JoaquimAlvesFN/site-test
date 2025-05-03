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
  const testimonials = await getAllTestimonialActive()

  return (
    <section className="bg-gray-50 py-12">
      {
        testimonials.length > 0 && (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">O Que Nossos Clientes Dizem</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Milhares de famílias brasileiras já aproveitam a qualidade SKY. Veja alguns depoimentos.
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
        )
      }
    </section>
  )
}

