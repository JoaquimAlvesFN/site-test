import { Badge } from "@/components/ui/badge"

interface ContactStatusBadgeProps {
  status: string
}

export function ContactStatusBadge({ status }: ContactStatusBadgeProps) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          Pendente
        </Badge>
      )
    case "contacted":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Contatado
        </Badge>
      )
    case "converted":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Convertido
        </Badge>
      )
    case "canceled":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          Cancelado
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

