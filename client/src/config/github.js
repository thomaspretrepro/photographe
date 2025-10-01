// Configuration GitHub pour l'interface admin
export const GITHUB_CONFIG = {
  owner: 'thomaspretrepro',
  repo: 'photographe',
  token: process.env.REACT_APP_GITHUB_TOKEN || '', // Token à définir dans les variables d'environnement
  branch: 'main'
};

// API GitHub pour les commits
export const commitToGitHub = async (content, message) => {
  const { owner, repo, token, branch } = GITHUB_CONFIG;
  
  if (!token) {
    throw new Error('Token GitHub non configuré');
  }

  try {
    // 1. Récupérer le SHA du fichier actuel
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/client/src/data/albums.js`,
      {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    let sha = null;
    if (getFileResponse.ok) {
      const fileData = await getFileResponse.json();
      sha = fileData.sha;
    }

    // 2. Créer ou mettre à jour le fichier
    const updateResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/client/src/data/albums.js`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          content: btoa(unescape(encodeURIComponent(content))), // Encodage en base64
          sha: sha,
          branch: branch
        })
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      throw new Error(`Erreur GitHub API: ${errorData.message}`);
    }

    return await updateResponse.json();
  } catch (error) {
    console.error('Erreur lors du commit GitHub:', error);
    throw error;
  }
};

// Fonction pour tester la connexion GitHub
export const testGitHubConnection = async () => {
  const { owner, repo, token } = GITHUB_CONFIG;
  
  if (!token) {
    return { success: false, error: 'Token GitHub non configuré' };
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (response.ok) {
      return { success: true, message: 'Connexion GitHub réussie' };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.message };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};