import { albumsData } from '../../data/albums';

class FileManager {
    constructor() {
        this.albums = [...albumsData];
    }

    /**
     * Générer un ID d'album à partir du titre
     */
    generateAlbumId(title) {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '') // Supprimer caractères spéciaux
            .replace(/\s+/g, '-') // Remplacer espaces par tirets
            .replace(/-+/g, '-') // Éviter tirets multiples
            .replace(/^-|-$/g, ''); // Supprimer tirets début/fin
    }

    /**
     * Générer des IDs simples pour les photos
     */
    generatePhotoIds(photos) {
        return photos.map((photo, index) => ({
            ...photo,
            id: (index + 1).toString(), // ID simple : "1", "2", "3"...
            order: index + 1
        }));
    }

    /**
     * Ajouter un nouvel album
     */
    addAlbum(albumData) {
        // Générer l'ID de l'album à partir du titre
        const albumId = this.generateAlbumId(albumData.title);

        // Vérifier que l'ID n'existe pas déjà
        const existingAlbum = this.albums.find(album => album.id === albumId);
        if (existingAlbum) {
            throw new Error(`Un album avec l'ID "${albumId}" existe déjà`);
        }

        // Standardiser les données avec IDs simples
        const standardizedAlbum = this.standardizeAlbumData({
            ...albumData,
            id: albumId
        });

        // Ajouter l'album
        this.albums.push(standardizedAlbum);

        return standardizedAlbum;
    }

    /**
     * Modifier un album existant
     */
    updateAlbum(albumId, albumData) {
        const albumIndex = this.albums.findIndex(album => album.id === albumId);
        if (albumIndex === -1) {
            throw new Error(`Album avec l'ID "${albumId}" non trouvé`);
        }

        // Standardiser les données
        const standardizedAlbum = this.standardizeAlbumData({
            ...albumData,
            id: albumId, // Garder l'ID original
            createdAt: this.albums[albumIndex].createdAt // Garder la date de création
        });

        // Remplacer l'album
        this.albums[albumIndex] = standardizedAlbum;

        return standardizedAlbum;
    }

    /**
     * Supprimer un album
     */
    deleteAlbum(albumId) {
        const albumIndex = this.albums.findIndex(album => album.id === albumId);
        if (albumIndex === -1) {
            throw new Error(`Album avec l'ID "${albumId}" non trouvé`);
        }

        const deletedAlbum = this.albums[albumIndex];
        this.albums.splice(albumIndex, 1);

        return deletedAlbum;
    }

    /**
     * Standardiser les données d'un album
     */
    standardizeAlbumData(albumData) {
        // Standardiser les photos avec IDs simples
        const standardizedPhotos = this.generatePhotoIds(albumData.photos.map(photo => ({
            src: photo.src || photo.secure_url,
            title: photo.title || '',
            description: photo.description || ''
        })));

        return {
            id: albumData.id,
            title: albumData.title.trim(),
            description: albumData.description.trim(),
            category: albumData.category.trim(),
            coverImage: albumData.coverImage || standardizedPhotos[0]?.src || '',
            photos: standardizedPhotos,
            photoCount: standardizedPhotos.length,
            createdAt: albumData.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    /**
     * Générer le code JavaScript pour albums.js
     */
    generateAlbumsFileContent() {
        const albumsCode = JSON.stringify(this.albums, null, 2);

        return `export const albumsData = ${albumsCode};

// Helper function to get album by ID
export const getAlbumById = (id) => {
  return albumsData.find(album => album.id === id);
};

// Helper function to get albums for gallery (without photos data for performance)
export const getGalleryAlbums = () => {
  return albumsData.map(({ photos, ...album }) => ({
    ...album,
    photoCount: photos.length
  }));
};

// Helper function to get all unique categories
export const getAllCategories = () => {
  const categories = [...new Set(albumsData.map(album => album.category))];
  return categories.sort();
};

// Helper function to get albums by category
export const getAlbumsByCategory = (category) => {
  return albumsData.filter(album => album.category === category);
};

// Helper function to get recent albums
export const getRecentAlbums = (limit = 3) => {
  return albumsData
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
};

// Helper function to search albums
export const searchAlbums = (query) => {
  const searchTerm = query.toLowerCase();
  return albumsData.filter(album => 
    album.title.toLowerCase().includes(searchTerm) ||
    album.description.toLowerCase().includes(searchTerm)
  );
};`;
    }

    /**
     * Sauvegarder directement dans le fichier albums.js
     */
    async saveAlbums() {
        try {
            const fileContent = this.generateAlbumsFileContent();

            // Méthode 1 : API File System Access (navigateurs modernes)
            if ('showDirectoryPicker' in window) {
                const choice = await this.showDirectoryInstructions();

                if (choice === 'directory') {
                    return await this.saveWithDirectoryPicker(fileContent);
                }
            }

            // Fallback : téléchargement + instructions
            return this.saveAlbumsWithDownload(fileContent);

        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);

            // Afficher l'erreur à l'utilisateur
            alert(`Erreur: ${error.message}`);

            // Fallback en cas d'erreur
            const fileContent = this.generateAlbumsFileContent();
            return this.saveAlbumsWithDownload(fileContent);
        }
    }

    /**
     * Sauvegarder avec sélecteur de dossier (méthode recommandée)
     */
    async saveWithDirectoryPicker(fileContent) {
        try {
            // Demander l'accès au dossier du projet
            const directoryHandle = await window.showDirectoryPicker({
                mode: 'readwrite'
            });

            // Naviguer vers src/data/
            const srcHandle = await directoryHandle.getDirectoryHandle('src');
            const dataHandle = await srcHandle.getDirectoryHandle('data');

            // Obtenir le fichier albums.js
            const fileHandle = await dataHandle.getFileHandle('albums.js', {
                create: false // Ne pas créer si n'existe pas
            });

            // Écrire le contenu
            const writable = await fileHandle.createWritable();
            await writable.write(fileContent);
            await writable.close();

            return {
                success: true,
                message: '✅ Fichier albums.js mis à jour avec succès !',
                albumsCount: this.albums.length,
                direct: true
            };

        } catch (error) {
            console.error('Erreur avec Directory Picker:', error);

            if (error.name === 'NotFoundError') {
                throw new Error('Fichier albums.js non trouvé. Assurez-vous de sélectionner le bon dossier.');
            }

            throw error;
        }
    }

    /**
     * Instructions pour la première utilisation
     */
    showDirectoryInstructions() {
        const modal = document.createElement('div');
        modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      font-family: system-ui, sans-serif;
    `;

        const content = document.createElement('div');
        content.style.cssText = `
      background: white;
      padding: 30px;
      border-radius: 12px;
      max-width: 600px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    `;

        content.innerHTML = `
      <h2 style="margin: 0 0 20px 0; color: #2c3e50;">
        📁 Sélection du dossier du projet
      </h2>
      
      <div style="background: #e7f3ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #0066cc;">Instructions :</h3>
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Cliquez sur <strong>"Sélectionner le dossier"</strong></li>
          <li>Naviguez vers votre dossier de projet <code>photographe</code></li>
          <li>Sélectionnez le dossier racine (qui contient <code>src/</code>)</li>
          <li>Autorisez l'accès en écriture</li>
        </ol>
      </div>
      
      <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0; color: #856404;">
          ⚠️ <strong>Important :</strong> Cette fonctionnalité nécessite un navigateur moderne 
          (Chrome, Edge, Opera). Firefox ne la supporte pas encore.
        </p>
      </div>
      
      <div style="text-align: center;">
        <button id="selectDirectory" style="
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-right: 10px;
          font-size: 16px;
        ">
          📁 Sélectionner le dossier
        </button>
        <button id="useFallback" style="
          background: #6c757d;
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 16px;
        ">
          Utiliser le téléchargement
        </button>
      </div>
    `;

        modal.appendChild(content);
        document.body.appendChild(modal);

        return new Promise((resolve) => {
            const selectButton = content.querySelector('#selectDirectory');
            const fallbackButton = content.querySelector('#useFallback');

            selectButton.addEventListener('click', () => {
                document.body.removeChild(modal);
                resolve('directory');
            });

            fallbackButton.addEventListener('click', () => {
                document.body.removeChild(modal);
                resolve('fallback');
            });
        });
    }

    /**
     * Méthode de fallback avec téléchargement
     */
    saveAlbumsWithDownload(fileContent) {
        // Créer un blob avec le contenu
        const blob = new Blob([fileContent], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);

        // Créer un lien de téléchargement
        const link = document.createElement('a');
        link.href = url;
        link.download = 'albums.js';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Nettoyer l'URL
        URL.revokeObjectURL(url);

        // Afficher le contenu dans la console pour copier-coller
        console.log('📁 Contenu du fichier albums.js à copier-coller :');
        console.log('='.repeat(60));
        console.log(fileContent);
        console.log('='.repeat(60));

        // Afficher les instructions
        this.showSaveInstructions(fileContent);

        return {
            success: true,
            message: 'Fichier généré avec succès ! Consultez la console et la modal pour les instructions.',
            albumsCount: this.albums.length
        };
    }

    /**
     * Afficher les instructions de sauvegarde
     */
    showSaveInstructions(fileContent) {
        // Créer une modal avec les instructions
        const modal = document.createElement('div');
        modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      font-family: system-ui, sans-serif;
    `;

        const content = document.createElement('div');
        content.style.cssText = `
      background: white;
      padding: 30px;
      border-radius: 12px;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    `;

        content.innerHTML = `
      <h2 style="margin: 0 0 20px 0; color: #2c3e50;">
        📁 Instructions de Sauvegarde
      </h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #495057;">Étapes à suivre :</h3>
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li><strong>Ouvrez</strong> le fichier <code>src/data/albums.js</code></li>
          <li><strong>Sélectionnez tout</strong> le contenu (Ctrl+A)</li>
          <li><strong>Supprimez</strong> le contenu existant</li>
          <li><strong>Collez</strong> le nouveau contenu depuis la console</li>
          <li><strong>Sauvegardez</strong> le fichier (Ctrl+S)</li>
        </ol>
      </div>
      
      <div style="background: #d4edda; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0; color: #155724;">
          ✅ <strong>Le nouveau contenu est disponible dans :</strong><br>
          • La console du navigateur (F12)<br>
          • Le fichier téléchargé automatiquement
        </p>
      </div>
      
      <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0; color: #856404;">
          ⚠️ <strong>Important :</strong> Après avoir collé le contenu, 
          votre application se rechargera automatiquement avec les nouveaux albums.
        </p>
      </div>
      
      <div style="text-align: center;">
        <button id="copyToClipboard" style="
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-right: 10px;
        ">
          📋 Copier le contenu
        </button>
        <button id="closeModal" style="
          background: #6c757d;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        ">
          Fermer
        </button>
      </div>
    `;

        modal.appendChild(content);
        document.body.appendChild(modal);

        // Gestion des événements
        const copyButton = content.querySelector('#copyToClipboard');
        const closeButton = content.querySelector('#closeModal');

        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(fileContent);
                copyButton.textContent = '✅ Copié !';
                copyButton.style.background = '#28a745';
                setTimeout(() => {
                    copyButton.textContent = '📋 Copier le contenu';
                    copyButton.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                }, 2000);
            } catch (err) {
                alert('Erreur lors de la copie. Utilisez la console pour copier le contenu.');
            }
        });

        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Fermer en cliquant sur l'overlay
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    /**
     * Obtenir les statistiques des albums
     */
    getStats() {
        const categories = [...new Set(this.albums.map(album => album.category))];
        const totalPhotos = this.albums.reduce((total, album) => total + album.photos.length, 0);

        return {
            totalAlbums: this.albums.length,
            totalPhotos: totalPhotos,
            categories: categories.length,
            categoriesList: categories
        };
    }

    /**
     * Valider les données d'un album
     */
    validateAlbumData(albumData) {
        const errors = [];

        if (!albumData.title?.trim()) {
            errors.push('Le titre est obligatoire');
        }

        if (!albumData.description?.trim()) {
            errors.push('La description est obligatoire');
        }

        if (!albumData.category?.trim()) {
            errors.push('La catégorie est obligatoire');
        }

        if (!albumData.photos || albumData.photos.length === 0) {
            errors.push('Au moins une photo est requise');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

// Instance singleton
const fileManager = new FileManager();

export default fileManager;

// Fonctions utilitaires exportées
export const {
    addAlbum,
    updateAlbum,
    deleteAlbum,
    saveAlbums,
    getStats,
    validateAlbumData,
    generateAlbumId
} = fileManager;
