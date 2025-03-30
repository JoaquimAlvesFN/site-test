"use server"

import {
  db,
  packages,
  heroSlides,
  channels,
  faqs,
  testimonials,
  settings,
  getTimestamp,
  images,
  companyInfo,
  companyValues,
  companyHistory,
  teamMembers,
  companyFacilities,
  quickFeatures,
  whyChooseFeatures,
  internetSection,
  businessSection,
} from "@/lib/db"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { getDb } from "@/lib/db"

export async function getAllSettings() {
  try {
    const results = await db.select().from(settings)
    const settingsMap: Record<string, string> = {}
    results.forEach((setting) => {
      settingsMap[setting.key] = setting.value
    })
    return settingsMap
  } catch (error) {
    console.error("Error fetching settings:", error)
    return {}
  }
}

export async function getAllChannel() {
  try {
    const results = await db.channel.findMany()
    return results
  } catch (error) {
    console.error("Error fetching settings:", error)
    return {}
  }
}

export async function deleteChannel(id: number) {
  try {
    await db.channel.delete({where: {id}})
    revalidatePath("/admin/channels")
    return { success: true }
  } catch (error) {
    console.error("Error deleting channel:", error)
    return { success: false }
  }
}

export async function createChannel(data: any) {
  try {
    await db.channel.create({data})
    revalidatePath("/admin/channels")
    return { success: true }
  } catch (error) {
    console.error("Error creating channel:", error)
    return { success: false }
  }
}

export async function updateChannel(id: number, data: any) {
  try {
    await db.channel.update({data, where: {id}})
    revalidatePath("/admin/channels")
    return { success: true }
  } catch (error) {
    console.error("Error updating channel:", error)
    return { success: false }
  }
}

export async function deleteFaq(id: number) {
  try {
    await db.fAQ.delete({
      where: {
        id: id
      }
    })
    // .delete(faqs).where(eq(faqs.id, id))
    revalidatePath("/admin/faqs")
    return { success: true }
  } catch (error) {
    console.error("Error deleting faq:", error)
    return { success: false }
  }
}

export async function createFaq(data: any) {
  try {
    await db.fAQ.create({
      data
    })
    // db.fAQ.create(data)
    revalidatePath("/admin/faqs")
    return { success: true }
  } catch (error) {
    console.error("Error creating faq:", error)
    return { success: false }
  }
}

export async function updateFaq(id: number, data: any) {
  try {
    await db.fAQ.update({
      where: {
        id: id
      },
      data
    })
    // update(faqs).set(data).where(eq(faqs.id, id))
    revalidatePath("/admin/faqs")
    return { success: true }
  } catch (error) {
    console.error("Error updating faq:", error)
    return { success: false }
  }
}

export async function updateSetting(key: string, value: string) {
  try {
    await db.update(settings).set({ value, updatedAt: getTimestamp() }).where(eq(settings.key, key))
    revalidatePath("/admin/settings")
    revalidatePath("/admin/footer")
    return { success: true }
  } catch (error) {
    console.error("Error updating setting:", error)
    return { success: false, error: String(error) }
  }
}

export async function deletePackage(id: number) {
  try {
    await db.package.delete({where: {id}})
    // delete(packages).where(eq(packages.id, id))
    revalidatePath("/admin/packages")
    return { success: true }
  } catch (error) {
    console.error("Error deleting package:", error)
    return { success: false }
  }
}

export async function createPackage(data: any) {
  try {
    await db.package.create({
      data
    })
    // .insert(packages).values(data)
    revalidatePath("/admin/packages")
    return { success: true }
  } catch (error) {
    console.error("Error creating package:", error)
    return { success: false }
  }
}

export async function updatePackage(id: number, data: any) {
  try {
    await db.package.update({data, where: {id}})
    // update(packages).set(data).where(eq(packages.id, id))
    revalidatePath("/admin/packages")
    return { success: true }
  } catch (error) {
    console.error("Error updating package:", error)
    return { success: false }
  }
}

export async function logoutAction() {
  // This is a placeholder. The actual logout logic is handled in lib/auth.ts
  revalidatePath("/admin")
  return { success: true }
}

export async function deleteHeroSlide(id: number) {
  try {
    await db.heroSlide.delete({where: {id}})
    // delete(heroSlides).where(eq(heroSlides.id, id))
    revalidatePath("/admin/slides")
    return { success: true }
  } catch (error) {
    console.error("Error deleting slide:", error)
    return { success: false }
  }
}

export async function createHeroSlide(data: any) {
  try {
    const dataMapper = {  
      ...data,
      order: parseInt(data.order),
    }
    await db.heroSlide.create({data: dataMapper})
    // insert(heroSlides).values(data)
    revalidatePath("/admin/slides")
    return { success: true }
  } catch (error) {
    console.error("Error creating slide:", error)
    return { success: false }
  }
}

export async function updateHeroSlide(id: number, data: any) {
  try {
    const dataMapper = {  
      ...data,
      order: parseInt(data.order),
    }
    await db.heroSlide.update({data: dataMapper, where: {id}})
    // .update(heroSlides).set(data).where(eq(heroSlides.id, id))
    revalidatePath("/admin/slides")
    return { success: true }
  } catch (error) {
    console.error("Error updating slide:", error)
    return { success: false }
  }
}

export async function deleteTestimonial(id: number) {
  try {
    await db.testimonial.delete({where: {id}})
    // delete(testimonials).where(eq(testimonials.id, id))
    revalidatePath("/admin/testimonials")
    return { success: true }
  } catch (error) {
    console.error("Error deleting testimonial:", error)
    return { success: false }
  }
}

export async function createTestimonial(data: any) {
  try {
    await db.testimonial.create({data})
    // insert(testimonials).values(data)
    revalidatePath("/admin/testimonials")
    return { success: true }
  } catch (error) {
    console.error("Error creating testimonial:", error)
    return { success: false }
  }
}

export async function updateTestimonial(id: number, data: any) {
  try {
    await db.testimonial.update({data, where: {id}})
    // .update(testimonials).set(data).where(eq(testimonials.id, id))
    revalidatePath("/admin/testimonials")
    return { success: true }
  } catch (error) {
    console.error("Error updating testimonial:", error)
    return { success: false }
  }
}

export async function getChannel(id: number) {
  try {
    const result = await db.channel.findMany({where: {id}})
    // .select().from(channels).where(eq(channels.id, id))

    // Verificar se o resultado existe e tem pelo menos um item
    if (!result || result.length === 0) {
      console.log(`No channel found with id ${id}`)
      return null
    }

    return result[0]
  } catch (error) {
    console.error("Error fetching channel:", error)
    return null
  }
}

export async function getAllFaq() { 
  try {
    const result = await db.fAQ.findMany()
    if (!result || result.length === 0) {
      console.log(`No FAQs found`)
      return null
    }
    return result
  } catch (error) {
    console.error("Error fetching all faqs:", error)
    return []
  }
}

export async function getFaq(id: number) {
  try {
    const result = await db.fAQ.findMany({
      where: {
        id: id
      }
    })
    // .select().from(faqs).where(eq(faqs.id, id))

    // Verificar se o resultado existe e tem pelo menos um item
    if (!result || result.length === 0) {
      console.log(`No FAQ found with id ${id}`)
      return null
    }

    return result[0]
  } catch (error) {
    console.error("Error fetching faq:", error)
    return null
  }
}

export async function getAllPackage() {
  try {
    const result = await db.package.findMany()
    return result
  } catch (error) {
    console.error("Error fetching all packages:", error)
    return []
  }
}

export async function getPackage(id: number) {
  try {
    const result = await db.package.findMany({where: {id}})
    // select().from(packages).where(eq(packages.id, id))

    // Verificar se o resultado existe e tem pelo menos um item
    if (!result || result.length === 0) {
      console.log(`No package found with id ${id}`)
      return null
    }

    const resultMapper = {
      ...result[0],
      features: result[0].features.split(",")
    }

    return resultMapper
  } catch (error) {
    console.error("Error fetching package:", error)
    return null
  }
}

export async function getHeroSlide(id: number) {
  try {
    const result = await db.heroSlide.findMany({where: {id}})
    // .select().from(heroSlides).where(eq(heroSlides.id, id))

    // Verificar se o resultado existe e tem pelo menos um item
    if (!result || result.length === 0) {
      console.log(`No hero slide found with id ${id}`)
      return null
    }

    const resultMapper = {
      ...result[0],
      features: result[0].features.split(",")
    }

    return resultMapper
  } catch (error) {
    console.error("Error fetching hero slide:", error)
    return null
  }
}

export async function getAllTestimonialActive() {
  try {
    const result = await db.testimonial.findMany({where: {active: true}})
    return result
  } catch (error) {
    console.error("Error fetching all testimonials:", error)
    return []
  }
}

export async function getAllTestimonial() {
  try {
    const result = await db.testimonial.findMany()
    return result
  } catch (error) {
    console.error("Error fetching all testimonials:", error)
    return []
  }
}

export async function getTestimonial(id: number) {
  try {
    const result = await db.testimonial.findMany({where: {id}})
    // .select().from(testimonials).where(eq(testimonials.id, id))

    // Verificar se o resultado existe e tem pelo menos um item
    if (!result || result.length === 0) {
      console.log(`No testimonial found with id ${id}`)
      return null
    }

    return result[0]
  } catch (error) {
    console.error("Error fetching testimonial:", error)
    return null
  }
}

// Function to get all images
export async function getImages() {
  try {
    // Dados estáticos para garantir que a função sempre retorne algo válido
    const staticImages = [
      {
        id: 1,
        name: "hero-banner.jpg",
        url: "/uploads/hero-banner.jpg",
        size: 245000,
        createdAt: "2023-04-15T10:30:00.000Z",
        updatedAt: "2023-04-15T10:30:00.000Z",
      },
      {
        id: 2,
        name: "sky-logo.png",
        url: "/uploads/sky-logo.png",
        size: 32000,
        createdAt: "2023-04-16T14:20:00.000Z",
        updatedAt: "2023-04-16T14:20:00.000Z",
      },
      {
        id: 3,
        name: "internet-promo.jpg",
        url: "/uploads/internet-promo.jpg",
        size: 178000,
        createdAt: "2023-04-17T09:15:00.000Z",
        updatedAt: "2023-04-17T09:15:00.000Z",
      },
    ]

    // Tentar obter as imagens do banco de dados
    try {
      const dbImages = await db.image.findMany();
      // select().from(images).orderBy(images.createdAt)

      // Se o banco de dados retornar dados válidos, use-os
      if (Array.isArray(dbImages) && dbImages.length > 0) {
        return dbImages
      }

      // Caso contrário, use os dados estáticos
      return staticImages
    } catch (error) {
      console.error("Erro ao buscar imagens do banco de dados:", error)
      // Em caso de erro, retornar os dados estáticos
      return staticImages
    }
  } catch (error) {
    console.error("Erro ao buscar imagens:", error)
    // Em caso de erro, retornar um array vazio para evitar quebrar a UI
    return []
  }
}

// Function to upload an image
export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file) {
      throw new Error("Nenhum arquivo enviado")
    }

    // For the mock implementation, we'll just pretend to save the file
    // and return a success response with a fake URL
    const fileName = `upload-${Date.now()}-${file.name.replace(/\s+/g, "-").toLowerCase()}`
    const fileUrl = `/uploads/${fileName}`

    // Save information to the database
    await db.insert(images).values({
      name: file.name,
      url: fileUrl,
      size: file.size,
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    })

    revalidatePath("/admin/images")
    return { success: true, url: fileUrl }
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error)
    throw error
  }
}

// Function to delete an image
export async function deleteImage(id: number) {
  try {
    // Delete the record from the database
    await db.delete(images).where(eq(images.id, id))

    revalidatePath("/admin/images")
    return { success: true }
  } catch (error) {
    console.error("Erro ao excluir imagem:", error)
    throw error
  }
}

// Novas funções para gerenciar os dados institucionais

// Função para obter as informações da empresa
export async function getCompanyInfo() {
  try {
    const result = await db.select().from(companyInfo)

    if (!result || result.length === 0) {
      // Retornar dados padrão se não houver registros
      return {
        id: 0,
        aboutTitle: "Quem Somos",
        aboutDescription:
          "A SKY Brasil é uma empresa de telecomunicações que oferece serviços de TV por assinatura via satélite e internet banda larga. Fundada em 1996, a empresa se consolidou como líder no mercado brasileiro, atendendo milhões de clientes em todo o país.",
        aboutDescription2:
          "Com uma ampla cobertura nacional, a SKY leva entretenimento e conectividade para todas as regiões do Brasil, incluindo áreas remotas onde outras tecnologias não chegam.",
        clientsCount: "12 milhões",
        employeesCount: "5 mil",
        channelsCount: "200",
        coveragePercent: "100",
        heroTitle: "Transformando o entretenimento brasileiro desde 1996",
        heroSubtitle:
          "Líder em TV por assinatura via satélite no Brasil, oferecendo a melhor experiência em entretenimento para milhões de famílias.",
        heroImage: "/placeholder.svg?height=600&width=800",
        heroImageAlt: "SKY Sede",
        heroImageCaption: "Sede SKY Brasil",
        heroImageLocation: "São Paulo, SP",
        updatedAt: getTimestamp(),
      }
    }

    return result[0]
  } catch (error) {
    console.error("Error fetching company info:", error)
    // Retornar dados padrão em caso de erro
    return {
      id: 0,
      aboutTitle: "Quem Somos",
      aboutDescription:
        "A SKY Brasil é uma empresa de telecomunicações que oferece serviços de TV por assinatura via satélite e internet banda larga. Fundada em 1996, a empresa se consolidou como líder no mercado brasileiro, atendendo milhões de clientes em todo o país.",
      aboutDescription2:
        "Com uma ampla cobertura nacional, a SKY leva entretenimento e conectividade para todas as regiões do Brasil, incluindo áreas remotas onde outras tecnologias não chegam.",
      clientsCount: "12 milhões",
      employeesCount: "5 mil",
      channelsCount: "200",
      coveragePercent: "100",
      heroTitle: "Transformando o entretenimento brasileiro desde 1996",
      heroSubtitle:
        "Líder em TV por assinatura via satélite no Brasil, oferecendo a melhor experiência em entretenimento para milhões de famílias.",
      heroImage: "/placeholder.svg?height=600&width=800",
      heroImageAlt: "SKY Sede",
      heroImageCaption: "Sede SKY Brasil",
      heroImageLocation: "São Paulo, SP",
      updatedAt: getTimestamp(),
    }
  }
}

// Função para atualizar as informações da empresa
export async function updateCompanyInfo(data: any) {
  try {
    const existingInfo = await db.select().from(companyInfo)

    if (!existingInfo || existingInfo.length === 0) {
      // Se não existir, criar um novo registro
      await db.insert(companyInfo).values({
        ...data,
        updatedAt: getTimestamp(),
      })
    } else {
      // Se existir, atualizar o registro existente
      await db
        .update(companyInfo)
        .set({
          ...data,
          updatedAt: getTimestamp(),
        })
        .where(eq(companyInfo.id, existingInfo[0].id))
    }

    revalidatePath("/admin/institucional")
    revalidatePath("/institucional")
    return { success: true }
  } catch (error) {
    console.error("Error updating company info:", error)
    return { success: false }
  }
}

// Função para obter os valores da empresa
export async function getCompanyValues() {
  try {
    const result = await db.select().from(companyValues).orderBy(companyValues.order)

    if (!result || result.length === 0) {
      // Retornar dados padrão se não houver registros
      return [
        {
          id: 1,
          title: "Excelência",
          description:
            "Buscamos a excelência em tudo o que fazemos, desde o atendimento ao cliente até a qualidade do sinal.",
          icon: "Award",
          order: 1,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 2,
          title: "Foco no Cliente",
          description:
            "Nossos clientes estão no centro de todas as nossas decisões. Trabalhamos para superar suas expectativas.",
          icon: "Users",
          order: 2,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 3,
          title: "Inovação",
          description:
            "Investimos constantemente em novas tecnologias para oferecer a melhor experiência em entretenimento.",
          icon: "Building",
          order: 3,
          active: true,
          updatedAt: getTimestamp(),
        },
      ]
    }

    return result
  } catch (error) {
    console.error("Error fetching company values:", error)
    // Retornar dados padrão em caso de erro
    return [
      {
        id: 1,
        title: "Excelência",
        description:
          "Buscamos a excelência em tudo o que fazemos, desde o atendimento ao cliente até a qualidade do sinal.",
        icon: "Award",
        order: 1,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 2,
        title: "Foco no Cliente",
        description:
          "Nossos clientes estão no centro de todas as nossas decisões. Trabalhamos para superar suas expectativas.",
        icon: "Users",
        order: 2,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 3,
        title: "Inovação",
        description:
          "Investimos constantemente em novas tecnologias para oferecer a melhor experiência em entretenimento.",
        icon: "Building",
        order: 3,
        active: true,
        updatedAt: getTimestamp(),
      },
    ]
  }
}

// Função para criar um valor da empresa
export async function createCompanyValue(data: any) {
  try {
    await db.insert(companyValues).values({
      ...data,
      updatedAt: getTimestamp(),
    })

    revalidatePath("/admin/institucional")
    revalidatePath("/institucional")
    return { success: true }
  } catch (error) {
    console.error("Error creating company value:", error)
    return { success: false }
  }
}

// Função para atualizar um valor da empresa
export async function updateCompanyValue(id: number, data: any) {
  try {
    await db
      .update(companyValues)
      .set({
        ...data,
        updatedAt: getTimestamp(),
      })
      .where(eq(companyValues.id, id))

    revalidatePath("/admin/institucional")
    revalidatePath("/institucional")
    return { success: true }
  } catch (error) {
    console.error("Error updating company value:", error)
    return { success: false }
  }
}

// Função para excluir um valor da empresa
export async function deleteCompanyValue(id: number) {
  try {
    await db.delete(companyValues).where(eq(companyValues.id, id))

    revalidatePath("/admin/institucional")
    revalidatePath("/institucional")
    return { success: true }
  } catch (error) {
    console.error("Error deleting company value:", error)
    return { success: false }
  }
}

// Função para obter os marcos históricos da empresa
export async function getCompanyHistory() {
  try {
    const result = await db.select().from(companyHistory).orderBy(companyHistory.order)

    if (!result || result.length === 0) {
      // Retornar dados padrão se não houver registros
      return [
        {
          id: 1,
          year: "1996",
          title: "Fundação da SKY Brasil",
          description: "A SKY Brasil é fundada, iniciando suas operações de TV por assinatura via satélite no país.",
          order: 1,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 2,
          year: "2006",
          title: "Expansão Nacional",
          description:
            "A empresa atinge a marca de 1 milhão de assinantes e expande sua cobertura para todo o território nacional.",
          order: 2,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 3,
          year: "2010",
          title: "Lançamento da SKY HDTV",
          description: "Pioneira na tecnologia de alta definição no Brasil, a SKY lança seus primeiros canais em HD.",
          order: 3,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 4,
          year: "2015",
          title: "Lançamento do SKY Play",
          description:
            "A empresa inova com o lançamento da plataforma SKY Play, permitindo aos assinantes assistir conteúdo em qualquer dispositivo.",
          order: 4,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 5,
          year: "2018",
          title: "Entrada no mercado de Internet",
          description: "A SKY expande seus serviços e começa a oferecer internet banda larga via fibra óptica.",
          order: 5,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 6,
          year: "2023",
          title: "Inovação Contínua",
          description:
            "Lançamento de novos serviços e tecnologias, consolidando a posição de liderança no mercado brasileiro.",
          order: 6,
          active: true,
          updatedAt: getTimestamp(),
        },
      ]
    }

    return result
  } catch (error) {
    console.error("Error fetching company history:", error)
    // Retornar dados padrão em caso de erro
    return [
      {
        id: 1,
        year: "1996",
        title: "Fundação da SKY Brasil",
        description: "A SKY Brasil é fundada, iniciando suas operações de TV por assinatura via satélite no país.",
        order: 1,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 2,
        year: "2006",
        title: "Expansão Nacional",
        description:
          "A empresa atinge a marca de 1 milhão de assinantes e expande sua cobertura para todo o território nacional.",
        order: 2,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 3,
        year: "2010",
        title: "Lançamento da SKY HDTV",
        description: "Pioneira na tecnologia de alta definição no Brasil, a SKY lança seus primeiros canais em HD.",
        order: 3,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 4,
        year: "2015",
        title: "Lançamento do SKY Play",
        description:
          "A empresa inova com o lançamento da plataforma SKY Play, permitindo aos assinantes assistir conteúdo em qualquer dispositivo.",
        order: 4,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 5,
        year: "2018",
        title: "Entrada no mercado de Internet",
        description: "A SKY expande seus serviços e começa a oferecer internet banda larga via fibra óptica.",
        order: 5,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 6,
        year: "2023",
        title: "Inovação Contínua",
        description:
          "Lançamento de novos serviços e tecnologias, consolidando a posição de liderança no mercado brasileiro.",
        order: 6,
        active: true,
        updatedAt: getTimestamp(),
      },
    ]
  }
}

// Função para criar um marco histórico da empresa
export async function createCompanyHistory(data: any) {
  try {
    await db.insert(companyHistory).values({
      ...data,
      updatedAt: getTimestamp(),
    })

    revalidatePath("/admin/institucional")
    revalidatePath("/institucional")
    return { success: true }
  } catch (error) {
    console.error("Error creating company history item:", error)
    return { success: false }
  }
}

// Função para atualizar um marco histórico da empresa
export async function updateCompanyHistory(id: number, data: any) {
  try {
    await db
      .update(companyHistory)
      .set({
        ...data,
        updatedAt: getTimestamp(),
      })
      .where(eq(companyHistory.id, id))

    revalidatePath("/admin/institucional")
    revalidatePath("/institucional")
    return { success: true }
  } catch (error) {
    console.error("Error updating company history item:", error)
    return { success: false }
  }
}

// Função para excluir um marco histórico da empresa
export async function deleteCompanyHistory(id: number) {
  try {
    await db.delete(companyHistory).where(eq(companyHistory.id, id))

    revalidatePath("/admin/institucional")
    revalidatePath("/institucional")
    return { success: true }
  } catch (error) {
    console.error("Error deleting company history item:", error)
    return { success: false }
  }
}

// Função para obter os membros da equipe
export async function getTeamMembers() {
  try {
    const result = await db.select().from(teamMembers).orderBy(teamMembers.order)

    if (!result || result.length === 0) {
      // Retornar dados padrão se não houver registros
      return [
        {
          id: 1,
          name: "Carlos Silva",
          role: "CEO",
          description: "Mais de 20 anos de experiência no setor de telecomunicações.",
          image: "/placeholder.svg?height=300&width=300",
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          order: 1,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 2,
          name: "Ana Oliveira",
          role: "Diretora de Operações",
          description: "Especialista em gestão de operações e processos.",
          image: "/placeholder.svg?height=300&width=300",
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          order: 2,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 3,
          name: "Roberto Santos",
          role: "Diretor de Tecnologia",
          description: "Lidera as iniciativas de inovação tecnológica da empresa.",
          image: "/placeholder.svg?height=300&width=300",
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          order: 3,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 4,
          name: "Mariana Costa",
          role: "Diretora de Marketing",
          description: "Responsável pelas estratégias de marketing e comunicação.",
          image: "/placeholder.svg?height=300&width=300",
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          order: 4,
          active: true,
          updatedAt: getTimestamp(),
        },
      ]
    }

    return result
  } catch (error) {
    console.error("Error fetching team members:", error)
    // Retornar dados padrão em caso de erro
    return [
      {
        id: 1,
        name: "Carlos Silva",
        role: "CEO",
        description: "Mais de 20 anos de experiência no setor de telecomunicações.",
        image: "/placeholder.svg?height=300&width=300",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        order: 1,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 2,
        name: "Ana Oliveira",
        role: "Diretora de Operações",
        description: "Especialista em gestão de operações e processos.",
        image: "/placeholder.svg?height=300&width=300",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        order: 2,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 3,
        name: "Roberto Santos",
        role: "Diretor de Tecnologia",
        description: "Lidera as iniciativas de inovação tecnológica da empresa.",
        image: "/placeholder.svg?height=300&width=300",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        order: 3,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 4,
        name: "Mariana Costa",
        role: "Diretora de Marketing",
        description: "Responsável pelas estratégias de marketing e comunicação.",
        image: "/placeholder.svg?height=300&width=300",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        order: 4,
        active: true,
        updatedAt: getTimestamp(),
      },
    ]
  }
}

// Função para criar um membro da equipe
export async function createTeamMember(data: any) {
  try {
    await db.insert(teamMembers).values({
      ...data,
      updatedAt: getTimestamp(),
    })

    revalidatePath("/admin/institucional")
    revalidatePath("/institucional")
    return { success: true }
  } catch (error) {
    console.error("Error creating team member:", error)
    return { success: false }
  }
}

// Função para atualizar um membro da equipe
export async function updateTeamMember(id: number, data: any) {
  try {
    await db
      .update(teamMembers)
      .set({
        ...data,
        updatedAt: getTimestamp(),
      })
      .where(eq(teamMembers.id, id))

    revalidatePath("/admin/institucional")
    revalidatePath("/institucional")
    return { success: true }
  } catch (error) {
    console.error("Error updating team member:", error)
    return { success: false }
  }
}

// Função para excluir um membro da equipe
export async function deleteTeamMember(id: number) {
  try {
    await db.delete(teamMembers).where(eq(teamMembers.id, id))

    revalidatePath("/admin/institucional")
    revalidatePath("/institucional")
    return { success: true }
  } catch (error) {
    console.error("Error deleting team member:", error)
    return { success: false }
  }
}

// Função para obter as instalações da empresa
export async function getCompanyFacilities() {
  try {
    const result = await db.select().from(companyFacilities).orderBy(companyFacilities.order)

    if (!result || result.length === 0) {
      // Retornar dados padrão se não houver registros
      return [
        {
          id: 1,
          title: "Sede Corporativa",
          location: "São Paulo, SP",
          image: "/placeholder.svg?height=400&width=600",
          alt: "Sede SKY Brasil",
          order: 1,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 2,
          title: "Centro de Operações",
          location: "Rio de Janeiro, RJ",
          image: "/placeholder.svg?height=400&width=600",
          alt: "Centro de Operações",
          order: 2,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 3,
          title: "Centro de Distribuição",
          location: "Barueri, SP",
          image: "/placeholder.svg?height=400&width=600",
          alt: "Centro de Distribuição",
          order: 3,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 4,
          title: "Centro de Tecnologia",
          location: "Campinas, SP",
          image: "/placeholder.svg?height=400&width=600",
          alt: "Centro de Tecnologia",
          order: 4,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 5,
          title: "Central de Atendimento",
          location: "Salvador, BA",
          image: "/placeholder.svg?height=400&width=600",
          alt: "Central de Atendimento",
          order: 5,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 6,
          title: "Escritório Regional",
          location: "Recife, PE",
          image: "/placeholder.svg?height=400&width=600",
          alt: "Escritório Regional",
          order: 6,
          active: true,
          updatedAt: getTimestamp(),
        },
      ]
    }

    return result
  } catch (error) {
    console.error("Error fetching company facilities:", error)
    // Retornar dados padrão em caso de erro
    return [
      {
        id: 1,
        title: "Sede Corporativa",
        location: "São Paulo, SP",
        image: "/placeholder.svg?height=400&width=600",
        alt: "Sede SKY Brasil",
        order: 1,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 2,
        title: "Centro de Operações",
        location: "Rio de Janeiro, RJ",
        image: "/placeholder.svg?height=400&width=600",
        alt: "Centro de Operações",
        order: 2,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 3,
        title: "Centro de Distribuição",
        location: "Barueri, SP",
        image: "/placeholder.svg?height=400&width=600",
        alt: "Centro de Distribuição",
        order: 3,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 4,
        title: "Centro de Tecnologia",
        location: "Campinas, SP",
        image: "/placeholder.svg?height=400&width=600",
        alt: "Centro de Tecnologia",
        order: 4,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 5,
        title: "Central de Atendimento",
        location: "Salvador, BA",
        image: "/placeholder.svg?height=400&width=600",
        alt: "Central de Atendimento",
        order: 5,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 6,
        title: "Escritório Regional",
        location: "Recife, PE",
        image: "/placeholder.svg?height=400&width=600",
        alt: "Escritório Regional",
        order: 6,
        active: true,
        updatedAt: getTimestamp(),
      },
    ]
  }
}

// Função para criar uma instalação da empresa
export async function createCompanyFacility(data: any) {
  try {
    await db.insert(companyFacilities).values({
      ...data,
      updatedAt: getTimestamp(),
    })

    revalidatePath("/admin/institucional")
    revalidatePath("/institucional")
    return { success: true }
  } catch (error) {
    console.error("Error creating company facility:", error)
    return { success: false }
  }
}

// Função para atualizar uma instalação da empresa
export async function updateCompanyFacility(id: number, data: any) {
  try {
    await db
      .update(companyFacilities)
      .set({
        ...data,
        updatedAt: getTimestamp(),
      })
      .where(eq(companyFacilities.id, id))

    revalidatePath("/admin/institucional")
    revalidatePath("/institucional")
    return { success: true }
  } catch (error) {
    console.error("Error updating company facility:", error)
    return { success: false }
  }
}

// Função para excluir uma instalação da empresa
export async function deleteCompanyFacility(id: number) {
  try {
    await db.delete(companyFacilities).where(eq(companyFacilities.id, id))

    revalidatePath("/admin/institucional")
    revalidatePath("/institucional")
    return { success: true }
  } catch (error) {
    console.error("Error deleting company facility:", error)
    return { success: false }
  }
}

// Novas funções para gerenciar a página inicial

// Função para obter os recursos rápidos da página inicial
export async function getQuickFeatures() {
  try {
    const result = await db.select().from(quickFeatures).orderBy(quickFeatures.order)

    if (!result || result.length === 0) {
      // Retornar dados padrão se não houver registros
      return [
        {
          id: 1,
          title: "Instalação Rápida",
          description: "Em até 48 horas",
          icon: "Shield",
          order: 1,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 2,
          title: "SKY Play Grátis",
          description: "Assista onde quiser",
          icon: "Play",
          order: 2,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 3,
          title: "+200 Canais",
          description: "Melhor conteúdo",
          icon: "Tv",
          order: 3,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 4,
          title: "Cobertura Nacional",
          description: "Em todo o Brasil",
          icon: "MapPin",
          order: 4,
          active: true,
          updatedAt: getTimestamp(),
        },
      ]
    }

    return result
  } catch (error) {
    console.error("Error fetching quick features:", error)
    // Retornar dados padrão em caso de erro
    return [
      {
        id: 1,
        title: "Instalação Rápida",
        description: "Em até 48 horas",
        icon: "Shield",
        order: 1,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 2,
        title: "SKY Play Grátis",
        description: "Assista onde quiser",
        icon: "Play",
        order: 2,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 3,
        title: "+200 Canais",
        description: "Melhor conteúdo",
        icon: "Tv",
        order: 3,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 4,
        title: "Cobertura Nacional",
        description: "Em todo o Brasil",
        icon: "MapPin",
        order: 4,
        active: true,
        updatedAt: getTimestamp(),
      },
    ]
  }
}

// Função para criar um recurso rápido da página inicial
export async function createQuickFeature(data: any) {
  try {
    await db.insert(quickFeatures).values({
      ...data,
      updatedAt: getTimestamp(),
    })

    revalidatePath("/admin/homepage")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error creating quick feature:", error)
    return { success: false }
  }
}

// Função para atualizar um recurso rápido da página inicial
export async function updateQuickFeature(id: number, data: any) {
  try {
    await db
      .update(quickFeatures)
      .set({
        ...data,
        updatedAt: getTimestamp(),
      })
      .where(eq(quickFeatures.id, id))

    revalidatePath("/admin/homepage")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error updating quick feature:", error)
    return { success: false }
  }
}

// Função para excluir um recurso rápido da página inicial
export async function deleteQuickFeature(id: number) {
  try {
    await db.delete(quickFeatures).where(eq(quickFeatures.id, id))

    revalidatePath("/admin/homepage")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error deleting quick feature:", error)
    return { success: false }
  }
}

// Função para obter os recursos da seção "Por que escolher a SKY?"
export async function getWhyChooseFeatures() {
  try {
    const result = await db.select().from(whyChooseFeatures).orderBy(whyChooseFeatures.order)

    if (!result || result.length === 0) {
      // Retornar dados padrão se não houver registros
      return [
        {
          id: 1,
          title: "Melhor Conteúdo",
          description: "Acesso aos melhores canais de filmes, séries, esportes e programas para toda a família.",
          icon: "Tv",
          order: 1,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 2,
          title: "SKY Play Incluso",
          description: "Assista onde e quando quiser pelo aplicativo SKY Play, disponível para todos os assinantes.",
          icon: "Play",
          order: 2,
          active: true,
          updatedAt: getTimestamp(),
        },
        {
          id: 3,
          title: "Benefícios Exclusivos",
          description: "Descontos em serviços parceiros, proteção McAfee e vantagens para toda a família.",
          icon: "Shield",
          order: 3,
          active: true,
          updatedAt: getTimestamp(),
        },
      ]
    }

    return result
  } catch (error) {
    console.error("Error fetching why choose features:", error)
    // Retornar dados padrão em caso de erro
    return [
      {
        id: 1,
        title: "Melhor Conteúdo",
        description: "Acesso aos melhores canais de filmes, séries, esportes e programas para toda a família.",
        icon: "Tv",
        order: 1,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 2,
        title: "SKY Play Incluso",
        description: "Assista onde e quando quiser pelo aplicativo SKY Play, disponível para todos os assinantes.",
        icon: "Play",
        order: 2,
        active: true,
        updatedAt: getTimestamp(),
      },
      {
        id: 3,
        title: "Benefícios Exclusivos",
        description: "Descontos em serviços parceiros, proteção McAfee e vantagens para toda a família.",
        icon: "Shield",
        order: 3,
        active: true,
        updatedAt: getTimestamp(),
      },
    ]
  }
}

// Função para criar um recurso da seção "Por que escolher a SKY?"
export async function createWhyChooseFeature(data: any) {
  try {
    await db.insert(whyChooseFeatures).values({
      ...data,
      updatedAt: getTimestamp(),
    })

    revalidatePath("/admin/homepage")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error creating why choose feature:", error)
    return { success: false }
  }
}

// Função para atualizar um recurso da seção "Por que escolher a SKY?"
export async function updateWhyChooseFeature(id: number, data: any) {
  try {
    await db
      .update(whyChooseFeatures)
      .set({
        ...data,
        updatedAt: getTimestamp(),
      })
      .where(eq(whyChooseFeatures.id, id))

    revalidatePath("/admin/homepage")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error updating why choose feature:", error)
    return { success: false }
  }
}

// Função para excluir um recurso da seção "Por que escolher a SKY?"
export async function deleteWhyChooseFeature(id: number) {
  try {
    await db.delete(whyChooseFeatures).where(eq(whyChooseFeatures.id, id))

    revalidatePath("/admin/homepage")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error deleting why choose feature:", error)
    return { success: false }
  }
}

// Função para obter os dados da seção de internet
export async function getInternetSection() {
  try {
    // const result = await db.select().from(internetSection)

    // if (!result || result.length === 0) {
      // Retornar dados padrão se não houver registros
      return {
        id: 1,
        title: "SKY Fibra + SKY+ Light",
        subtitle: "MAIS VELOCIDADE E DIVERSÃO",
        description: "Internet de alta velocidade e TV com os melhores canais em um só pacote.",
        image: "/placeholder.svg?height=600&width=800",
        price: "99,90",
        speedBadge: "500 Mega",
        cta: "Consultar Disponibilidade",
        ctaLink: "#contact",
        features: [
          "Wi-Fi de alta performance para toda sua casa",
          "Instalação rápida e profissional",
          "Suporte técnico especializado",
          "Aplicativo SKY Play incluso",
        ],
        active: true,
        updatedAt: getTimestamp(),
      }
    // }

    // return result[0]
  } catch (error) {
    console.error("Error fetching internet section:", error)
    // Retornar dados padrão em caso de erro
    return {
      id: 1,
      title: "SKY Fibra + SKY+ Light",
      subtitle: "MAIS VELOCIDADE E DIVERSÃO",
      description: "Internet de alta velocidade e TV com os melhores canais em um só pacote.",
      image: "/placeholder.svg?height=600&width=800",
      price: "99,90",
      speedBadge: "500 Mega",
      cta: "Consultar Disponibilidade",
      ctaLink: "#contact",
      features: [
        "Wi-Fi de alta performance para toda sua casa",
        "Instalação rápida e profissional",
        "Suporte técnico especializado",
        "Aplicativo SKY Play incluso",
      ],
      active: true,
      updatedAt: getTimestamp(),
    }
  }
}

// Função para atualizar os dados da seção de internet
export async function updateInternetSection(data: any) {
  try {
    const existingData = await db.select().from(internetSection)

    if (!existingData || existingData.length === 0) {
      // Se não existir, criar um novo registro
      await db.insert(internetSection).values({
        ...data,
        updatedAt: getTimestamp(),
      })
    } else {
      // Se existir, atualizar o registro existente
      await db
        .update(internetSection)
        .set({
          ...data,
          updatedAt: getTimestamp(),
        })
        .where(eq(internetSection.id, existingData[0].id))
    }

    revalidatePath("/admin/homepage")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error updating internet section:", error)
    return { success: false }
  }
}

// Função para obter os dados da seção de negócios
export async function getBusinessSection() {
  try {
    // const result = await db.businessSection.findMany() || [];
    // .select().from(businessSection)

    // if (!result || result.length === 0) {
      // Retornar dados padrão se não houver registros
      return {
        id: 1,
        title: "SKY para Empresas e Hotéis",
        subtitle: "SOLUÇÕES CORPORATIVAS",
        description: "Soluções personalizadas para melhorar a experiência dos seus clientes e colaboradores",
        image: "/placeholder.svg?height=500&width=600",
        features: [
          {
            icon: "Building2",
            title: "Hotéis e Pousadas",
            description: "Soluções customizadas para qualquer porte",
          },
          {
            icon: "Users",
            title: "Áreas Comuns",
            description: "Entretenimento em lobbies e salas de espera",
          },
          {
            icon: "BarChart",
            title: "Análise de Uso",
            description: "Relatórios de utilização e preferências",
          },
        ],
        benefits: ["Atendimento prioritário", "Suporte técnico 24/7", "Instalação profissional", "Condições especiais"],
        cta: "Solicitar Proposta Comercial",
        ctaLink: "#contact",
        active: true,
        updatedAt: getTimestamp(),
      }
    // }

    // return result[0]
  } catch (error) {
    console.error("Error fetching business section:", error)
    // Retornar dados padrão em caso de erro
    return {
      id: 1,
      title: "SKY para Empresas e Hotéis",
      subtitle: "SOLUÇÕES CORPORATIVAS",
      description: "Soluções personalizadas para melhorar a experiência dos seus clientes e colaboradores",
      image: "/placeholder.svg?height=500&width=600",
      features: [
        {
          icon: "Building2",
          title: "Hotéis e Pousadas",
          description: "Soluções customizadas para qualquer porte",
        },
        {
          icon: "Users",
          title: "Áreas Comuns",
          description: "Entretenimento em lobbies e salas de espera",
        },
        {
          icon: "BarChart",
          title: "Análise de Uso",
          description: "Relatórios de utilização e preferências",
        },
      ],
      benefits: ["Atendimento prioritário", "Suporte técnico 24/7", "Instalação profissional", "Condições especiais"],
      cta: "Solicitar Proposta Comercial",
      ctaLink: "#contact",
      active: true,
      updatedAt: getTimestamp(),
    }
  }
}

// Função para atualizar os dados da seção de negócios
export async function updateBusinessSection(data: any) {
  try {
    const existingData = await db.select().from(businessSection)

    if (!existingData || existingData.length === 0) {
      // Se não existir, criar um novo registro
      await db.insert(businessSection).values({
        ...data,
        updatedAt: getTimestamp(),
      })
    } else {
      // Se existir, atualizar o registro existente
      await db
        .update(businessSection)
        .set({
          ...data,
          updatedAt: getTimestamp(),
        })
        .where(eq(businessSection.id, existingData[0].id))
    }

    revalidatePath("/admin/homepage")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error updating business section:", error)
    return { success: false }
  }
}

// Função para obter os pacotes ativos
export async function getActivePackages() {
  try {
    // Dados estáticos para garantir que a função sempre retorne um array válido
    // const staticPackages = [
    //   {
    //     id: 1,
    //     title: "SKY Essencial",
    //     price: "89,90",
    //     description: "Pacote básico com os principais canais",
    //     features: ["60+ canais", "SKY Play incluso", "Instalação grátis", "Sem fidelidade"],
    //     popular: false,
    //     recurrent: true,
    //     packageType: "pos-pago",
    //     createdAt: "2023-04-15T10:30:00.000Z",
    //     updatedAt: "2023-04-15T10:30:00.000Z",
    //   },
    //   {
    //     id: 2,
    //     title: "SKY HD",
    //     price: "129,90",
    //     description: "Pacote intermediário com canais em HD",
    //     features: ["100+ canais", "Canais em HD", "SKY Play incluso", "Instalação grátis"],
    //     popular: true,
    //     recurrent: true,
    //     discount: "20% OFF por 3 meses",
    //     tag: "MAIS VENDIDO",
    //     packageType: "pos-pago",
    //     createdAt: "2023-04-15T10:30:00.000Z",
    //     updatedAt: "2023-04-15T10:30:00.000Z",
    //   },
    //   {
    //     id: 3,
    //     title: "SKY Premium",
    //     price: "189,90",
    //     description: "Pacote completo com todos os canais",
    //     features: ["150+ canais", "Canais premium", "SKY Play incluso", "Instalação grátis"],
    //     popular: false,
    //     recurrent: true,
    //     packageType: "pos-pago",
    //     createdAt: "2023-04-15T10:30:00.000Z",
    //     updatedAt: "2023-04-15T10:30:00.000Z",
    //   },
    //   {
    //     id: 4,
    //     title: "SKY Pré HD",
    //     price: "69,90",
    //     description: "Recarga mensal com canais em HD",
    //     features: ["80+ canais", "Canais em HD", "Sem análise de crédito", "Sem mensalidade"],
    //     popular: false,
    //     recurrent: false,
    //     packageType: "pre-pago",
    //     createdAt: "2023-04-15T10:30:00.000Z",
    //     updatedAt: "2023-04-15T10:30:00.000Z",
    //   },
    //   {
    //     id: 5,
    //     title: "SKY Pré Básico",
    //     price: "49,90",
    //     description: "Recarga mensal com canais básicos",
    //     features: ["50+ canais", "Sem análise de crédito", "Sem mensalidade", "Recarregue quando quiser"],
    //     popular: true,
    //     tag: "ECONÔMICO",
    //     recurrent: false,
    //     packageType: "pre-pago",
    //     createdAt: "2023-04-15T10:30:00.000Z",
    //     updatedAt: "2023-04-15T10:30:00.000Z",
    //   },
    // ]

    // Tentar obter os pacotes do banco de dados
    const result = await db.package.findMany()
    // .select().from(packages)

    // Se o banco de dados retornar dados válidos, use-os
    // if (Array.isArray(result) && result.length > 0) {
    //   return result
    // }

    // Caso contrário, use os dados estáticos
    return result
  } catch (error) {
    console.error("Error fetching active packages:", error)
    // Em caso de erro, retornar um array vazio para evitar quebrar a UI
    return []
  }
}

// Função para obter os slides ativos do carrossel
export async function getActiveHeroSlides() {
  try {
    const result = await db.heroSlide.findMany({orderBy: {order: 'asc'}})
    // .select().from(heroSlides).orderBy(heroSlides.order)

    if (!result || result.length === 0) {
      // Retornar dados padrão se não houver registros
      return []
    }

    // Filtrar apenas os slides ativos
    return result.filter((slide) => slide.active)
  } catch (error) {
    console.error("Error fetching active hero slides:", error)
    return []
  }
}

// Função para obter os canais ativos
export async function getActiveChannels() {
  try {
    const result = await db.channel.findMany({orderBy: {order: 'asc'}, where: {active: true}})
    // .select().from(channels).orderBy(channels.order)

    if (!result || result.length === 0) {
      // Retornar dados padrão se não houver registros
      return []
    }

    // Filtrar apenas os canais ativos
    return result.filter((channel) => channel.active)
  } catch (error) {
    console.error("Error fetching active channels:", error)
    return []
  }
}

// Função para obter as FAQs ativas
export async function getActiveFaqs() {
  try {
    const result = await db.fAQ.findMany();
    // select().from(faqs).orderBy(faqs.order)

    if (!result || result.length === 0) {
      // Retornar dados padrão se não houver registros
      return []
    }

    // Filtrar apenas as FAQs ativas
    return result.filter((faq) => faq.active)
  } catch (error) {
    console.error("Error fetching active faqs:", error)
    return []
  }
}

// Função para obter os depoimentos ativos
export async function getActiveTestimonials() {
  try {
    const result = await db.select().from(testimonials)

    if (!result || result.length === 0) {
      // Retornar dados padrão se não houver registros
      return []
    }

    // Filtrar apenas os depoimentos ativos
    return result.filter((testimonial) => testimonial.active)
  } catch (error) {
    console.error("Error fetching active testimonials:", error)
    return []
  }
}

// Adicione estas funções ao arquivo existente

export async function getQuickFeaturesFromDb() {
  try {
    const db = await getDb()
    const features = await db.query.quickFeatures.findMany({
      orderBy: (features, { asc }) => [asc(features.order)],
    })
    return features
  } catch (error) {
    console.error("Erro ao buscar recursos rápidos:", error)
    return []
  }
}

export async function getWhyChooseFeaturesFromDb() {
  try {
    const db = await getDb()
    const features = await db.query.whyChooseFeatures.findMany({
      orderBy: (features, { asc }) => [asc(features.order)],
    })
    return features
  } catch (error) {
    console.error("Erro ao buscar recursos 'Por que escolher':", error)
    return []
  }
}

export async function getActiveHeroSlidesFromDb() {
  try {
    const db = await getDb()
    const slides = await db.query.heroSlides.findMany({
      where: (slides, { eq }) => eq(slides.active, true),
      orderBy: (slides, { asc }) => [asc(slides.order)],
    })
    return slides
  } catch (error) {
    console.error("Erro ao buscar slides do hero:", error)
    return []
  }
}

