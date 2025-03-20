import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ContactModal } from "@/components/contact-modal"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  recurrent?: boolean
  discount?: string
  tag?: string
  savingBadge?: string
  packageId?: number
}

export function PricingCard({
  title,
  price,
  description,
  features,
  popular = false,
  recurrent = true,
  discount,
  tag,
  savingBadge,
  packageId,
}: PricingCardProps) {
  return (
    <Card className={cn("flex flex-col", popular && "border-[#E30613] shadow-lg relative")}>
      {tag && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E30613] text-white text-xs font-medium py-1 px-3 rounded-full">
          {tag}
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {discount && <div className="text-sm text-muted-foreground mb-1 line-through">{discount}</div>}
        <div className="flex items-baseline mb-4">
          <span className="text-lg font-medium">R$</span>
          <span className="text-4xl font-bold mx-1">{price}</span>
          {recurrent && <span className="text-sm text-muted-foreground">/mês</span>}
        </div>
        {savingBadge && (
          <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded inline-block mb-4">
            {savingBadge}
          </div>
        )}
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-[#E30613] shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <ContactModal
          trigger={
            <Button className={cn("w-full", popular ? "bg-[#E30613] hover:bg-[#c00511]" : "")}>Assinar Agora</Button>
          }
          title={`Assinar ${title}`}
          description={`Preencha seus dados para assinar o pacote ${title}. Nossa equipe entrará em contato em breve.`}
          packageId={packageId}
          defaultInterest={title.toLowerCase().includes("internet") ? "internet" : "tv"}
        />
      </CardFooter>
    </Card>
  )
}

