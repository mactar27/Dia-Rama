"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product-card"
import { getProductBySlug, getProductReviews, products } from "@/lib/products"
import { useCart } from "@/context/cart-context"
import { toast } from "sonner"
import { Star, Minus, Plus, ShoppingBag, Heart, Truck, Shield, RotateCcw, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/currency"

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = use(params)
  const product = getProductBySlug(resolvedParams.slug)
  
  if (!product) {
    notFound()
  }

  const reviews = getProductReviews(product.id)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ProductContent product={product} reviews={reviews} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </div>
  )
}

function ProductContent({ product, reviews, relatedProducts }: {
  product: NonNullable<ReturnType<typeof getProductBySlug>>
  reviews: ReturnType<typeof getProductReviews>
  relatedProducts: typeof products
}) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success(`${product.name} ajouté au panier`)
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/boutique" className="hover:text-foreground">
              Boutique
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href={`/boutique?category=${product.category}`}
              className="capitalize hover:text-foreground"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product details */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.isNew && (
              <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
                Nouveau
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge
                variant="secondary"
                className="absolute left-4 top-14 bg-charcoal text-white"
              >
                Best Seller
              </Badge>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating)
                        ? "fill-gold text-gold"
                        : "fill-muted text-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} avis)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-bold text-foreground sm:text-3xl">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through sm:text-xl">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="destructive">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-foreground/80 leading-relaxed">
              {product.description}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Quantity and add to cart */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <div className="flex items-center rounded-md border border-input">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Ajouter au panier
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Ajouter aux favoris</span>
              </Button>
            </div>

            {/* Features */}
            <div className="mt-8 grid gap-4 rounded-lg border border-border p-4 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-secondary p-2">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Livraison gratuite</p>
                  <p className="text-xs text-muted-foreground">Dès 30 000 FCFA</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-secondary p-2">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Paiement sécurisé</p>
                  <p className="text-xs text-muted-foreground">SSL 256 bits</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-secondary p-2">
                  <RotateCcw className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Retour gratuit</p>
                  <p className="text-xs text-muted-foreground">Sous 30 jours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground">Avis clients</h2>
            <div className="mt-6 space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                        {review.author[0]}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{review.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < review.rating
                              ? "fill-gold text-gold"
                              : "fill-muted text-muted"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-foreground/80">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground">
              Vous aimerez aussi
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
