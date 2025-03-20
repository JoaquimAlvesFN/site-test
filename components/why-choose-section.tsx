import type React from "react"
import { Tv, Play, Shield } from "lucide-react"

interface FeatureProps {
  title: string
  description: string
  icon: string
}

const iconMap: Record<string, React.ReactNode> = {
  Tv: <Tv className="h-10 w-10" />,
  Play: <Play className="h-10 w-10" />,
  Shield: <Shield className="h-10 w-10" />,
}

function FeatureCard({ title, description, icon }: FeatureProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-600">
        {iconMap[icon] || <Shield className="h-10 w-10" />}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export function WhyChooseSection() {
  // Usar dados estáticos para evitar erros com o banco de dados mock
  const features = [
    {
      id: 1,
      title: "Melhor Conteúdo",
      description: "Acesso aos melhores canais de filmes, séries, esportes e programas para toda a família.",
      icon: "Tv",
      order: 1,
      active: true,
    },
    {
      id: 2,
      title: "SKY Play Incluso",
      description: "Assista onde e quando quiser pelo aplicativo SKY Play, disponível para todos os assinantes.",
      icon: "Play",
      order: 2,
      active: true,
    },
    {
      id: 3,
      title: "Benefícios Exclusivos",
      description: "Descontos em serviços parceiros, proteção McAfee e vantagens para toda a família.",
      icon: "Shield",
      order: 3,
      active: true,
    },
  ]

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Por que escolher a SKY?</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Descubra as vantagens que fazem da SKY a melhor escolha para sua casa ou empresa
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.id} title={feature.title} description={feature.description} icon={feature.icon} />
          ))}
        </div>
      </div>
    </section>
  )
}

