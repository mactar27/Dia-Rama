export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: "parfums" | "deodorants" | "laits-corps"
  tags: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  isNew?: boolean
  isBestSeller?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Review {
  id: string
  productId: string
  author: string
  rating: number
  comment: string
  date: string
}
