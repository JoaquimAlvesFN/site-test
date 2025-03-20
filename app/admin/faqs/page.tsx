import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import Link from "next/link"
import { Plus, Edit, ChevronDown, ChevronUp } from "lucide-react"
import { FaqDeleteButton } from "@/components/admin/faq-delete-button"

export default async function FaqsPage() {
  requireAuth()

  // Para o demo, vamos usar dados estáticos
  const faqs = [
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Perguntas Frequentes</h1>
          <p className="text-muted-foreground">Gerencie as perguntas frequentes exibidas no site</p>
        </div>
        <Button asChild>
          <Link href="/admin/faqs/new">
            <Plus className="h-4 w-4 mr-2" />
            Nova Pergunta
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className={`border rounded-lg p-4 ${!faq.active ? "opacity-60 bg-slate-50" : ""}`}>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-200 text-slate-700 text-xs px-2 py-1 rounded-full">
                        Ordem: {faq.order}
                      </span>
                      {!faq.active && (
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Inativo</span>
                      )}
                    </div>
                    <h3 className="font-medium text-lg mt-2">{faq.question}</h3>
                    <div className="mt-2 text-muted-foreground">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" asChild>
                      <Link href={`/admin/faqs/${faq.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <FaqDeleteButton id={faq.id} />
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="ghost" size="sm" className="h-8 text-slate-500">
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Mover para cima
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-slate-500">
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Mover para baixo
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

