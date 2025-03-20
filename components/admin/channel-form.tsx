"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { ImageSelector } from "./image-selector"

// Adicionar a importação das ações do servidor
import { createChannel, updateChannel } from "@/app/admin/actions"

interface ChannelFormProps {
  channelData?: {
    id?: number
    name: string
    logo: string
    category: string
    order: number
    active: boolean
  }
}

export function ChannelForm({ channelData }: ChannelFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: channelData?.name || "",
    logo: channelData?.logo || "/placeholder.svg?height=60&width=60",
    category: channelData?.category || "",
    order: channelData?.order || 1,
    active: channelData?.active ?? true,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSwitchChange(checked: boolean) {
    setFormData((prev) => ({ ...prev, active: checked }))
  }

  function handleCategoryChange(value: string) {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  function handleLogoChange(url: string) {
    setFormData((prev) => ({ ...prev, logo: url }))
  }

  // Modificar a função handleSubmit para chamar as ações do servidor
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const channelPayload = {
        ...formData,
      }

      if (channelData?.id) {
        await updateChannel(channelData.id, channelPayload)
        toast({
          title: "Canal atualizado com sucesso!",
          description: `O canal "${formData.name}" foi atualizado e já está disponível no site.`,
        })
      } else {
        await createChannel(channelPayload)
        toast({
          title: "Canal criado com sucesso!",
          description: `O canal "${formData.name}" foi criado e já está disponível no site.`,
        })
      }

      router.push("/admin/channels")
      router.refresh()
    } catch (error) {
      console.error("Failed to save channel:", error)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o canal.",
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
          <Label htmlFor="name">Nome do Canal</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <Label>Logo do Canal</Label>
          <div className="mt-1">
            <ImageSelector value={formData.logo} onChange={handleLogoChange} />
          </div>
        </div>

        <div>
          <Label htmlFor="category">Categoria</Label>
          <Select value={formData.category} onValueChange={handleCategoryChange} required>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Filmes">Filmes</SelectItem>
              <SelectItem value="Esportes">Esportes</SelectItem>
              <SelectItem value="Documentários">Documentários</SelectItem>
              <SelectItem value="Infantil">Infantil</SelectItem>
              <SelectItem value="Abertos">Abertos</SelectItem>
              <SelectItem value="Notícias">Notícias</SelectItem>
              <SelectItem value="Variedades">Variedades</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="order">Ordem</Label>
          <Input
            id="order"
            name="order"
            type="number"
            value={formData.order}
            onChange={handleChange}
            required
            min={1}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="active" checked={formData.active} onCheckedChange={handleSwitchChange} />
          <Label htmlFor="active">Canal ativo</Label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/channels")}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}

