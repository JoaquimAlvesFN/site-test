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
    template: '%s | SKY Pacotes',
    default: 'SKY Pacotes - A melhor programação para você',
  },
  description: 'Conheça as melhores ofertas e pacotes da SKY. Internet banda larga e TV por assinatura de qualidade.',
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
