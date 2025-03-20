import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import { FooterSectionForm } from "@/components/admin/footer-section-form"
import { getAllSettings } from "@/app/admin/actions"

// Modificar a função FooterPage para garantir que as configurações sejam recuperadas corretamente
export default async function FooterPage() {
  requireAuth()

  // Buscar configurações do rodapé
  let settings = {} as Record<string, string>
  try {
    settings = await getAllSettings()
    console.log("Admin footer settings loaded:", settings)
  } catch (error) {
    console.error("Error fetching settings:", error)
    // Continue with empty settings
  }

  // Verificar se as configurações de links são válidas
  let productsLinks = []
  try {
    productsLinks = settings.footer_products_links ? JSON.parse(settings.footer_products_links) : []
  } catch (e) {
    console.error("Error parsing products links:", e)
    productsLinks = [
      { label: "TV por Assinatura", url: "#" },
      { label: "Internet", url: "#" },
      { label: "Combos", url: "#" },
      { label: "SKY Play", url: "#" },
    ]
  }

  let supportLinks = []
  try {
    supportLinks = settings.footer_support_links ? JSON.parse(settings.footer_support_links) : []
  } catch (e) {
    console.error("Error parsing support links:", e)
    supportLinks = [
      { label: "Central de Ajuda", url: "#" },
      { label: "Minha Conta", url: "#" },
      { label: "2ª Via de Fatura", url: "#" },
      { label: "Contato", url: "#" },
    ]
  }

  // Organizar as configurações por seção
  const footerSettings = {
    company: {
      footer_company_description:
        settings.footer_company_description ||
        "Líder em TV por assinatura via satélite no Brasil, oferecendo a melhor experiência em entretenimento desde 1996.",
    },
    products: {
      footer_products_title: settings.footer_products_title || "Produtos",
      footer_products_links: productsLinks,
    },
    support: {
      footer_support_title: settings.footer_support_title || "Suporte",
      footer_support_links: supportLinks,
    },
    contact: {
      footer_contact_title: settings.footer_contact_title || "Contato",
      footer_contact_sales_label: settings.footer_contact_sales_label || "Vendas:",
      footer_contact_sales_phone: settings.footer_contact_sales_phone || "0800 600 4990",
      footer_contact_support_label: settings.footer_contact_support_label || "Suporte:",
      footer_contact_support_phone: settings.footer_contact_support_phone || "0800 720 1234",
      footer_contact_whatsapp: settings.footer_contact_whatsapp || "5511999999999",
    },
    copyright: {
      footer_copyright: settings.footer_copyright || "© {year} SKY Brasil. Todos os direitos reservados.",
    },
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rodapé</h1>
        <p className="text-muted-foreground">Gerencie as informações exibidas no rodapé do site</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Empresa</CardTitle>
          </CardHeader>
          <CardContent>
            <FooterSectionForm
              section="company"
              fields={[{ key: "footer_company_description", label: "Descrição da Empresa", type: "textarea" }]}
              initialValues={footerSettings.company}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seção de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <FooterSectionForm
              section="products"
              fields={[
                { key: "footer_products_title", label: "Título da Seção" },
                { key: "footer_products_links", label: "Links", type: "links" },
              ]}
              initialValues={footerSettings.products}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seção de Suporte</CardTitle>
          </CardHeader>
          <CardContent>
            <FooterSectionForm
              section="support"
              fields={[
                { key: "footer_support_title", label: "Título da Seção" },
                { key: "footer_support_links", label: "Links", type: "links" },
              ]}
              initialValues={footerSettings.support}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seção de Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <FooterSectionForm
              section="contact"
              fields={[
                { key: "footer_contact_title", label: "Título da Seção" },
                { key: "footer_contact_sales_label", label: "Rótulo de Vendas" },
                { key: "footer_contact_sales_phone", label: "Telefone de Vendas" },
                { key: "footer_contact_support_label", label: "Rótulo de Suporte" },
                { key: "footer_contact_support_phone", label: "Telefone de Suporte" },
                { key: "footer_contact_whatsapp", label: "WhatsApp (com código do país)" },
              ]}
              initialValues={footerSettings.contact}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Copyright</CardTitle>
          </CardHeader>
          <CardContent>
            <FooterSectionForm
              section="copyright"
              fields={[
                { key: "footer_copyright", label: "Texto de Copyright", help: "Use {year} para inserir o ano atual" },
              ]}
              initialValues={footerSettings.copyright}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

