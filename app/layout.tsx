import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { AuthProvider } from '@/lib/auth-context'
import { ReactQueryProvider } from '@/lib/react-query-provider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Ligcel SKY',
    default: 'Ligcel SKY - TV por Assinatura, Pacotes e Canais | Revendedor Autorizado',
  },
  description: 'Assine SKY com a Ligcel: TV por assinatura com os melhores pacotes, canais em HD, filmes e séries. Revendedor autorizado com preços especiais e atendimento personalizado.',
  keywords: 'sky, tv por assinatura, pacotes sky, canais hd, filmes, séries, revendedor autorizado sky, Ligcel sky',
  authors: [{ name: 'Ligcel SKY' }],
  creator: 'Ligcel SKY',
  publisher: 'Ligcel SKY',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Ligcel SKY - TV por Assinatura, Pacotes e Canais | Revendedor Autorizado',
    description: 'Assine SKY com a Ligcel: TV por assinatura com os melhores pacotes, canais em HD, filmes e séries. Revendedor autorizado com preços especiais e atendimento personalizado.',
    type: 'website',
    locale: 'pt_BR',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-white font-sans antialiased', fontSans.variable)}>
        <AuthProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
