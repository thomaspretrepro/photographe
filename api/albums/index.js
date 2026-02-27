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

  try {
    const data = readAlbumsData();

    switch (req.method) {
      case 'GET':
        // Récupérer tous les albums
        return res.status(200).json(data);

      case 'POST':
        // Créer un nouvel album
        const newAlbum = {
          id: req.body.id || `album-${Date.now()}`,
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          coverImage: req.body.coverImage,
          photos: req.body.photos || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        data.albums.push(newAlbum);
        
        if (writeAlbumsData(data)) {
          return res.status(201).json(newAlbum);
        } else {
          return res.status(500).json({ error: 'Failed to save album' });
        }

      case 'PUT':
        // Mettre à jour tous les albums (pour le backoffice)
        if (req.body.albums) {
          const updatedData = {
            albums: req.body.albums.map(album => ({
              ...album,
              updatedAt: new Date().toISOString()
            }))
          };
          
          if (writeAlbumsData(updatedData)) {
            return res.status(200).json(updatedData);
          } else {
            return res.status(500).json({ error: 'Failed to update albums' });
          }
        }
        return res.status(400).json({ error: 'Invalid request body' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}