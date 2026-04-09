"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, Twitter } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@diarama.com",
    href: "mailto:contact@diarama.com"
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+33 1 23 45 67 89",
    href: "tel:+33123456789"
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "123 Rue de la Beauté, 75001 Paris",
    href: null
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun-Ven: 9h-18h",
    href: null
  }
]

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" }
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    toast.success("Message envoyé avec succès ! Nous vous répondrons rapidement.")
    
    // Reset form
    const form = e.target as HTMLFormElement
    form.reset()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Contact
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Une question ? {"N'hésitez"} pas à nous contacter
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Envoyez-nous un message
              </h2>
              <p className="mt-2 text-muted-foreground">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Sujet</Label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="order">Question sur une commande</option>
                    <option value="product">Information produit</option>
                    <option value="return">Retour / Échange</option>
                    <option value="partnership">Partenariat</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Votre message..."
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Nos coordonnées
              </h2>
              <p className="mt-2 text-muted-foreground">
                Vous pouvez également nous joindre directement via ces moyens de contact.
              </p>

              <div className="mt-8 space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-primary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-10">
                <h3 className="font-semibold text-foreground">Suivez-nous</h3>
                <div className="mt-4 flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <social.icon className="h-5 w-5" />
                      <span className="sr-only">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ note */}
              <div className="mt-10 rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">
                  Questions fréquentes
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Consultez notre{" "}
                  <a href="/faq" className="text-primary hover:underline">
                    FAQ
                  </a>{" "}
                  pour trouver rapidement des réponses aux questions les plus courantes 
                  sur les commandes, la livraison et les retours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
