# 📸 Configuration du Widget Instagram

## 🎯 Objectif
Ce guide vous explique comment configurer l'API Instagram Basic Display pour afficher vos derniers posts sur votre site.

---

## 📋 Prérequis
- Un compte Instagram
- Un compte Facebook Developer
- Votre site web en ligne (pour l'URL de redirection)

---

## 🚀 Étapes de Configuration

### 1. Créer une App Facebook Developer

1. **Aller sur** : https://developers.facebook.com/
2. **Se connecter** avec votre compte Facebook
3. **Cliquer sur "Mes Apps"** → **"Créer une App"**
4. **Choisir "Consommateur"** comme type d'app
5. **Remplir les informations** :
   - Nom de l'app : `Mon Site Photo Instagram`
   - Email de contact : votre email
   - Finalité : `Moi-même`

### 2. Ajouter Instagram Basic Display

1. **Dans le tableau de bord** de votre app
2. **Cliquer sur "Ajouter un produit"**
3. **Trouver "Instagram Basic Display"** → **"Configurer"**
4. **Cliquer sur "Créer une nouvelle app"**

### 3. Configurer Instagram Basic Display

1. **Aller dans** : `Produits` → `Instagram Basic Display` → `Configuration de base`
2. **Ajouter les URLs de redirection** :
   ```
   https://votre-site.vercel.app/
   https://localhost:3000/
   ```
3. **Ajouter les URLs de désactivation de données** :
   ```
   https://votre-site.vercel.app/
   ```
4. **Sauvegarder les modifications**

### 4. Ajouter un Utilisateur de Test Instagram

1. **Aller dans** : `Rôles` → `Rôles`
2. **Section "Utilisateurs de test Instagram"**
3. **Cliquer sur "Ajouter des utilisateurs de test Instagram"**
4. **Entrer votre nom d'utilisateur Instagram**
5. **Envoyer l'invitation**

### 5. Accepter l'Invitation (sur Instagram)

1. **Ouvrir l'app Instagram**
2. **Aller dans** : `Paramètres` → `Sécurité` → `Apps et sites web`
3. **Onglet "Invitations d'apps de test"**
4. **Accepter l'invitation**

### 6. Générer un Token d'Accès

1. **Retourner dans Facebook Developer**
2. **Aller dans** : `Produits` → `Instagram Basic Display` → `Configuration de base`
3. **Section "Utilisateurs de test Instagram"**
4. **Cliquer sur "Générer un token"** à côté de votre nom
5. **Se connecter à Instagram** et **autoriser l'app**
6. **Copier le token d'accès** (il commence par `IGQV...`)

### 7. Configurer le Token dans votre Projet

1. **Créer un fichier `.env`** à la racine de votre projet :
   ```bash
   cp .env.example .env
   ```

2. **Ajouter votre token** dans `.env` :
   ```env
   REACT_APP_INSTAGRAM_ACCESS_TOKEN=IGQVJ...votre_token_ici
   ```

3. **Redémarrer votre serveur de développement** :
   ```bash
   npm start
   ```

---

## 🔄 Renouvellement du Token

⚠️ **Important** : Les tokens Instagram expirent au bout de 60 jours.

### Renouvellement Automatique (Recommandé)

Le service Instagram inclut une fonction de renouvellement automatique. Le token sera renouvelé automatiquement quand il approche de l'expiration.

### Renouvellement Manuel

Si nécessaire, vous pouvez renouveler manuellement :

1. **Faire une requête GET** vers :
   ```
   https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=VOTRE_TOKEN
   ```

2. **Récupérer le nouveau token** dans la réponse
3. **Mettre à jour** votre fichier `.env`

---

## 🧪 Test et Vérification

### Vérifier que ça fonctionne :

1. **Démarrer votre site** : `npm start`
2. **Aller sur la page d'accueil**
3. **Vérifier** que la section Instagram s'affiche
4. **Si pas de token** : des images de démo s'affichent
5. **Avec le token** : vos vrais posts Instagram s'affichent

### Débugger les problèmes :

1. **Ouvrir la console** du navigateur (F12)
2. **Chercher les erreurs** liées à Instagram
3. **Vérifier** que le token est bien configuré
4. **Tester** le token avec l'API Graph Explorer

---

## 📱 Fonctionnalités du Widget

### Ce qui est affiché :
- ✅ 6 derniers posts Instagram
- ✅ Images optimisées et responsive
- ✅ Hover effects avec overlay
- ✅ Lien vers votre profil Instagram
- ✅ Cache automatique (30 minutes)
- ✅ Fallback vers des données de démo

### Personnalisation possible :
- Nombre de posts à afficher
- Affichage des captions
- Affichage des dates
- Nombre de colonnes
- Styles CSS personnalisés

---

## 🔧 Dépannage

### Erreur "Invalid Access Token"
- Vérifier que le token est correct dans `.env`
- Vérifier que le token n'a pas expiré
- Régénérer un nouveau token si nécessaire

### Erreur "User not found"
- Vérifier que vous êtes bien utilisateur de test
- Vérifier que vous avez accepté l'invitation sur Instagram

### Pas d'images qui s'affichent
- Vérifier la console pour les erreurs
- Vérifier que votre compte Instagram a des posts publics
- Tester avec les données de démo d'abord

### Token qui expire rapidement
- Utiliser la fonction de renouvellement automatique
- Vérifier que votre app est en mode "Live" (pas "Development")

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifier la [documentation officielle Instagram](https://developers.facebook.com/docs/instagram-basic-display-api)
2. Tester votre token avec [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
3. Vérifier les logs de votre console navigateur