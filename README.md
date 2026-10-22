# Site de Photographe - Thomas Prêtre

Site web professionnel pour photographe avec galerie d'albums et interface d'administration dynamique.

## 🚀 Technologies utilisées

- **Frontend** : React 18, React Router
- **Backend** : Vercel Functions (Node.js)
- **Base de données** : Fichier JSON (évolutif vers base de données)
- **Authentification** : JWT
- **Images** : Cloudinary CDN
- **Hébergement** : Vercel
- **Styling** : CSS3 avec variables personnalisées

## 📁 Structure du projet

```
/
├── api/                    # Vercel Functions (Backend)
│   ├── auth/
│   │   └── login.js       # Authentification
│   ├── albums/
│   │   ├── index.js       # CRUD albums
│   │   └── [id].js        # Album spécifique
│   ├── photos/
│   │   └── upload.js      # Upload Cloudinary
│   └── data/
│       └── albums.json    # Base de données JSON
├── src/                   # Frontend React
│   ├── components/
│   │   ├── admin/         # Interface d'administration
│   │   ├── layout/        # Layout et navigation
│   │   └── pages/         # Pages principales
│   ├── services/          # Services API
│   ├── styles/            # Styles globaux
│   └── utils/             # Utilitaires et constantes
├── vercel.json            # Configuration Vercel
└── package.json
```

## 🛠️ Installation et développement

1. **Cloner le repository**
   ```bash
   git clone [url-du-repo]
   cd photographe
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration des variables d'environnement**
   ```bash
   cp .env.example .env
   ```
   Puis remplir les valeurs dans `.env` :
   - Cloudinary (cloud_name, api_key, api_secret)
   - JWT secret
   - Identifiants admin

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Build pour la production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Variables d'environnement requises

```env
# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# React (publiques)
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Authentification
JWT_SECRET=your_super_secret_jwt_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your_hashed_password

# EmailJS (optionnel)
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🔐 Interface d'administration

### Accès
- URL : `/admin`
- Identifiants par défaut : `admin` / `admin123`

### Fonctionnalités
- ✅ Authentification sécurisée (JWT)
- ✅ Visualisation des albums et statistiques
- ✅ Gestion CRUD des albums
- ✅ Upload d'images vers Cloudinary
- ✅ Interface responsive

## 📡 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion admin

### Albums
- `GET /api/albums` - Récupérer tous les albums
- `POST /api/albums` - Créer un album
- `GET /api/albums/:id` - Récupérer un album
- `PUT /api/albums/:id` - Modifier un album
- `DELETE /api/albums/:id` - Supprimer un album

### Photos
- `POST /api/photos/upload` - Upload vers Cloudinary

## 📸 Gestion des images

Les images sont hébergées sur Cloudinary pour :
- Optimisation automatique
- Redimensionnement responsive
- CDN global pour des performances optimales
- Transformations à la volée

<<<<<<< Updated upstream
=======
## 🖼️ Ajouter ou mettre à jour un album de photos

Les albums sont stockés dans `src/data/albums.js`. Un script Node automatise la création et la mise à jour d'albums à partir de photos déjà uploadées sur Cloudinary.

### 1. Organiser les photos sur Cloudinary

Crée un dossier dédié sur [Cloudinary](https://cloudinary.com/console/media_library) (ex: `noel-2025/`) et uploade-y toutes les photos de l'album.

### 2. Configurer les clés API (une seule fois)

Ajoute dans `.env` (non commité) :

```env
CLOUDINARY_CLOUD_NAME=dgcpwz1u4
CLOUDINARY_API_KEY=ton_api_key
CLOUDINARY_API_SECRET=ton_api_secret
```

Ces clés sont disponibles dans **Cloudinary → Settings → API Keys**.

### 3. Générer ou mettre à jour l'album

```bash
node scripts/create-album.js <dossier-cloudinary> <id> "<titre>" "<description>" <categorie> [date]
```

Le paramètre `[date]` (format `YYYY-MM-DD`) est **optionnel** : c'est la date des photos. Elle **prend le pas sur `displayOrder`** pour l'ordre d'affichage (du plus récent au plus ancien). Les albums sans date viennent après, triés par `displayOrder`. Si l'album existe déjà et qu'aucune date n'est fournie, l'ancienne est conservée.

**Exemple (création) :**
```bash
node scripts/create-album.js noel-2025 noel-2025 "Noël en famille" "Souvenirs de Noël 2025" portrait 2025-12-25
```

Le script va :
- Récupérer toutes les photos du dossier Cloudinary indiqué
- Générer le bloc JSON de l'album (id, titre, description, catégorie, photos, dates)
- L'insérer automatiquement dans `src/data/albums.js`

**Si l'`id` existe déjà**, l'album est **mis à jour** (photos remplacées, `createdAt` préservé, `updatedAt` rafraîchi) plutôt que dupliqué :

```bash
node scripts/create-album.js noel-2025 noel-2025 "Noël en famille (v2)" "Nouvelle description" portrait
```

### 4. Catégories disponibles

Voir `src/utils/constants.js` pour la liste complète (`portrait`, `landscape`, `concerts`, `essais`, ...).

### 5. Finaliser (optionnel)

Édite `src/data/albums.js` pour ajouter des titres/descriptions individuels à certaines photos si besoin.

### 6. Tester et déployer

```bash
npm run build
git add .
git commit -m "feat: ajout/màj album [nom]"
git push origin develop
```

Le `sitemap.xml` est automatiquement régénéré (via le script `prebuild`) avec le nouvel album inclus.

>>>>>>> Stashed changes
## 🧪 Tests

Tester les APIs localement :
```bash
node test-api.js
```

## 🚀 Déploiement sur Vercel

1. **Connecter le repository à Vercel**
2. **Configurer les variables d'environnement** dans le dashboard Vercel
3. **Déployer automatiquement** via Git push

### Variables d'environnement Vercel
Ajouter toutes les variables du fichier `.env` dans :
`Vercel Dashboard > Project > Settings > Environment Variables`

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans `src/styles/globals.css`

### Configuration
Modifier `src/utils/constants.js` pour :
- Informations du photographe
- Catégories d'albums
- Configuration de l'application

## 📱 Responsive Design

Le site est entièrement responsive avec :
- Design mobile-first
- Breakpoints adaptatifs
- Images optimisées pour tous les écrans

## 🔄 Évolutions futures

- Migration vers une vraie base de données (PostgreSQL/MongoDB)
- Système de rôles utilisateurs
- Galerie publique avec commentaires
- Système de commandes/devis
- Analytics avancées

## 📞 Support

Pour toute question ou problème, consulter la documentation ou créer une issue.
