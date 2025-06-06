import Image from "next/image"
import Link from "next/link"
import { Award, Users, Building, Clock, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { PromoBanner } from "@/components/promo-banner"
import { InstitucionalHeader } from "@/components/institucional/institucional-header"
import { ValueCard } from "@/components/institucional/value-card"
import { ContactModal } from "@/components/contact-modal"
import { ImageGallery } from "@/components/institucional/image-gallery"
import { getCompanyInfo, getCompanyFacilities, getAllSettings, getCompanyValues, getTeamMembers } from "@/app/admin/actions"

// Definir tipos para os dados
type CompanyInfo = {
  id?: number
  aboutTitle?: string
  aboutDescription?: string
  aboutDescription2?: string | null
  clientsCount?: string
  employeesCount?: string
  channelsCount?: string
  coveragePercent?: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: string
  heroImageAlt?: string
  heroImageCaption?: string
  heroImageLocation?: string
  updatedAt?: Date
}

type CompanyValue = {
  id: number
  title: string
  description: string
  icon: string
  order: number
  active: boolean
}

type TeamMember = {
  id: number
  name: string
  role: string
  description: string
  image: string
  order: number
  active: boolean
}

type CompanyFacility = {
  id: number
  title: string
  location: string
  image: string
  alt: string
  order: number
  active: boolean
}

export const metadata = {
  title: "Institucional | SKY Pacotes",
  description: "Conheça a história, valores e equipe da SKY Brasil, líder em TV por assinatura via satélite no Brasil.",
}

export default async function InstitucionalPage() {
  // Buscar dados do banco de dados
  const companyInfoData = await getCompanyInfo();
  const facilitiesData = await getCompanyFacilities();
  const settingsData = await getAllSettings();

  // Garantir que os dados sejam do tipo correto ou usar fallbacks
  const companyInfo: CompanyInfo = companyInfoData || {};
  const settings = settingsData || {};

  // Imagens da seção "Sobre" vêm das configurações
  const aboutImages = {
    image1: settings.aboutImage1 || "/placeholder.svg?height=300&width=300",
    image1Alt: settings.aboutImage1Alt || "Escritório SKY",
    image2: settings.aboutImage2 || "/placeholder.svg?height=300&width=300",
    image2Alt: settings.aboutImage2Alt || "Equipe SKY",
    image3: settings.aboutImage3 || "/placeholder.svg?height=620&width=300",
    image3Alt: settings.aboutImage3Alt || "Central de Operações SKY",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PromoBanner />
      <InstitucionalHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-[#E30613] text-white py-16 md:py-24 overflow-hidden">
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  {companyInfo.heroTitle || "Transformando o entretenimento brasileiro desde 1996"}
                </h1>
                <p className="text-xl text-white/80 max-w-lg">
                  {companyInfo.heroSubtitle || "Líder em TV por assinatura via satélite no Brasil, oferecendo a melhor experiência em entretenimento para milhões de famílias."}
                </p>
              </div>
              <div className="relative hidden lg:block">
                <Image
                  src={companyInfo.heroImage || "/placeholder.svg?height=600&width=800"}
                  alt={companyInfo.heroImageAlt || "SKY Sede"}
                  width={600}
                  height={500}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-[#E30613]/95" />
        </section>

        {/* Sobre Nós */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Sobre Nós</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Conheça mais sobre a SKY Brasil e nossa missão de levar entretenimento de qualidade para todos os
                brasileiros
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl font-bold mb-4">{companyInfo.aboutTitle || "Quem Somos"}</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {companyInfo.aboutDescription || "A SKY Brasil é uma empresa de telecomunicações que oferece serviços de TV por assinatura via satélite e internet banda larga. Fundada em 1996, a empresa se consolidou como líder no mercado brasileiro, atendendo milhões de clientes em todo o país."}
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  {companyInfo.aboutDescription2 || "Com uma ampla cobertura nacional, a SKY leva entretenimento e conectividade para todas as regiões do Brasil, incluindo áreas remotas onde outras tecnologias não chegam."}
                </p>
              </div>
              <ImageGallery images={aboutImages} />
            </div>
          </div>
        </section>

        {/* Nossos Valores */}
        <section className="py-16 bg-slate-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Nossos Valores</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Os princípios que guiam nossas ações e decisões todos os dias
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <>
                  <ValueCard
                    icon={<Award className="h-10 w-10" />}
                    title="Excelência"
                    description="Buscamos a excelência em tudo o que fazemos, desde o atendimento ao cliente até a qualidade do sinal."
                  />
                  <ValueCard
                    icon={<Users className="h-10 w-10" />}
                    title="Foco no Cliente"
                    description="Nossos clientes estão no centro de todas as nossas decisões. Trabalhamos para superar suas expectativas."
                  />
                  <ValueCard
                    icon={<Building className="h-10 w-10" />}
                    title="Inovação"
                    description="Investimos constantemente em novas tecnologias para oferecer a melhor experiência em entretenimento."
                  />
                </>
              {/* )} */}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

