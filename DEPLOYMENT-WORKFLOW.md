# 🚀 Workflow de Déploiement - Site Photo

## 📋 Processus de Publication avec Préprod

### 🎯 Architecture des Environnements

- **Local** : `npm start` (développement)
- **Préprod** : Branche `staging` → URL Vercel automatique
- **Production** : Branche `main` → URL production

---

## 🔄 Processus Étape par Étape

### 1. 💻 Développement Local

```bash
# Travailler sur votre branche de développement
git checkout clean-version-without-admin

# Faire vos modifications...
# Tester en local
npm start

# Commiter vos changements
git add .
git commit -m "feat: description de vos modifications"
```

### 2. 🧪 Déploiement en Préprod

```bash
# Créer/aller sur la branche staging (première fois seulement)
git checkout -b staging  # ou git checkout staging si elle existe

# Fusionner vos modifications
git merge clean-version-without-admin

# Pousser vers staging (déploiement automatique en préprod)
git push origin staging
```

**✅ Résultat** : Vercel déploie automatiquement sur une URL de préprod

### 3. 🔍 Vérification en Préprod

1. **Aller dans Vercel Dashboard** : https://vercel.com/dashboard
2. **Cliquer sur votre projet** "photographe"
3. **Voir les déploiements** : onglet "Deployments"
4. **Trouver le déploiement "staging"** et cliquer sur l'URL

**URL de préprod** : Quelque chose comme `https://photographe-git-staging-username.vercel.app`

### 4. ✅ Tests en Préprod

- [ ] Vérifier que la galerie s'affiche correctement
- [ ] Tester la navigation entre les pages
- [ ] Vérifier que tous les albums s'ouvrent
- [ ] Tester sur mobile/desktop
- [ ] Vérifier les performances

### 5. 🚀 Déploiement en Production

```bash
# Si tout est OK en préprod, déployer en production
git checkout main
git merge staging
git push origin main
```

**✅ Résultat** : Site mis à jour en production

---

## 🛠️ Configuration Initiale Vercel (une seule fois)

### Dans Vercel Dashboard :

1. **Aller dans Settings** → **Git**
2. **Ajouter la branche staging** :
   - Branch: `staging`
   - Environment: `Preview`
3. **Sauvegarder**

---

## 📱 Commandes Rapides

### Déploiement complet :
```bash
# 1. Préprod
git checkout staging
git merge clean-version-without-admin
git push origin staging
# → Tester l'URL de préprod dans Vercel Dashboard

# 2. Production (si OK)
git checkout main
git merge staging
git push origin main
```

### Rollback d'urgence :
```bash
# Revenir à la version précédente
git checkout main
git reset --hard HEAD~1
git push --force origin main
```

---

## 🔗 URLs d'Accès

### Trouver vos URLs dans Vercel :

1. **Dashboard Vercel** : https://vercel.com/dashboard
2. **Cliquer sur votre projet**
3. **Onglet "Deployments"**
4. **URLs disponibles** :
   - **Production** : `https://photographe.vercel.app` (branche main)
   - **Préprod** : `https://photographe-git-staging-[username].vercel.app` (branche staging)
   - **Preview** : URL unique pour chaque push sur d'autres branches

---

## ⚠️ Points d'Attention

- **Toujours tester en préprod** avant de déployer en production
- **L'URL de préprod change** si vous changez le nom de la branche
- **Les preview deployments** sont temporaires (30 jours)
- **La branche staging** a une URL stable

---

## 🎯 Workflow Recommandé

```
Développement → Préprod → Tests → Production
     ↓             ↓        ↓        ↓
   Local        Staging   Vercel   Main
```

**Avantages** :
- ✅ Zéro risque en production
- ✅ Tests complets avant déploiement
- ✅ URLs stables pour chaque environnement
- ✅ Rollback facile en cas de problème