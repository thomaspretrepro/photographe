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
