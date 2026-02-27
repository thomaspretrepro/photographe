// Configuration de l'application
export const APP_CONFIG = {
  name: 'Thomas Prêtre Photography',
  photographer: 'Thomas Prêtre',
  email: 'thomas.pretre.pro@gmail.com',
  instagram: 'https://www.instagram.com/tom_p_pics/',
  description: 'Photographe professionnel spécialisé en portraits, paysages et événements'
};

// Catégories d'albums
export const ALBUM_CATEGORIES = {
  portraits: 'Portraits',
  landscape: 'Paysages',
  concerts: 'Concerts',
  events: 'Événements',
  essais: 'Essais'
};

// API endpoints
export const API_ENDPOINTS = {
  albums: '/api/albums',
  photos: '/api/photos',
  auth: '/api/auth',
  upload: '/api/photos/upload'
};

// Messages d'erreur
export const ERROR_MESSAGES = {
  network: 'Erreur de connexion. Veuillez réessayer.',
  unauthorized: 'Accès non autorisé.',
  notFound: 'Ressource non trouvée.',
  server: 'Erreur serveur. Veuillez réessayer plus tard.',
  validation: 'Données invalides.'
};

// Configuration Cloudinary
export const CLOUDINARY_CONFIG = {
  cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
};