"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { updateContactStatus } from "@/app/actions"
import { toast } from "@/components/ui/use-toast"
import { ChevronDown } from "lucide-react"

interface ContactStatusSelectProps {
  contactId: number
  currentStatus: string
  onStatusChange?: (newStatus: string) => void
}

export function ContactStatusSelect({ contactId, currentStatus, onStatusChange }: ContactStatusSelectProps) {
  const [status, setStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  async function handleStatusChange(newStatus: string) {
    if (newStatus === status) return

    setIsUpdating(true)
    try {
      const result = await updateContactStatus(contactId, newStatus)

      if (result.success) {
        setStatus(newStatus)

        // Chama o callback se fornecido
        if (onStatusChange) {
          onStatusChange(newStatus)
        }

        // Mensagens contextuais baseadas no novo status
        let statusMessage = ""
        switch (newStatus) {
          case "pending":
            statusMessage = "A solicitação foi marcada como pendente."
            break
          case "contacted":
            statusMessage = "A solicitação foi marcada como contatada."
            break
          case "converted":
            statusMessage = "A solicitação foi marcada como convertida. Parabéns!"
            break
          case "canceled":
            statusMessage = "A solicitação foi marcada como cancelada."
            break
          default:
            statusMessage = "O status da solicitação foi atualizado."
        }

        toast({
          title: "Status atualizado com sucesso!",
          description: statusMessage,
        })
      } else {
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao atualizar o status da solicitação.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o status da solicitação.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isUpdating} className="w-32">
          {isUpdating ? "Atualizando..." : "Alterar Status"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleStatusChange("pending")}>Pendente</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("contacted")}>Contatado</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("converted")}>Convertido</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("canceled")}>Cancelado</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

