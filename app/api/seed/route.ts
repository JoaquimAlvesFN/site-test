import { NextResponse } from "next/server"
import { db, packages, heroSlides, channels, faqs, testimonials, settings, getTimestamp } from "../../../lib/db"

export async function GET() {
  try {
    // Seed packages
    await db.insert(packages).values([
      {
        title: "SKY Essencial",
        price: "89,90",
        description: "Pacote ideal para quem busca economia sem abrir mão da qualidade.",
        features: [
          "Mais de 100 canais",
          "Canais de filmes e séries",
          "Canais de esportes básicos",
          "Aplicativo SKY Play",
          "Instalação padrão grátis",
        ],
        popular: false,
        recurrent: true,
        discount: "De R$ 99,90 por",
        packageType: "pos-pago",
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        title: "SKY Plus",
        price: "129,90",
        description: "O pacote mais escolhido pelos nossos clientes.",
        features: [
          "Mais de 150 canais",
          "Canais premium de filmes",
          "Esportes completos",
          "Aplicativo SKY Play",
          "1 ponto adicional grátis",
          "Instalação padrão grátis",
        ],
        popular: true,
        recurrent: true,
        discount: "De R$ 149,90 por",
        tag: "MAIS VENDIDO",
        packageType: "pos-pago",
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        title: "SKY Premium",
        price: "189,90",
        description: "Experiência completa com todos os canais disponíveis.",
        features: [
          "Mais de 200 canais",
          "Todos os canais premium",
          "Pacote completo de esportes",
          "Aplicativo SKY Play",
          "2 pontos adicionais grátis",
          "Paramount+ incluso",
          "Instalação padrão grátis",
        ],
        popular: false,
        recurrent: true,
        discount: "De R$ 219,90 por",
        packageType: "pos-pago",
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        title: "SKY Pré 30",
        price: "69,90",
        description: "Recarga mensal sem fidelidade.",
        features: [
          "Mais de 80 canais",
          "Canais de filmes e séries",
          "Validade de 30 dias",
          "Sem análise de crédito",
          "Equipamento próprio",
        ],
        popular: false,
        recurrent: false,
        packageType: "pre-pago",
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        title: "SKY Pré 90",
        price: "179,90",
        description: "Melhor custo-benefício para pré-pago.",
        features: [
          "Mais de 80 canais",
          "Canais de filmes e séries",
          "Validade de 90 dias",
          "Sem análise de crédito",
          "Economia de R$ 30,00",
          "Equipamento próprio",
        ],
        popular: true,
        recurrent: false,
        tag: "MELHOR CUSTO-BENEFÍCIO",
        packageType: "pre-pago",
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        title: "SKY Pré 180",
        price: "329,90",
        description: "Maior economia para longo prazo.",
        features: [
          "Mais de 80 canais",
          "Canais de filmes e séries",
          "Validade de 180 dias",
          "Sem análise de crédito",
          "Economia de R$ 90,00",
          "Equipamento próprio",
        ],
        popular: false,
        recurrent: false,
        packageType: "pre-pago",
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
    ])

    // Seed hero slides
    await db.insert(heroSlides).values([
      {
        title: "Economize sem abrir mão da diversão",
        subtitle: "Assine agora com taxa de adesão por apenas",
        price: "1,90",
        cta: "Assine já",
        image: "/placeholder.svg?height=600&width=800",
        features: ["Mais de 200 canais", "Esportes ao vivo", "Filmes e séries"],
        tag: "OFERTA LIMITADA",
        order: 1,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        title: "Internet + TV em um só lugar",
        subtitle: "Combo completo a partir de",
        price: "149,90",
        cta: "Conheça os combos",
        image: "/placeholder.svg?height=600&width=800",
        features: ["Internet de alta velocidade", "TV com os melhores canais", "Instalação grátis"],
        tag: "COMBO EXCLUSIVO",
        speedBadge: "300 Mega",
        order: 2,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        title: "SKY Pré-pago sem fidelidade",
        subtitle: "Recarga a partir de",
        price: "69,90",
        cta: "Saiba mais",
        image: "/placeholder.svg?height=600&width=800",
        features: ["Sem análise de crédito", "Recarregue quando quiser", "Mais de 80 canais"],
        tag: "SEM MENSALIDADE",
        order: 3,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
    ])

    // Seed channels
    await db.insert(channels).values([
      {
        name: "HBO",
        logo: "/placeholder.svg?height=60&width=60",
        category: "Filmes",
        order: 1,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        name: "ESPN",
        logo: "/placeholder.svg?height=60&width=60",
        category: "Esportes",
        order: 2,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        name: "Discovery",
        logo: "/placeholder.svg?height=60&width=60",
        category: "Documentários",
        order: 3,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        name: "Telecine",
        logo: "/placeholder.svg?height=60&width=60",
        category: "Filmes",
        order: 4,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        name: "Globo",
        logo: "/placeholder.svg?height=60&width=60",
        category: "Abertos",
        order: 5,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        name: "SporTV",
        logo: "/placeholder.svg?height=60&width=60",
        category: "Esportes",
        order: 6,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        name: "Disney",
        logo: "/placeholder.svg?height=60&width=60",
        category: "Infantil",
        order: 7,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        name: "Warner",
        logo: "/placeholder.svg?height=60&width=60",
        category: "Filmes",
        order: 8,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        name: "Fox Sports",
        logo: "/placeholder.svg?height=60&width=60",
        category: "Esportes",
        order: 9,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        name: "National Geographic",
        logo: "/placeholder.svg?height=60&width=60",
        category: "Documentários",
        order: 10,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        name: "Cartoon Network",
        logo: "/placeholder.svg?height=60&width=60",
        category: "Infantil",
        order: 11,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        name: "Paramount",
        logo: "/placeholder.svg?height=60&width=60",
        category: "Filmes",
        order: 12,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
    ])

    // Seed FAQs
    await db.insert(faqs).values([
      {
        question: "Qual a diferença entre SKY pós-pago e pré-pago?",
        answer:
          "O SKY pós-pago funciona com mensalidade fixa, cobrada mensalmente via fatura. Já o SKY pré-pago funciona com recargas, onde você paga antecipadamente pelo período que deseja utilizar o serviço, sem mensalidade ou fidelidade.",
        order: 1,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        question: "Quanto tempo leva para instalar a SKY após a contratação?",
        answer:
          "A instalação da SKY geralmente é realizada em até 48 horas úteis após a aprovação do cadastro, dependendo da disponibilidade na sua região.",
        order: 2,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        question: "Posso assistir SKY em mais de uma TV?",
        answer:
          "Sim, é possível assistir SKY em mais de uma TV. Dependendo do pacote escolhido, você pode ter pontos adicionais inclusos ou contratar separadamente.",
        order: 3,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        question: "O que é o SKY Play?",
        answer:
          "O SKY Play é o serviço de streaming da SKY que permite assistir a diversos conteúdos pelo celular, tablet ou computador. Está incluso em todos os pacotes pós-pagos sem custo adicional.",
        order: 4,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        question: "A SKY tem fidelidade?",
        answer:
          "Os planos pós-pagos geralmente possuem fidelidade de 12 meses. Já os planos pré-pagos não possuem fidelidade, permitindo recarregar apenas quando desejar.",
        order: 5,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
    ])

    // Seed testimonials
    await db.insert(testimonials).values([
      {
        quote:
          "Assinei a SKY há 2 anos e a qualidade do sinal é excelente. Mesmo em dias de chuva forte, raramente tenho problemas.",
        author: "Carlos Silva",
        role: "Cliente SKY Plus",
        rating: 5,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        quote: "O atendimento ao cliente é muito bom. Tive um problema técnico e resolveram no mesmo dia. Recomendo!",
        author: "Ana Oliveira",
        role: "Cliente SKY Premium",
        rating: 5,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
      {
        quote:
          "Optei pelo plano pré-pago e funciona perfeitamente para minha necessidade. Recarrego a cada 3 meses e economizo.",
        author: "Roberto Santos",
        role: "Cliente SKY Pré 90",
        rating: 4,
        active: true,
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
    ])

    // Seed settings
    await db.insert(settings).values([
      { key: "phone_sales", value: "0800 600 4990", updatedAt: getTimestamp() },
      { key: "phone_support", value: "0800 720 1234", updatedAt: getTimestamp() },
      { key: "whatsapp", value: "5511999999999", updatedAt: getTimestamp() },
      {
        key: "promo_banner_text",
        value: "Oferta Especial: Assine hoje e ganhe 30 dias de Paramount+ grátis!",
        updatedAt: getTimestamp(),
      },
      { key: "promo_banner_link", value: "#contact", updatedAt: getTimestamp() },
      { key: "promo_banner_active", value: "true", updatedAt: getTimestamp() },
    ])

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json(
      { success: false, message: "Failed to seed database", error: String(error) },
      { status: 500 },
    )
  }
}

