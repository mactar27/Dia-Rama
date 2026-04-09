import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-charcoal">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Haut de Gamme
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="block">{"Dia'Rama"}</span>
            <span className="mt-2 block text-2xl font-light text-gold-light sm:text-3xl lg:text-4xl">
              La beauté qui dit merci à votre peau
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            Découvrez notre collection exclusive de cosmétiques haut de gamme, 
            inspirés de la richesse et de la beauté naturelle africaine.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/boutique">
              <Button 
                size="lg" 
                className="w-full bg-gold text-charcoal hover:bg-gold-light sm:w-auto"
              >
                Découvrir la collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/a-propos">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                Notre histoire
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
