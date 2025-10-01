import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAlbumById } from '../data/albums';
import './AlbumForm.css';

const AlbumForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    category: 'portrait',
    coverImage: '',
    sortOrder: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const navigate = useNavigate();
  const { albumId } = useParams();

  const defaultCategories = [
    { value: 'portrait', label: 'Portrait' },
    { value: 'landscape', label: 'Paysage' },
    { value: 'concerts', label: 'Concerts' },
    { value: 'essais', label: 'Essais' },
    { value: 'event', label: 'Événements' }
  ];

  // Get existing categories from localStorage
  const getExistingCategories = () => {
    const savedAlbums = JSON.parse(localStorage.getItem('albumsData') || '[]');
    const existingCategories = [...new Set(savedAlbums.map(album => album.category))];
    const allCategories = [...defaultCategories];
    
    existingCategories.forEach(cat => {
      if (!defaultCategories.find(dc => dc.value === cat)) {
        allCategories.push({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) });
      }
    });
    
    return allCategories;
  };

  const [categories] = useState(getExistingCategories());

  useEffect(() => {
    if (albumId && albumId !== 'new') {
      setIsEditing(true);
      const album = getAlbumById(albumId);
      if (album) {
        setFormData({
          id: album.id,
          title: album.title,
          description: album.description,
          category: album.category,
          coverImage: album.coverImage,
          sortOrder: album.sortOrder || ''
        });
      }
    }
  }, [albumId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'category' && value === 'custom') {
      setShowCustomCategory(true);
      return;
    }
    
    if (name === 'category' && value !== 'custom') {
      setShowCustomCategory(false);
      setCustomCategory('');
    }
    
    // Auto-generate ID when title changes (only for new albums)
    if (name === 'title' && !isEditing) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        id: generateId(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCustomCategoryChange = (e) => {
    setCustomCategory(e.target.value);
  };

  const generateId = (title) => {
    return title
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }
    
    if (!formData.id.trim()) {
      newErrors.id = 'L\'ID est requis';
    }
    
    if (!formData.coverImage.trim()) {
      newErrors.coverImage = 'L\'image de couverture est requise';
    } else if (!isValidUrl(formData.coverImage)) {
      newErrors.coverImage = 'L\'URL de l\'image n\'est pas valide';
    }
    
    if (formData.sortOrder && isNaN(Number(formData.sortOrder))) {
      newErrors.sortOrder = 'L\'ordre de tri doit être un nombre';
    }
    
    // Check for duplicate ID
    const savedAlbums = JSON.parse(localStorage.getItem('albumsData') || '[]');
    if (savedAlbums.some(album => album.id === formData.id && (!isEditing || album.id !== albumId))) {
      newErrors.id = 'Un album avec cet ID existe déjà';
    }
    
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
    
    const finalCategory = showCustomCategory ? customCategory.toLowerCase().trim() : formData.category;
    const finalFormData = { ...formData, category: finalCategory };

    if (isEditing) {
      // Update existing album
      const updatedAlbums = savedAlbums.map(album =>
        album.id === formData.id
          ? { ...album, ...finalFormData }
          : album
      );
      localStorage.setItem('albumsData', JSON.stringify(updatedAlbums));
    } else {
      // Create new album
      const newAlbum = {
        ...finalFormData,
        id: formData.id,
        photoCount: 0,
        photos: [],
        sortOrder: formData.sortOrder ? Number(formData.sortOrder) : 0
      };
      
      const updatedAlbums = [...savedAlbums, newAlbum];
      localStorage.setItem('albumsData', JSON.stringify(updatedAlbums));
    }
    
    navigate('/admin/dashboard');
  };

  return (
    <div className="album-form-page">
      <div className="admin-header">
        <div className="container">
          <div className="header-content">
            <h1>{isEditing ? 'Modifier l\'album' : 'Nouvel album'}</h1>
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
            <form onSubmit={handleSubmit} className="album-form">
              <div className="form-group">
                <label htmlFor="title">Titre de l'album *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={errors.title ? 'error' : ''}
                  placeholder="Entrez le titre de l'album"
                />
                {errors.title && <span className="error-text">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={errors.description ? 'error' : ''}
                  placeholder="Décrivez l'album"
                  rows="4"
                />
                {errors.description && <span className="error-text">{errors.description}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="category">Catégorie *</label>
                <select
                  id="category"
                  name="category"
                  value={showCustomCategory ? 'custom' : formData.category}
                  onChange={handleChange}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                  <option value="custom">+ Créer une nouvelle catégorie</option>
                </select>
                {showCustomCategory && (
                  <input
                    type="text"
                    value={customCategory}
                    onChange={handleCustomCategoryChange}
                    placeholder="Nom de la nouvelle catégorie"
                    className="custom-category-input"
                    style={{ marginTop: '0.5rem' }}
                  />
                )}
              </div>

              <div className="form-group">
                <label htmlFor="coverImage">Image de couverture (URL) *</label>
                <input
                  type="url"
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  className={errors.coverImage ? 'error' : ''}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.coverImage && <span className="error-text">{errors.coverImage}</span>}
                {formData.coverImage && isValidUrl(formData.coverImage) && (
                  <div className="image-preview">
                    <img src={formData.coverImage} alt="Aperçu" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="id">ID de l'album *</label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className={errors.id ? 'error' : ''}
                  placeholder="identifiant-unique-album"
                />
                {errors.id && <span className="error-text">{errors.id}</span>}
                <small>L'ID est généré automatiquement à partir du titre, mais peut être modifié</small>
              </div>

              <div className="form-group">
                <label htmlFor="sortOrder">Ordre de tri (optionnel)</label>
                <input
                  type="number"
                  id="sortOrder"
                  name="sortOrder"
                  value={formData.sortOrder}
                  onChange={handleChange}
                  className={errors.sortOrder ? 'error' : ''}
                  placeholder="1, 2, 3..."
                  min="0"
                />
                {errors.sortOrder && <span className="error-text">{errors.sortOrder}</span>}
                <small>Définit l'ordre d'affichage des albums (plus petit = affiché en premier)</small>
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
                  {isEditing ? 'Mettre à jour' : 'Créer l\'album'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumForm;