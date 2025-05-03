"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState, useEffect } from "react"
import { setupSupabaseSubscriptions } from "./supabase-subscriptions"
import { supabaseQueries } from "./supabase-queries"

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutos para dados normais
            gcTime: 10 * 60 * 1000, // 10 minutos para dados normais
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  // Pré-carregar dados importantes
  useEffect(() => {
    // Pré-carregar imagens do hero
    queryClient.prefetchQuery(supabaseQueries.getHeroImages)
    // Pré-carregar imagens da seção "Sobre"
    queryClient.prefetchQuery(supabaseQueries.getAboutImages)
    // Pré-carregar imagens das instalações
    queryClient.prefetchQuery(supabaseQueries.getFacilityImages)
  }, [queryClient])

  useEffect(() => {
    // Configurar subscrições do Supabase
    const cleanup = setupSupabaseSubscriptions(queryClient)
    
    // Limpar subscrições ao desmontar
    return () => {
      cleanup()
    }
  }, [queryClient])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
} 