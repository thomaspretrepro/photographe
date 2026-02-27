# 🚀 Guide de Déploiement Vercel

## 📋 Prérequis

### 1. Compte Vercel
- Créer un compte sur [vercel.com](https://vercel.com)
- Connecter votre compte GitHub

### 2. Repository Git
- Le projet doit être dans un repository GitHub
- Toutes les modifications doivent être commitées

## 🔧 Configuration Vercel

### 1. Variables d'Environnement
Dans le dashboard Vercel, configurer ces variables :

```env
# Cloudinary (OBLIGATOIRE)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# React App (publiques)
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
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

### 2. Configuration Cloudinary

#### Étape 1 : Créer un compte Cloudinary
1. Aller sur [cloudinary.com](https://cloudinary.com)
2. Créer un compte gratuit
3. Noter le `Cloud Name` dans le dashboard

#### Étape 2 : Configurer l'upload preset
1. Dans Cloudinary Dashboard → Settings → Upload
2. Créer un nouveau "Upload Preset"
3. Mode : "Unsigned"
4. Folder : "photographe" (optionnel)
5. Noter le nom du preset

#### Étape 3 : Récupérer les clés API
1. Dashboard → Settings → API Keys
2. Noter `API Key` et `API Secret`

### 3. Générer le hash du mot de passe admin

```bash
# Installer bcryptjs globalement
npm install -g bcryptjs

# Générer le hash (remplacer 'votre_mot_de_passe')
node -e "console.log(require('bcryptjs').hashSync('votre_mot_de_passe', 10))"
```

## 🚀 Déploiement

### Méthode 1 : Via Dashboard Vercel
1. Aller sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Cliquer "New Project"
3. Importer le repository GitHub
4. Vercel détecte automatiquement React
5. Configurer les variables d'environnement
6. Cliquer "Deploy"

### Méthode 2 : Via CLI Vercel
```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivre les instructions
```

## ✅ Vérifications Post-Déploiement

### 1. URLs à tester
- **Site principal** : `https://your-project.vercel.app`
- **API Albums** : `https://your-project.vercel.app/api/albums`
- **Admin** : `https://your-project.vercel.app/admin`

### 2. Tests fonctionnels
- [ ] Page d'accueil se charge
- [ ] Galerie affiche les albums
- [ ] Clic sur un album ouvre le détail
- [ ] Lightbox fonctionne
- [ ] Formulaire de contact
- [ ] Login admin fonctionne
- [ ] Dashboard admin accessible

### 3. Tests API
```bash
# Tester l'API albums
curl https://your-project.vercel.app/api/albums

# Tester l'authentification
curl -X POST https://your-project.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"votre_mot_de_passe"}'
```

## 🔧 Configuration Cloudinary Détaillée

### Upload Preset Configuration
```json
{
  "name": "photographe_preset",
  "unsigned": true,
  "folder": "photographe",
  "resource_type": "image",
  "allowed_formats": ["jpg", "jpeg", "png", "webp"],
  "transformation": [
    {
      "quality": "auto",
      "fetch_format": "auto"
    }
  ]
}
```

### Exemple de variables Cloudinary
```env
CLOUDINARY_CLOUD_NAME=dgcpwz1u4
REACT_APP_CLOUDINARY_CLOUD_NAME=dgcpwz1u4
REACT_APP_CLOUDINARY_UPLOAD_PRESET=photographe_preset
```

## 🐛 Dépannage

### Erreur : "Module not found"
- Vérifier que tous les imports sont corrects
- S'assurer que les fichiers existent

### Erreur : "API not found"
- Vérifier que les fichiers API sont dans `/api/`
- Vérifier la configuration `vercel.json`

### Images ne se chargent pas
- Vérifier la configuration Cloudinary
- Tester les URLs d'images directement

### Admin ne fonctionne pas
- Vérifier le hash du mot de passe
- Vérifier les variables d'environnement JWT

## 📞 Support

En cas de problème :
1. Vérifier les logs Vercel
2. Tester les APIs individuellement
3. Vérifier la configuration des variables d'environnement

## 🎉 Résultat Attendu

Une fois déployé, vous aurez :
- ✅ Site photographe fonctionnel
- ✅ Galerie avec images Cloudinary
- ✅ Interface admin opérationnelle
- ✅ APIs backend fonctionnelles
- ✅ Formulaire de contact
- ✅ Design responsive

**Le site sera accessible 24/7 avec un domaine Vercel gratuit !**