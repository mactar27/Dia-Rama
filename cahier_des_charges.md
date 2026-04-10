# Cahier des Charges - Projet Dia-Rama

## 1. Présentation du Projet
**Dia-Rama** est une plateforme e-commerce dédiée à la vente de cosmétiques haut de gamme inspirés de la richesse africaine. Le projet vise à offrir une expérience utilisateur premium, fluide et sécurisée pour la découverte et l'achat de produits de beauté (Parfums, Déodorants, Laits de Corps).

### Objectifs :
- Proposer un catalogue de produits structuré et facile à naviguer.
- Offrir un tunnel d'achat optimisé (panier, paiement).
- Créer une identité de marque forte à travers un design élégant et moderne.
- Assurer une gestion efficace des stocks et des commandes via une base de données performante.

---

## 2. Analyse Fonctionnelle

### 2.1. Front-Office (Utilisateurs)
- **Page d'Accueil** : Mise en avant de la proposition de valeur, des catégories principales et des produits phares/nouveautés. Intégration d'une newsletter.
- **Boutique (Catalogue)** :
    - Recherche textuelle de produits.
    - Filtrage par catégories (Parfums, Déodorants, Laits de Corps).
    - Tri (Prix, Nouveautés, Popularité, Notes).
    - Filtrage par plage de prix.
- **Fiche Produit** : Description détaillée, caractéristiques techniques (ex: format 75ml), avis clients, indication de stock et produits similaires.
- **Panier** : Gestion dynamique des produits, calcul automatique des sous-totaux et frais de livraison.
- **Tunnel de Commande (Checkout)** : Saisie des informations de livraison, choix du mode de paiement et récapitulatif avant validation.
- **Espace Compte** : Historique des commandes, gestion des informations personnelles et liste de souhaits (Wishlist).

### 2.2. Back-End & Data
- **Gestion des Produits** : CRUD complet sur les produits et catégories.
- **Gestion des Commandes** : Suivi des statuts (Paiement en attente, Confirmé, Expédié, Livré).
- **Gestion des Avis** : Collecte et modération des commentaires clients.
- **Codes Promos** : Système de réduction (pourcentage ou montant fixe) avec critères d'activation.

---

## 3. Spécifications Techniques

### Stack Technologique :
- **Framework** : Next.js 15+ (App Router) pour les performances SSR/ISR.
- **Langage** : TypeScript pour la robustesse du code.
- **Styling** : Tailwind CSS pour un design responsive et moderne.
- **Icônes** : Lucide React.
- **Base de Données** : MySQL (déployé sur TiDB ou équivalent) pour la persistance des données.
- **ORM / Query Builder** : `mysql2/promise` pour les interactions directes.
- **Déploiement** : Vercel pour une intégration continue optimisée.

### Architecture des Données :
Le schéma SQL repose sur les entités suivantes :
- `categories` : Structuration du catalogue.
- `products` : Informations détaillées, prix et médias.
- `users` : Profils clients et authentification.
- `orders` & `order_items` : Journalisation des ventes.
- `reviews` : Preuve sociale.
- `promo_codes` : Leviers marketing.

---

## 4. Design & Expérience Utilisateur (UX)

### Charte Graphique (Aesthetics) :
> [!NOTE]
> Conformément à la demande, les codes couleurs ne sont pas détaillés ici, mais le design doit rester dans une esthétique **Premium** et **Minimaliste**.

- **Typographie** : Utilisation de polices modernes et lisibles (type Inter, Playfair Display ou équivalent pour les titres).
- **Iconographie** : Style filaire élégant (Lucide Icons).
- **Composants UI** : Utilisation de composants inspirés de Shadcn UI pour une cohérence globale (Modales, Boutons, Input, Drawer).
- **Micro-animations** : Transitions douces lors du survol des cartes produits et lors de la navigation entre les pages.

---

## 5. SEO & Performance
- **Optimisation SEO** : Meta-descriptions dynamiques, balises Hn structurées, images optimisées au format WebP/Next Image.
- **Performance** : Score Lighthouse visé > 90. Utilisation du Lazy Loading pour les images et composants non critiques.
- **Responsivité** : Expérience "Mobile-First" avec menus adaptés et tactile-friendly.

---

## 6. Réseaux Sociaux & Marketing
- Intégration de liens directs vers :
    - **Instagram**
    - **Facebook**
    - **TikTok**
- Système de newsletter pour la fidélisation client.
- Support des codes promotionnels (ex: BIENVENUE20).
