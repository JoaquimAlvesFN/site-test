import { Check, X } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export function PackageComparison() {
  const packages = [
    { name: "Essencial", price: "89,90" },
    { name: "Plus", price: "129,90" },
    { name: "Premium", price: "189,90" },
  ]

  const featuresData = [
    {
      name: "Canais de filmes e séries",
      essencial: true,
      plus: true,
      premium: true,
    },
    {
      name: "Canais de esportes básicos",
      essencial: true,
      plus: true,
      premium: true,
    },
    {
      name: "Canais premium (HBO, Telecine)",
      essencial: false,
      plus: true,
      premium: true,
    },
    {
      name: "Canais internacionais",
      essencial: false,
      plus: false,
      premium: true,
    },
    {
      name: "Aplicativo SKY Play",
      essencial: true,
      plus: true,
      premium: true,
    },
    {
      name: "Paramount+ incluso",
      essencial: false,
      plus: false,
      premium: true,
    },
    {
      name: "Pontos adicionais grátis",
      essencial: "0",
      plus: "1",
      premium: "2",
    },
  ]

  return (
    <div className="bg-white text-slate-900 rounded-lg overflow-hidden shadow-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Recursos</TableHead>
            {packages.map((pkg) => (
              <TableHead key={pkg.name} className="text-center">
                {pkg.name}
                <div className="font-normal text-sm">R$ {pkg.price}/mês</div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {featuresData.map((feature) => (
            <TableRow key={feature.name}>
              <TableCell className="font-medium">{feature.name}</TableCell>
              <TableCell className="text-center">
                {typeof feature.essencial === "boolean" ? (
                  feature.essencial ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-slate-300 mx-auto" />
                  )
                ) : (
                  feature.essencial
                )}
              </TableCell>
              <TableCell className={cn("text-center", packages[1].name === "Plus" && "bg-[#E30613]/10")}>
                {typeof feature.plus === "boolean" ? (
                  feature.plus ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-slate-300 mx-auto" />
                  )
                ) : (
                  feature.plus
                )}
              </TableCell>
              <TableCell className="text-center">
                {typeof feature.premium === "boolean" ? (
                  feature.premium ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-slate-300 mx-auto" />
                  )
                ) : (
                  feature.premium
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

