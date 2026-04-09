"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { products } from "@/lib/products"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { value: "all", label: "Tous les produits" },
  { value: "parfums", label: "Parfums" },
  { value: "deodorants", label: "Déodorants" },
  { value: "laits-corps", label: "Laits de Corps" },
]

const sortOptions = [
  { value: "popular", label: "Popularité" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "newest", label: "Nouveautés" },
  { value: "rating", label: "Meilleures notes" },
]

function BoutiqueContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "all"
  const initialFilter = searchParams.get("filter")

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState("popular")
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [showNewOnly, setShowNewOnly] = useState(initialFilter === "new")

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Filter by price
    result = result.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    // Filter new only
    if (showNewOnly) {
      result = result.filter(p => p.isNew)
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount)
    }

    return result
  }, [searchQuery, selectedCategory, sortBy, priceRange, showNewOnly])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSortBy("popular")
    setPriceRange([0, 100000])
    setShowNewOnly(false)
  }

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "all" ||
    priceRange[0] > 0 ||
    priceRange[1] < 100000 ||
    showNewOnly

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <Label className="text-sm font-semibold uppercase tracking-wider text-foreground">
          Catégories
        </Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={selectedCategory === cat.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.value)}
              className={cn(
                selectedCategory === cat.value &&
                  "bg-primary text-primary-foreground"
              )}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <Label className="text-sm font-semibold uppercase tracking-wider text-foreground">
          Prix
        </Label>
        <div className="mt-4 px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={100000}
            step={500}
            className="[&_[role=slider]]:bg-primary"
          />
          <div className="mt-2 flex justify-between text-sm text-muted-foreground">
            <span>{priceRange[0].toLocaleString()} F</span>
            <span>{priceRange[1].toLocaleString()} F</span>
          </div>
        </div>
      </div>

      {/* New only */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="showNew"
          checked={showNewOnly}
          onChange={(e) => setShowNewOnly(e.target.checked)}
          className="h-4 w-4 rounded border-input accent-primary"
        />
        <Label htmlFor="showNew" className="text-sm text-foreground cursor-pointer">
          Nouveautés uniquement
        </Label>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="w-full text-muted-foreground"
        >
          <X className="mr-2 h-4 w-4" />
          Effacer les filtres
        </Button>
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search and sort bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile filter button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filtres
                {hasActiveFilters && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    !
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background">
              <SheetHeader>
                <SheetTitle>Filtres</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FiltersContent />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <Label htmlFor="sort" className="hidden text-sm text-muted-foreground sm:block">
              Trier par:
            </Label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-8">
        {/* Desktop filters sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold text-foreground">Filtres</h2>
            <div className="mt-4">
              <FiltersContent />
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          <p className="mb-6 text-sm text-muted-foreground">
            {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} trouvé{filteredProducts.length !== 1 ? "s" : ""}
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                Aucun produit ne correspond à vos critères
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4"
              >
                Effacer les filtres
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BoutiquePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Page header */}
        <div className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Boutique
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Découvrez notre collection de cosmétiques haut de gamme
            </p>
          </div>
        </div>

        <Suspense fallback={<div className="flex justify-center py-20">Chargement...</div>}>
          <BoutiqueContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
