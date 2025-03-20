import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SlideForm } from "@/components/admin/slide-form"

export default function NewSlidePage() {
  requireAuth()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/slides">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Novo Slide</h1>
          <p className="text-muted-foreground">Adicione um novo slide ao carrossel da página inicial</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Slide</CardTitle>
        </CardHeader>
        <CardContent>
          <SlideForm />
        </CardContent>
      </Card>
    </div>
  )
}

