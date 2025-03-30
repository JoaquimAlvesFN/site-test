import { Suspense } from "react"
import Link from "next/link"
import { ChevronRight, Shield, Zap, Check, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PricingCard } from "@/components/pricing-card"
import { HeroSection } from "@/components/hero-section"
import { PackageComparison } from "@/components/package-comparison"
import { ChannelGrid } from "@/components/channel-grid"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { PromoBanner } from "@/components/promo-banner"
import { FaqAccordion } from "@/components/faq-accordion"
import { Footer } from "@/components/footer"

// Adicione a importação das novas seções
import { InternetSection } from "@/components/internet-section"
import { BusinessSection } from "@/components/business-section"
import { ContactForm } from "@/components/contact-form"
import { ContactModal } from "@/components/contact-modal"
import { DynamicLogo } from "@/components/dynamic-logo"
import { QuickFeatures } from "@/components/quick-features"
import { WhyChooseSection } from "@/components/why-choose-section"
// Modificar a seção de depoimentos para usar o componente TestimonialSection
import { TestimonialSection } from "@/components/testimonial-section"

// Importar funções para buscar dados
import { getActivePackages } from "@/app/admin/actions"

export default async function Home() {
  // Buscar dados do banco de dados
  const packagesData = await getActivePackages()

  // Garantir que packagesData é um array
  const packages = Array.isArray(packagesData) ? packagesData : []

  // Filtrar os pacotes
  const posPackages = packages.filter((pkg) => pkg.packageType === "pos-pago")
  const prePackages = packages.filter((pkg) => pkg.packageType === "pre-pago")

  return (
    <div className="flex min-h-screen flex-col">
      <PromoBanner />

      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              {/* <DynamicLogo
                type="header"
                fallbackSrc="https://sjc.microlink.io/EVPkxg5JrNWxZNP9AWwi5KRkyc0EaklEAI0j6mP3BLANnvCK51AwejCcuTRPp1RtaCoUH-vI4pLeAn4KL4YmWQ.jpeg"
              /> */}
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="#tv-packages" className="text-sm font-medium transition-colors hover:text-[#E30613]">
                Pacotes TV
              </Link>
              <Link href="#internet" className="text-sm font-medium transition-colors hover:text-[#E30613]">
                Internet
              </Link>
              <Link href="#combos" className="text-sm font-medium transition-colors hover:text-[#E30613]">
                Combos
              </Link>
              <Link href="#channels" className="text-sm font-medium transition-colors hover:text-[#E30613]">
                Canais
              </Link>
              <Link href="/institucional" className="text-sm font-medium transition-colors hover:text-[#E30613]">
                Institucional
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center">
              <Phone className="h-4 w-4 text-[#E30613] mr-1" />
              <Link href="tel:08006004990" className="text-sm font-bold hover:text-[#E30613]">
                0800 600 4990
              </Link>
            </div>
            <ContactModal
              trigger={<Button className="bg-[#E30613] hover:bg-[#c00511]">Assinar Agora</Button>}
              title="Assine SKY"
              description="Preencha seus dados para assinar um dos nossos planos. Nossa equipe entrará em contato em breve."
            />
            <Link
              href="https://wa.me/5511999999999"
              className="flex items-center justify-center rounded-full bg-green-500 p-2 md:hidden"
            >
              <Zap className="h-5 w-5 text-white" />
              <span className="sr-only">WhatsApp</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Suspense fallback={<div>Carregando...</div>}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<div>Carregando...</div>}>
          <QuickFeatures />
        </Suspense>

        <Suspense fallback={<div>Carregando...</div>}>
          <BusinessSection />
        </Suspense>

        <section id="tv-packages" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Escolha o Melhor Pacote para Você
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Temos opções para todos os gostos e bolsos. Desde pacotes básicos até premium com todos os canais e
                serviços exclusivos.
              </p>
            </div>

            <Tabs defaultValue="pos-pago" className="w-full max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="pos-pago" className="text-base py-3">
                  Pós-Pago
                </TabsTrigger>
                <TabsTrigger value="pre-pago" className="text-base py-3">
                  Pré-Pago
                </TabsTrigger>
              </TabsList>
              <TabsContent value="pos-pago" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {posPackages.length > 0 ? (
                    posPackages.map((pkg) => (
                      <PricingCard
                        key={pkg.id}
                        title={pkg.title}
                        price={pkg.price}
                        description={pkg.description}
                        features={pkg.features.split(',') as string[]}
                        popular={pkg.popular}
                        recurrent={pkg.recurrent}
                        discount={pkg.discount || undefined}
                        tag={pkg.tag || undefined}
                        packageId={pkg.id}
                      />
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-8">
                      <p>Nenhum pacote pós-pago disponível no momento.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="pre-pago" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {prePackages.length > 0 ? (
                    prePackages.map((pkg) => (
                      <PricingCard
                        key={pkg.id}
                        title={pkg.title}
                        price={pkg.price}
                        description={pkg.description}
                        features={pkg.features.split(',') as string[]}
                        popular={pkg.popular}
                        recurrent={pkg.recurrent}
                        discount={pkg.discount || undefined}
                        tag={pkg.tag || undefined}
                        packageId={pkg.id}
                      />
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-8">
                      <p>Nenhum pacote pré-pago disponível no momento.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-12 text-center">
              {/* <ContactModal
                trigger={
                  <Button size="lg" className="bg-[#E30613] hover:bg-[#c00511]">
                    <span className="flex items-center gap-2">
                      Ver Todos os Pacotes
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </Button>
                }
                title="Conheça Todos os Pacotes"
                description="Preencha seus dados para conhecer todos os nossos pacotes. Nossa equipe entrará em contato em breve."
              /> */}
            </div>
          </div>
        </section>

        <Suspense fallback={<div>Carregando...</div>}>
          <InternetSection />
        </Suspense>

        <section id="channels" className="py-16 bg-slate-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Os Melhores Canais Estão na SKY
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Confira alguns dos principais canais disponíveis nos pacotes SKY
              </p>
            </div>

            {/* <Suspense fallback={<div>Carregando...</div>}> */}
              <ChannelGrid />
            {/* </Suspense> */}

            <div className="mt-12 text-center">
              {/* <ContactModal
                trigger={
                  <Button variant="outline" size="lg">
                    <span className="flex items-center gap-2">
                      Ver Lista Completa de Canais
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </Button>
                }
                title="Lista Completa de Canais"
                description="Preencha seus dados para receber a lista completa de canais. Nossa equipe entrará em contato em breve."
              /> */}
            </div>
          </div>
        </section>

        <Suspense fallback={<div>Carregando...</div>}>
          <WhyChooseSection />
        </Suspense>

        {/* <section className="py-16 bg-[#00205B] text-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Compare Nossos Pacotes</h2>
                <p className="mt-4 text-lg text-slate-300 max-w-xl">
                  Veja lado a lado as diferenças entre nossos pacotes e escolha o que melhor atende às suas
                  necessidades.
                </p>
                <div className="mt-8">
                  <ContactModal
                    trigger={
                      <Button size="lg" variant="secondary">
                        Falar com Consultor
                      </Button>
                    }
                    title="Fale com um Consultor"
                    description="Preencha seus dados para falar com um de nossos consultores. Ele irá ajudá-lo a escolher o melhor pacote para você."
                  />
                </div>
              </div>
              <div>
                <PackageComparison />
              </div>
            </div>
          </div>
        </section> */}

        <section className="py-16 bg-slate-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">O Que Nossos Clientes Dizem</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Milhares de famílias brasileiras já aproveitam a qualidade SKY. Veja alguns depoimentos.
              </p>
            </div>

            <Suspense fallback={<div>Carregando...</div>}>
              <TestimonialSection />
            </Suspense>
          </div>
        </section>

        <Suspense fallback={<div>Carregando...</div>}>
          <BusinessSection />
        </Suspense>

        <section className="py-16 bg-slate-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Perguntas Frequentes</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Tire suas dúvidas sobre os pacotes e serviços SKY
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {/* <Suspense fallback={<div>Carregando...</div>}> */}
                <FaqAccordion />
              {/* </Suspense> */}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 bg-[#E30613] text-white">
                  <h2 className="text-2xl font-bold mb-4">Fale com um Consultor</h2>
                  <p className="mb-6">
                    Preencha o formulário e um de nossos consultores entrará em contato para oferecer o melhor pacote
                    para você.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5" />
                      <span>Atendimento via WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5" />
                      <span>Ofertas exclusivas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5" />
                      <span>Instalação em até 48h</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5" />
                      <span>Melhor preço garantido</span>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <FloatingWhatsApp />
    </div>
  )
}

