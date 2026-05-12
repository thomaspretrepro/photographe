# 🚀 Guide de Référence Rapide - Site Photo

## 📋 Environnements et Accès

### 🖥️ Développement Local
```bash
# Démarrer le serveur de développement
npm start
# URL: http://localhost:3000
# Admin: http://localhost:3000/admin
```

### 🧪 Staging (Préprod)
```bash
# Déployer en staging
git checkout staging
git merge clean-version-without-admin
git push origin staging
# URL: https://photographe-git-staging-[username].vercel.app
```

### 🚀 Production
```bash
# Déployer en production
git checkout main
git merge staging
git push origin main
# URL: https://photographe.vercel.app
```

---

## 🔧 Configuration Admin

### Variables d'Environnement (.env.local)
```env
# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$your_bcrypt_hash
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Générer le Hash du Mot de Passe
```bash
# Installer bcryptjs si nécessaire
npm install bcryptjs

# Générer le hash (remplacer 'votre_mot_de_passe')
node -e "console.log(require('bcryptjs').hashSync('votre_mot_de_passe', 10))"
```

---

## 📸 Gestion des Albums - Interface Admin

### Accès Admin
1. **Local** : http://localhost:3000/admin
2. **Staging** : https://photographe-git-staging-[username].vercel.app/admin
3. **Production** : https://photographe.vercel.app/admin

### Ajouter un Album
1. Se connecter avec les identifiants admin
2. Cliquer sur "Ajouter un Album"
3. Remplir les informations :
   - **Titre** : Nom de l'album
   - **Description** : Description courte
   - **Date** : Date de prise de vue
   - **Lieu** : Localisation
   - **Catégorie** : Type de shooting
4. **Uploader les images** via Cloudinary Browser
5. **Sauvegarder** l'album

### Modifier un Album
1. Dans le dashboard admin, cliquer sur "Modifier" sur l'album
2. Modifier les informations nécessaires
3. Ajouter/supprimer des images
4. Sauvegarder les modifications

---

## 🔄 Workflow de Déploiement Complet

### 1. Développement et Test Local
```bash
# Travailler sur votre branche
git checkout clean-version-without-admin

# Tester en local avec admin
npm start
# → Tester l'ajout d'albums sur http://localhost:3000/admin

# Commiter les modifications
git add .
git commit -m "feat: ajout nouvel album [nom]"
```

### 2. Déploiement Staging
```bash
# Passer en staging
git checkout staging
git merge clean-version-without-admin
git push origin staging

# → Vérifier sur l'URL staging Vercel
# → Tester l'admin en staging
```

### 3. Validation et Production
```bash
# Si tout est OK, déployer en prod
git checkout main
git merge staging
git push origin main

# → Site mis à jour en production
```

---

## 🛠️ Commandes Rapides

### Push Staging Rapide
```bash
git checkout staging && git merge clean-version-without-admin && git push origin staging
```

### Push Production Rapide
```bash
git checkout main && git merge staging && git push origin main
```

### Rollback d'Urgence
```bash
git checkout main
git reset --hard HEAD~1
git push --force origin main
```

---

## 📱 URLs de Référence

| Environnement | URL Site | URL Admin |
|---------------|----------|-----------|
| **Local** | http://localhost:3000 | http://localhost:3000/admin |
| **Staging** | https://photographe-git-staging-[username].vercel.app | /admin |
| **Production** | https://photographe.vercel.app | /admin |

---

## ✅ Checklist Ajout d'Album

### En Local
- [ ] Démarrer `npm start`
- [ ] Aller sur http://localhost:3000/admin
- [ ] Se connecter avec les identifiants admin
- [ ] Ajouter le nouvel album avec images
- [ ] Vérifier l'affichage sur la galerie principale
- [ ] Commiter les modifications

### En Staging
- [ ] Déployer en staging
- [ ] Tester l'admin en staging
- [ ] Vérifier que l'album s'affiche correctement
- [ ] Tester sur mobile/desktop

### En Production
- [ ] Déployer en production
- [ ] Vérifier le site final
- [ ] Confirmer que tout fonctionne

---

## 🚨 Points d'Attention

- **Toujours tester en local** avant de déployer
- **Utiliser staging** pour valider avant production
- **Sauvegarder les images** sur Cloudinary avant de supprimer localement
- **Vérifier les variables d'environnement** sur Vercel
- **Tester l'admin** après chaque déploiement

---

## 📞 Dépannage Rapide

### Admin ne fonctionne pas
1. Vérifier le hash du mot de passe
2. Vérifier JWT_SECRET dans les variables Vercel
3. Vérifier les logs Vercel

### Images ne s'affichent pas
1. Vérifier la configuration Cloudinary
2. Vérifier l'upload preset
3. Tester les URLs d'images directement

### Erreur de déploiement
1. Vérifier les logs Vercel
2. Vérifier que tous les fichiers sont commitées
3. Vérifier la configuration vercel.json