import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook } from "lucide-react"

const TikTok = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

const footerLinks = {
  boutique: [
    { name: "Visage", href: "/boutique?category=visage" },
    { name: "Maquillage", href: "/boutique?category=maquillage" },
    { name: "Cheveux", href: "/boutique?category=cheveux" },
    { name: "Parfums", href: "/boutique?category=parfums" },
  ],
  informations: [
    { name: "À Propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Livraison", href: "/livraison" },
  ],
  legal: [
    { name: "Mentions Légales", href: "/mentions-legales" },
    { name: "CGV", href: "/cgv" },
    { name: "Politique de Confidentialité", href: "/confidentialite" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Dia'Rama"
                width={160}
                height={60}
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              La beauté qui dit merci à votre peau. Cosmétiques haut de gamme inspirés de la richesse africaine.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-gold"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/share/1ArkWpozQ6/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-gold"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://www.tiktok.com/@diarama.cosmetiques"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-gold"
              >
                <TikTok className="h-5 w-5" />
                <span className="sr-only">TikTok</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
                Boutique
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.boutique.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-gold"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
                Informations
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.informations.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-gold"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
                Légal
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-gold"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-white/70">
              Inscrivez-vous pour recevoir nos offres exclusives et nouveautés.
            </p>
            <form className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Votre email"
                className="border-white/20 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-gold"
              />
              <Button className="bg-gold text-charcoal hover:bg-gold-light">
                {"S'inscrire"}
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-white/50">
            &copy; {new Date().getFullYear()} {"Dia'Rama"}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
