import axios from 'axios';
import { API_ENDPOINTS, ERROR_MESSAGES } from '../utils/constants';

// Configuration axios
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('authToken');
          window.location.href = '/admin';
          break;
        case 404:
          throw new Error(ERROR_MESSAGES.notFound);
        case 500:
          throw new Error(ERROR_MESSAGES.server);
        default:
          throw new Error(error.response.data?.message || ERROR_MESSAGES.network);
      }
    } else {
      throw new Error(ERROR_MESSAGES.network);
    }
  }
);

// Services API
export const albumsAPI = {
  // Récupérer tous les albums
  getAll: () => api.get(API_ENDPOINTS.albums),
  
  // Récupérer un album par ID
  getById: (id) => api.get(`${API_ENDPOINTS.albums}/${id}`),
  
  // Créer un nouvel album
  create: (albumData) => api.post(API_ENDPOINTS.albums, albumData),
  
  // Mettre à jour un album
  update: (id, albumData) => api.put(`${API_ENDPOINTS.albums}/${id}`, albumData),
  
  // Supprimer un album
  delete: (id) => api.delete(`${API_ENDPOINTS.albums}/${id}`)
};

export const photosAPI = {
  // Upload une photo vers Cloudinary
  upload: (formData) => api.post(API_ENDPOINTS.upload, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  
  // Ajouter une photo à un album
  addToAlbum: (albumId, photoData) => 
    api.post(`${API_ENDPOINTS.albums}/${albumId}/photos`, photoData),
  
  // Supprimer une photo d'un album
  removeFromAlbum: (albumId, photoId) => 
    api.delete(`${API_ENDPOINTS.albums}/${albumId}/photos/${photoId}`)
};

export const authAPI = {
  // Connexion admin
  login: (credentials) => api.post(`${API_ENDPOINTS.auth}/login`, credentials),
  
  // Vérifier le token
  verify: () => api.get(`${API_ENDPOINTS.auth}/verify`),
  
  // Déconnexion
  logout: () => {
    localStorage.removeItem('authToken');
    return Promise.resolve();
  }
};

export default api;