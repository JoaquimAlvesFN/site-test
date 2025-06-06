import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import Link from "next/link"
import { Plus, Edit } from "lucide-react"
import { PackageDeleteButton } from "@/components/admin/package-delete-button"
import { getAllPackage } from "../actions"

export default async function PackagesPage() {
  requireAuth()

  // Para o demo, vamos usar dados estáticos
  // const packages = [
  //   {
  //     id: 1,
  //     title: "SKY Essencial",
  //     price: "89,90",
  //     popular: false,
  //     tag: "",
  //     packageType: "pos-pago",
  //   },
  //   {
  //     id: 2,
  //     title: "SKY Plus",
  //     price: "129,90",
  //     popular: true,
  //     tag: "MAIS VENDIDO",
  //     packageType: "pos-pago",
  //   },
  //   {
  //     id: 3,
  //     title: "SKY Premium",
  //     price: "189,90",
  //     popular: false,
  //     tag: "",
  //     packageType: "pos-pago",
  //   },
  //   {
  //     id: 4,
  //     title: "SKY Pré 30",
  //     price: "69,90",
  //     popular: false,
  //     tag: "",
  //     packageType: "pre-pago",
  //   },
  //   {
  //     id: 5,
  //     title: "SKY Pré 90",
  //     price: "179,90",
  //     popular: true,
  //     tag: "MELHOR CUSTO-BENEFÍCIO",
  //     packageType: "pre-pago",
  //   },
  //   {
  //     id: 6,
  //     title: "SKY Pré 180",
  //     price: "329,90",
  //     popular: false,
  //     tag: "",
  //     packageType: "pre-pago",
  //   },
  // ]

  const packages = await getAllPackage()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pacotes</h1>
          <p className="text-muted-foreground">Gerencie os pacotes disponíveis no site</p>
        </div>
        <Button asChild>
          <Link href="/admin/packages/new">
            <Plus className="h-4 w-4 mr-2" />
            Novo Pacote
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pacotes Pós-Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Título</th>
                    <th className="text-left py-3 px-4">Preço</th>
                    <th className="text-left py-3 px-4">Popular</th>
                    <th className="text-left py-3 px-4">Tag</th>
                    <th className="text-right py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {packages
                    .filter((pkg) => pkg.packageType === "pos-pago")
                    .map((pkg) => (
                      <tr key={pkg.id} className="border-b hover:bg-slate-50">
                        <td className="py-3 px-4">{pkg.title}</td>
                        <td className="py-3 px-4">R$ {pkg.price}</td>
                        <td className="py-3 px-4">{pkg.popular ? "Sim" : "Não"}</td>
                        <td className="py-3 px-4">{pkg.tag || "-"}</td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/packages/${pkg.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <PackageDeleteButton id={pkg.id} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Pacotes Pré-Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Título</th>
                    <th className="text-left py-3 px-4">Preço</th>
                    <th className="text-left py-3 px-4">Popular</th>
                    <th className="text-left py-3 px-4">Tag</th>
                    <th className="text-right py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {packages
                    .filter((pkg) => pkg.packageType === "pre-pago")
                    .map((pkg) => (
                      <tr key={pkg.id} className="border-b hover:bg-slate-50">
                        <td className="py-3 px-4">{pkg.title}</td>
                        <td className="py-3 px-4">R$ {pkg.price}</td>
                        <td className="py-3 px-4">{pkg.popular ? "Sim" : "Não"}</td>
                        <td className="py-3 px-4">{pkg.tag || "-"}</td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/packages/${pkg.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <PackageDeleteButton id={pkg.id} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}

