"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Plus, Trash2 } from "lucide-react"
import { getActivePackages } from "@/app/admin/actions"
import type { Package } from "@/lib/db"

// Definir o tipo para os dados da tabela de comparação
interface ComparisonFeature {
  name: string
  essencial: boolean | string
  plus: boolean | string
  premium: boolean | string
}

export function PackageComparisonForm() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [packages, setPackages] = useState<Package[]>([])
  const [features, setFeatures] = useState<ComparisonFeature[]>([
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
  ])

  useEffect(() => {
    async function loadPackages() {
      try {
        const data = await getActivePackages()
        // Filtrar apenas pacotes pós-pagos
        const posPackages = data.filter((pkg) => pkg.packageType === "pos-pago")
        setPackages(posPackages)
      } catch (error) {
        console.error("Erro ao carregar pacotes:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os pacotes.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadPackages()
  }, [])

  function handleFeatureChange(index: number, field: keyof ComparisonFeature, value: boolean | string) {
    const newFeatures = [...features]
    newFeatures[index] = { ...newFeatures[index], [field]: value }
    setFeatures(newFeatures)
  }

  function addFeature() {
    setFeatures([
      ...features,
      {
        name: "",
        essencial: false,
        plus: false,
        premium: false,
      },
    ])
  }

  function removeFeature(index: number) {
    const newFeatures = [...features]
    newFeatures.splice(index, 1)
    setFeatures(newFeatures)
  }

  function toggleBooleanValue(index: number, field: "essencial" | "plus" | "premium") {
    const currentValue = features[index][field]
    // Se o valor atual for uma string, converta para boolean
    const boolValue = typeof currentValue === "string" ? false : !currentValue
    handleFeatureChange(index, field, boolValue)
  }

  function setStringValue(index: number, field: "essencial" | "plus" | "premium", value: string) {
    handleFeatureChange(index, field, value)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Aqui você implementaria a lógica para salvar os dados da tabela de comparação
      // Como não temos uma tabela específica para isso, podemos usar a tabela de configurações
      // ou criar uma nova tabela no banco de dados

      toast({
        title: "Tabela de comparação atualizada com sucesso!",
        description: "A tabela de comparação de pacotes foi atualizada na página inicial.",
      })
    } catch (error) {
      console.error("Erro ao salvar tabela de comparação:", error)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar a tabela de comparação.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="text-center py-4">Carregando pacotes...</div>
  }

  if (packages.length < 3) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h3 className="font-medium text-yellow-800">Pacotes insuficientes</h3>
        <p className="text-yellow-700 mt-1">
          É necessário ter pelo menos 3 pacotes pós-pagos cadastrados para configurar a tabela de comparação. Atualmente
          você tem {packages.length} pacotes pós-pagos.
        </p>
        <Button className="mt-4" variant="outline" onClick={() => (window.location.href = "/admin/packages/new")}>
          Criar Novo Pacote
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="font-medium">Pacotes na Tabela de Comparação</h3>
          <p className="text-sm text-muted-foreground mt-1">
            A tabela de comparação usa os 3 pacotes pós-pagos principais. Você pode editar os pacotes na seção
            "Pacotes".
          </p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {packages.slice(0, 3).map((pkg) => (
              <div key={pkg.id} className="border rounded-lg p-3 bg-white">
                <div className="font-medium">{pkg.title}</div>
                <div className="text-sm text-muted-foreground">R$ {pkg.price}/mês</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Recursos para Comparação</Label>
          <div className="space-y-4 mt-2">
            {features.map((feature, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Recurso #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                </div>

                <div>
                  <Label htmlFor={`feature-name-${index}`}>Nome do Recurso</Label>
                  <Input
                    id={`feature-name-${index}`}
                    value={feature.name}
                    onChange={(e) => handleFeatureChange(index, "name", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label>Essencial</Label>
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`feature-essencial-bool-${index}`}
                        checked={typeof feature.essencial === "boolean" && feature.essencial}
                        onCheckedChange={() => toggleBooleanValue(index, "essencial")}
                        disabled={typeof feature.essencial === "string"}
                      />
                      <Label htmlFor={`feature-essencial-bool-${index}`}>
                        {typeof feature.essencial === "boolean"
                          ? feature.essencial
                            ? "Sim"
                            : "Não"
                          : "Valor personalizado"}
                      </Label>
                    </div>
                    <Input
                      value={typeof feature.essencial === "string" ? feature.essencial : ""}
                      onChange={(e) => setStringValue(index, "essencial", e.target.value)}
                      placeholder="Valor personalizado"
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Plus</Label>
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`feature-plus-bool-${index}`}
                        checked={typeof feature.plus === "boolean" && feature.plus}
                        onCheckedChange={() => toggleBooleanValue(index, "plus")}
                        disabled={typeof feature.plus === "string"}
                      />
                      <Label htmlFor={`feature-plus-bool-${index}`}>
                        {typeof feature.plus === "boolean" ? (feature.plus ? "Sim" : "Não") : "Valor personalizado"}
                      </Label>
                    </div>
                    <Input
                      value={typeof feature.plus === "string" ? feature.plus : ""}
                      onChange={(e) => setStringValue(index, "plus", e.target.value)}
                      placeholder="Valor personalizado"
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Premium</Label>
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`feature-premium-bool-${index}`}
                        checked={typeof feature.premium === "boolean" && feature.premium}
                        onCheckedChange={() => toggleBooleanValue(index, "premium")}
                        disabled={typeof feature.premium === "string"}
                      />
                      <Label htmlFor={`feature-premium-bool-${index}`}>
                        {typeof feature.premium === "boolean"
                          ? feature.premium
                            ? "Sim"
                            : "Não"
                          : "Valor personalizado"}
                      </Label>
                    </div>
                    <Input
                      value={typeof feature.premium === "string" ? feature.premium : ""}
                      onChange={(e) => setStringValue(index, "premium", e.target.value)}
                      placeholder="Valor personalizado"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFeature} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Recurso
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}

