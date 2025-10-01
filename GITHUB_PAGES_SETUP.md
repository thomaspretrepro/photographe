# Configuration GitHub Pages

Ce document explique comment configurer GitHub Pages pour le projet photographe.

## Étapes de configuration

### 1. Activer GitHub Pages

1. Aller dans les **Settings** du repository GitHub
2. Descendre jusqu'à la section **Pages**
3. Dans **Source**, sélectionner **GitHub Actions**

### 2. Configuration du workflow

Le workflow `.github/workflows/deploy-gh-pages.yml` est configuré pour :
- Se déclencher à chaque push sur la branche `main`
- Installer les dépendances Node.js
- Builder l'application React
- Déployer automatiquement sur GitHub Pages

### 3. Domaine personnalisé (optionnel)

Si vous souhaitez utiliser un domaine personnalisé :
1. Modifier la ligne `cname:` dans le workflow
2. Configurer les DNS de votre domaine pour pointer vers GitHub Pages

### 4. Variables d'environnement

Pour l'interface admin, vous pouvez définir :
- `REACT_APP_GITHUB_TOKEN` : Token GitHub pour les commits automatiques (optionnel)

## Structure du déploiement

```
Repository GitHub
├── client/          # Application React
│   ├── src/
│   ├── public/
│   └── build/       # Dossier de build (généré)
├── .github/
│   └── workflows/
│       └── deploy-gh-pages.yml
└── README.md
```

## URL d'accès

Une fois configuré, le site sera accessible à :
- `https://thomaspretrepro.github.io/photographe/`

## Troubleshooting

### Erreur de build
- Vérifier que toutes les dépendances sont installées
- S'assurer que le build local fonctionne avec `npm run build`

### Erreur de déploiement
- Vérifier les permissions GitHub Actions dans les settings
- S'assurer que la branche `gh-pages` est créée automatiquement

### Problème de routage
- GitHub Pages ne supporte pas le routage côté client par défaut
- Utiliser des liens HTML statiques pour la navigation principale
- Garder React Router pour la navigation interne