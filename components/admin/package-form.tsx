"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import type { Package } from "@/lib/db"
import { createPackage, updatePackage } from "@/app/admin/actions"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

interface PackageFormProps {
  packageData?: Package
}

export function PackageForm({ packageData }: PackageFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [features, setFeatures] = useState<string[]>((packageData?.features as string[]) || [""])

  const [formData, setFormData] = useState({
    title: packageData?.title || "",
    price: packageData?.price || "",
    description: packageData?.description || "",
    popular: packageData?.popular || false,
    recurrent: packageData?.recurrent ?? true,
    discount: packageData?.discount || "",
    tag: packageData?.tag || "",
    packageType: packageData?.packageType || "pos-pago",
    position: packageData?.position || 0,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSwitchChange(name: string, checked: boolean) {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  function handleFeatureChange(index: number, value: string) {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  function addFeature() {
    setFeatures([...features, ""])
  }

  function removeFeature(index: number) {
    const newFeatures = [...features]
    newFeatures.splice(index, 1)
    setFeatures(newFeatures)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Filter out empty features
      const filteredFeatures = features.filter((f) => f.trim() !== "")

      const packagePayload = {
        ...formData,
        features: filteredFeatures.join(","),
      }

      if (packageData?.id) {
        await updatePackage(packageData.id, packagePayload)
        toast({
          title: "Pacote atualizado com sucesso!",
          description: `O pacote "${formData.title}" foi atualizado e já está disponível no site.`,
        })
      } else {
        await createPackage(packagePayload)
        toast({
          title: "Pacote criado com sucesso!",
          description: `O pacote "${formData.title}" foi criado e já está disponível no site.`,
        })
      }

      router.push("/admin/packages")
      router.refresh()
    } catch (error) {
      console.error("Failed to save package:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="price">Preço</Label>
          <Input id="price" name="price" value={formData.price} onChange={handleChange} required />
          <p className="text-sm text-muted-foreground mt-1">Formato: 89,90 (sem o R$)</p>
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="packageType">Tipo de Pacote</Label>
          <RadioGroup
            value={formData.packageType}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, packageType: value }))}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pos-pago" id="pos-pago" />
              <Label htmlFor="pos-pago">Pós-pago</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pre-pago" id="pre-pago" />
              <Label htmlFor="pre-pago">Pré-pago</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="discount">Desconto (opcional)</Label>
          <Input
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="De R$ 99,90 por"
          />
        </div>

        <div>
          <Label htmlFor="tag">Tag (opcional)</Label>
          <Input id="tag" name="tag" value={formData.tag} onChange={handleChange} placeholder="MAIS VENDIDO" />
        </div>

        <div>
          <Label htmlFor="position">Posição</Label>
          <Input 
            id="position" 
            name="position" 
            type="number" 
            value={formData.position} 
            onChange={handleChange} 
            placeholder="0"
            min="0"
          />
          <p className="text-sm text-muted-foreground mt-1">Ordem de exibição do pacote (menor número aparece primeiro)</p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="popular"
            checked={formData.popular}
            onCheckedChange={(checked) => handleSwitchChange("popular", checked)}
          />
          <Label htmlFor="popular">Destacar como popular</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="recurrent"
            checked={formData.recurrent}
            onCheckedChange={(checked) => handleSwitchChange("recurrent", checked)}
          />
          <Label htmlFor="recurrent">Pagamento recorrente (mensal)</Label>
        </div>

        <div>
          <Label>Características</Label>
          <div className="space-y-2 mt-2">
            {features?.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`Característica ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeFeature(index)}
                  disabled={features.length <= 1}
                >
                  -
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFeature} className="w-full">
              Adicionar Característica
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/packages")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}

