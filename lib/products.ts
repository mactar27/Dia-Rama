import { Product, Review } from "./types"

export const products: Product[] = [
  // PARFUMS
  {
    id: "p1",
    name: "Suddenly Femelle",
    slug: "suddenly-femelle",
    description: "Eau de parfum pour femme Suddenly Femelle de la marque Lidl, flacon de 75 ml. Une fragrance élégante et envoûtante.",
    price: 5000,
    image: "/suddenly-femelle.jpeg",
    category: "parfums",
    tags: ["parfum", "féminin", "luxe"],
    rating: 4.8,
    reviewCount: 45,
    inStock: true,
    isNew: true,
    isBestSeller: true
  },
  {
    id: "p2",
    name: "Suddenly Mystique Original",
    slug: "suddenly-mystique",
    description: "Eau de parfum Suddenly Mystique Original de Lidl, 75 ml. Une fragrance sophistiquée aux notes orientales.",
    price: 5000,
    image: "/suddenly-mystique.jpeg",
    category: "parfums",
    tags: ["parfum", "mystique", "oriental"],
    rating: 4.7,
    reviewCount: 32,
    inStock: true,
    isNew: false,
    isBestSeller: true
  },

  // DÉODORANTS
  {
    id: "d1",
    name: "Dove Men+Care Cool Fresh",
    slug: "dove-men",
    description: "Déodorant spray anti-transpirant Dove Men+Care Cool Fresh. Protection efficace 48h pour les hommes actifs.",
    price: 8500,
    image: "/dove-men.jpeg",
    category: "deodorants",
    tags: ["déodorant", "homme", "fraîcheur"],
    rating: 4.6,
    reviewCount: 120,
    inStock: true,
    isNew: false,
    isBestSeller: true
  },
  {
    id: "d2",
    name: "Déodorant Spray Dove - Gamme Femme",
    slug: "dove-women",
    description: "Gamme de déodorants en spray Dove pour femme comprenant les modèles Original, Mineral Touch, Go Fresh et Sensitive.",
    price: 2000,
    image: "/dove-women.jpeg",
    category: "deodorants",
    tags: ["déodorant", "femme", "douceur"],
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    isNew: true,
    isBestSeller: false
  },

  // LAITS DE CORPS
  {
    id: "l1",
    name: "Mixa Expert Peau Sensible Lait Céramide Protection",
    slug: "mixa-corps",
    description: "Lait hydratant pour le corps, idéal pour les peaux sèches. Restaure la barrière cutanée.",
    price: 18000,
    image: "/mixa-corps.jpeg",
    category: "laits-corps",
    tags: ["lait", "hydratation", "mixa"],
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    isNew: false,
    isBestSeller: true
  },
  {
    id: "l2",
    name: "Lait corporel Mixa Niacinamide Bright",
    slug: "mixa-lait-corps",
    description: "Lait corporel enrichi pour une hydratation intense et durable.",
    price: 6000,
    image: "/mixa-lait-corps.jpeg",
    category: "laits-corps",
    tags: ["lait", "corps", "soin"],
    rating: 4.5,
    reviewCount: 67,
    inStock: true,
    isNew: true,
    isBestSeller: false
  },
  {
    id: "l3",
    name: "Lait corporel Mixa Panthénol Confort",
    slug: "mixa-lait",
    description: "Une formule légère qui pénètre rapidement sans laisser de film gras.",
    price: 18000,
    image: "/mixa-lait.jpeg",
    category: "laits-corps",
    tags: ["lait", "léger", "frais"],
    rating: 4.6,
    reviewCount: 94,
    inStock: true,
    isNew: false,
    isBestSeller: false
  },
  {
    id: "l4",
    name: "Mixa Expert Peau Sensible Crème Niacinamide Correction Éclat",
    slug: "mixa-peau",
    description: "Soin spécialisé pour les peaux sensibles, recommandé par les dermatologues.",
    price: 8500,
    image: "/mixa-peau.jpeg",
    category: "laits-corps",
    tags: ["lait", "sensible", "doux"],
    rating: 4.9,
    reviewCount: 112,
    inStock: true,
    isNew: false,
    isBestSeller: true
  },
  {
    id: "l5",
    name: "Lait corporel Mixa Urea Cica Repair+",
    slug: "mixa-urea",
    description: "Enrichi en urée pour exfolier en douceur et hydrater les peaux très rugueuses.",
    price: 6000,
    image: "/mixa-urea.jpeg",
    category: "laits-corps",
    tags: ["lait", "urée", "exfoliant"],
    rating: 4.8,
    reviewCount: 78,
    inStock: true,
    isNew: true,
    isBestSeller: false
  },
  {
    id: "l6",
    name: "Sérum Concentré Anti-Imperfections Mixa Expert Peau Sensible",
    slug: "mixa",
    description: "Sérum concentré pour réduire les imperfections et affiner le grain de peau.",
    price: 9000,
    image: "/mixa.jpeg",
    category: "laits-corps",
    tags: ["crème", "famille", "polyvalent"],
    rating: 4.7,
    reviewCount: 204,
    inStock: true,
    isNew: false,
    isBestSeller: true
  },
  {
    id: "l7",
    name: "Déodorant à bille Nivea - Gamme Femme",
    slug: "nivea",
    description: "Protection anti-transpirante 48h. Gamme variée : Invisible for Black & White, Powder Touch, Fresh Natural, et Protect & Care.",
    price: 8500,
    image: "/nivea.jpeg",
    category: "deodorants",
    tags: ["déodorant", "nivea", "femme", "protection"],
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
    isNew: false,
    isBestSeller: true
  },
  {
    id: "l8",
    name: "Mixa Expert Peau Sensible Crème Urea Cica Repair+",
    slug: "mixa-creme-urea",
    description: "Crème réparatrice intense enrichie en urée pour les peaux très sèches et rugueuses.",
    price: 8500,
    image: "/mixa-creme-urea.jpeg",
    category: "laits-corps",
    tags: ["crème", "urea", "mixa", "réparation"],
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    isNew: true,
    isBestSeller: false
  }
]

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "p1",
    author: "Aminata D.",
    rating: 5,
    comment: "Ce parfum est incroyable ! Les notes de santal sont magnifiques. Je reçois des compliments tout le temps.",
    date: "2024-01-15"
  },
  {
    id: "r2",
    productId: "p1",
    author: "Fatou S.",
    rating: 5,
    comment: "Un parfum qui tient toute la journée. Élégant et raffiné, exactement ce que je cherchais.",
    date: "2024-01-10"
  },
  {
    id: "r3",
    productId: "l1",
    author: "Marie K.",
    rating: 5,
    comment: "Ce lait de corps est une merveille ! Ma peau n'a jamais été aussi douce.",
    date: "2024-01-05"
  },
  {
    id: "r4",
    productId: "d1",
    author: "Aïcha M.",
    rating: 5,
    comment: "Enfin un déodorant naturel qui fonctionne vraiment ! Je ne reviens plus en arrière.",
    date: "2024-01-12"
  },
  {
    id: "r5",
    productId: "l1",
    author: "Ndeye B.",
    rating: 5,
    comment: "Le meilleur lait de corps que j'ai utilisé. Le parfum est subtil et l'hydratation dure toute la journée.",
    date: "2024-01-08"
  }
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products
  return products.filter(p => p.category === category)
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.isBestSeller)
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew)
}

export function getProductReviews(productId: string): Review[] {
  return reviews.filter(r => r.productId === productId)
}
