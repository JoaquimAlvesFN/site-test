import Image from "next/image"
import { getActiveChannels } from "@/app/admin/actions"

export async function ChannelGrid() {
  // Buscar os canais ativos do banco de dados
  const channels = await getActiveChannels()

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
      {channels.map((channel) => (
        <div
          key={channel.id}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border"
        >
          <Image
            src={channel.logo || "/placeholder.svg"}
            alt={`${channel.name} logo`}
            width={60}
            height={60}
            className="h-12 w-auto object-contain"
          />
          <span className="mt-2 text-xs font-medium">{channel.name}</span>
        </div>
      ))}
    </div>
  )
}

