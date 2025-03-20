import type React from "react"
import { Shield, Play, Tv, MapPin } from "lucide-react"

interface QuickFeatureProps {
  title: string
  description: string
  icon: string
}

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="h-6 w-6" />,
  Play: <Play className="h-6 w-6" />,
  Tv: <Tv className="h-6 w-6" />,
  MapPin: <MapPin className="h-6 w-6" />,
}

function QuickFeatureCard({ title, description, icon }: QuickFeatureProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
        {iconMap[icon] || <Shield className="h-6 w-6" />}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  )
}

export function QuickFeatures() {
  // Usar dados estáticos para evitar erros com o banco de dados mock
  const features = [
    {
      id: 1,
      title: "Instalação Rápida",
      description: "Em até 48 horas",
      icon: "Shield",
      order: 1,
      active: true,
      updatedAt: String(new Date().toISOString()),
    },
    {
      id: 2,
      title: "SKY Play Grátis",
      description: "Assista onde quiser",
      icon: "Play",
      order: 2,
      active: true,
      updatedAt: String(new Date().toISOString()),
    },
    {
      id: 3,
      title: "+200 Canais",
      description: "Melhor conteúdo",
      icon: "Tv",
      order: 3,
      active: true,
      updatedAt: String(new Date().toISOString()),
    },
    {
      id: 4,
      title: "Cobertura Nacional",
      description: "Em todo o Brasil",
      icon: "MapPin",
      order: 4,
      active: true,
      updatedAt: String(new Date().toISOString()),
    },
  ]

  return (
    <div className="container mx-auto grid grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <QuickFeatureCard
          key={feature.id}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </div>
  )
}

