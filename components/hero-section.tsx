"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Check, ChevronRight, ChevronLeft, Wifi } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { staticHeroSlides } from "@/lib/static-data"
import { getActiveHeroSlides } from "@/app/admin/actions"
import { Skeleton } from "@/components/ui/skeleton"
import { supabaseQueries } from "@/lib/supabase-queries"
import { OptimizedImage } from "./ui/optimized-image"

// Tipo para os slides
type HeroSlide = {
  id: number
  title: string
  subtitle: string
  price: string
  cta: string
  image: string
  features: string
  tag?: string | null
  speedBadge?: string | null
  order: number
  active: boolean
  createdAt: string
  updatedAt: string
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Buscar imagens do hero usando React Query com cache otimizado
  const { data: heroImages, isLoading: isLoadingHeroImages } = useQuery({
    ...supabaseQueries.getHeroImages,
    staleTime: 0, // Sempre buscar dados frescos
    gcTime: 0, // Manter em cache indefinidamente
    refetchOnMount: false, // Não recarregar ao montar
    refetchOnWindowFocus: false, // Não recarregar ao focar na janela
    refetchOnReconnect: false, // Não recarregar ao reconectar
  })

  // Buscar dados do banco ao carregar o componente
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const result = await getActiveHeroSlides()
        if (result && Array.isArray(result) && result.length > 0) {
          setSlides(result as unknown as HeroSlide[])
        } else {
          // Fallback para dados estáticos caso a API retorne vazio
          setSlides(staticHeroSlides as unknown as HeroSlide[])
        }
      } catch (error) {
        console.error("Erro ao carregar slides:", error)
        // Fallback para dados estáticos em caso de erro
        setSlides(staticHeroSlides as unknown as HeroSlide[])
      } finally {
        // Indicar que o carregamento terminou
        setIsLoading(false)
      }
    }

    fetchSlides()
  }, [])

  // Configurar a rotação automática dos slides
  useEffect(() => {
    if (slides.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    if (slides.length === 0) return
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    if (slides.length === 0) return
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const currentSlideData = slides[currentSlide]

  // Renderizar o skeleton durante o carregamento
  if (isLoading || isLoadingHeroImages) {
    return (
      <section className="relative overflow-hidden bg-[#E30613] text-white">
        <div className="container relative z-10 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Skeleton className="h-6 w-24 bg-white/20 rounded-full" />
              <Skeleton className="h-12 w-full max-w-md bg-white/20" />
              <Skeleton className="h-8 w-4/5 bg-white/20" />
              
              <div className="flex items-baseline py-2">
                <Skeleton className="h-10 w-16 bg-white/20" />
                <Skeleton className="h-16 w-32 bg-white/20 mx-2" />
                <Skeleton className="h-10 w-16 bg-white/20" />
              </div>
              
              <div className="space-y-2 py-2">
                <Skeleton className="h-6 w-full max-w-sm bg-white/20 flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-white/30" />
                </Skeleton>
                <Skeleton className="h-6 w-full max-w-sm bg-white/20 flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-white/30" />
                </Skeleton>
                <Skeleton className="h-6 w-full max-w-sm bg-white/20 flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-white/30" />
                </Skeleton>
              </div>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-12 w-40 bg-white/20" />
                <Skeleton className="h-12 w-40 bg-white/20" />
              </div>
            </div>
            <div className="relative hidden md:block">
              <Skeleton className="h-[400px] w-[600px] rounded-lg bg-white/20" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-white/30" />
          ))}
        </div>

        <div className="absolute inset-0 bg-[#E30613]/95" />
      </section>
    )
  }

  // Renderizar o conteúdo real quando estiver carregado
  return (
    <section className="relative overflow-hidden bg-[#E30613] text-white">
      <div className="container relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            {currentSlideData?.tag && (
              <div className="inline-block bg-yellow-500 text-black font-bold text-xs px-3 py-1 rounded-full">
                {currentSlideData?.tag}
              </div>
            )}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{currentSlideData?.title}</h1>
            <p className="text-xl text-white/80">{currentSlideData?.subtitle}</p>
            <div className="flex items-baseline">
              <span className="text-2xl font-medium">R$</span>
              <span className="text-6xl font-bold mx-2">{currentSlideData?.price}</span>
              <span className="text-xl">/mês</span>
            </div>
            <ul className="space-y-2">
              {typeof currentSlideData?.features === 'string' && currentSlideData?.features.split(',').map((feature: string, i: number) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            {currentSlideData?.speedBadge && (
              <div className="mt-3 inline-flex items-center bg-white/20 px-3 py-1 rounded-full">
                <Wifi className="h-4 w-4 mr-1 text-white" />
                <span className="text-sm font-medium">{currentSlideData?.speedBadge}</span>
              </div>
            )}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-[#E30613] hover:bg-white/90" asChild>
                <Link href="#contact" className="flex items-center gap-2">
                  {currentSlideData?.cta}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              {/* <Button size="lg" variant="outline" className="border-white text-gray-900 hover:bg-white/10" asChild>
                <Link href="#tv-packages">Ver Pacotes</Link>
              </Button> */}
            </div>
          </div>
          <div className="relative hidden md:block">
            <OptimizedImage
              src={heroImages?.heroImage || currentSlideData?.image || "/placeholder.svg"}
              alt={heroImages?.heroImageAlt || "SKY TV Packages"}
              width={1920}
              height={1080}
              className="object-cover w-full h-full"
              priority={true} // Sempre priorizar o carregamento
              quality={90}
              loading="eager" // Sempre carregar imediatamente
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={cn("w-3 h-3 rounded-full transition-all", currentSlide === i ? "bg-white" : "bg-white/30")}
            aria-label={`Go to slide ${i + 1}`}
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

