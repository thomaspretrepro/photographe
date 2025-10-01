# Configuration du Token GitHub

Ce document explique comment configurer un token GitHub pour permettre les commits automatiques depuis l'interface admin.

## Création du Token GitHub

### 1. Accéder aux paramètres GitHub

1. Aller sur GitHub.com et se connecter
2. Cliquer sur votre avatar en haut à droite
3. Sélectionner **Settings**
4. Dans le menu de gauche, cliquer sur **Developer settings**
5. Cliquer sur **Personal access tokens**
6. Sélectionner **Tokens (classic)**

### 2. Créer un nouveau token

1. Cliquer sur **Generate new token**
2. Sélectionner **Generate new token (classic)**
3. Donner un nom au token : `Photographe Admin Interface`
4. Définir une expiration (recommandé : 90 jours)
5. Sélectionner les permissions suivantes :
   - ✅ **repo** (Full control of private repositories)
     - ✅ repo:status
     - ✅ repo_deployment
     - ✅ public_repo
     - ✅ repo:invite
     - ✅ security_events
   - ✅ **workflow** (Update GitHub Action workflows)

### 3. Générer et copier le token

1. Cliquer sur **Generate token**
2. **IMPORTANT** : Copier immédiatement le token généré
3. Le token ne sera plus visible après avoir quitté la page

## Configuration dans l'application

### Option 1 : Variable d'environnement (Recommandée)

1. Créer un fichier `.env.local` dans le dossier `client/`
2. Ajouter la ligne suivante :
   ```
   REACT_APP_GITHUB_TOKEN=votre_token_ici
   ```
3. Redémarrer l'application de développement

### Option 2 : Configuration directe dans le code

1. Ouvrir le fichier `client/src/config/github.js`
2. Remplacer la ligne :
   ```javascript
   token: process.env.REACT_APP_GITHUB_TOKEN || '',
   ```
   par :
   ```javascript
   token: 'votre_token_ici',
   ```

⚠️ **Attention** : Ne jamais commiter un token directement dans le code source !

## Sécurité

### Bonnes pratiques

1. **Ne jamais partager le token** avec d'autres personnes
2. **Définir une expiration** pour le token
3. **Utiliser les variables d'environnement** plutôt que le code source
4. **Révoquer le token** s'il est compromis
5. **Utiliser des permissions minimales** nécessaires

### Révocation d'un token

Si le token est compromis :
1. Retourner dans **GitHub Settings > Developer settings > Personal access tokens**
2. Trouver le token concerné
3. Cliquer sur **Delete** ou **Revoke**
4. Générer un nouveau token si nécessaire

## Test de la configuration

Une fois le token configuré :
1. Aller dans l'interface admin du site
2. La connexion GitHub devrait être automatiquement testée
3. Un message de succès ou d'erreur s'affichera

## Troubleshooting

### Erreur "Bad credentials"
- Vérifier que le token est correctement copié
- S'assurer que le token n'a pas expiré
- Vérifier les permissions du token

### Erreur "Not found"
- Vérifier que le nom du repository est correct dans la configuration
- S'assurer que le token a accès au repository

### Erreur de permissions
- Vérifier que les permissions `repo` et `workflow` sont activées
- Pour un repository privé, s'assurer d'avoir les bonnes permissions