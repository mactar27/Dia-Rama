"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function AccountPage() {
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Connexion réussie !")
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Compte créé avec succès !")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Mon Compte
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Connectez-vous ou créez un compte pour accéder à vos commandes
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative mt-1">
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="votre@email.com"
                      required
                      className="pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="login-password">Mot de passe</Label>
                  <div className="relative mt-1">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      required
                      className="pl-10 pr-10"
                    />
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-input accent-primary"
                    />
                    Se souvenir de moi
                  </label>
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground"
                >
                  Se connecter
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="register-firstname">Prénom</Label>
                    <div className="relative mt-1">
                      <Input
                        id="register-firstname"
                        placeholder="Prénom"
                        required
                        className="pl-10"
                      />
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="register-lastname">Nom</Label>
                    <Input
                      id="register-lastname"
                      placeholder="Nom"
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative mt-1">
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="votre@email.com"
                      required
                      className="pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="register-password">Mot de passe</Label>
                  <div className="relative mt-1">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      required
                      className="pl-10 pr-10"
                    />
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    8 caractères minimum
                  </p>
                </div>
                <div>
                  <label className="flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 rounded border-input accent-primary"
                    />
                    <span className="text-muted-foreground">
                      {"J'accepte les"}{" "}
                      <a href="/cgv" className="text-primary hover:underline">
                        conditions générales de vente
                      </a>{" "}
                      et la{" "}
                      <a
                        href="/confidentialite"
                        className="text-primary hover:underline"
                      >
                        politique de confidentialité
                      </a>
                    </span>
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground"
                >
                  Créer mon compte
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
