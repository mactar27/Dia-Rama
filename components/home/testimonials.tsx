import { Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    author: "Aminata D.",
    location: "Paris, France",
    rating: 5,
    content: "Les produits Dia'Rama ont transformé ma routine beauté. Ma peau n'a jamais été aussi radieuse et hydratée. Je recommande à toutes mes amies !",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    author: "Fatou S.",
    location: "Dakar, Sénégal",
    rating: 5,
    content: "Enfin des cosmétiques qui comprennent les besoins de ma peau. La qualité est exceptionnelle et les parfums sont divins. Merci Dia'Rama !",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    author: "Marie K.",
    location: "Abidjan, Côte d'Ivoire",
    rating: 5,
    content: "Le sérum vitamine C est mon produit préféré. En quelques semaines, mes taches ont diminué et mon teint est plus uniforme. Une vraie révélation !",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  }
]

export function Testimonials() {
  return (
    <section className="bg-secondary/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ce que disent nos clientes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Découvrez les témoignages de celles qui ont adopté Dia&apos;Rama
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative rounded-xl bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-gold/20" />
              
              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < testimonial.rating
                        ? "fill-gold text-gold"
                        : "fill-muted text-muted"
                    )}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="mt-4 text-foreground/80 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
