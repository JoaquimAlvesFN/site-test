import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface ValueCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <Card className="text-center h-full">
      <CardContent className="pt-6 flex flex-col items-center">
        <div className="bg-[#E30613]/10 p-4 rounded-full w-20 h-20 flex items-center justify-center text-[#E30613] mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

