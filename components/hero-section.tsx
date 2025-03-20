"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, ChevronRight, ChevronLeft, Wifi } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Economize sem abrir mão da diversão",
      subtitle: "Assine agora com taxa de adesão por apenas",
      price: "1,90",
      cta: "Assine já",
      image: "/hero-image.png",
      features: ["Mais de 200 canais", "Esportes ao vivo", "Filmes e séries"],
      tag: "OFERTA LIMITADA",
    },
    {
      title: "Internet + TV em um só lugar",
      subtitle: "Combo completo a partir de",
      price: "149,90",
      cta: "Conheça os combos",
      image: "/hero-image.png",
      features: ["Internet de alta velocidade", "TV com os melhores canais", "Instalação grátis"],
      tag: "COMBO EXCLUSIVO",
      speedBadge: "300 Mega",
    },
    {
      title: "SKY Pré-pago sem fidelidade",
      subtitle: "Recarga a partir de",
      price: "69,90",
      cta: "Saiba mais",
      image: "/hero-image.png",
      features: ["Sem análise de crédito", "Recarregue quando quiser", "Mais de 80 canais"],
      tag: "SEM MENSALIDADE",
    },
  ]

  const currentSlideData = slides[currentSlide]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <section className="relative overflow-hidden bg-[#E30613] text-white">
      <div className="container relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            {currentSlideData.tag && (
              <div className="inline-block bg-yellow-500 text-black font-bold text-xs px-3 py-1 rounded-full">
                {currentSlideData.tag}
              </div>
            )}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{currentSlideData.title}</h1>
            <p className="text-xl text-white/80">{currentSlideData.subtitle}</p>
            <div className="flex items-baseline">
              <span className="text-2xl font-medium">R$</span>
              <span className="text-6xl font-bold mx-2">{currentSlideData.price}</span>
              <span className="text-xl">/mês</span>
            </div>
            <ul className="space-y-2">
              {currentSlideData.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            {currentSlideData.speedBadge && (
              <div className="mt-3 inline-flex items-center bg-white/20 px-3 py-1 rounded-full">
                <Wifi className="h-4 w-4 mr-1 text-white" />
                <span className="text-sm font-medium">{currentSlideData.speedBadge}</span>
              </div>
            )}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-[#E30613] hover:bg-white/90" asChild>
                <Link href="#contact" className="flex items-center gap-2">
                  {currentSlideData.cta}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="#tv-packages">Ver Pacotes</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <Image
              src={currentSlideData.image || "/placeholder.svg"}
              alt="SKY TV Packages"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white text-[#E30613] p-4 rounded-lg shadow-lg">
              <p className="text-sm font-medium">Oferta por tempo limitado</p>
              <p className="text-xs text-muted-foreground">Consulte condições</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn("w-3 h-3 rounded-full transition-all", currentSlide === index ? "bg-white" : "bg-white/30")}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 hidden md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 hidden md:block"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute inset-0 bg-[#E30613]/95" />
    </section>
  )
}

