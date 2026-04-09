export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-SN", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + " FCFA"
}

export function formatPriceShort(price: number): string {
  return price.toLocaleString("fr-SN") + " F"
}
