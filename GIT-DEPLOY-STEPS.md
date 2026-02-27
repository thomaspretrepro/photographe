# 📋 Étapes Git + Déploiement Vercel

## 🔄 1. Préparer le Repository Git

### Vérifier l'état Git
```bash
git status
```

### Ajouter tous les nouveaux fichiers
```bash
git add .
```

### Commiter les changements
```bash
git commit -m "feat: Complete photographer website with modern React architecture

- Add responsive CSS for all components (Gallery, AlbumDetail, Contact, Admin)
- Implement Vercel Functions API (albums, auth, photos)
- Configure Cloudinary integration
- Add admin dashboard with authentication
- Create deployment guides and documentation
- Ready for production deployment"
```

### Pousser sur GitHub
```bash
git push origin main
```

## 🚀 2. Déploiement via Dashboard Vercel

### Étape 1 : Accéder à Vercel
1. Aller sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Se connecter avec GitHub

### Étape 2 : Importer le Projet
1. Cliquer "**New Project**"
2. Sélectionner le repository `photographe`
3. Vercel détecte automatiquement React

### Étape 3 : Configuration
- **Framework Preset** : Create React App (détecté automatiquement)
- **Root Directory** : `./` (par défaut)
- **Build Command** : `npm run build` (par défaut)
- **Output Directory** : `build` (par défaut)

### Étape 4 : Variables d'Environnement
Ajouter ces variables dans "Environment Variables" :

```env
# Cloudinary (OBLIGATOIRE pour les images)
CLOUDINARY_CLOUD_NAME=dgcpwz1u4
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# React App (publiques)
REACT_APP_CLOUDINARY_CLOUD_NAME=dgcpwz1u4
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_production

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$your_bcrypt_hash

# EmailJS (optionnel)
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

### Étape 5 : Déployer
1. Cliquer "**Deploy**"
2. Attendre la compilation (2-3 minutes)
3. Récupérer l'URL de production

## ✅ 3. Vérification Post-Déploiement

### URLs à tester :
- **Site principal** : `https://your-project.vercel.app`
- **Galerie** : `https://your-project.vercel.app/gallery`
- **Admin** : `https://your-project.vercel.app/admin`
- **API Albums** : `https://your-project.vercel.app/api/albums`

### Tests fonctionnels :
- [ ] Page d'accueil se charge
- [ ] Galerie affiche les 4 albums
- [ ] Clic sur un album ouvre le détail avec lightbox
- [ ] Login admin fonctionne (`admin` / `admin123`)
- [ ] Dashboard admin accessible

## 🔧 4. Configuration Cloudinary (si nécessaire)

Si vous n'avez pas encore configuré Cloudinary :

### Créer un compte Cloudinary
1. Aller sur [cloudinary.com](https://cloudinary.com)
2. Créer un compte gratuit
3. Noter le `Cloud Name` dans le dashboard

### Créer un Upload Preset
1. Settings → Upload → Add upload preset
2. **Preset name** : `photographe_preset`
3. **Signing Mode** : Unsigned
4. **Folder** : `photographe` (optionnel)
5. Sauvegarder

### Récupérer les clés API
1. Dashboard → Settings → API Keys
2. Noter `API Key` et `API Secret`

## 🎯 Résultat Attendu

Une fois déployé, vous aurez :
- ✅ Site photographe professionnel en ligne
- ✅ Galerie avec les 4 albums existants
- ✅ Images Cloudinary qui se chargent
- ✅ Interface admin fonctionnelle
- ✅ APIs backend opérationnelles

## 🔄 Déploiements Futurs

Après le premier déploiement, chaque `git push` sur `main` déclenchera automatiquement un nouveau déploiement !

## 💡 Alternative Rapide

Si vous voulez tester rapidement sans configurer Cloudinary :
1. Déployez d'abord sans les variables Cloudinary
2. Le site fonctionnera avec les images déjà hébergées
3. Configurez Cloudinary plus tard pour l'upload