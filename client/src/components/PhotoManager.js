import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PhotoManager.css';

const PhotoManager = () => {
  const [album, setAlbum] = useState(null);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    src: '',
    sortOrder: ''
  });
  const navigate = useNavigate();
  const { albumId } = useParams();

  useEffect(() => {
    loadAlbum();
  }, [albumId, loadAlbum]);

  const loadAlbum = () => {
    const savedAlbums = JSON.parse(localStorage.getItem('albumsData') || '[]');
    const foundAlbum = savedAlbums.find(a => a.id === albumId);
    setAlbum(foundAlbum);
  };

  const handleEditPhoto = (photo) => {
    setEditingPhoto(photo.id);
    setEditForm({
      title: photo.title || '',
      description: photo.description || '',
      src: photo.src,
      sortOrder: photo.sortOrder || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingPhoto(null);
    setEditForm({ title: '', description: '', src: '', sortOrder: '' });
  };

  const handleSaveEdit = () => {
    const savedAlbums = JSON.parse(localStorage.getItem('albumsData') || '[]');
    
    const updatedAlbums = savedAlbums.map(a => {
      if (a.id === albumId) {
        const updatedPhotos = a.photos.map(photo => {
          if (photo.id === editingPhoto) {
            return {
              ...photo,
              title: editForm.title,
              description: editForm.description,
              src: editForm.src,
              sortOrder: editForm.sortOrder ? Number(editForm.sortOrder) : 0
            };
          }
          return photo;
        });
        return { ...a, photos: updatedPhotos };
      }
      return a;
    });
    
    localStorage.setItem('albumsData', JSON.stringify(updatedAlbums));
    setEditingPhoto(null);
    loadAlbum();
  };

  const handleDeletePhoto = (photoId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
      const savedAlbums = JSON.parse(localStorage.getItem('albumsData') || '[]');
      
      const updatedAlbums = savedAlbums.map(a => {
        if (a.id === albumId) {
          const updatedPhotos = a.photos.filter(photo => photo.id !== photoId);
          return { 
            ...a, 
            photos: updatedPhotos,
            photoCount: updatedPhotos.length
          };
        }
        return a;
      });
      
      localStorage.setItem('albumsData', JSON.stringify(updatedAlbums));
      loadAlbum();
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };


  if (!album) {
    return (
      <div className="photo-manager-page">
        <div className="admin-header">
          <div className="container">
            <div className="header-content">
              <h1>Album non trouvé</h1>
              <button 
                onClick={() => navigate('/admin/dashboard')} 
                className="back-btn"
              >
                Retour
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="photo-manager-page">
      <div className="admin-header">
        <div className="container">
          <div className="header-content">
            <h1>Gérer les photos - {album.title}</h1>
            <div className="header-actions">
              <button 
                onClick={() => navigate('/admin/photos/new')} 
                className="add-photo-btn"
              >
                Ajouter une photo
              </button>
              <button 
                onClick={() => navigate('/admin/dashboard')} 
                className="back-btn"
              >
                Retour
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="photo-manager-content">
        <div className="container">
          <div className="album-info">
            <p>{album.photos?.length || 0} photo(s) dans cet album</p>
          </div>

          {album.photos && album.photos.length > 0 ? (
            <div className="photos-grid">
              {album.photos
                .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                .map(photo => (
                <div key={photo.id} className="photo-card">
                  <div className="photo-image">
                    <img src={photo.src} alt={photo.title || 'Photo'} />
                  </div>
                  
                  {editingPhoto === photo.id ? (
                    <div className="photo-edit-form">
                      <div className="form-group">
                        <label>URL de la photo</label>
                        <input
                          type="url"
                          name="src"
                          value={editForm.src}
                          onChange={handleFormChange}
                          placeholder="https://example.com/photo.jpg"
                        />
                      </div>
                      <div className="form-group">
                        <label>Titre</label>
                        <input
                          type="text"
                          name="title"
                          value={editForm.title}
                          onChange={handleFormChange}
                          placeholder="Titre de la photo"
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          name="description"
                          value={editForm.description}
                          onChange={handleFormChange}
                          placeholder="Description de la photo"
                          rows="3"
                        />
                      </div>
                      <div className="form-group">
                        <label>Ordre de tri</label>
                        <input
                          type="number"
                          name="sortOrder"
                          value={editForm.sortOrder}
                          onChange={handleFormChange}
                          placeholder="1, 2, 3..."
                          min="0"
                        />
                        <small>Définit l'ordre d'affichage dans l'album</small>
                      </div>
                      <div className="edit-actions">
                        <button onClick={handleSaveEdit} className="save-btn">
                          Sauvegarder
                        </button>
                        <button onClick={handleCancelEdit} className="cancel-btn">
                          Annuler
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="photo-info">
                      <h3>{photo.title || 'Sans titre'}</h3>
                      <p>{photo.description || 'Aucune description'}</p>
                      <p className="photo-sort-order">Ordre: {photo.sortOrder || 0}</p>
                      <div className="photo-actions">
                        <button 
                          onClick={() => handleEditPhoto(photo)}
                          className="edit-btn"
                        >
                          Modifier
                        </button>
                        <button 
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="delete-btn"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-photos-message">
              <p>Aucune photo dans cet album.</p>
              <button 
                onClick={() => navigate('/admin/photos/new')}
                className="add-first-photo-btn"
              >
                Ajouter la première photo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoManager;