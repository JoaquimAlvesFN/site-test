import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import { getPackage } from "@/app/admin/actions"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PackageForm } from "@/components/admin/package-form"
import { notFound } from "next/navigation"

interface PackageEditPageProps {
  params: {
    id: string
  }
}

export default async function PackageEditPage({ params }: PackageEditPageProps) {
  requireAuth()

  // Handle new package case - verificar antes de tentar converter para número
  if (params.id === "new") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/packages">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Novo Pacote</h1>
            <p className="text-muted-foreground">Adicione um novo pacote ao site</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Pacote</CardTitle>
          </CardHeader>
          <CardContent>
            <PackageForm />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Converter ID para número apenas se não for "new"
  const id = Number.parseInt(params.id)

  // Verificar se o ID é válido
  if (isNaN(id)) {
    console.error(`Invalid package ID: ${params.id}`)
    notFound()
  }

  // Para o caso de edição, vamos usar dados estáticos para garantir que funcione
  // Isso é uma solução temporária até que o banco de dados esteja funcionando corretamente
  const staticPackages = [
    {
      id: 1,
      title: "SKY Essencial",
      price: "89,90",
      description: "Pacote ideal para quem busca economia sem abrir mão da qualidade.",
      features: [
        "Mais de 100 canais",
        "Canais de filmes e séries",
        "Canais de esportes básicos",
        "Aplicativo SKY Play",
        "Instalação padrão grátis",
      ],
      popular: false,
      recurrent: true,
      discount: "De R$ 99,90 por",
      packageType: "pos-pago",
    },
    {
      id: 2,
      title: "SKY Plus",
      price: "129,90",
      description: "O pacote mais escolhido pelos nossos clientes.",
      features: [
        "Mais de 150 canais",
        "Canais premium de filmes",
        "Esportes completos",
        "Aplicativo SKY Play",
        "1 ponto adicional grátis",
        "Instalação padrão grátis",
      ],
      popular: true,
      recurrent: true,
      discount: "De R$ 149,90 por",
      tag: "MAIS VENDIDO",
      packageType: "pos-pago",
    },
    {
      id: 3,
      title: "SKY Premium",
      price: "189,90",
      description: "Experiência completa com todos os canais disponíveis.",
      features: [
        "Mais de 200 canais",
        "Todos os canais premium",
        "Pacote completo de esportes",
        "Aplicativo SKY Play",
        "2 pontos adicionais grátis",
        "Paramount+ incluso",
        "Instalação padrão grátis",
      ],
      popular: false,
      recurrent: true,
      discount: "De R$ 219,90 por",
      packageType: "pos-pago",
    },
    {
      id: 4,
      title: "SKY Pré 30",
      price: "69,90",
      description: "Recarga mensal sem fidelidade.",
      features: [
        "Mais de 80 canais",
        "Canais de filmes e séries",
        "Validade de 30 dias",
        "Sem análise de crédito",
        "Equipamento próprio",
      ],
      popular: false,
      recurrent: false,
      packageType: "pre-pago",
    },
    {
      id: 5,
      title: "SKY Pré 90",
      price: "179,90",
      description: "Melhor custo-benefício para pré-pago.",
      features: [
        "Mais de 80 canais",
        "Canais de filmes e séries",
        "Validade de 90 dias",
        "Sem análise de crédito",
        "Economia de R$ 30,00",
        "Equipamento próprio",
      ],
      popular: true,
      recurrent: false,
      tag: "MELHOR CUSTO-BENEFÍCIO",
      packageType: "pre-pago",
    },
    {
      id: 6,
      title: "SKY Pré 180",
      price: "329,90",
      description: "Maior economia para longo prazo.",
      features: [
        "Mais de 80 canais",
        "Canais de filmes e séries",
        "Validade de 180 dias",
        "Sem análise de crédito",
        "Economia de R$ 90,00",
        "Equipamento próprio",
      ],
      popular: false,
      recurrent: false,
      packageType: "pre-pago",
    },
  ]

  // Tentar obter o pacote do banco de dados
  let packageData = await getPackage(id)

  // Se não encontrar no banco de dados, procurar nos dados estáticos
  // if (!packageData) {
  //   packageData = staticPackages.find((pkg) => pkg.id === id)

  //   // Se ainda não encontrar, retornar 404
  //   if (!packageData) {
  //     console.error(`Package with ID ${id} not found`)
  //     notFound()
  //   }
  // }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/packages">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Editar Pacote</h1>
          <p className="text-muted-foreground">Edite as informações do pacote {packageData.title || `#${id}`}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Pacote</CardTitle>
        </CardHeader>
        <CardContent>
          <PackageForm packageData={packageData} />
        </CardContent>
      </Card>
    </div>
  )
}

