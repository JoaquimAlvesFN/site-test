import Image from "next/image"
import Link from "next/link"
import { Award, Users, Building, Clock, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { PromoBanner } from "@/components/promo-banner"
import { InstitucionalHeader } from "@/components/institucional/institucional-header"
import { TimelineItem } from "@/components/institucional/timeline-item"
import { TeamMemberCard } from "@/components/institucional/team-member-card"
import { ValueCard } from "@/components/institucional/value-card"
import { ContactModal } from "@/components/contact-modal"
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
  const companyValuesData = await getCompanyValues();
  const teamMembersData = await getTeamMembers();

  // Garantir que os dados sejam do tipo correto ou usar fallbacks
  const companyInfo: CompanyInfo = companyInfoData || {};
  const facilities = (Array.isArray(facilitiesData) ? facilitiesData : []) as CompanyFacility[];
  const settings = settingsData || {};
  const companyValues = (Array.isArray(companyValuesData) ? companyValuesData : []) as CompanyValue[];
  const teamMembers = (Array.isArray(teamMembersData) ? teamMembersData : []) as TeamMember[];

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
        <section className="relative bg-[#00205B] text-white py-16 md:py-24 overflow-hidden">
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
          <div className="absolute inset-0 bg-[#00205B]/95" />
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
              <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src={aboutImages.image1}
                      alt={aboutImages.image1Alt}
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src={aboutImages.image2}
                      alt={aboutImages.image2Alt}
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={aboutImages.image3}
                    alt={aboutImages.image3Alt}
                    width={300}
                    height={620}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
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
              {companyValues && companyValues.length > 0 ? (
                companyValues.filter(value => value.active).map((value) => (
                  <ValueCard
                    key={value.id}
                    icon={<div dangerouslySetInnerHTML={{ __html: value.icon }} />}
                    title={value.title}
                    description={value.description}
                  />
                ))
              ) : (
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
              )}
            </div>
          </div>
        </section>

        {/* Nossa Equipe */}
        {/* <section className="py-16 bg-slate-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Nossa Equipe</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Conheça os líderes que fazem a SKY Brasil acontecer
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers && teamMembers.length > 0 ? (
                teamMembers.filter(member => member.active).slice(0, 4).map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    name={member.name}
                    role={member.role}
                    image={member.image}
                    description={member.description}
                  />
                ))
              ) : (
                <>
                  <TeamMemberCard
                    name="Carlos Silva"
                    role="CEO"
                    image="/placeholder.svg?height=300&width=300"
                    description="Mais de 20 anos de experiência no setor de telecomunicações."
                  />
                  <TeamMemberCard
                    name="Ana Oliveira"
                    role="Diretora de Operações"
                    image="/placeholder.svg?height=300&width=300"
                    description="Especialista em gestão de operações e processos."
                  />
                  <TeamMemberCard
                    name="Roberto Santos"
                    role="Diretor de Tecnologia"
                    image="/placeholder.svg?height=300&width=300"
                    description="Lidera as iniciativas de inovação tecnológica da empresa."
                  />
                  <TeamMemberCard
                    name="Mariana Costa"
                    role="Diretora de Marketing"
                    image="/placeholder.svg?height=300&width=300"
                    description="Responsável pelas estratégias de marketing e comunicação."
                  />
                </>
              )}
            </div>
          </div>
        </section> */}

        {/* Nossas Instalações */}
        {/* {facilities && facilities.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Nossas Instalações</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                  Conheça os espaços onde trabalhamos para levar o melhor entretenimento até você
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.filter(facility => facility.active).map((facility) => (
                  <div key={facility.id} className="rounded-lg overflow-hidden shadow-md">
                    <div className="relative h-64">
                      <Image
                        src={facility.image}
                        alt={facility.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{facility.title}</h3>
                      <p className="text-muted-foreground">{facility.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )} */}

        {/* Contato */}
        <section className="py-16 bg-[#00205B] text-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Entre em Contato</h2>
              <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto">
                Estamos à disposição para atender você e responder suas dúvidas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 p-6 rounded-lg text-center">
                <MapPin className="h-10 w-10 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Endereço</h3>
                <p className="text-white/80">{settings.companyAddress || "Av. das Nações Unidas, 12901"}</p>
                <p className="text-white/80">{settings.companyAddressCity || "São Paulo, SP - 04578-000"}</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg text-center">
                <Phone className="h-10 w-10 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Telefone</h3>
                <p className="text-white/80">{settings.companySalesPhone || "Vendas: 0800 600 4990"}</p>
                <p className="text-white/80">{settings.companySupportPhone || "Suporte: 0800 720 1234"}</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg text-center">
                <Clock className="h-10 w-10 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Horário</h3>
                <p className="text-white/80">{settings.companyHoursWeekday || "Segunda a Sexta: 8h às 20h"}</p>
                <p className="text-white/80">{settings.companyHoursWeekend || "Sábado: 9h às 15h"}</p>
              </div>
            </div>

            {/* <div className="text-center mt-12">
              <ContactModal
                trigger={
                  <Button size="lg" className="bg-white text-[#00205B] hover:bg-white/90">
                    Enviar Mensagem
                  </Button>
                }
                title="Envie sua Mensagem"
                description="Preencha seus dados para entrar em contato com nossa equipe. Responderemos o mais breve possível."
              />
            </div> */}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

