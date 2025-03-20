import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PackageForm } from "@/components/admin/package-form"

export default function NewPackagePage() {
  requireAuth()

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

