"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

// Adicionar a importação das ações do servidor
import { updateSetting } from "@/app/admin/actions"

interface SettingsField {
  key: string
  label: string
  placeholder?: string
  type?: "text" | "switch"
}

interface SettingsFormProps {
  settings: Record<string, string>
  section: string
  fields: SettingsField[]
}

export function SettingsForm({ settings, section, fields }: SettingsFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce(
      (acc, field) => {
        acc[field.key] = settings[field.key] || ""
        return acc
      },
      {} as Record<string, string>,
    ),
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(key: string, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  function handleSwitchChange(key: string, checked: boolean) {
    setFormData((prev) => ({ ...prev, [key]: checked ? "true" : "false" }))
  }

  // Modificar a função handleSubmit para chamar as ações do servidor
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Salvar cada configuração individualmente
      console.log("formData", formData);
      for (const [key, value] of Object.entries(formData)) {
        const result = await updateSetting(key, value)
        if (!result.success) {
          throw new Error(result.error || 'Falha ao salvar configuração')
        }
      }

      toast({
        title: "Configurações salvas com sucesso!",
        description: `As configurações da seção "${section}" foram atualizadas.`,
      })
    } catch (error) {
      console.error("Failed to save settings:", error)
      toast({
        title: "Erro ao salvar",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.key} className="space-y-2">
          {field.type === "switch" ? (
            <div className="flex items-center space-x-2">
              <Switch
                id={field.key}
                checked={formData[field.key] === "true"}
                onCheckedChange={(checked) => handleSwitchChange(field.key, checked)}
              />
              <Label htmlFor={field.key}>{field.label}</Label>
            </div>
          ) : (
            <>
              <Label htmlFor={field.key}>{field.label}</Label>
              <Input
                id={field.key}
                value={formData[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
              />
            </>
          )}
        </div>
      ))}

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}

