# Nouveau Projet Photographe - Plan Complet

## 🎯 Objectif
Créer un nouveau site de photographe de zéro en gardant le même look and feel, avec une architecture moderne et un backoffice fonctionnel.

## 📊 Analyse de l'existant (à conserver)

### Design et UX réussis
- **Header/Footer** : Navigation claire et élégante
- **Page Home** : Slider hero avec présentation, section à propos
- **Page Galerie** : Grid d'albums avec filtres par catégorie
- **Page Album Detail** : Lightbox avec navigation, grid responsive
- **Page Contact** : Formulaire avec EmailJS
- **Style** : Design moderne, typographie soignée, animations fluides

### Structure technique actuelle
```
client/src/
├── App.js                 # Router principal
├── components/
│   ├── Home.js           # Page d'accueil avec slider
│   ├── Gallery.js        # Liste des albums
│   ├── AlbumDetail.js    # Détail d'un album
│   ├── Contact.js        # Formulaire de contact
│   └── About.js          # Page à propos
├── data/
│   └── albums.js         # Données statiques
└── styles/               # CSS par composant
```

## 🏗️ Nouvelle Architecture

### Stack technique
- **Frontend** : React 18 + React Router
- **Backend** : Vercel Functions (Node.js)
- **Base de données** : JSON dynamique (évolutif vers DB)
- **Images** : Cloudinary
- **Hosting** : Vercel
- **Authentification** : JWT

### Structure du nouveau projet
```
photographe-v2/
├── src/                          # Frontend React
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.js         # Navigation
│   │   │   ├── Footer.js         # Pied de page
│   │   │   └── Layout.js         # Wrapper commun
│   │   ├── pages/
│   │   │   ├── Home.js           # Page d'accueil
│   │   │   ├── Gallery.js        # Liste albums
│   │   │   ├── AlbumDetail.js    # Détail album
│   │   │   └── Contact.js        # Contact
│   │   ├── admin/
│   │   │   ├── AdminLogin.js     # Connexion admin
│   │   │   ├── AdminDashboard.js # Dashboard
│   │   │   ├── AlbumForm.js      # Création/édition album
│   │   │   └── PhotoUpload.js    # Upload photos
│   │   └── common/
│   │       ├── Lightbox.js       # Composant lightbox
│   │       └── ImageGrid.js      # Grid responsive
│   ├── hooks/
│   │   ├── useAlbums.js          # Hook pour albums
│   │   └── useAuth.js            # Hook authentification
│   ├── services/
│   │   ├── api.js                # Appels API
│   │   └── cloudinary.js         # Upload images
│   ├── styles/
│   │   ├── globals.css           # Styles globaux
│   │   └── components/           # Styles par composant
│   └── utils/
│       └── constants.js          # Constantes
├── api/                          # Vercel Functions
│   ├── auth/
│   │   └── login.js              # Authentification
│   ├── albums/
│   │   ├── index.js              # CRUD albums
│   │   └── [id].js               # Album spécifique
│   ├── photos/
│   │   └── upload.js             # Upload Cloudinary
│   └── data/
│       └── albums.json           # Données JSON
├── public/                       # Assets statiques
├── vercel.json                   # Configuration Vercel
└── package.json                  # Dépendances
```

## 📋 Spécifications détaillées

### 1. Pages principales

#### Page Home
- **Hero Section** : Slider avec 4-5 photos représentatives
- **Présentation** : Section "À propos" avec photo du photographe
- **Call-to-Action** : Bouton vers contact/galerie
- **Design** : Reprendre le style existant

#### Page Galerie
- **Grid d'albums** : Chaque album avec :
  - Photo thumbnail (coverImage)
  - Titre
  - Description courte
  - Nombre de photos
  - Catégorie
- **Filtres** : Par catégorie (Portraits, Paysages, Concerts, etc.)
- **Responsive** : Grid adaptative

#### Page Album Detail
- **Header** : Titre, description, bouton retour
- **Grid photos** : Masonry ou grid régulière
- **Lightbox** : Navigation clavier/souris
- **Responsive** : Optimisé mobile

#### Page Contact
- **Formulaire** : Nom, email, message
- **Envoi** : EmailJS ou API Vercel
- **Validation** : Côté client et serveur

### 2. Backoffice Administration

#### Dashboard
- **Statistiques** : Nombre d'albums, photos, vues
- **Actions rapides** : Créer album, ajouter photos
- **Liste albums** : Avec actions (éditer, supprimer)

#### Gestion Albums
- **Création** : Titre, description, catégorie, cover
- **Édition** : Modification des métadonnées
- **Suppression** : Avec confirmation

#### Gestion Photos
- **Upload** : Drag & drop vers Cloudinary
- **Organisation** : Ordre, titres, descriptions
- **Suppression** : Avec confirmation

### 3. API Backend

#### Endpoints
```
GET    /api/albums           # Liste des albums
GET    /api/albums/:id       # Album spécifique
POST   /api/albums           # Créer album
PUT    /api/albums/:id       # Modifier album
DELETE /api/albums/:id       # Supprimer album

POST   /api/photos/upload    # Upload vers Cloudinary
POST   /api/auth/login       # Authentification
GET    /api/auth/verify      # Vérifier token
```

#### Structure données
```json
{
  "albums": [
    {
      "id": "album-1",
      "title": "Portraits Clara",
      "description": "Séance portrait au jardin",
      "category": "portraits",
      "coverImage": "https://cloudinary.com/...",
      "photos": [
        {
          "id": "photo-1",
          "src": "https://cloudinary.com/...",
          "title": "Photo 1",
          "description": "Description",
          "order": 1
        }
      ],
      "createdAt": "2025-01-01",
      "updatedAt": "2025-01-01"
    }
  ]
}
```

## 🎨 Design System (à reprendre)

### Couleurs
- **Primaire** : Noir/Blanc (élégant)
- **Accent** : Gris subtils
- **Hover** : Transitions douces

### Typographie
- **Titres** : Police moderne, sans-serif
- **Corps** : Lisible, espacement aéré
- **Hiérarchie** : Tailles cohérentes

### Composants
- **Boutons** : Style minimaliste
- **Cards** : Ombres subtiles
- **Navigation** : Hamburger mobile
- **Lightbox** : Fond sombre, contrôles visibles

## 🔧 Configuration technique

### Variables d'environnement
```env
# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Authentification
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=hashed_password

# EmailJS (contact)
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
```

### vercel.json
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/build/$1"
    }
  ],
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

### Adaptations
- **Navigation** : Hamburger menu mobile
- **Grid** : 1 col mobile, 2-3 cols tablet, 3-4 cols desktop
- **Lightbox** : Swipe mobile, clavier desktop
- **Formulaires** : Stack vertical mobile

## 🚀 Plan de développement

### Phase 1 : Setup (1-2h)
1. Créer nouveau projet React
2. Configurer Vercel
3. Setup Cloudinary
4. Structure des dossiers

### Phase 2 : Layout (2-3h)
1. Composants Header/Footer
2. Layout principal
3. Navigation responsive
4. Styles globaux

### Phase 3 : Pages publiques (4-5h)
1. Page Home avec slider
2. Page Galerie avec filtres
3. Page Album Detail avec lightbox
4. Page Contact avec formulaire

### Phase 4 : Backend API (3-4h)
1. API albums (CRUD)
2. API upload Cloudinary
3. API authentification
4. Gestion données JSON

### Phase 5 : Backoffice (4-5h)
1. Login admin
2. Dashboard
3. Gestion albums
4. Upload photos

### Phase 6 : Tests & Deploy (1-2h)
1. Tests fonctionnels
2. Optimisations
3. Déploiement Vercel

## 💰 Coût : 0€/mois

- **Vercel** : Plan gratuit (100GB/mois)
- **Cloudinary** : Plan gratuit (25GB stockage)
- **EmailJS** : Plan gratuit (200 emails/mois)

## ✅ Avantages de cette approche

1. **Code propre** : Architecture moderne et maintenable
2. **Performance** : Optimisé pour le web
3. **Évolutif** : Facile d'ajouter des fonctionnalités
4. **Responsive** : Parfait sur tous les appareils
5. **SEO-friendly** : Structure optimisée
6. **Backoffice fonctionnel** : Gestion autonome du contenu

Cette approche reprend tous les éléments visuels réussis de votre projet actuel tout en créant une base technique solide et évolutive.