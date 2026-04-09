import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PromoBanner() {
  return (
    <section className="bg-gradient-to-r from-charcoal to-charcoal-light py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Offre Spéciale
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            -20% sur votre première commande
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/70">
            Utilisez le code <span className="font-bold text-gold">BIENVENUE20</span> lors de votre passage en caisse
          </p>
          <Link href="/boutique" className="mt-8">
            <Button 
              size="lg" 
              className="bg-gold text-charcoal hover:bg-gold-light"
            >
              Profiter de {"l'offre"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
