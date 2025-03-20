"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Zap } from "lucide-react"
import { getAllSettings } from "@/app/admin/actions"
import { DynamicLogo } from "@/components/dynamic-logo"

interface FooterLink {
  label: string
  url: string
}

interface FooterSettings {
  company: {
    description: string
  }
  products: {
    title: string
    links: FooterLink[]
  }
  support: {
    title: string
    links: FooterLink[]
  }
  contact: {
    title: string
    salesLabel: string
    salesPhone: string
    supportLabel: string
    supportPhone: string
    whatsapp: string
  }
  copyright: string
}

export function Footer() {
  const [settings, setSettings] = useState<FooterSettings>({
    company: {
      description:
        "Líder em TV por assinatura via satélite no Brasil, oferecendo a melhor experiência em entretenimento desde 1996.",
    },
    products: {
      title: "Produtos",
      links: [
        { label: "TV por Assinatura", url: "#" },
        { label: "Internet", url: "#" },
        { label: "Combos", url: "#" },
        { label: "SKY Play", url: "#" },
      ],
    },
    support: {
      title: "Suporte",
      links: [
        { label: "Central de Ajuda", url: "#" },
        { label: "Minha Conta", url: "#" },
        { label: "2ª Via de Fatura", url: "#" },
        { label: "Contato", url: "#" },
      ],
    },
    contact: {
      title: "Contato",
      salesLabel: "Vendas:",
      salesPhone: "0800 600 4990",
      supportLabel: "Suporte:",
      supportPhone: "0800 720 1234",
      whatsapp: "5511999999999",
    },
    copyright: "© {year} SKY Brasil. Todos os direitos reservados.",
  })

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await getAllSettings()
        console.log("Footer settings loaded:", data)

        // Processar as configurações do rodapé
        const footerSettings: FooterSettings = {
          company: {
            description: data.footer_company_description || settings.company.description,
          },
          products: {
            title: data.footer_products_title || settings.products.title,
            links: data.footer_products_links ? JSON.parse(data.footer_products_links) : settings.products.links,
          },
          support: {
            title: data.footer_support_title || settings.support.title,
            links: data.footer_support_links ? JSON.parse(data.footer_support_links) : settings.support.links,
          },
          contact: {
            title: data.footer_contact_title || settings.contact.title,
            salesLabel: data.footer_contact_sales_label || settings.contact.salesLabel,
            salesPhone: data.footer_contact_sales_phone || settings.contact.salesPhone,
            supportLabel: data.footer_contact_support_label || settings.contact.supportLabel,
            supportPhone: data.footer_contact_support_phone || settings.contact.supportPhone,
            whatsapp: data.footer_contact_whatsapp || settings.contact.whatsapp,
          },
          copyright: data.footer_copyright || settings.copyright,
        }

        setSettings(footerSettings)
      } catch (error) {
        console.error("Erro ao carregar configurações do rodapé:", error)
        // Keep using default settings in case of error
      }
    }

    fetchSettings()
  }, [])

  // Substituir {year} pelo ano atual no texto de copyright
  const copyrightText = settings.copyright.replace("{year}", new Date().getFullYear().toString())

  return (
    <footer className="bg-[#00205B] text-slate-200 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <DynamicLogo
              type="footer"
              fallbackSrc="https://sjc.microlink.io/EVPkxg5JrNWxZNP9AWwi5KRkyc0EaklEAI0j6mP3BLANnvCK51AwejCcuTRPp1RtaCoUH-vI4pLeAn4KL4YmWQ.jpeg"
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-sm text-slate-400 mt-4">{settings.company.description}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{settings.products.title}</h3>
            <ul className="space-y-2">
              {settings.products.links.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className="text-sm text-slate-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{settings.support.title}</h3>
            <ul className="space-y-2">
              {settings.support.links.map((link, index) => (
                <li key={index}>
                  <Link href={link.url} className="text-sm text-slate-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{settings.contact.title}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-sm text-slate-400">{settings.contact.salesLabel}</span>
                <Link
                  href={`tel:${settings.contact.salesPhone.replace(/\D/g, "")}`}
                  className="text-sm text-white font-bold"
                >
                  {settings.contact.salesPhone}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sm text-slate-400">{settings.contact.supportLabel}</span>
                <Link
                  href={`tel:${settings.contact.supportPhone.replace(/\D/g, "")}`}
                  className="text-sm text-white font-bold"
                >
                  {settings.contact.supportPhone}
                </Link>
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href={`https://wa.me/${settings.contact.whatsapp}`}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm"
              >
                <Zap className="h-4 w-4" />
                Atendimento via WhatsApp
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  )
}

