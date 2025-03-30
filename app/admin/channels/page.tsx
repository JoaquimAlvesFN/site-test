import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import Link from "next/link"
import { Plus, Edit } from "lucide-react"
import { ChannelDeleteButton } from "@/components/admin/channel-delete-button"
import Image from "next/image"
import { getAllChannel } from "../actions"

export default async function ChannelsPage() {
  requireAuth()

  // Para o demo, vamos usar dados estáticos
  // const channels = [
  //   {
  //     id: 1,
  //     name: "HBO",
  //     logo: "/placeholder.svg?height=60&width=60",
  //     category: "Filmes",
  //     order: 1,
  //     active: true,
  //   },
  //   {
  //     id: 2,
  //     name: "ESPN",
  //     logo: "/placeholder.svg?height=60&width=60",
  //     category: "Esportes",
  //     order: 2,
  //     active: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Discovery",
  //     logo: "/placeholder.svg?height=60&width=60",
  //     category: "Documentários",
  //     order: 3,
  //     active: true,
  //   },
  //   {
  //     id: 4,
  //     name: "Telecine",
  //     logo: "/placeholder.svg?height=60&width=60",
  //     category: "Filmes",
  //     order: 4,
  //     active: true,
  //   },
  //   {
  //     id: 5,
  //     name: "Globo",
  //     logo: "/placeholder.svg?height=60&width=60",
  //     category: "Abertos",
  //     order: 5,
  //     active: true,
  //   },
  //   {
  //     id: 6,
  //     name: "SporTV",
  //     logo: "/placeholder.svg?height=60&width=60",
  //     category: "Esportes",
  //     order: 6,
  //     active: false,
  //   },
  // ]

  const channels = await getAllChannel()

  // Agrupar canais por categoria
  const channelsByCategory: Record<string, typeof channels> = {}
  channels.forEach((channel) => {
    if (!channelsByCategory[channel.category]) {
      channelsByCategory[channel.category] = []
    }
    channelsByCategory[channel.category].push(channel)
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Canais</h1>
          <p className="text-muted-foreground">Gerencie os canais disponíveis no site</p>
        </div>
        <Button asChild>
          <Link href="/admin/channels/new">
            <Plus className="h-4 w-4 mr-2" />
            Novo Canal
          </Link>
        </Button>
      </div>

      {Object.entries(channelsByCategory).map(([category, categoryChannels]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle>{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categoryChannels.map((channel) => (
                <div
                  key={channel.id}
                  className={`border rounded-lg p-4 flex flex-col items-center ${!channel.active ? "opacity-50" : ""}`}
                >
                  <div className="relative w-16 h-16 mb-2">
                    <Image
                      src={channel.logo || "/placeholder.svg"}
                      alt={channel.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-center">{channel.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">Ordem: {channel.order}</p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" asChild>
                      <Link href={`/admin/channels/${channel.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <ChannelDeleteButton id={channel.id} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

