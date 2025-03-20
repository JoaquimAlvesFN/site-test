"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { updateSetting } from "@/app/admin/actions"
import { Plus, Trash2 } from "lucide-react"

interface FooterLink {
  label: string
  url: string
}

interface FooterSectionField {
  key: string
  label: string
  type?: "text" | "textarea" | "links"
  help?: string
}

interface FooterSectionFormProps {
  section: string
  fields: FooterSectionField[]
  initialValues: Record<string, any>
}

export function FooterSectionForm({ section, fields, initialValues }: FooterSectionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formValues, setFormValues] = useState<Record<string, any>>(initialValues)

  // Estado específico para campos de links
  const [links, setLinks] = useState<Record<string, FooterLink[]>>(() => {
    const linkFields: Record<string, FooterLink[]> = {}

    fields.forEach((field) => {
      if (field.type === "links" && initialValues[field.key]) {
        linkFields[field.key] = initialValues[field.key]
      }
    })

    return linkFields
  })

  function handleChange(key: string, value: string) {
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleLinkChange(fieldKey: string, index: number, field: "label" | "url", value: string) {
    const updatedLinks = [...links[fieldKey]]
    updatedLinks[index] = { ...updatedLinks[index], [field]: value }
    setLinks((prev) => ({ ...prev, [fieldKey]: updatedLinks }))
  }

  function addLink(fieldKey: string) {
    setLinks((prev) => ({
      ...prev,
      [fieldKey]: [...(prev[fieldKey] || []), { label: "", url: "" }],
    }))
  }

  function removeLink(fieldKey: string, index: number) {
    const updatedLinks = [...links[fieldKey]]
    updatedLinks.splice(index, 1)
    setLinks((prev) => ({ ...prev, [fieldKey]: updatedLinks }))
  }

  // Modificar a função handleSubmit para garantir que as configurações sejam salvas corretamente
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Processar campos normais
      for (const field of fields) {
        if (field.type !== "links") {
          const result = await updateSetting(field.key, formValues[field.key] || "")
          if (!result.success) {
            throw new Error(`Failed to update setting ${field.key}: ${result.error}`)
          }
        } else {
          // Processar campos de links (convertendo para JSON)
          const linksJson = JSON.stringify(links[field.key] || [])
          const result = await updateSetting(field.key, linksJson)
          if (!result.success) {
            throw new Error(`Failed to update setting ${field.key}: ${result.error}`)
          }
        }
      }

      toast({
        title: "Configurações salvas com sucesso!",
        description: `As configurações da seção "${section}" do rodapé foram atualizadas.`,
      })
    } catch (error) {
      console.error("Erro ao salvar configurações:", error)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as configurações do rodapé.",
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
          {field.type === "textarea" ? (
            <>
              <Label htmlFor={field.key}>{field.label}</Label>
              <Textarea
                id={field.key}
                value={formValues[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                rows={3}
              />
              {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
            </>
          ) : field.type === "links" ? (
            <div className="space-y-3">
              <Label>{field.label}</Label>
              {links[field.key]?.map((link, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <Input
                      placeholder="Texto do link"
                      value={link.label}
                      onChange={(e) => handleLinkChange(field.key, index, "label", e.target.value)}
                      className="mb-1"
                    />
                    <Input
                      placeholder="URL do link"
                      value={link.url}
                      onChange={(e) => handleLinkChange(field.key, index, "url", e.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeLink(field.key, index)}
                    className="flex-shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => addLink(field.key)} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Link
              </Button>
            </div>
          ) : (
            <>
              <Label htmlFor={field.key}>{field.label}</Label>
              <Input
                id={field.key}
                value={formValues[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
              {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
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

