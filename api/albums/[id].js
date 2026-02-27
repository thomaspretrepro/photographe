import fs from 'fs';
import path from 'path';

// Chemin vers le fichier de données
const dataPath = path.join(process.cwd(), 'api/data/albums.json');

// Fonction pour lire les données
const readAlbumsData = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading albums data:', error);
    return { albums: [] };
  }
};

// Fonction pour écrire les données
const writeAlbumsData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing albums data:', error);
    return false;
  }
};

export default async function handler(req, res) {
  // Configuration CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Album ID is required' });
  }

  try {
    const data = readAlbumsData();
    const albumIndex = data.albums.findIndex(album => album.id === id);

    switch (req.method) {
      case 'GET':
        // Récupérer un album spécifique
        if (albumIndex === -1) {
          return res.status(404).json({ error: 'Album not found' });
        }
        return res.status(200).json(data.albums[albumIndex]);

      case 'PUT':
        // Mettre à jour un album
        if (albumIndex === -1) {
          return res.status(404).json({ error: 'Album not found' });
        }

        const updatedAlbum = {
          ...data.albums[albumIndex],
          ...req.body,
          id: id, // Garder l'ID original
          updatedAt: new Date().toISOString()
        };

        data.albums[albumIndex] = updatedAlbum;

        if (writeAlbumsData(data)) {
          return res.status(200).json(updatedAlbum);
        } else {
          return res.status(500).json({ error: 'Failed to update album' });
        }

      case 'DELETE':
        // Supprimer un album
        if (albumIndex === -1) {
          return res.status(404).json({ error: 'Album not found' });
        }

        data.albums.splice(albumIndex, 1);

        if (writeAlbumsData(data)) {
          return res.status(200).json({ message: 'Album deleted successfully' });
        } else {
          return res.status(500).json({ error: 'Failed to delete album' });
        }

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}