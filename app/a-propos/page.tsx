import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Heart, Leaf, Sparkles, Users } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Gratitude",
    description: "Dia'Rama signifie 'merci' en wolof. Chaque produit est créé avec reconnaissance envers la nature et nos clientes."
  },
  {
    icon: Leaf,
    title: "Naturel",
    description: "Nos formules sont enrichies d'ingrédients naturels africains : beurre de karité, huile d'argan, baobab et bien plus."
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description: "Nous nous engageons à offrir des produits de la plus haute qualité, avec des textures luxueuses et des parfums envoûtants."
  },
  {
    icon: Users,
    title: "Diversité",
    description: "Nos produits sont conçus pour célébrer et sublimer la beauté de toutes les peaux, dans toute leur diversité."
  }
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-charcoal py-20 lg:py-32">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1920&q=80')"
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gold">
              Notre Histoire
            </p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {"Dia'Rama"}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-white/80">
              La beauté qui dit merci à votre peau
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80"
                  alt="L'histoire de Dia'Rama"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                  {"L'origine du nom"}
                </h2>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
                  <p>
                    <strong className="text-foreground">{"Dia'Rama"}</strong> est un nom porteur de sens et {"d'émotion"}. 
                    Il naît de la fusion de deux prénoms chers : <strong className="text-gold">Dia</strong>, 
                    le nom du père, et <strong className="text-gold">Rama</strong>, le nom de la mère.
                  </p>
                  <p>
                    Ce nom trouve également ses racines dans le <strong>wolof</strong>, 
                    une des langues les plus parlées au Sénégal, où il évoque la <strong>gratitude</strong> et 
                    le <strong>remerciement</strong>. {"'Jërëjëf'"} signifie {"'merci'"} en wolof, 
                    et {"Dia'Rama"} en capture toute {"l'essence"}.
                  </p>
                  <p>
                    Ainsi, chaque produit {"Dia'Rama"} est une expression de reconnaissance : 
                    envers nos racines, envers la nature qui nous offre ses trésors, 
                    et envers vous, qui nous faites confiance pour prendre soin de votre beauté.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Nos Valeurs
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Les principes qui guident chacune de nos créations
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-xl bg-card p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                  Notre Mission
                </h2>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
                  <p>
                    Chez {"Dia'Rama"}, nous croyons que la beauté est un acte {"d'amour"} envers soi-même. 
                    Notre mission est de créer des cosmétiques qui célèbrent la richesse de la beauté africaine 
                    tout en offrant une qualité haut de gamme.
                  </p>
                  <p>
                    Chaque formule est soigneusement élaborée pour nourrir, protéger et sublimer votre peau 
                    avec des ingrédients naturels précieux issus du continent africain.
                  </p>
                  <p>
                    Nous nous engageons à proposer des produits éthiques, respectueux de {"l'environnement"}, 
                    et accessibles à toutes celles qui souhaitent prendre soin {"d'elles"} avec élégance.
                  </p>
                </div>
              </div>
              <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-xl lg:order-2">
                <Image
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
                  alt="Notre mission"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-charcoal py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Prête à découvrir {"Dia'Rama"} ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
              Explorez notre collection et offrez à votre peau le soin {"qu'elle"} mérite.
            </p>
            <a
              href="/boutique"
              className="mt-8 inline-flex items-center justify-center rounded-md bg-gold px-8 py-3 text-base font-medium text-charcoal transition-colors hover:bg-gold-light"
            >
              Découvrir la boutique
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
