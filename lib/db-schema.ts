import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

// Define schemas for SQLite
export const packages = sqliteTable("packages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  price: text("price").notNull(),
  description: text("description").notNull(),
  features: text("features", { mode: "json" }).notNull().$type<string[]>(),
  popular: integer("popular", { mode: "boolean" }).default(false),
  recurrent: integer("recurrent", { mode: "boolean" }).default(true),
  discount: text("discount"),
  tag: text("tag"),
  packageType: text("package_type").notNull(), // 'pos-pago' or 'pre-pago'
  createdAt: text("created_at").default(String(new Date().toISOString())),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

export const heroSlides = sqliteTable("hero_slides", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  price: text("price").notNull(),
  cta: text("cta").notNull(),
  image: text("image").notNull(),
  features: text("features", { mode: "json" }).notNull().$type<string[]>(),
  tag: text("tag"),
  speedBadge: text("speed_badge"),
  order: integer("order").notNull(),
  active: integer("active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(String(new Date().toISOString())),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

export const channels = sqliteTable("channels", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  category: text("category").notNull(),
  order: integer("order").notNull(),
  active: integer("active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(String(new Date().toISOString())),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

export const faqs = sqliteTable("faqs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").notNull(),
  active: integer("active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(String(new Date().toISOString())),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

export const testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  quote: text("quote").notNull(),
  author: text("author").notNull(),
  role: text("role").notNull(),
  rating: integer("rating").notNull(),
  active: integer("active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(String(new Date().toISOString())),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

export const settings = sqliteTable("settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

// Nova tabela para armazenar os dados de contato/cadastro
export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  cep: text("cep").notNull(),
  interest: text("interest").notNull(), // 'tv', 'internet', 'combo'
  packageId: integer("package_id"), // Opcional, referência ao pacote de interesse
  status: text("status").default("pending"), // 'pending', 'contacted', 'converted', 'canceled'
  notes: text("notes"),
  createdAt: text("created_at").default(String(new Date().toISOString())),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

export const images = sqliteTable("images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  url: text("url").notNull(),
  size: integer("size").notNull(),
  createdAt: text("created_at").default(String(new Date().toISOString())),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

// Nova tabela para armazenar informações sobre a empresa
export const companyInfo = sqliteTable("company_info", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  aboutTitle: text("about_title").notNull(),
  aboutDescription: text("about_description").notNull(),
  aboutDescription2: text("about_description2"),
  clientsCount: text("clients_count").notNull(),
  employeesCount: text("employees_count").notNull(),
  channelsCount: text("channels_count").notNull(),
  coveragePercent: text("coverage_percent").notNull(),
  heroTitle: text("hero_title").notNull(),
  heroSubtitle: text("hero_subtitle").notNull(),
  heroImage: text("hero_image").notNull(),
  heroImageAlt: text("hero_image_alt").notNull(),
  heroImageCaption: text("hero_image_caption").notNull(),
  heroImageLocation: text("hero_image_location").notNull(),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

// Nova tabela para armazenar valores da empresa
export const companyValues = sqliteTable("company_values", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(), // Nome do ícone do Lucide
  order: integer("order").notNull(),
  active: integer("active", { mode: "boolean" }).default(true),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

// Nova tabela para armazenar marcos históricos da empresa
export const companyHistory = sqliteTable("company_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  year: text("year").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
  active: integer("active", { mode: "boolean" }).default(true),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

// Nova tabela para armazenar membros da equipe
export const teamMembers = sqliteTable("team_members", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  role: text("role").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  linkedin: text("linkedin"),
  twitter: text("twitter"),
  order: integer("order").notNull(),
  active: integer("active", { mode: "boolean" }).default(true),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

// Nova tabela para armazenar instalações da empresa
export const companyFacilities = sqliteTable("company_facilities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  location: text("location").notNull(),
  image: text("image").notNull(),
  alt: text("alt").notNull(),
  order: integer("order").notNull(),
  active: integer("active", { mode: "boolean" }).default(true),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

// Nova tabela para recursos rápidos exibidos abaixo do hero
export const quickFeatures = sqliteTable("quick_features", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(), // Nome do ícone do Lucide
  order: integer("order").notNull(),
  active: integer("active", { mode: "boolean" }).default(true),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

// Nova tabela para recursos da seção "Por que escolher a SKY?"
export const whyChooseFeatures = sqliteTable("why_choose_features", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(), // Nome do ícone do Lucide
  order: integer("order").notNull(),
  active: integer("active", { mode: "boolean" }).default(true),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

// Nova tabela para configuração da seção de internet
export const internetSection = sqliteTable("internet_section", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  price: text("price").notNull(),
  speedBadge: text("speed_badge").notNull(),
  cta: text("cta").notNull(),
  ctaLink: text("cta_link").notNull(),
  features: text("features", { mode: "json" }).notNull().$type<string[]>(),
  active: integer("active", { mode: "boolean" }).default(true),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

// Nova tabela para configuração da seção de negócios
export const businessSection = sqliteTable("business_section", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  features: text("features", { mode: "json" }).notNull().$type<
    {
      icon: string
      title: string
      description: string
    }[]
  >(),
  benefits: text("benefits", { mode: "json" }).notNull().$type<string[]>(),
  cta: text("cta").notNull(),
  ctaLink: text("cta_link").notNull(),
  active: integer("active", { mode: "boolean" }).default(true),
  updatedAt: text("updated_at").default(String(new Date().toISOString())),
})

// Types
export type Package = typeof packages.$inferSelect
export type NewPackage = typeof packages.$inferInsert

export type HeroSlide = typeof heroSlides.$inferSelect
export type NewHeroSlide = typeof heroSlides.$inferInsert

export type Channel = typeof channels.$inferSelect
export type NewChannel = typeof channels.$inferInsert

export type FAQ = typeof faqs.$inferSelect
export type NewFAQ = typeof faqs.$inferInsert

export type Testimonial = typeof testimonials.$inferSelect
export type NewTestimonial = typeof testimonials.$inferInsert

export type Setting = typeof settings.$inferSelect
export type NewSetting = typeof settings.$inferInsert

export type Contact = typeof contacts.$inferSelect
export type NewContact = typeof contacts.$inferInsert

export type Image = typeof images.$inferSelect
export type NewImage = typeof images.$inferInsert

// Novos tipos para as tabelas institucionais
export type CompanyInfo = typeof companyInfo.$inferSelect
export type NewCompanyInfo = typeof companyInfo.$inferInsert

export type CompanyValue = typeof companyValues.$inferSelect
export type NewCompanyValue = typeof companyValues.$inferInsert

export type CompanyHistoryItem = typeof companyHistory.$inferSelect
export type NewCompanyHistoryItem = typeof companyHistory.$inferInsert

export type TeamMember = typeof teamMembers.$inferSelect
export type NewTeamMember = typeof teamMembers.$inferInsert

export type CompanyFacility = typeof companyFacilities.$inferSelect
export type NewCompanyFacility = typeof companyFacilities.$inferInsert

// Novos tipos para as tabelas da página inicial
export type QuickFeature = typeof quickFeatures.$inferSelect
export type NewQuickFeature = typeof quickFeatures.$inferInsert

export type WhyChooseFeature = typeof whyChooseFeatures.$inferSelect
export type NewWhyChooseFeature = typeof whyChooseFeatures.$inferInsert

export type InternetSectionData = typeof internetSection.$inferSelect
export type NewInternetSectionData = typeof internetSection.$inferInsert

export type BusinessSectionData = typeof businessSection.$inferSelect
export type NewBusinessSectionData = typeof businessSection.$inferInsert

