"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { formatPrice } from "@/lib/currency"

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const shipping = total >= 30000 ? 0 : 3500
  const finalTotal = total - discount + shipping

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "BIENVENUE20") {
      const discountAmount = total * 0.2
      setDiscount(discountAmount)
      toast.success("Code promo appliqué : -20%")
    } else {
      toast.error("Code promo invalide")
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Votre panier est vide
            </h1>
            <p className="mt-2 text-muted-foreground">
              Découvrez nos produits et commencez votre shopping
            </p>
            <Link href="/boutique" className="mt-6 inline-block">
              <Button className="bg-primary text-primary-foreground">
                Découvrir la boutique
                <ArrowRight className="ml-2 h-4 w-4" />
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
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Mon Panier
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {items.length} article{items.length !== 1 ? "s" : ""} dans votre panier
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Cart items */}
            <div className="lg:col-span-7">
              <ul className="divide-y divide-border">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-4 py-6">
                    <Link
                      href={`/produit/${item.product.slug}`}
                      className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-32 sm:w-32"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            href={`/produit/${item.product.slug}`}
                            className="font-semibold text-foreground hover:text-primary"
                          >
                            {item.product.name}
                          </Link>
                          <p className="mt-1 text-sm text-muted-foreground capitalize">
                            {item.product.category}
                          </p>
                        </div>
                        <p className="font-semibold text-foreground">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-input">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            removeItem(item.product.id)
                            toast.success("Article supprimé du panier")
                          }}
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <Link href="/boutique" className="mt-6 inline-flex items-center text-sm text-primary hover:underline">
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Continuer mes achats
              </Link>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:col-span-5 lg:mt-0">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Récapitulatif
                </h2>

                {/* Promo code */}
                <div className="mt-6">
                  <label
                    htmlFor="promo"
                    className="text-sm font-medium text-foreground"
                  >
                    Code promo
                  </label>
                  <div className="mt-2 flex gap-2">
                    <Input
                      id="promo"
                      placeholder="Entrez votre code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={handleApplyPromo}>
                      <Tag className="mr-2 h-4 w-4" />
                      Appliquer
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Essayez : BIENVENUE20
                  </p>
                </div>

                {/* Totals */}
                <dl className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Sous-total</dt>
                    <dd className="font-medium text-foreground">
                      {formatPrice(total)}
                    </dd>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <dt>Réduction (-20%)</dt>
                      <dd className="font-medium">-{formatPrice(discount)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Livraison</dt>
                    <dd className="font-medium text-foreground">
                      {shipping === 0 ? (
                        <span className="text-green-600">Gratuite</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </dd>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Livraison gratuite dès 30 000 FCFA {"d'achat"}
                    </p>
                  )}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <dt className="text-lg font-semibold text-foreground">
                        Total
                      </dt>
                      <dd className="text-lg font-bold text-foreground">
                        {formatPrice(finalTotal)}
                      </dd>
                    </div>
                  </div>
                </dl>

                <Link href="/paiement" className="mt-6 block">
                  <Button
                    size="lg"
                    className="w-full bg-primary text-primary-foreground"
                  >
                    Passer la commande
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span>Paiement sécurisé</span>
                  <span>|</span>
                  <span>Livraison rapide</span>
                  <span>|</span>
                  <span>Retour gratuit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
