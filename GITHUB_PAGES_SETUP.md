# Configuration GitHub Pages + Actions

Ce guide explique comment configurer la publication automatique sur GitHub Pages.

## 🚀 Vue d'ensemble

Cette solution permet de publier automatiquement les modifications du back office sur GitHub Pages via GitHub Actions, sans avoir besoin d'un serveur.

### Fonctionnement :
1. **Admin modifie** → localStorage
2. **Clic "Publier"** → Appel GitHub API
3. **GitHub Actions** → Met à jour `albums.js`
4. **GitHub Pages** → Site mis à jour automatiquement

## 📋 Prérequis

- Repository GitHub avec GitHub Pages activé
- Personal Access Token GitHub
- Workflow GitHub Actions configuré

## ⚙️ Configuration étape par étape

### 1. Créer un Personal Access Token

1. Allez sur GitHub → **Settings** → **Developer settings**
2. Cliquez sur **Personal access tokens** → **Tokens (classic)**
3. Cliquez sur **Generate new token (classic)**
4. Donnez un nom au token (ex: "Portfolio Admin")
5. Sélectionnez les permissions :
   - ✅ **repo** (accès complet au repository)
   - ✅ **workflow** (pour déclencher les actions)
6. Cliquez sur **Generate token**
7. **⚠️ IMPORTANT** : Copiez le token immédiatement (il ne sera plus visible)

### 2. Configurer GitHub Pages

1. Dans votre repository → **Settings** → **Pages**
2. Source : **Deploy from a branch**
3. Branch : **main** (ou **master**)
4. Folder : **/ (root)**
5. Cliquez sur **Save**

### 3. Ajouter le Workflow GitHub Actions

Le fichier `.github/workflows/update-albums.yml` est déjà créé dans votre projet.

**Vérifiez que le fichier contient :**
```yaml
name: Update Albums Data

on:
  repository_dispatch:
    types: [update-albums]

jobs:
  update-albums:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        
    - name: Update albums.js file
      run: |
        echo "Updating albums.js with new data..."
        echo '${{ github.event.client_payload.albums_data }}' > client/src/data/albums.js
        
    - name: Commit and push changes
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        git add client/src/data/albums.js
        if git diff --staged --quiet; then
          echo "No changes to commit"
        else
          git commit -m "Update albums data from admin interface
          
          - Updated by: ${{ github.event.client_payload.updated_by || 'Admin' }}
          - Timestamp: ${{ github.event.client_payload.timestamp }}
          - Albums count: ${{ github.event.client_payload.albums_count }}"
          git push
        fi
        
    - name: Trigger GitHub Pages rebuild
      run: |
        echo "Albums data updated successfully!"
        echo "GitHub Pages will rebuild automatically."
```

### 4. Configurer l'interface admin

1. Allez dans l'interface admin de votre site
2. Cliquez sur **Configuration** (bouton ⚙️)
3. Remplissez les informations :
   - **Nom d'utilisateur** : votre nom d'utilisateur GitHub
   - **Repository** : nom de votre repository
   - **Token** : le Personal Access Token créé à l'étape 1
4. Cliquez sur **Sauvegarder**

## 🧪 Test de la configuration

1. Modifiez un album dans l'interface admin
2. Cliquez sur **Publier** (bouton 🚀)
3. Vérifiez que vous recevez un message de succès
4. Allez sur GitHub → **Actions** pour voir le workflow en cours
5. Attendez 2-3 minutes que GitHub Pages se mette à jour
6. Vérifiez que les modifications apparaissent sur votre site

## 🔧 Dépannage

### Erreur "Token GitHub requis"
- Vérifiez que vous avez bien configuré le token dans l'interface admin
- Assurez-vous que le token a les bonnes permissions

### Erreur "Configuration GitHub requise"
- Vérifiez que vous avez bien renseigné le nom d'utilisateur et le repository

### Le workflow ne se déclenche pas
- Vérifiez que le fichier `.github/workflows/update-albums.yml` est bien présent
- Assurez-vous que le token a la permission `workflow`

### Les modifications n'apparaissent pas sur le site
- Attendez quelques minutes (GitHub Pages peut prendre du temps)
- Vérifiez dans **Settings** → **Pages** que le déploiement s'est bien passé
- Videz le cache de votre navigateur

## 📁 Structure des fichiers

```
votre-repository/
├── .github/
│   └── workflows/
│       └── update-albums.yml    # Workflow GitHub Actions
├── client/
│   └── src/
│       └── data/
│           └── albums.js        # Fichier mis à jour automatiquement
└── GITHUB_PAGES_SETUP.md       # Ce guide
```

## 🔒 Sécurité

- Le token est stocké localement dans le navigateur
- Utilisez un token avec les permissions minimales nécessaires
- Ne partagez jamais votre token
- Vous pouvez révoquer le token à tout moment sur GitHub

## ✅ Avantages de cette solution

- ✅ **Compatible GitHub Pages** : Pas besoin de serveur
- ✅ **Modifications permanentes** : Sauvegardées dans le repository
- ✅ **Historique des versions** : Chaque modification est un commit
- ✅ **Gratuit** : Utilise les services gratuits de GitHub
- ✅ **Automatique** : Mise à jour du site sans intervention manuelle

---

**🎉 Une fois configuré, vous pourrez publier vos modifications en un clic !**