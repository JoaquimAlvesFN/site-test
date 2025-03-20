import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Twitter } from "lucide-react"

interface TeamMemberCardProps {
  name: string
  role: string
  image: string
  description: string
}

export function TeamMemberCard({ name, role, image, description }: TeamMemberCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-64">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-[#E30613] font-medium text-sm mb-2">{role}</p>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex gap-2">
          <a href="#" className="text-slate-400 hover:text-[#0077B5]" aria-label={`LinkedIn de ${name}`}>
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-[#1DA1F2]" aria-label={`Twitter de ${name}`}>
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

