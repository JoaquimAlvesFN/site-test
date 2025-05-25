import Image from "next/image"
import Link from "next/link"
import { Building2, Users, BarChart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getBusinessSection } from "@/app/admin/actions"
import { ContactModal } from "./contact-modal"
import { cn } from "@/lib/utils"

export async function BusinessSection() {
  // Buscar os dados da seção de negócios do banco de dados
  const sectionData = await getBusinessSection()

  // Se a seção não estiver ativa, não renderizar nada
  if (!sectionData.active) {
    return null
  }

  // Função para renderizar o ícone correto
  const renderIcon = (iconName: string) => {
    const iconProps = { className: "h-5 w-5 text-[#E30613]" }

    switch (iconName) {
      case "Building2":
        return <Building2 {...iconProps} />
      case "Users":
        return <Users {...iconProps} />
      case "BarChart":
        return <BarChart {...iconProps} />
      default:
        return <Building2 {...iconProps} />
    }
  }

  return (
    <section id="business" className="py-16 bg-slate-50">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#00205B]/10 px-4 py-1 rounded-full text-[#00205B] text-sm font-medium mb-4">
            {sectionData.subtitle}
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{sectionData.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">{sectionData.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center mb-12">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-bold mb-4">Transforme a experiência dos seus hóspedes</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Oferecemos soluções integradas de TV e internet para o setor hoteleiro, unindo tecnologia de ponta e
              expertise para agregar valor ao seu negócio.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {sectionData.features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="bg-[#E30613]/10 p-2 rounded-full">{renderIcon(feature.icon)}</div>
                    <div>
                      <h4 className="font-medium">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <ContactModal
              trigger={
                <Button className="bg-[#E30613] hover:bg-[#E30613]">{sectionData.cta}</Button>
              }

              title="Solicitar Proposta Comercial"
              // description={`Preencha seus dados para assinar o pacote ${title}. Nossa equipe entrará em contato em breve.`}
              // packageId={packageId}
              // defaultInterest={title.toLowerCase().includes("internet") ? "internet" : "tv"}
              // produto={`${title} - ${price}`}
              tipoPessoa="juridica"
            />

            {/* <Button className="bg-[#E30613] hover:bg-[#E30613]" asChild>
              <Link href={sectionData.ctaLink}>{sectionData.cta}</Link>
            </Button> */}
          </div>

          {/* <div className="order-1 lg:order-2">
            <Image
              src={sectionData.image || "/placeholder.svg"}
              alt="SKY para Empresas"
              width={600}
              height={500}
              className="rounded-xl shadow-lg"
            />
          </div> */}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h3 className="text-xl font-bold mb-4">Benefícios para seu negócio</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {sectionData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-[#E30613] shrink-0 mt-0.5" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

