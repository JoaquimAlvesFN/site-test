import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ChannelForm } from "@/components/admin/channel-form"
import { notFound } from "next/navigation"
import { getChannel } from "@/app/admin/actions"

interface ChannelEditPageProps {
  params: {
    id: string
  }
}

export default async function ChannelEditPage({ params }: ChannelEditPageProps) {
  requireAuth()

  // Handle new channel case
  if (params.id === "new") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/channels">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Novo Canal</h1>
            <p className="text-muted-foreground">Adicione um novo canal ao site</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <ChannelForm />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Converter ID para número
  const id = Number.parseInt(params.id)

  // Verificar se o ID é válido
  if (isNaN(id)) {
    console.error(`Invalid channel ID: ${params.id}`)
    notFound()
  }

  // Dados estáticos para garantir que a página funcione
  const staticChannels = [
    {
      id: 1,
      name: "HBO",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Filmes",
      order: 1,
      active: true,
    },
    {
      id: 2,
      name: "ESPN",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Esportes",
      order: 2,
      active: true,
    },
    {
      id: 3,
      name: "Discovery",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Documentários",
      order: 3,
      active: true,
    },
    {
      id: 4,
      name: "Telecine",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Filmes",
      order: 4,
      active: true,
    },
    {
      id: 5,
      name: "Globo",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Abertos",
      order: 5,
      active: true,
    },
    {
      id: 6,
      name: "SporTV",
      logo: "/placeholder.svg?height=60&width=60",
      category: "Esportes",
      order: 6,
      active: false,
    },
  ]

  // Tentar obter o canal do banco de dados
  let channelData = await getChannel(id)

  // Se não encontrar no banco de dados, procurar nos dados estáticos
  if (!channelData) {
    channelData = staticChannels.find((channel) => channel.id === id)

    // Se ainda não encontrar, retornar 404
    if (!channelData) {
      console.error(`Channel with ID ${id} not found`)
      notFound()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/channels">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Editar Canal</h1>
          <p className="text-muted-foreground">Edite as informações do canal {channelData.name || `#${id}`}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Canal</CardTitle>
        </CardHeader>
        <CardContent>
          <ChannelForm channelData={channelData} />
        </CardContent>
      </Card>
    </div>
  )
}

