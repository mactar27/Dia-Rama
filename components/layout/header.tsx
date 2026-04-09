"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Search, ShoppingBag, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/context/cart-context"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Boutique", href: "/boutique" },
  { name: "À Propos", href: "/a-propos" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const { itemCount } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background">
              <nav className="mt-8 flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Dia'Rama"
              width={140}
              height={50}
              className="h-10 w-auto lg:h-12"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden sm:block">
              <div
                className={cn(
                  "flex items-center overflow-hidden transition-all duration-300",
                  isSearchOpen ? "w-48 lg:w-64" : "w-9"
                )}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="shrink-0 text-foreground"
                >
                  {isSearchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                  <span className="sr-only">Rechercher</span>
                </Button>
                {isSearchOpen && (
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    className="h-9 border-0 bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary"
                  />
                )}
              </div>
            </div>

            {/* Account */}
            <Link href="/compte">
              <Button variant="ghost" size="icon" className="text-foreground">
                <User className="h-4 w-4" />
                <span className="sr-only">Mon compte</span>
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/panier" className="relative">
              <Button variant="ghost" size="icon" className="text-foreground">
                <ShoppingBag className="h-4 w-4" />
                <span className="sr-only">Panier</span>
              </Button>
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
