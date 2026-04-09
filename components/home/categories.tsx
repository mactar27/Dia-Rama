import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    name: "Parfums",
    slug: "parfums",
    description: "Fragrances envoûtantes",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=800&fit=crop"
  },
  {
    name: "Déodorants",
    slug: "deodorants",
    description: "Protection naturelle",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=800&fit=crop"
  },
  {
    name: "Laits de Corps",
    slug: "laits-corps",
    description: "Hydratation luxueuse",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=800&fit=crop"
  }
]

export function Categories() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nos Catégories
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Explorez notre sélection de produits de beauté haut de gamme
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/boutique?category=${category.slug}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent transition-opacity group-hover:opacity-90" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="mt-1 text-sm text-white/70">{category.description}</p>
                <span className="mt-3 inline-block border-b border-gold text-sm text-gold transition-all group-hover:border-b-2">
                  Découvrir
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
