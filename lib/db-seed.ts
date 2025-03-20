import { db, settings, getTimestamp } from "./db"

// Função para popular o banco de dados com dados iniciais
export async function seedInitialData() {
  try {
    // Verificar se já existem configurações
    const existingSettings = await db.select().from(settings)

    // Se não houver configurações, adicionar as padrão
    if (!existingSettings || existingSettings.length === 0) {
      console.log("Seeding initial settings data...")

      // Adicionar configurações do rodapé
      await db.insert(settings).values([
        {
          key: "footer_company_description",
          value:
            "Líder em TV por assinatura via satélite no Brasil, oferecendo a melhor experiência em entretenimento desde 1996.",
          updatedAt: getTimestamp(),
        },
        {
          key: "footer_products_title",
          value: "Produtos",
          updatedAt: getTimestamp(),
        },
        {
          key: "footer_products_links",
          value: JSON.stringify([
            { label: "TV por Assinatura", url: "#" },
            { label: "Internet", url: "#" },
            { label: "Combos", url: "#" },
            { label: "SKY Play", url: "#" },
          ]),
          updatedAt: getTimestamp(),
        },
        {
          key: "footer_support_title",
          value: "Suporte",
          updatedAt: getTimestamp(),
        },
        {
          key: "footer_support_links",
          value: JSON.stringify([
            { label: "Central de Ajuda", url: "#" },
            { label: "Minha Conta", url: "#" },
            { label: "2ª Via de Fatura", url: "#" },
            { label: "Contato", url: "#" },
          ]),
          updatedAt: getTimestamp(),
        },
        {
          key: "footer_contact_title",
          value: "Contato",
          updatedAt: getTimestamp(),
        },
        {
          key: "footer_contact_sales_label",
          value: "Vendas:",
          updatedAt: getTimestamp(),
        },
        {
          key: "footer_contact_sales_phone",
          value: "0800 600 4990",
          updatedAt: getTimestamp(),
        },
        {
          key: "footer_contact_support_label",
          value: "Suporte:",
          updatedAt: getTimestamp(),
        },
        {
          key: "footer_contact_support_phone",
          value: "0800 720 1234",
          updatedAt: getTimestamp(),
        },
        {
          key: "footer_contact_whatsapp",
          value: "5511999999999",
          updatedAt: getTimestamp(),
        },
        {
          key: "footer_copyright",
          value: "© {year} SKY Brasil. Todos os direitos reservados.",
          updatedAt: getTimestamp(),
        },
      ])

      console.log("Initial settings data seeded successfully")
    } else {
      console.log("Settings data already exists, skipping seed")
    }

    return true
  } catch (error) {
    console.error("Error seeding initial data:", error)
    return false
  }
}

