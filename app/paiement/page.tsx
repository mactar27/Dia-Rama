"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/context/cart-context"
import { toast } from "sonner"
import { CreditCard, Lock, ChevronLeft, Check } from "lucide-react"
import { formatPrice } from "@/lib/currency"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const shipping = total >= 30000 ? 0 : 3500
  const finalTotal = total + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsComplete(true)
    clearCart()
    toast.success("Commande confirmée !")
  }

  if (items.length === 0 && !isComplete) {
    router.push("/panier")
    return null
  }

  if (isComplete) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Merci pour votre commande !
            </h1>
            <p className="mt-2 text-muted-foreground">
              Votre commande a été confirmée. Vous recevrez un email de confirmation sous peu.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Numéro de commande : <span className="font-mono font-semibold">DR-{Date.now().toString().slice(-8)}</span>
            </p>
            <Link href="/boutique" className="mt-8 inline-block">
              <Button className="bg-primary text-primary-foreground">
                Continuer mes achats
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Link
              href="/panier"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Retour au panier
            </Link>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
              Paiement
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Checkout form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping information */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Informations de livraison
                  </h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" required className="mt-1" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required className="mt-1" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input id="address" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="city">Ville</Label>
                      <Input id="city" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Code postal</Label>
                      <Input id="postalCode" required className="mt-1" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" type="tel" className="mt-1" />
                    </div>
                  </div>
                </div>

                {/* Payment information */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Informations de paiement
                  </h2>
                  <div className="mt-4 rounded-lg border border-border p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      Paiement sécurisé SSL
                    </div>
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Numéro de carte</Label>
                        <div className="relative mt-1">
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            required
                            className="pl-10"
                          />
                          <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="expiry">Date {"d'expiration"}</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/AA"
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isProcessing}
                  className="w-full bg-primary text-primary-foreground"
                >
                  {isProcessing ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      Confirmer la commande ({formatPrice(finalTotal)})
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:col-span-5 lg:mt-0">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Votre commande
                </h2>

                <ul className="mt-4 divide-y divide-border">
                  {items.map((item) => (
                    <li key={item.product.id} className="flex gap-4 py-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="text-sm font-medium text-foreground">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qté: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>

                <dl className="mt-4 space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <dt className="text-muted-foreground">Sous-total</dt>
                    <dd className="font-medium text-foreground">
                      {formatPrice(total)}
                    </dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-muted-foreground">Livraison</dt>
                    <dd className="font-medium text-foreground">
                      {shipping === 0 ? (
                        <span className="text-green-600">Gratuite</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <dt className="text-base font-semibold text-foreground">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-foreground">
                      {formatPrice(finalTotal)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
