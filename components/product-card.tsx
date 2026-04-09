"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/lib/types"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/lib/currency"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    toast.success(`${product.name} ajouté au panier`)
  }

  return (
    <Link
      href={`/produit/${product.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg bg-card transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground">Nouveau</Badge>
          )}
          {product.isBestSeller && (
            <Badge variant="secondary" className="bg-charcoal text-white">
              Best Seller
            </Badge>
          )}
          {product.originalPrice && (
            <Badge variant="destructive">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>

        {/* Quick add */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-charcoal/90 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-gold text-charcoal hover:bg-gold-light"
            size="sm"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Ajouter au panier
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category}
        </p>
        <h3 className="mt-1 text-base font-semibold text-foreground line-clamp-2">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < Math.floor(product.rating)
                    ? "fill-gold text-gold"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto flex flex-col gap-1 pt-3">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
