import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/home/hero"
import { Categories } from "@/components/home/categories"
import { FeaturedProducts } from "@/components/home/featured-products"
import { PromoBanner } from "@/components/home/promo-banner"
import { Testimonials } from "@/components/home/testimonials"
import { getBestSellers, getNewProducts } from "@/lib/products"

export default function HomePage() {
  const bestSellers = getBestSellers()
  const newProducts = getNewProducts()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <FeaturedProducts
          title="Best Sellers"
          subtitle="Nos produits les plus appréciés"
          products={bestSellers}
          viewAllHref="/boutique"
        />
        <PromoBanner />
        <FeaturedProducts
          title="Nouveautés"
          subtitle="Découvrez nos dernières créations"
          products={newProducts}
          viewAllHref="/boutique?filter=new"
        />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
