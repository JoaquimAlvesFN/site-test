import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAuth } from "@/lib/auth"
import { SettingsForm } from "@/components/admin/settings-form"
import { LogoSettingsForm } from "@/components/admin/logo-settings-form"
import { getAllSettings } from "@/app/admin/actions"

export default async function SettingsPage() {
  requireAuth()

  // Buscar configurações do banco de dados
  const settingsData = await getAllSettings()
  
  // Mesclar com valores padrão para garantir que todos os campos existam
  const settings = {
    // Contato
    phone_sales: settingsData.phone_sales || "0800 600 4990",
    phone_support: settingsData.phone_support || "0800 720 1234",
    whatsapp: settingsData.whatsapp || "5511999999999",
    email: settingsData.email || "contato@skypacotes.com.br",
    
    // Banners
    promo_banner_text: settingsData.promo_banner_text || "Oferta Especial: Assine hoje e ganhe 30 dias de Paramount+ grátis!",
    promo_banner_link: settingsData.promo_banner_link || "#contact",
    promo_banner_active: settingsData.promo_banner_active || "true",
    
    // Redes sociais
    facebook: settingsData.facebook || "https://facebook.com/skybrasil",
    instagram: settingsData.instagram || "https://instagram.com/skybrasil",
    twitter: settingsData.twitter || "https://twitter.com/skybrasil",
    youtube: settingsData.youtube || "https://youtube.com/skybrasil",
    
    // Logos
    header_logo: settingsData.header_logo || "",
    footer_logo: settingsData.footer_logo || "",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações globais do site</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <SettingsForm
              settings={settingsData}
              section="contact"
              fields={[
                { key: "phone_sales", label: "Telefone de Vendas", placeholder: "0800 600 4990" },
                { key: "phone_support", label: "Telefone de Suporte", placeholder: "0800 720 1234" },
                { key: "whatsapp", label: "WhatsApp (com código do país)", placeholder: "5511999999999" },
                { key: "email", label: "E-mail de Contato", placeholder: "contato@skypacotes.com.br" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logos</CardTitle>
          </CardHeader>
          <CardContent>
            <LogoSettingsForm settings={settings} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Banner Promocional</CardTitle>
          </CardHeader>
          <CardContent>
            <SettingsForm
              settings={settings}
              section="promo_banner"
              fields={[
                {
                  key: "promo_banner_text",
                  label: "Texto do Banner",
                  placeholder: "Oferta Especial: Assine hoje e ganhe 30 dias de Paramount+ grátis!",
                },
                { key: "promo_banner_link", label: "Link do Banner", placeholder: "#contact" },
                { key: "promo_banner_active", label: "Banner Ativo", type: "switch" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Redes Sociais</CardTitle>
          </CardHeader>
          <CardContent>
            <SettingsForm
              settings={settings}
              section="social"
              fields={[
                { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/skybrasil" },
                { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/skybrasil" },
                { key: "twitter", label: "Twitter", placeholder: "https://twitter.com/skybrasil" },
                { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/skybrasil" },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

