import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { Product } from "@/lib/types"

interface FeaturedProductsProps {
  title: string
  subtitle?: string
  products: Product[]
  viewAllHref?: string
  viewAllLabel?: string
}

export function FeaturedProducts({
  title,
  subtitle,
  products,
  viewAllHref,
  viewAllLabel = "Voir tout"
}: FeaturedProductsProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {viewAllHref && (
            <Link href={viewAllHref} className="hidden sm:block">
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                {viewAllLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {viewAllHref && (
          <div className="mt-10 text-center sm:hidden">
            <Link href={viewAllHref}>
              <Button variant="outline" className="w-full">
                {viewAllLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
