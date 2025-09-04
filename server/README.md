# Serveur API pour Portfolio Photographe

Ce serveur Express permet de sauvegarder les modifications des albums directement dans le fichier `albums.js` côté serveur.

## Installation

1. Installer les dépendances :
```bash
cd server
npm install
```

## Démarrage

### Mode développement
```bash
npm run dev
```

### Mode production
```bash
npm start
```

Le serveur démarre sur le port 3001 par défaut.

## API Endpoints

### GET /api/albums
Récupère les données actuelles des albums depuis le fichier `albums.js`.

**Réponse :**
```json
{
  "success": true,
  "data": [...]
}
```

### POST /api/albums/save
Sauvegarde les données des albums dans le fichier `albums.js`.

**Body :**
```json
{
  "albums": [...]
}
```

**Réponse :**
```json
{
  "success": true,
  "message": "Albums data saved successfully",
  "backup": "path/to/backup/file"
}
```

### GET /api/health
Vérification de l'état du serveur.

## Fonctionnalités

- **Sauvegarde automatique** : Crée une sauvegarde avant chaque modification
- **Validation des données** : Vérifie la structure des données avant sauvegarde
- **CORS activé** : Permet les requêtes depuis le client React
- **Gestion d'erreurs** : Retourne des messages d'erreur détaillés

## Utilisation avec le client React

1. Démarrer le serveur API (port 3001)
2. Démarrer le client React (port 3000)
3. Utiliser le bouton "Sauvegarder" dans l'interface admin

Les modifications seront écrites directement dans `client/src/data/albums.js`.