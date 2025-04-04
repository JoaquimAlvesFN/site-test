"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { updateSetting } from "@/app/admin/actions"
import { ImageSelector } from "./image-selector"

interface LogoSettingsFormProps {
  settings: Record<string, string>
}

export function LogoSettingsForm({ settings }: LogoSettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    header_logo: settings.header_logo || "",
    footer_logo: settings.footer_logo || "",
  })

  function handleLogoChange(key: string, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Salvar cada configuração individualmente
      for (const [key, value] of Object.entries(formData)) {
        const result = await updateSetting(key, value)
        if (!result.success) {
          throw new Error(result.error || `Erro ao salvar configuração ${key}`)
        }
      }

      toast({
        title: "Logos atualizadas com sucesso!",
        description: "As configurações de logo foram atualizadas.",
      })
    } catch (error) {
      console.error("Failed to save logo settings:", error)
      toast({
        title: "Erro ao salvar",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao salvar as configurações de logo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Logo do Cabeçalho</Label>
          <div className="mt-2">
            <ImageSelector
              value={formData.header_logo}
              onChange={(value) => handleLogoChange("header_logo", value)}
              label="Selecionar Logo do Cabeçalho"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Recomendado: 120x40px, fundo transparente</p>
        </div>

        <div>
          <Label>Logo do Rodapé</Label>
          <div className="mt-2">
            <ImageSelector
              value={formData.footer_logo}
              onChange={(value) => handleLogoChange("footer_logo", value)}
              label="Selecionar Logo do Rodapé"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Recomendado: 120x40px, fundo transparente (será exibida em branco no rodapé)
          </p>
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

