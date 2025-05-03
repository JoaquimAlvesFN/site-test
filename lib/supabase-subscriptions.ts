import { supabase } from "./supabase"
import { QueryClient } from "@tanstack/react-query"

export function setupSupabaseSubscriptions(queryClient: QueryClient) {
  // Configurar subscrições para diferentes tabelas
  const tables = [
    "settings",
    "faqs",
    "testimonials",
    "companyInfo",
    "facilities",
    "heroImages",
    "aboutImages",
    "facilityImages"
  ]
  const channels: any[] = []

  tables.forEach((table) => {
    const channel = supabase
      .channel(`${table}_changes`)
      .on(
        "postgres_changes",
        {
          event: "*", // Escuta todos os eventos (INSERT, UPDATE, DELETE)
          schema: "public",
          table: table,
        },
        () => {
          // Invalida o cache da tabela correspondente
          queryClient.invalidateQueries({ queryKey: [table] })
        }
      )
      .subscribe()

    channels.push(channel)
  })

  // Retorna função para limpar todas as subscrições
  return () => {
    channels.forEach(channel => channel.unsubscribe())
  }
} 