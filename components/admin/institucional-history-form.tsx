"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { getCompanyInfo, updateCompanyInfo } from "@/app/admin/actions"

export function InstitucionalHistoryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Estado para os dados do formulário
  const [formData, setFormData] = useState({
    aboutTitle: "",
    aboutDescription: "",
    aboutDescription2: "",
    clientsCount: "",
    employeesCount: "",
    channelsCount: "",
    coveragePercent: "",
  })

  // Carregar dados existentes do banco de dados
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCompanyInfo()
        
        if (data) {
          setFormData({
            aboutTitle: data.aboutTitle || "",
            aboutDescription: data.aboutDescription || "",
            aboutDescription2: data.aboutDescription2 || "",
            clientsCount: data.clientsCount || "",
            employeesCount: data.employeesCount || "",
            channelsCount: data.channelsCount || "",
            coveragePercent: data.coveragePercent || "",
          })
        }
      } catch (error) {
        console.error("Erro ao carregar informações:", error)
        toast({
          title: "Erro ao carregar dados",
          description: "Ocorreu um erro ao carregar as informações.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Enviar dados para o banco usando a server action
      const result = await updateCompanyInfo(formData)

      if (result && result.success) {
        toast({
          title: "Informações salvas com sucesso!",
          description: "As informações da página institucional foram atualizadas.",
        })
      } else {
        throw new Error("Falha ao salvar informações")
      }
    } catch (error) {
      console.error("Erro ao salvar informações:", error)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as informações.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="aboutTitle">Título da Seção Sobre</Label>
          <Input id="aboutTitle" name="aboutTitle" value={formData.aboutTitle} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="aboutDescription">Descrição Principal</Label>
          <Textarea
            id="aboutDescription"
            name="aboutDescription"
            value={formData.aboutDescription}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div>
          <Label htmlFor="aboutDescription2">Descrição Secundária</Label>
          <Textarea
            id="aboutDescription2"
            name="aboutDescription2"
            value={formData.aboutDescription2}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="clientsCount">Número de Clientes</Label>
            <Input
              id="clientsCount"
              name="clientsCount"
              value={formData.clientsCount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="employeesCount">Número de Colaboradores</Label>
            <Input
              id="employeesCount"
              name="employeesCount"
              value={formData.employeesCount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="channelsCount">Número de Canais</Label>
            <Input
              id="channelsCount"
              name="channelsCount"
              value={formData.channelsCount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="coveragePercent">Porcentagem de Cobertura</Label>
            <Input
              id="coveragePercent"
              name="coveragePercent"
              value={formData.coveragePercent}
              onChange={handleChange}
              required
            />
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

