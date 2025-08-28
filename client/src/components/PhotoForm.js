import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PhotoForm.css';

const PhotoForm = () => {
  const [formData, setFormData] = useState({
    albumId: '',
    photos: [{ src: '', title: '', description: '', sortOrder: '' }]
  });
  const [albums, setAlbums] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Load albums from localStorage
    const savedAlbums = JSON.parse(localStorage.getItem('albumsData') || '[]');
    setAlbums(savedAlbums);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhotoChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.map((photo, i) =>
        i === index ? { ...photo, [field]: value } : photo
      )
    }));
    
    // Clear error when user starts typing
    if (errors[`photo_${index}_${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`photo_${index}_${field}`]: ''
      }));
    }
  };

  const addPhotoField = () => {
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, { src: '', title: '', description: '', sortOrder: '' }]
    }));
  };

  const removePhotoField = (index) => {
    if (formData.photos.length > 1) {
      setFormData(prev => ({
        ...prev,
        photos: prev.photos.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.albumId) {
      newErrors.albumId = 'Veuillez sélectionner un album';
    }
    
    formData.photos.forEach((photo, index) => {
      if (!photo.src.trim()) {
        newErrors[`photo_${index}_src`] = 'L\'URL de la photo est requise';
      } else if (!isValidUrl(photo.src)) {
        newErrors[`photo_${index}_src`] = 'L\'URL de la photo n\'est pas valide';
      }
      
      if (photo.sortOrder && isNaN(Number(photo.sortOrder))) {
        newErrors[`photo_${index}_sortOrder`] = 'L\'ordre de tri doit être un nombre';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const savedAlbums = JSON.parse(localStorage.getItem('albumsData') || '[]');
    
    // Find the album and add all photos
    const updatedAlbums = savedAlbums.map(album => {
      if (album.id === formData.albumId) {
        const newPhotos = formData.photos.map((photo, index) => ({
          id: Date.now() + index, // Unique ID generation
          src: photo.src,
          title: photo.title || '',
          description: photo.description || '',
          sortOrder: photo.sortOrder ? Number(photo.sortOrder) : 0
        }));
        
        return {
          ...album,
          photos: [...(album.photos || []), ...newPhotos],
          photoCount: (album.photoCount || 0) + newPhotos.length
        };
      }
      return album;
    });
    
    localStorage.setItem('albumsData', JSON.stringify(updatedAlbums));
    navigate('/admin/dashboard');
  };

  return (
    <div className="photo-form-page">
      <div className="admin-header">
        <div className="container">
          <div className="header-content">
            <h1>Ajouter des photos</h1>
            <button 
              onClick={() => navigate('/admin/dashboard')} 
              className="back-btn"
            >
              Retour
            </button>
          </div>
        </div>
      </div>

      <div className="form-content">
        <div className="container">
          <div className="form-container">
            <form onSubmit={handleSubmit} className="photo-form">
              <div className="form-group">
                <label htmlFor="albumId">Album de destination *</label>
                <select
                  id="albumId"
                  name="albumId"
                  value={formData.albumId}
                  onChange={handleChange}
                  className={errors.albumId ? 'error' : ''}
                >
                  <option value="">Sélectionnez un album</option>
                  {albums.map(album => (
                    <option key={album.id} value={album.id}>
                      {album.title} ({album.photoCount || 0} photos)
                    </option>
                  ))}
                </select>
                {errors.albumId && <span className="error-text">{errors.albumId}</span>}
              </div>

              {formData.photos.map((photo, index) => (
                <div key={index} className="photo-group">
                  <div className="photo-group-header">
                    <h3>Photo {index + 1}</h3>
                    {formData.photos.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePhotoField(index)}
                        className="remove-photo-btn"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor={`src_${index}`}>URL de la photo *</label>
                    <input
                      type="url"
                      id={`src_${index}`}
                      value={photo.src}
                      onChange={(e) => handlePhotoChange(index, 'src', e.target.value)}
                      className={errors[`photo_${index}_src`] ? 'error' : ''}
                      placeholder="https://example.com/photo.jpg"
                    />
                    {errors[`photo_${index}_src`] && (
                      <span className="error-text">{errors[`photo_${index}_src`]}</span>
                    )}
                    {photo.src && isValidUrl(photo.src) && (
                      <div className="image-preview">
                        <img src={photo.src} alt="Aperçu" />
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor={`title_${index}`}>Titre de la photo (optionnel)</label>
                    <input
                      type="text"
                      id={`title_${index}`}
                      value={photo.title}
                      onChange={(e) => handlePhotoChange(index, 'title', e.target.value)}
                      placeholder="Titre de la photo"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`description_${index}`}>Description (optionnelle)</label>
                    <textarea
                      id={`description_${index}`}
                      value={photo.description}
                      onChange={(e) => handlePhotoChange(index, 'description', e.target.value)}
                      placeholder="Description de la photo"
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`sortOrder_${index}`}>Ordre de tri (optionnel)</label>
                    <input
                      type="number"
                      id={`sortOrder_${index}`}
                      value={photo.sortOrder}
                      onChange={(e) => handlePhotoChange(index, 'sortOrder', e.target.value)}
                      className={errors[`photo_${index}_sortOrder`] ? 'error' : ''}
                      placeholder="1, 2, 3..."
                      min="0"
                    />
                    {errors[`photo_${index}_sortOrder`] && (
                      <span className="error-text">{errors[`photo_${index}_sortOrder`]}</span>
                    )}
                    <small>Définit l'ordre d'affichage dans l'album (plus petit = affiché en premier)</small>
                  </div>
                </div>
              ))}

              <div className="add-photo-section">
                <button
                  type="button"
                  onClick={addPhotoField}
                  className="add-photo-field-btn"
                >
                  + Ajouter une autre photo
                </button>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  onClick={() => navigate('/admin/dashboard')}
                  className="cancel-btn"
                >
                  Annuler
                </button>
                <button type="submit" className="submit-btn">
                  Ajouter {formData.photos.length} photo{formData.photos.length > 1 ? 's' : ''}
                </button>
              </div>
            </form>

            {albums.length === 0 && (
              <div className="no-albums-message">
                <p>Aucun album disponible. Vous devez d'abord créer un album avant d'ajouter des photos.</p>
                <button 
                  onClick={() => navigate('/admin/albums/new')}
                  className="create-album-btn"
                >
                  Créer un album
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoForm;