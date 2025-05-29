"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DynamicLogo } from "@/components/dynamic-logo"
import { ContactModal } from "@/components/contact-modal"

export function InstitucionalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <DynamicLogo
              type="header"
              fallbackSrc="https://sjc.microlink.io/EVPkxg5JrNWxZNP9AWwi5KRkyc0EaklEAI0j6mP3BLANnvCK51AwejCcuTRPp1RtaCoUH-vI4pLeAn4KL4YmWQ.jpeg"
            />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-[#E30613]">
              Início
            </Link>
            {/* <Link href="#nossa-historia" className="text-sm font-medium transition-colors hover:text-[#E30613]">
              Nossa História
            </Link> */}
            <Link href="/institucional" className="text-sm font-medium text-[#E30613]">
              Institucional
            </Link>
            <Link href="/#tv-packages" className="text-sm font-medium transition-colors hover:text-[#E30613]">
              Pacotes
            </Link>
            <Link href="/#contact" className="text-sm font-medium transition-colors hover:text-[#E30613]">
              Contato
            </Link>
          </nav>
        </div>
        {/* <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center">
            <Phone className="h-4 w-4 text-[#E30613] mr-1" />
            <Link href="tel:08006004990" className="text-sm font-bold hover:text-[#E30613]">
              0800 600 4990
            </Link>
          </div>
          <ContactModal
            trigger={<Button className="bg-[#E30613] hover:bg-[#c00511] hidden md:flex">Fale Conosco</Button>}
            title="Fale Conosco"
            description="Preencha seus dados para entrar em contato com nossa equipe. Responderemos o mais breve possível."
          />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div> */}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-[#E30613] p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            {/* <Link
              href="#nossa-historia"
              className="text-sm font-medium transition-colors hover:text-[#E30613] p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Nossa História
            </Link> */}
            <Link
              href="/institucional"
              className="text-sm font-medium text-[#E30613] p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Institucional
            </Link>
            <Link
              href="/#tv-packages"
              className="text-sm font-medium transition-colors hover:text-[#E30613] p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pacotes
            </Link>
            {/* <Link
              href="/#contact"
              className="text-sm font-medium transition-colors hover:text-[#E30613] p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <div className="flex items-center p-2">
              <Phone className="h-4 w-4 text-[#E30613] mr-1" />
              <Link href="tel:08006004990" className="text-sm font-bold hover:text-[#E30613]">
                0800 600 4990
              </Link>
            </div>
            <ContactModal
              trigger={<Button className="bg-[#E30613] hover:bg-[#c00511] w-full">Fale Conosco</Button>}
              title="Fale Conosco"
              description="Preencha seus dados para entrar em contato com nossa equipe. Responderemos o mais breve possível."
            /> */}
          </nav>
        </div>
      )}
    </header>
  )
}

