-- Dia'Rama Database Schema for MySQL / TiDB

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS wishlists;
DROP TABLE IF EXISTS promo_codes;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
SET FOREIGN_KEY_CHECKS = 1;

-- Table des catégories
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des produits
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  image VARCHAR(500),
  category_id VARCHAR(36),
  tags JSON,
  rating DECIMAL(2, 1) DEFAULT 0,
  review_count INT DEFAULT 0,
  in_stock BOOLEAN DEFAULT TRUE,
  is_new BOOLEAN DEFAULT FALSE,
  is_best_seller BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Sénégal',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des commandes
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36),
  status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping DECIMAL(10, 2) DEFAULT 0,
  discount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  promo_code VARCHAR(50),
  shipping_address TEXT,
  billing_address TEXT,
  payment_method VARCHAR(50),
  payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Table des articles de commande
CREATE TABLE IF NOT EXISTS order_items (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  order_id VARCHAR(36) NOT NULL,
  product_id VARCHAR(36),
  product_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Table des avis
CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  product_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36),
  author VARCHAR(100) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Table des codes promo
CREATE TABLE IF NOT EXISTS promo_codes (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_type ENUM('percentage', 'fixed') NOT NULL,
  discount_value DECIMAL(10, 2) NOT NULL,
  min_order_amount DECIMAL(10, 2) DEFAULT 0,
  max_uses INT,
  used_count INT DEFAULT 0,
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table de la wishlist
CREATE TABLE IF NOT EXISTS wishlists (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL,
  product_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_wishlist (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Index pour améliorer les performances
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_users_email ON users(email);

-- Insérer les catégories par défaut
INSERT INTO categories (id, name, slug, description, image) VALUES
('cat-parfums', 'Parfums', 'parfums', 'Fragrances envoûtantes', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=800&fit=crop'),
('cat-deodorants', 'Déodorants', 'deodorants', 'Protection naturelle', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=800&fit=crop'),
('cat-laits', 'Laits de Corps', 'laits-corps', 'Hydratation luxueuse', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=800&fit=crop')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insérer le code promo de bienvenue
INSERT INTO promo_codes (code, discount_type, discount_value, is_active) VALUES
('BIENVENUE20', 'percentage', 20, TRUE)
ON DUPLICATE KEY UPDATE discount_value = VALUES(discount_value);

-- Insérer les produits par défaut
INSERT INTO products (id, name, slug, description, price, image, category_id, is_new, is_best_seller) VALUES
('p1', 'Suddenly Femelle', 'suddenly-femelle', 'Eau de parfum Suddenly Femelle de Lidl, 75 ml. Fragrance élégante.', 55000, '/suddenly-femelle.jpeg', 'cat-parfums', TRUE, TRUE),
('p2', 'Suddenly Mystique Original', 'suddenly-mystique', 'Eau de parfum Suddenly Mystique Original de Lidl, 75 ml.', 55000, '/suddenly-mystique.jpeg', 'cat-parfums', FALSE, TRUE),
('d1', 'Dove Men', 'dove-men', 'Protection efficace 48h pour les hommes actifs.', 8500, '/dove-men.jpeg', 'cat-deodorants', FALSE, TRUE),
('d2', 'Dove Women', 'dove-women', 'Douceur et protection pour une sensation de fraîcheur toute la journée.', 8500, '/dove-women.jpeg', 'cat-deodorants', TRUE, FALSE),
('l1', 'Mixa Expert Peau Sensible Lait Céramide Protection', 'mixa-corps', 'Lait hydratant pour le corps, idéal pour les peaux sèches.', 18000, '/mixa-corps.jpeg', 'cat-laits', FALSE, TRUE),
('l2', 'Lait corporel Mixa Niacinamide Bright', 'mixa-lait-corps', 'Lait corporel enrichi pour une hydratation intense et durable.', 18000, '/mixa-lait-corps.jpeg', 'cat-laits', TRUE, FALSE),
('l3', 'Lait corporel Mixa Panthénol Confort', 'mixa-lait', 'Une formule légère qui pénètre rapidement sans laisser de film gras.', 18000, '/mixa-lait.jpeg', 'cat-laits', FALSE, FALSE),
('l4', 'Mixa Expert Peau Sensible Crème Niacinamide Correction Éclat', 'mixa-peau', 'Soin spécialisé pour les peaux sensibles.', 18000, '/mixa-peau.jpeg', 'cat-laits', FALSE, TRUE),
('l5', 'Lait corporel Mixa Urea Cica Repair+', 'mixa-urea', 'Enrichi en urée pour exfolier en douceur.', 18000, '/mixa-urea.jpeg', 'cat-laits', TRUE, FALSE),
('l6', 'Sérum Concentré Anti-Imperfections Mixa Expert Peau Sensible', 'mixa', 'Sérum concentré pour réduire les imperfections et affiner le grain de peau.', 18000, '/mixa.jpeg', 'cat-laits', FALSE, TRUE),
('l7', 'Déodorant à bille Nivea - Gamme Femme', 'nivea', 'Protection anti-transpirante 48h. Gamme variée : Invisible B&W, Powder Touch, Fresh Natural.', 8500, '/nivea.jpeg', 'cat-deodorants', FALSE, TRUE)
ON DUPLICATE KEY UPDATE name = VALUES(name), price = VALUES(price), image = VALUES(image), category_id = VALUES(category_id);
