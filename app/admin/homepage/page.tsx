import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuickFeaturesForm } from "@/components/admin/quick-features-form"
import { WhyChooseFeaturesForm } from "@/components/admin/why-choose-features-form"
import { InternetSectionForm } from "@/components/admin/internet-section-form"
import { BusinessSectionForm } from "@/components/admin/business-section-form"
import { PackageComparisonForm } from "@/components/admin/package-comparison-form"

export default function HomepageAdminPage() {
  requireAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Página Inicial</h1>
        <p className="text-muted-foreground">Gerencie o conteúdo da página inicial</p>
      </div>

      <Tabs defaultValue="quick-features" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="quick-features">Recursos Rápidos</TabsTrigger>
          <TabsTrigger value="why-choose">Por Que Escolher</TabsTrigger>
          <TabsTrigger value="internet">Seção Internet</TabsTrigger>
          <TabsTrigger value="business">Seção Empresas</TabsTrigger>
          <TabsTrigger value="comparison">Comparação de Pacotes</TabsTrigger>
        </TabsList>

        <TabsContent value="quick-features">
          <Card>
            <CardHeader>
              <CardTitle>Recursos Rápidos</CardTitle>
            </CardHeader>
            <CardContent>
              <QuickFeaturesForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="why-choose">
          <Card>
            <CardHeader>
              <CardTitle>Por Que Escolher a SKY?</CardTitle>
            </CardHeader>
            <CardContent>
              <WhyChooseFeaturesForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="internet">
          <Card>
            <CardHeader>
              <CardTitle>Seção de Internet</CardTitle>
            </CardHeader>
            <CardContent>
              <InternetSectionForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Seção de Empresas</CardTitle>
            </CardHeader>
            <CardContent>
              <BusinessSectionForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Comparação de Pacotes</CardTitle>
            </CardHeader>
            <CardContent>
              <PackageComparisonForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

