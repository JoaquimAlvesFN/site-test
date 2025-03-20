"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export function InstitucionalHistoryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Dados de exemplo para o formulário
  const [formData, setFormData] = useState({
    aboutTitle: "Quem Somos",
    aboutDescription:
      "A SKY Brasil é uma empresa de telecomunicações que oferece serviços de TV por assinatura via satélite e internet banda larga. Fundada em 1996, a empresa se consolidou como líder no mercado brasileiro, atendendo milhões de clientes em todo o país.",
    aboutDescription2:
      "Com uma ampla cobertura nacional, a SKY leva entretenimento e conectividade para todas as regiões do Brasil, incluindo áreas remotas onde outras tecnologias não chegam.",
    clientsCount: "12 milhões",
    employeesCount: "5 mil",
    channelsCount: "200",
    coveragePercent: "100",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulação de envio de dados
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Informações salvas com sucesso!",
        description: "As informações da página institucional foram atualizadas.",
      })
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

