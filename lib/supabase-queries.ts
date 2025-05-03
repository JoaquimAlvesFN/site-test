import { supabase } from "./supabase"
import { QueryClient } from "@tanstack/react-query"

// Função para invalidar todas as queries relacionadas a uma tabela
export function invalidateTableQueries(queryClient: QueryClient, tableName: string) {
  queryClient.invalidateQueries({ queryKey: [tableName] })
}

// Funções de query para diferentes tabelas
export const supabaseQueries = {
  // Query para buscar configurações
  getSettings: {
    queryKey: ["settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Setting")
        .select("*")
      
      if (error) throw error
      
      const settingsMap: Record<string, string> = {}
      data.forEach((setting: any) => {
        settingsMap[setting.key] = setting.value
      })
      
      return settingsMap
    }
  },

  // Query para buscar FAQs
  getFaqs: {
    queryKey: ["faqs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("FAQ")
        .select("*")
        .eq("active", true)
      
      if (error) throw error
      return data
    }
  },

  // Query para buscar depoimentos
  getTestimonials: {
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Testimonial")
        .select("*")
        .eq("active", true)
      
      if (error) throw error
      return data
    }
  },

  // Query para buscar informações da empresa
  getCompanyInfo: {
    queryKey: ["companyInfo"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("CompanyInfo")
        .select("*")
        .single()
      
      if (error) throw error
      return data
    }
  },

  // Query para buscar instalações
  getFacilities: {
    queryKey: ["facilities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("facilities")
        .select("*")
      
      if (error) throw error
      return data
    }
  },

  // Query para buscar imagens do hero
  getHeroImages: {
    queryKey: ["hero-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_images")
        .select("*")
        .eq("active", true)
        .single()

      if (error) throw error
      return data
    },
    staleTime: 0, // Sempre buscar dados frescos
    gcTime: 0, // Manter em cache indefinidamente
    refetchOnMount: false, // Não recarregar ao montar
    refetchOnWindowFocus: false, // Não recarregar ao focar na janela
    refetchOnReconnect: false, // Não recarregar ao reconectar
  },

  // Query para buscar imagens da seção "Sobre"
  getAboutImages: {
    queryKey: ["aboutImages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("aboutImage1, aboutImage1Alt, aboutImage2, aboutImage2Alt, aboutImage3, aboutImage3Alt")
        .single()
      
      if (error) throw error
      return {
        image1: data.aboutImage1 || "/placeholder.svg?height=300&width=300",
        image1Alt: data.aboutImage1Alt || "Escritório SKY",
        image2: data.aboutImage2 || "/placeholder.svg?height=300&width=300",
        image2Alt: data.aboutImage2Alt || "Equipe SKY",
        image3: data.aboutImage3 || "/placeholder.svg?height=620&width=300",
        image3Alt: data.aboutImage3Alt || "Central de Operações SKY",
      }
    }
  },

  // Query para buscar imagens das instalações
  getFacilityImages: {
    queryKey: ["facilityImages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("facilities")
        .select("id, image, imageAlt")
      
      if (error) throw error
      return data.map((facility: any) => ({
        id: facility.id,
        image: facility.image || "/placeholder.svg?height=300&width=300",
        imageAlt: facility.imageAlt || "Instalação SKY",
      }))
    }
  }
} 