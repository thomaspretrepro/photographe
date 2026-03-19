# 🔑 Configuration Cloudinary - Obtenir vos Clés

## 📋 Situation Actuelle

Vos images utilisent déjà Cloudinary avec le cloud name `dgcpwz1u4` :
- ✅ **Cloud Name** : `dgcpwz1u4` (déjà configuré)
- ❓ **API Key** : À récupérer
- ❓ **API Secret** : À récupérer
- ❓ **Upload Preset** : À créer

## 🔍 Étape 1 : Vérifier votre Compte Cloudinary

### Option A : Vous avez déjà un compte
1. Aller sur [cloudinary.com](https://cloudinary.com)
2. Se connecter avec vos identifiants
3. Vérifier que le cloud name est bien `dgcpwz1u4`

### Option B : Vous n'avez pas de compte
1. Créer un compte sur [cloudinary.com](https://cloudinary.com)
2. Choisir le cloud name `dgcpwz1u4` (s'il est disponible)
3. Ou utiliser un nouveau cloud name

## 🔑 Étape 2 : Récupérer les Clés API

### Dans le Dashboard Cloudinary :
1. **Se connecter** à [cloudinary.com](https://cloudinary.com)
2. **Dashboard** → Section "**Account Details**"
3. **Copier** les informations :

```
Cloud Name: dgcpwz1u4 (ou votre nouveau cloud name)
API Key: 123456789012345 (exemple)
API Secret: abcdefghijklmnopqrstuvwxyz123456 (exemple)
```

## 🔧 Étape 3 : Créer un Upload Preset

### Dans Cloudinary Dashboard :
1. **Settings** → **Upload**
2. **Add upload preset**
3. **Configuration** :
   - **Preset name** : `photographe_preset`
   - **Signing Mode** : `Unsigned`
   - **Folder** : `photographe` (optionnel)
   - **Resource Type** : `Image`
   - **Allowed formats** : `jpg,jpeg,png,webp`

## 📝 Étape 4 : Mettre à Jour votre .env

### Remplacer dans votre fichier .env :
```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dgcpwz1u4
CLOUDINARY_API_KEY=votre_vraie_api_key
CLOUDINARY_API_SECRET=votre_vrai_api_secret

# React App (publiques)
REACT_APP_CLOUDINARY_CLOUD_NAME=dgcpwz1u4
REACT_APP_CLOUDINARY_UPLOAD_PRESET=photographe_preset

# JWT Secret
JWT_SECRET=votre_secret_jwt_production

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$votre_hash_bcrypt
```

## 🚀 Étape 5 : Configuration Vercel

### Dans Vercel Dashboard :
1. **Project Settings** → **Environment Variables**
2. **Ajouter** les mêmes variables que dans .env
3. **Redéployer** le projet

## 🔍 Vérification des Images Existantes

Vos albums utilisent déjà ces URLs Cloudinary :
```
https://res.cloudinary.com/dgcpwz1u4/image/upload/...
```

Si `dgcpwz1u4` n'est pas votre cloud name :

### Option 1 : Utiliser le même cloud name
- Créer un compte avec `dgcpwz1u4` (si disponible)
- Les images fonctionneront immédiatement

### Option 2 : Nouveau cloud name
- Utiliser votre nouveau cloud name
- Mettre à jour les URLs dans [`api/data/albums.json`](api/data/albums.json)

## 🎯 Test Rapide

### Pour tester sans Cloudinary :
1. **Déployer** d'abord sans les clés API
2. **Vérifier** que la galerie fonctionne (images existantes)
3. **Configurer** Cloudinary plus tard pour l'upload

### URLs de test :
- **Galerie** : Doit afficher les 4 albums
- **Admin** : Login fonctionne sans Cloudinary
- **Upload** : Nécessite les clés Cloudinary

## 💡 Recommandation

**Déployez d'abord sans Cloudinary** pour voir la galerie fonctionner, puis configurez l'upload plus tard !

Les images existantes fonctionneront car elles sont déjà hébergées sur Cloudinary.