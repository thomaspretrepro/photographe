import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGalleryAlbums, getAllCategories } from '../../data/albums';
import { ALBUM_CATEGORIES } from '../../utils/constants';
import './Gallery.css';

const Gallery = () => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlbums();
  }, []);

  useEffect(() => {
    filterAlbums();
  }, [albums, selectedCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadAlbums = () => {
    try {
      setLoading(true);
      // Utilisation des données locales
      const albumsData = getGalleryAlbums();
      setAlbums(albumsData);
    } catch (err) {
      console.error('Error loading albums:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterAlbums = () => {
    if (selectedCategory === 'all') {
      setFilteredAlbums(albums);
    } else {
      setFilteredAlbums(albums.filter(album => album.category === selectedCategory));
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Obtenir les catégories dynamiquement depuis les données
  const availableCategories = getAllCategories();

  if (loading) {
    return (
      <div className="gallery">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Chargement des albums...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery">
      <div className="container">
        {/* Header */}
        <div className="gallery-header">
          <h1>Galerie</h1>
          <p>Explorez mes collections photographiques organisées par thème</p>
        </div>

        {/* Filtres */}
        <div className="gallery-filters">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            Tous les Albums
          </button>
          {availableCategories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {ALBUM_CATEGORIES[category] || category}
            </button>
          ))}
        </div>

        {/* Albums Grid */}
        {filteredAlbums.length > 0 ? (
          <div className="albums-grid">
            {filteredAlbums.map(album => (
              <Link 
                to={`/gallery/${album.id}`} 
                key={album.id} 
                className="album-card"
              >
                <div className="album-image">
                  <img src={album.coverImage} alt={album.title} />
                  <div className="album-overlay">
                    <div className="album-info">
                      <h3>{album.title}</h3>
                      <p>{album.photoCount || 0} photos</p>
                    </div>
                  </div>
                </div>
                <div className="album-details">
                  <h4>{album.title}</h4>
                  <p>{album.description}</p>
                  <span className="album-category">
                    {ALBUM_CATEGORIES[album.category] || album.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-albums">
            <p>Aucun album trouvé pour cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;