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

export const metadata = {
  title: "Institucional | SKY Pacotes",
  description: "Conheça a história, valores e equipe da SKY Brasil, líder em TV por assinatura via satélite no Brasil.",
}

export default function InstitucionalPage() {
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
                  Transformando o entretenimento brasileiro desde 1996
                </h1>
                <p className="text-xl text-white/80 max-w-lg">
                  Líder em TV por assinatura via satélite no Brasil, oferecendo a melhor experiência em entretenimento
                  para milhões de famílias.
                </p>
                {/* <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-[#00205B] hover:bg-white/90" asChild>
                    <Link href="#nossa-historia">Conheça Nossa História</Link>
                  </Button>
                  <ContactModal
                    trigger={
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        Fale Conosco
                      </Button>
                    }
                    title="Fale Conosco"
                    description="Preencha seus dados para entrar em contato com nossa equipe. Responderemos o mais breve possível."
                  />
                </div> */}
              </div>
              <div className="relative hidden lg:block">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="SKY Sede"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-2xl"
                />
                {/* <div className="absolute -bottom-6 -right-6 bg-white text-[#00205B] p-4 rounded-lg shadow-lg">
                  <p className="text-sm font-medium">Sede SKY Brasil</p>
                  <p className="text-xs text-muted-foreground">São Paulo, SP</p>
                </div> */}
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
                <h3 className="text-2xl font-bold mb-4">Quem Somos</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  A SKY Brasil é uma empresa de telecomunicações que oferece serviços de TV por assinatura via satélite
                  e internet banda larga. Fundada em 1996, a empresa se consolidou como líder no mercado brasileiro,
                  atendendo milhões de clientes em todo o país.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Com uma ampla cobertura nacional, a SKY leva entretenimento e conectividade para todas as regiões do
                  Brasil, incluindo áreas remotas onde outras tecnologias não chegam.
                </p>
                {/* <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-[#E30613]">+12 milhões</p>
                    <p className="text-sm text-muted-foreground">Clientes atendidos</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-[#E30613]">+5 mil</p>
                    <p className="text-sm text-muted-foreground">Colaboradores</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-[#E30613]">+200</p>
                    <p className="text-sm text-muted-foreground">Canais disponíveis</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-[#E30613]">100%</p>
                    <p className="text-sm text-muted-foreground">Cobertura nacional</p>
                  </div>
                </div> */}
              </div>
              <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Escritório SKY"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Equipe SKY"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=620&width=300"
                    alt="Central de Operações SKY"
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
            </div>
          </div>
        </section>

        {/* Nossa História */}
        {/* <section id="nossa-historia" className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Nossa História</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Conheça a trajetória da SKY Brasil ao longo dos anos
              </p>
            </div>

            <div className="relative border-l-4 border-[#00205B] ml-4 md:ml-0 md:mx-auto md:max-w-3xl pl-8 md:pl-0 space-y-12">
              <TimelineItem
                year="1996"
                title="Fundação da SKY Brasil"
                description="A SKY Brasil é fundada, iniciando suas operações de TV por assinatura via satélite no país."
                position="left"
              />
              <TimelineItem
                year="2006"
                title="Expansão Nacional"
                description="A empresa atinge a marca de 1 milhão de assinantes e expande sua cobertura para todo o território nacional."
                position="right"
              />
              <TimelineItem
                year="2010"
                title="Lançamento da SKY HDTV"
                description="Pioneira na tecnologia de alta definição no Brasil, a SKY lança seus primeiros canais em HD."
                position="left"
              />
              <TimelineItem
                year="2015"
                title="Lançamento do SKY Play"
                description="A empresa inova com o lançamento da plataforma SKY Play, permitindo aos assinantes assistir conteúdo em qualquer dispositivo."
                position="right"
              />
              <TimelineItem
                year="2018"
                title="Entrada no mercado de Internet"
                description="A SKY expande seus serviços e começa a oferecer internet banda larga via fibra óptica."
                position="left"
              />
              <TimelineItem
                year="2023"
                title="Inovação Contínua"
                description="Lançamento de novos serviços e tecnologias, consolidando a posição de liderança no mercado brasileiro."
                position="right"
              />
            </div>
          </div>
        </section> */}

        {/* Nossa Equipe */}
        <section className="py-16 bg-slate-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Nossa Equipe</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Conheça os líderes que fazem a SKY Brasil acontecer
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            </div>
          </div>
        </section>

        {/* Nossas Instalações */}
        {/* <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Nossas Instalações</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Conheça os espaços onde trabalhamos para levar o melhor entretenimento até você
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Sede SKY Brasil"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Sede Corporativa</h3>
                  <p className="text-muted-foreground">São Paulo, SP</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Centro de Operações"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Centro de Operações</h3>
                  <p className="text-muted-foreground">Rio de Janeiro, RJ</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Centro de Distribuição"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Centro de Distribuição</h3>
                  <p className="text-muted-foreground">Barueri, SP</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Centro de Tecnologia"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Centro de Tecnologia</h3>
                  <p className="text-muted-foreground">Campinas, SP</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Central de Atendimento"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Central de Atendimento</h3>
                  <p className="text-muted-foreground">Salvador, BA</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Escritório Regional"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Escritório Regional</h3>
                  <p className="text-muted-foreground">Recife, PE</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

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
                <p className="text-white/80">Av. das Nações Unidas, 12901</p>
                <p className="text-white/80">São Paulo, SP - 04578-000</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg text-center">
                <Phone className="h-10 w-10 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Telefone</h3>
                <p className="text-white/80">Vendas: 0800 600 4990</p>
                <p className="text-white/80">Suporte: 0800 720 1234</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg text-center">
                <Clock className="h-10 w-10 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Horário</h3>
                <p className="text-white/80">Segunda a Sexta: 8h às 20h</p>
                <p className="text-white/80">Sábado: 9h às 15h</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <ContactModal
                trigger={
                  <Button size="lg" className="bg-white text-[#00205B] hover:bg-white/90">
                    Enviar Mensagem
                  </Button>
                }
                title="Envie sua Mensagem"
                description="Preencha seus dados para entrar em contato com nossa equipe. Responderemos o mais breve possível."
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

