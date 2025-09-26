// Configuration GitHub partagée
// Ce fichier contient la configuration du repository GitHub pour la publication automatique
// Modifiez ces valeurs selon votre repository

export const GITHUB_CONFIG = {
  // Nom d'utilisateur ou organisation GitHub
  owner: 'thomaspretrepro',
  
  // Nom du repository
  repo: 'photographe',
  
  // Branche principale (généralement 'main' ou 'master')
  branch: 'main',
  
  // Token GitHub (Personal Access Token)
  // REMPLACEZ CE TOKEN PAR VOTRE NOUVEAU TOKEN VALIDE
  token: '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',
  
  // Instructions pour la configuration
  instructions: {
    tokenSetup: [
      '1. Allez sur GitHub → Settings → Developer settings',
      '2. Cliquez sur Personal access tokens → Tokens (classic)',
      '3. Cliquez sur Generate new token (classic)',
      '4. Donnez un nom au token (ex: "Portfolio Admin")',
      '5. Sélectionnez les permissions : repo et workflow',
      '6. Cliquez sur Generate token',
      '7. Copiez le token immédiatement (il ne sera plus visible)'
    ],
    repositorySetup: [
      '1. Dans votre repository → Settings → Pages',
      '2. Source : Deploy from a branch',
      '3. Branch : main (ou master)',
      '4. Folder : / (root)',
      '5. Cliquez sur Save'
    ]
  }
};

// Fonction pour vérifier si la configuration est complète
export const isConfigurationComplete = () => {
  return GITHUB_CONFIG.owner !== 'VOTRE_USERNAME' &&
         GITHUB_CONFIG.repo !== 'VOTRE_REPO' &&
         GITHUB_CONFIG.token !== 'VOTRE_TOKEN_GITHUB' &&
         GITHUB_CONFIG.token !== 'VOTRE_NOUVEAU_TOKEN_ICI' &&
         GITHUB_CONFIG.token.length > 10; // Vérification basique de la longueur du token
};

// Fonction pour obtenir l'URL du repository
export const getRepositoryUrl = () => {
  if (!isConfigurationComplete()) {
    return null;
  }
  return `https://github.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}`;
};

// Fonction pour obtenir l'URL des GitHub Actions
export const getActionsUrl = () => {
  if (!isConfigurationComplete()) {
    return null;
  }
  return `https://github.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/actions`;
};

// Fonction pour obtenir l'URL des settings GitHub Pages
export const getPagesUrl = () => {
  if (!isConfigurationComplete()) {
    return null;
  }
  return `https://github.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/settings/pages`;
};