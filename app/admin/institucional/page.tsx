import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InstitucionalHistoryForm } from "@/components/admin/institucional-history-form"
import { InstitucionalTeamForm } from "@/components/admin/institucional-team-form"
import { InstitucionalImagesForm } from "@/components/admin/institucional-images-form"

export default function InstitucionalAdminPage() {
  requireAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Página Institucional</h1>
        <p className="text-muted-foreground">Gerencie o conteúdo da página institucional</p>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="history">História e Valores</TabsTrigger>
          <TabsTrigger value="team">Equipe</TabsTrigger>
          <TabsTrigger value="images">Imagens</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>História e Valores</CardTitle>
            </CardHeader>
            <CardContent>
              <InstitucionalHistoryForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Equipe</CardTitle>
            </CardHeader>
            <CardContent>
              <InstitucionalTeamForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Imagens da Empresa</CardTitle>
            </CardHeader>
            <CardContent>
              <InstitucionalImagesForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

