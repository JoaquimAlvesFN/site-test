import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { FaqForm } from "@/components/admin/faq-form"
import { notFound } from "next/navigation"
import { getFaq } from "@/app/admin/actions"

interface FaqEditPageProps {
  params: {
    id: string
  }
}

export default async function FaqEditPage({ params }: FaqEditPageProps) {
  requireAuth()

  // Handle new FAQ case
  if (params.id === "new") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/faqs">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Nova Pergunta</h1>
            <p className="text-muted-foreground">Adicione uma nova pergunta frequente ao site</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações da Pergunta</CardTitle>
          </CardHeader>
          <CardContent>
            <FaqForm />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Converter ID para número
  const id = Number.parseInt(params.id)

  // Verificar se o ID é válido
  if (isNaN(id)) {
    console.error(`Invalid FAQ ID: ${params.id}`)
    notFound()
  }

  // Dados estáticos para garantir que a página funcione
  const staticFaqs = [
    {
      id: 1,
      question: "Qual a diferença entre SKY pós-pago e pré-pago?",
      answer:
        "O SKY pós-pago funciona com mensalidade fixa, cobrada mensalmente via fatura. Já o SKY pré-pago funciona com recargas, onde você paga antecipadamente pelo período que deseja utilizar o serviço, sem mensalidade ou fidelidade.",
      order: 1,
      active: true,
    },
    {
      id: 2,
      question: "Quanto tempo leva para instalar a SKY após a contratação?",
      answer:
        "A instalação da SKY geralmente é realizada em até 48 horas úteis após a aprovação do cadastro, dependendo da disponibilidade na sua região.",
      order: 2,
      active: true,
    },
    {
      id: 3,
      question: "Posso assistir SKY em mais de uma TV?",
      answer:
        "Sim, é possível assistir SKY em mais de uma TV. Dependendo do pacote escolhido, você pode ter pontos adicionais inclusos ou contratar separadamente.",
      order: 3,
      active: true,
    },
    {
      id: 4,
      question: "O que é o SKY Play?",
      answer:
        "O SKY Play é o serviço de streaming da SKY que permite assistir a diversos conteúdos pelo celular, tablet ou computador. Está incluso em todos os pacotes pós-pagos sem custo adicional.",
      order: 4,
      active: false,
    },
    {
      id: 5,
      question: "A SKY tem fidelidade?",
      answer:
        "Os planos pós-pagos geralmente possuem fidelidade de 12 meses. Já os planos pré-pagos não possuem fidelidade, permitindo recarregar apenas quando desejar.",
      order: 5,
      active: true,
    },
  ]

  // Tentar obter a FAQ do banco de dados
  let faqData = await getFaq(id)

  // Se não encontrar no banco de dados, procurar nos dados estáticos
  if (!faqData) {
    faqData = staticFaqs.find((faq) => faq.id === id)

    // Se ainda não encontrar, retornar 404
    if (!faqData) {
      console.error(`FAQ with ID ${id} not found`)
      notFound()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/faqs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Editar Pergunta</h1>
          <p className="text-muted-foreground">
            Edite as informações da pergunta frequente{" "}
            {faqData.question
              ? `"${faqData.question.substring(0, 30)}${faqData.question.length > 30 ? "..." : ""}"`
              : `#${id}`}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Pergunta</CardTitle>
        </CardHeader>
        <CardContent>
          <FaqForm faqData={faqData} />
        </CardContent>
      </Card>
    </div>
  )
}

