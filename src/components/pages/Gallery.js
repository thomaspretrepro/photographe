import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { albumsAPI } from '../../services/api';
import { ALBUM_CATEGORIES } from '../../utils/constants';
import './Gallery.css';

const Gallery = () => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAlbums();
  }, []);

  useEffect(() => {
    filterAlbums();
  }, [albums, selectedCategory]);

  const loadAlbums = async () => {
    try {
      setLoading(true);
      const response = await albumsAPI.getAll();
      setAlbums(response.data.albums || []);
    } catch (err) {
      setError('Erreur lors du chargement des albums');
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

  if (error) {
    return (
      <div className="gallery">
        <div className="container">
          <div className="error">
            <p>{error}</p>
            <button onClick={loadAlbums} className="btn">
              Réessayer
            </button>
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
          {Object.entries(ALBUM_CATEGORIES).map(([key, label]) => (
            <button
              key={key}
              className={`filter-btn ${selectedCategory === key ? 'active' : ''}`}
              onClick={() => handleCategoryChange(key)}
            >
              {label}
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
                      <p>{album.photos?.length || 0} photos</p>
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