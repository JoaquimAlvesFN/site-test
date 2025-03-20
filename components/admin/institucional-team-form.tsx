"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { ImageSelector } from "./image-selector"
import { Plus, Trash2 } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  role: string
  description: string
  image: string
  linkedin?: string
  twitter?: string
}

export function InstitucionalTeamForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Dados de exemplo para o formulário
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Carlos Silva",
      role: "CEO",
      description: "Mais de 20 anos de experiência no setor de telecomunicações.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    {
      id: 2,
      name: "Ana Oliveira",
      role: "Diretora de Operações",
      description: "Especialista em gestão de operações e processos.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    {
      id: 3,
      name: "Roberto Santos",
      role: "Diretor de Tecnologia",
      description: "Lidera as iniciativas de inovação tecnológica da empresa.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    {
      id: 4,
      name: "Mariana Costa",
      role: "Diretora de Marketing",
      description: "Responsável pelas estratégias de marketing e comunicação.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  ])

  function handleChange(id: number, field: keyof TeamMember, value: string) {
    setTeamMembers((prev) => prev.map((member) => (member.id === id ? { ...member, [field]: value } : member)))
  }

  function addTeamMember() {
    const newId = Math.max(0, ...teamMembers.map((m) => m.id)) + 1
    setTeamMembers((prev) => [
      ...prev,
      {
        id: newId,
        name: "",
        role: "",
        description: "",
        image: "/placeholder.svg?height=300&width=300",
      },
    ])
  }

  function removeTeamMember(id: number) {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulação de envio de dados
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Equipe salva com sucesso!",
        description: "As informações da equipe foram atualizadas.",
      })
    } catch (error) {
      console.error("Erro ao salvar equipe:", error)
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as informações da equipe.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="border p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Membro da Equipe</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeTeamMember(member.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remover
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`name-${member.id}`}>Nome</Label>
                <Input
                  id={`name-${member.id}`}
                  value={member.name}
                  onChange={(e) => handleChange(member.id, "name", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor={`role-${member.id}`}>Cargo</Label>
                <Input
                  id={`role-${member.id}`}
                  value={member.role}
                  onChange={(e) => handleChange(member.id, "role", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`description-${member.id}`}>Descrição</Label>
              <Textarea
                id={`description-${member.id}`}
                value={member.description}
                onChange={(e) => handleChange(member.id, "description", e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Foto</Label>
              <ImageSelector value={member.image} onChange={(value) => handleChange(member.id, "image", value)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`linkedin-${member.id}`}>LinkedIn (opcional)</Label>
                <Input
                  id={`linkedin-${member.id}`}
                  value={member.linkedin || ""}
                  onChange={(e) => handleChange(member.id, "linkedin", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor={`twitter-${member.id}`}>Twitter (opcional)</Label>
                <Input
                  id={`twitter-${member.id}`}
                  value={member.twitter || ""}
                  onChange={(e) => handleChange(member.id, "twitter", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addTeamMember} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Membro da Equipe
        </Button>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  )
}

