import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { FaqForm } from "@/components/admin/faq-form"

export default function NewFaqPage() {
  requireAuth()

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

