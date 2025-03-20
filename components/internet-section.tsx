import Image from "next/image"
import Link from "next/link"
import { Wifi, Zap, Clock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getInternetSection } from "@/app/admin/actions"

export async function InternetSection() {
  // Buscar os dados da seção de internet do banco de dados
  const sectionData = await getInternetSection()

  // Se a seção não estiver ativa, não renderizar nada
  if (!sectionData.active) {
    return null
  }

  return (
    <section id="internet" className="py-16 bg-gradient-to-r from-[#00205B] to-[#0078D7]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm font-medium mb-4">
              NOVIDADE
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl mb-4">
              {sectionData.title}
            </h2>
            <p className="text-xl font-bold text-white mb-6">{sectionData.subtitle}</p>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center bg-white/20 w-16 h-16 rounded-full mx-auto mb-3">
                    <Wifi className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold">INTERNET RÁPIDA</h3>
                  <p className="text-white/80 text-sm">Até {sectionData.speedBadge}</p>
                </div>
                <div className="text-4xl font-bold text-white">+</div>
                <div className="text-center">
                  <div className="flex items-center justify-center bg-white/20 w-16 h-16 rounded-full mx-auto mb-3">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold">1 ANO DE CANAIS</h3>
                  <p className="text-white/80 text-sm">TV ao vivo</p>
                </div>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {sectionData.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-white">
                  <Check className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#E30613] hover:bg-[#c00511]" asChild>
                <Link href={sectionData.ctaLink}>{sectionData.cta}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="#internet-plans">Ver Planos</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={sectionData.image || "/placeholder.svg"}
                alt="SKY Fibra"
                width={600}
                height={500}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-white" />
                  <span className="text-white font-medium">Oferta por tempo limitado</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-lg font-bold text-[#E30613]">A partir de</p>
              <div className="flex items-baseline">
                <span className="text-sm font-medium">R$</span>
                <span className="text-3xl font-bold mx-1">{sectionData.price}</span>
                <span className="text-sm">/mês</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

