"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { staticHeroSlides } from "@/lib/static-data"
import { getActiveHeroSlides } from "@/app/admin/actions"
import { Skeleton } from "@/components/ui/skeleton"
import { supabaseQueries } from "@/lib/supabase-queries"
import { OptimizedImage } from "./ui/optimized-image"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
  const [api, setApi] = useState<any>(null)

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

  // Monitorar mudanças no carrossel
  useEffect(() => {
    if (!api) return
    
    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap())
    }
    
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  // Renderizar o skeleton durante o carregamento
  if (isLoading || isLoadingHeroImages) {
    return (
      <section className="relative overflow-hidden bg-slate-100">
        <div className="container relative z-10 py-8 md:py-12">
          <Skeleton className="h-[400px] w-full max-w-6xl mx-auto rounded-lg bg-slate-200" />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-slate-300" />
          ))}
        </div>
      </section>
    )
  }

  // Renderizar o conteúdo real quando estiver carregado
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200">
      <div className="container relative z-10 py-8 md:py-12">
        <Carousel 
          className="w-full" 
          opts={{
            loop: true,
            align: "center",
          }}
          setApi={setApi}
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="flex justify-center">
                <div className="relative aspect-[21/9] w-full max-w-6xl">
                  <Link href="#contact">
                    <OptimizedImage
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title || "Banner image"}
                      width={1920}
                      height={1080}
                      className="object-cover w-full h-full rounded-lg shadow-lg"
                      priority={true}
                      quality={90}
                      loading="eager"
                    />
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (api) api.scrollTo(i)
                }}
                className={cn("w-3 h-3 rounded-full transition-all", currentSlide === i ? "bg-slate-800" : "bg-slate-400")}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          
          <CarouselPrevious className="absolute -left-4 sm:left-4 bg-white/70 hover:bg-white/90 border-none text-slate-800" />
          <CarouselNext className="absolute -right-4 sm:right-4 bg-white/70 hover:bg-white/90 border-none text-slate-800" />
        </Carousel>
      </div>
    </section>
  )
}

