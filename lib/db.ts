import {PrismaClient} from '@prisma/client';

export const db = new PrismaClient();

// Mock database for demo purposes
// In a real application, you would use a real database
class MockDatabase {
  private data: Record<string, any[]> = {
    packages: [],
    hero_slides: [],
    channels: [],
    faqs: [],
    testimonials: [],
    settings: [],
    contacts: [],
    images: [],
    company_info: [],
    company_values: [],
    company_history: [],
    team_members: [],
    company_facilities: [],
    quick_features: [],
    why_choose_features: [],
    internet_section: [],
    business_section: [],
  }

  private idCounters: Record<string, number> = {
    packages: 0,
    hero_slides: 0,
    channels: 0,
    faqs: 0,
    testimonials: 0,
    settings: 0,
    contacts: 0,
    images: 0,
    company_info: 0,
    company_values: 0,
    company_history: 0,
    team_members: 0,
    company_facilities: 0,
    quick_features: 0,
    why_choose_features: 0,
    internet_section: 0,
    business_section: 0,
  }

  constructor() {
    // Inicializar com alguns dados para demonstração
    this.seedInitialData()
  }

  // Modificar o método seedInitialData para garantir que as configurações do rodapé sejam inicializadas corretamente
  private seedInitialData() {
    // Adicionar alguns dados iniciais para demonstração
    // Isso garante que os dados estejam disponíveis mesmo sem chamar a API de seed

    // Adicionar algumas configurações padrão para o rodapé
    this.data.settings = [
      {
        id: 1,
        key: "footer_company_description",
        value:
          "Líder em TV por assinatura via satélite no Brasil, oferecendo a melhor experiência em entretenimento desde 1996.",
      },
      { id: 2, key: "footer_products_title", value: "Produtos" },
      {
        id: 3,
        key: "footer_products_links",
        value: JSON.stringify([
          { label: "TV por Assinatura", url: "#" },
          { label: "Internet", url: "#" },
          { label: "Combos", url: "#" },
          { label: "SKY Play", url: "#" },
        ]),
      },
      { id: 4, key: "footer_support_title", value: "Suporte" },
      {
        id: 5,
        key: "footer_support_links",
        value: JSON.stringify([
          { label: "Central de Ajuda", url: "#" },
          { label: "Minha Conta", url: "#" },
          { label: "2ª Via de Fatura", url: "#" },
          { label: "Contato", url: "#" },
        ]),
      },
      { id: 6, key: "footer_contact_title", value: "Contato" },
      { id: 7, key: "footer_contact_sales_label", value: "Vendas:" },
      { id: 8, key: "footer_contact_sales_phone", value: "0800 600 4990" },
      { id: 9, key: "footer_contact_support_label", value: "Suporte:" },
      { id: 10, key: "footer_contact_support_phone", value: "0800 720 1234" },
      { id: 11, key: "footer_contact_whatsapp", value: "5511999999999" },
      { id: 12, key: "footer_copyright", value: "© {year} SKY Brasil. Todos os direitos reservados." },
    ]

    // Adicionar alguns contatos de exemplo
    this.data.contacts = [
      {
        id: 1,
        endereco: "Rua das Flores, 123",
        cep: "01234-567",
        cnpj: "12.345.678/0001-90",
        email: "joao.silva@example.com",
        telefone: "(11) 98765-4321",
        cpf: "123.456.789-00",
        rg: "12.345.678-9",
        dataExpedicao: "2020-01-01",
        orgao: "SSP",
        cargoCpf: "Empresário",
        produto: "TV por Assinatura",
        status: "pending",
        notes: "",
        createdAt: "2023-04-15T10:30:00.000Z",
        updatedAt: "2023-04-15T10:30:00.000Z",
      },
      {
        id: 2,
        endereco: "Avenida Principal, 456",
        cep: "20000-000",
        email: "maria.oliveira@example.com",
        telefone: "(21) 98765-4321",
        cpf: "987.654.321-00",
        rg: "98.765.432-1",
        dataExpedicao: "2019-05-15",
        orgao: "SSP",
        cargoCpf: "Autônomo",
        produto: "Internet",
        status: "contacted",
        notes: "Cliente interessado em internet de alta velocidade",
        createdAt: "2023-04-16T14:20:00.000Z",
        updatedAt: "2023-04-17T09:15:00.000Z",
      },
      {
        id: 3,
        endereco: "Rua dos Comerciantes, 789",
        cep: "30000-000",
        cnpj: "98.765.432/0001-10",
        email: "pedro.santos@example.com",
        telefone: "(31) 98765-4321",
        cpf: "456.789.123-00",
        rg: "45.678.912-3",
        dataExpedicao: "2021-03-20",
        orgao: "SSP",
        cargoCpf: "Empresário",
        produto: "Combo TV + Internet",
        status: "converted",
        notes: "Cliente assinou o pacote Premium",
        createdAt: "2023-04-10T16:45:00.000Z",
        updatedAt: "2023-04-12T11:30:00.000Z",
      },
    ]

    // Adicionar algumas imagens de exemplo
    this.data.images = [
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

    this.data.company_info = [
      {
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
        updatedAt: String(new Date().toISOString()),
      },
    ]

    this.data.company_values = [
      {
        id: 1,
        title: "Excelência",
        description:
          "Buscamos a excelência em tudo o que fazemos, desde o atendimento ao cliente até a qualidade do sinal.",
        icon: "Award",
        order: 1,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 2,
        title: "Foco no Cliente",
        description:
          "Nossos clientes estão no centro de todas as nossas decisões. Trabalhamos para superar suas expectativas.",
        icon: "Users",
        order: 2,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 3,
        title: "Inovação",
        description:
          "Investimos constantemente em novas tecnologias para oferecer a melhor experiência em entretenimento.",
        icon: "Building",
        order: 3,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
    ]

    this.data.company_history = [
      {
        id: 1,
        year: "1996",
        title: "Fundação da SKY Brasil",
        description: "A SKY Brasil é fundada, iniciando suas operações de TV por assinatura via satélite no país.",
        order: 1,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 2,
        year: "2006",
        title: "Expansão Nacional",
        description:
          "A empresa atinge a marca de 1 milhão de assinantes e expande sua cobertura para todo o território nacional.",
        order: 2,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 3,
        year: "2010",
        title: "Lançamento da SKY HDTV",
        description: "Pioneira na tecnologia de alta definição no Brasil, a SKY lança seus primeiros canais em HD.",
        order: 3,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 4,
        year: "2015",
        title: "Lançamento do SKY Play",
        description:
          "A empresa inova com o lançamento da plataforma SKY Play, permitindo aos assinantes assistir conteúdo em qualquer dispositivo.",
        order: 4,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 5,
        year: "2018",
        title: "Entrada no mercado de Internet",
        description: "A SKY expande seus serviços e começa a oferecer internet banda larga via fibra óptica.",
        order: 5,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 6,
        year: "2023",
        title: "Inovação Contínua",
        description:
          "Lançamento de novos serviços e tecnologias, consolidando a posição de liderança no mercado brasileiro.",
        order: 6,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
    ]

    this.data.team_members = [
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
        updatedAt: String(new Date().toISOString()),
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
        updatedAt: String(new Date().toISOString()),
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
        updatedAt: String(new Date().toISOString()),
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
        updatedAt: String(new Date().toISOString()),
      },
    ]

    this.data.company_facilities = [
      {
        id: 1,
        title: "Sede Corporativa",
        location: "São Paulo, SP",
        image: "/placeholder.svg?height=400&width=600",
        alt: "Sede SKY Brasil",
        order: 1,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 2,
        title: "Centro de Operações",
        location: "Rio de Janeiro, RJ",
        image: "/placeholder.svg?height=400&width=600",
        alt: "Centro de Operações",
        order: 2,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 3,
        title: "Centro de Distribuição",
        location: "Barueri, SP",
        image: "/placeholder.svg?height=400&width=600",
        alt: "Centro de Distribuição",
        order: 3,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 4,
        title: "Centro de Tecnologia",
        location: "Campinas, SP",
        image: "/placeholder.svg?height=400&width=600",
        alt: "Centro de Tecnologia",
        order: 4,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 5,
        title: "Central de Atendimento",
        location: "Salvador, BA",
        image: "/placeholder.svg?height=400&width=600",
        alt: "Central de Atendimento",
        order: 5,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 6,
        title: "Escritório Regional",
        location: "Recife, PE",
        image: "/placeholder.svg?height=400&width=600",
        alt: "Escritório Regional",
        order: 6,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
    ]

    // Adicionar dados para os recursos rápidos da página inicial
    this.data.quick_features = [
      {
        id: 1,
        title: "Instalação Rápida",
        description: "Em até 48 horas",
        icon: "Shield",
        order: 1,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 2,
        title: "SKY Play Grátis",
        description: "Assista onde quiser",
        icon: "Play",
        order: 2,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 3,
        title: "+200 Canais",
        description: "Melhor conteúdo",
        icon: "Tv",
        order: 3,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 4,
        title: "Cobertura Nacional",
        description: "Em todo o Brasil",
        icon: "MapPin",
        order: 4,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
    ]

    // Adicionar dados para os recursos "Por que escolher a SKY?"
    this.data.why_choose_features = [
      {
        id: 1,
        title: "Melhor Conteúdo",
        description: "Acesso aos melhores canais de filmes, séries, esportes e programas para toda a família.",
        icon: "Tv",
        order: 1,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 2,
        title: "SKY Play Incluso",
        description: "Assista onde e quando quiser pelo aplicativo SKY Play, disponível para todos os assinantes.",
        icon: "Play",
        order: 2,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 3,
        title: "Benefícios Exclusivos",
        description: "Descontos em serviços parceiros, proteção McAfee e vantagens para toda a família.",
        icon: "Shield",
        order: 3,
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
    ]

    // Adicionar dados para a seção de internet
    this.data.internet_section = [
      {
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
        updatedAt: String(new Date().toISOString()),
      },
    ]

    // Adicionar dados para a seção de negócios
    this.data.business_section = [
      {
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
          // {
          //   icon: "BarChart",
          //   title: "Análise de Uso",
          //   description: "Relatórios de utilização e preferências",
          // },
        ],
        benefits: ["Atendimento prioritário", "Suporte técnico 24/7", "Instalação profissional", "Condições especiais"],
        cta: "Solicitar Proposta Comercial",
        ctaLink: "#contact",
        active: true,
        updatedAt: String(new Date().toISOString()),
      },
    ]

    // Adicionar slides do hero
    this.data.hero_slides = [
      {
        id: 1,
        title: "Economize sem abrir mão da diversão",
        subtitle: "Assine agora com taxa de adesão por apenas",
        price: "1,90",
        cta: "Assine já",
        image: "/placeholder.svg?height=600&width=800",
        features: ["Mais de 200 canais", "Esportes ao vivo", "Filmes e séries"],
        tag: "OFERTA LIMITADA",
        order: 1,
        active: true,
        createdAt: String(new Date().toISOString()),
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 2,
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
        createdAt: String(new Date().toISOString()),
        updatedAt: String(new Date().toISOString()),
      },
      {
        id: 3,
        title: "SKY Pré-pago sem fidelidade",
        subtitle: "Recarga a partir de",
        price: "69,90",
        cta: "Saiba mais",
        image: "/placeholder.svg?height=600&width=800",
        features: ["Sem análise de crédito", "Recarregue quando quiser", "Mais de 80 canais"],
        tag: "SEM MENSALIDADE",
        order: 3,
        active: true,
        createdAt: String(new Date().toISOString()),
        updatedAt: String(new Date().toISOString()),
      },
    ]

    // Atualizar o contador de IDs
    this.idCounters.settings = 12
    this.idCounters.contacts = 3
    this.idCounters.images = 3
    this.idCounters.company_info = 1
    this.idCounters.company_values = 3
    this.idCounters.company_history = 6
    this.idCounters.team_members = 4
    this.idCounters.company_facilities = 6
    this.idCounters.quick_features = 4
    this.idCounters.why_choose_features = 3
    this.idCounters.internet_section = 1
    this.idCounters.business_section = 1
    this.idCounters.hero_slides = 3
  }

  // Métodos simplificados para simular o comportamento do Drizzle ORM
  select() {
    return {
      from: (table: any) => {
        // Obter o nome da tabela
        const tableName = typeof table === "string" ? table : table.name

        // Garantir que a tabela existe e é um array
        if (!this.data[tableName] || !Array.isArray(this.data[tableName])) {
          this.data[tableName] = []
        }

        // Retornar uma cópia dos dados para evitar modificações acidentais
        return [...this.data[tableName]]
      },
    }
  }

  insert(table: any) {
    return {
      values: (data: any | any[]) => {
        const tableName = typeof table === "string" ? table : table.name

        if (!Array.isArray(this.data[tableName])) {
          this.data[tableName] = []
        }

        if (Array.isArray(data)) {
          const insertedData = data.map((item) => {
            const id = this.getNextId(tableName)
            const newItem = { ...item, id }
            this.data[tableName].push(newItem)
            return newItem
          })
          return insertedData
        } else {
          const id = this.getNextId(tableName)
          const newItem = { ...data, id }
          this.data[tableName].push(newItem)
          return newItem
        }
      },
    }
  }

  update(table: any) {
    return {
      set: (data: any) => {
        return {
          where: (condition: any) => {
            // Simplificação: não faz nada
            return
          },
        }
      },
    }
  }

  delete(table: any) {
    return {
      where: (condition: any) => {
        // Simplificação: não faz nada
        return
      },
    }
  }

  run(query: string) {
    console.log("Running query:", query)
    // Mock implementation - does nothing
  }

  private getNextId(tableName: string): number {
    this.idCounters[tableName] = (this.idCounters[tableName] || 0) + 1
    return this.idCounters[tableName]
  }
}

// Definir as tabelas
export const packages = {
  name: "packages",
  active: { equals: (value: boolean) => ({ value }) },
  order: { name: "order" },
}

export const heroSlides = {
  name: "hero_slides",
  active: { equals: (value: boolean) => ({ value }) },
  order: { name: "order" },
}

export const channels = {
  name: "channels",
  active: { equals: (value: boolean) => ({ value }) },
  order: { name: "order" },
}

export const faqs = {
  name: "faqs",
  active: { equals: (value: boolean) => ({ value }) },
  order: { name: "order" },
}

export const testimonials = {
  name: "testimonials",
  active: { equals: (value: boolean) => ({ value }) },
  order: { name: "order" },
}

export const settings = {
  name: "settings",
  key: { equals: (value: string) => ({ value }) },
}

export const contacts = {
  name: "contacts",
  status: { equals: (value: string) => ({ value }) },
}

export const images = {
  name: "images",
}

export const companyInfo = {
  name: "company_info",
}

export const companyValues = {
  name: "company_values",
  active: { equals: (value: boolean) => ({ value }) },
  order: { name: "order" },
}

export const companyHistory = {
  name: "company_history",
  active: { equals: (value: boolean) => ({ value }) },
  order: { name: "order" },
}

export const teamMembers = {
  name: "team_members",
  active: { equals: (value: boolean) => ({ value }) },
  order: { name: "order" },
}

export const companyFacilities = {
  name: "company_facilities",
  active: { equals: (value: boolean) => ({ value }) },
  order: { name: "order" },
}

export const quickFeatures = {
  name: "quick_features",
  active: { equals: (value: boolean) => ({ value }) },
  order: { name: "order" },
}

export const whyChooseFeatures = {
  name: "why_choose_features",
  active: { equals: (value: boolean) => ({ value }) },
  order: { name: "order" },
}

export const internetSection = {
  name: "internet_section",
  active: { equals: (value: boolean) => ({ value }) },
}

export const businessSection = {
  name: "business_section",
  active: { equals: (value: boolean) => ({ value }) },
}


export const getDb = async () => {
  return db
}

export function getTimestamp() {
  return String(new Date().toISOString())
}

// Types
export type Package = {
  id: number
  title: string
  price: string
  description: string
  features: string[]
  popular: boolean
  recurrent: boolean
  discount?: string
  tag?: string
  packageType: string
  position: number
  createdAt: string
  updatedAt: string
}

export type NewPackage = Omit<Package, "id" | "createdAt" | "updatedAt">

export type HeroSlide = {
  id: number
  title: string
  subtitle: string
  price: string
  cta: string
  image: string
  features: string[]
  tag?: string
  speedBadge?: string
  order: number
  active: boolean
  createdAt: string
  updatedAt: string
}

export type NewHeroSlide = Omit<HeroSlide, "id" | "createdAt" | "updatedAt">

export type Channel = {
  id: number
  name: string
  logo: string
  category: string
  order: number
  active: boolean
  createdAt: string
  updatedAt: string
}

export type NewChannel = Omit<Channel, "id" | "createdAt" | "updatedAt">

export type FAQ = {
  id: number
  question: string
  answer: string
  order: number
  active: boolean
  createdAt: string
  updatedAt: string
}

export type NewFAQ = Omit<FAQ, "id" | "createdAt" | "updatedAt">

export type Testimonial = {
  id: number
  quote: string
  author: string
  role: string
  rating: number
  active: boolean
  createdAt: string
  updatedAt: string
}

export type NewTestimonial = Omit<Testimonial, "id" | "createdAt" | "updatedAt">

export type Setting = {
  id: number
  key: string
  value: string
  updatedAt: string
}

export type NewSetting = Omit<Setting, "id" | "updatedAt">

// Base interface with common fields
interface BaseContact {
  name: string
  email: string
  telefone: string
  phone: string
  endereco?: string
  cep: string
  produto?: string
  interest?: string
  status: string
  notes?: string
  createdAt: string | Date
  updatedAt?: string | Date | null
}

// Interface for individual contacts (Pessoa Física)
interface IndividualContact extends BaseContact {
  type: 'individual'
  cpf: string
  rg: string
  dataExpedicao: string
  orgao: string
  cargoCpf: string
}

// Interface for company contacts (Pessoa Jurídica)
interface CompanyContact extends BaseContact {
  type: 'company'
  cnpj: string
  razaoSocial: string
  nomeFantasia?: string
  inscricaoEstadual?: string
  inscricaoMunicipal?: string
  representanteLegal?: string
  cargoRepresentante?: string
}

export type Contact = IndividualContact | CompanyContact

export type NewContact = Omit<Contact, "id" | "createdAt" | "updatedAt">

export type Image = {
  id: number
  name: string
  url: string
  size: number
  createdAt: string
  updatedAt: string
}

export type NewImage = Omit<Image, "id" | "createdAt" | "updatedAt">

// Novos tipos para as tabelas institucionais
export type CompanyInfo = {
  id: number
  aboutTitle: string
  aboutDescription: string
  aboutDescription2?: string
  clientsCount: string
  employeesCount: string
  channelsCount: string
  coveragePercent: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  heroImageAlt: string
  heroImageCaption: string
  heroImageLocation: string
  updatedAt: string
}

export type NewCompanyInfo = Omit<CompanyInfo, "id" | "updatedAt">

export type CompanyValue = {
  id: number
  title: string
  description: string
  icon: string
  order: number
  active: boolean
  updatedAt: string
}

export type NewCompanyValue = Omit<CompanyValue, "id" | "updatedAt">

export type CompanyHistoryItem = {
  id: number
  year: string
  title: string
  description: string
  order: number
  active: boolean
  updatedAt: string
}

export type NewCompanyHistoryItem = Omit<CompanyHistoryItem, "id" | "updatedAt">

export type TeamMember = {
  id: number
  name: string
  role: string
  description: string
  image: string
  linkedin?: string
  twitter?: string
  order: number
  active: boolean
  updatedAt: string
}

export type NewTeamMember = Omit<TeamMember, "id" | "updatedAt">

export type CompanyFacility = {
  id: number
  title: string
  location: string
  image: string
  alt: string
  order: number
  active: boolean
  updatedAt: string
}

export type NewCompanyFacility = Omit<CompanyFacility, "id" | "updatedAt">

// Novos tipos para as tabelas da página inicial
export type QuickFeature = {
  id: number
  title: string
  description: string
  icon: string
  order: number
  active: boolean
  updatedAt: string
}

export type NewQuickFeature = Omit<QuickFeature, "id" | "updatedAt">

export type WhyChooseFeature = {
  id: number
  title: string
  description: string
  icon: string
  order: number
  active: boolean
  updatedAt: string
}

export type NewWhyChooseFeature = Omit<WhyChooseFeature, "id" | "updatedAt">

export type InternetSectionData = {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  price: string
  speedBadge: string
  cta: string
  ctaLink: string
  features: string[]
  active: boolean
  updatedAt: string
}

export type NewInternetSectionData = Omit<InternetSectionData, "id" | "updatedAt">

export type BusinessSectionData = {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  features: {
    icon: string
    title: string
    description: string
  }[]
  benefits: string[]
  cta: string
  ctaLink: string
  active: boolean
  updatedAt: string
}

export type NewBusinessSectionData = Omit<BusinessSectionData, "id" | "updatedAt">

export async function initializeSchema() {
  try {
    console.log("Database schema initialized successfully")
    return true
  } catch (error) {
    console.error("Error initializing database schema:", error)
    return false
  }
}

