import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/context/cart-context'
import { Toaster } from '@/components/ui/sonner'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant"
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat"
});

export const metadata: Metadata = {
  title: "Dia'Rama | Haut de Gamme - Cosmétiques de Luxe Africains",
  description: "Dia'Rama - La beauté qui dit merci à votre peau. Découvrez notre collection de cosmétiques haut de gamme inspirés de la beauté africaine.",
  keywords: ["cosmétiques", "beauté africaine", "soins de la peau", "maquillage", "luxe", "naturel"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${cormorant.variable} ${montserrat.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
