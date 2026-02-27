import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGalleryAlbums, getAllCategories } from '../data/albums';
import './Gallery.css';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  // Get albums data
  const albums = getGalleryAlbums();

  // Setup categories on component mount
  useEffect(() => {
    const categoryLabels = {
      'portrait': 'Portraits',
      'landscape': 'Paysages', 
      'concerts': 'Concerts',
      'essais': 'Essais',
      'event': 'Événements'
    };

    const dynamicCategories = [{ key: 'all', label: 'Tous les Albums' }];
    
    getAllCategories().forEach(category => {
      if (category) {
        const label = categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1);
        dynamicCategories.push({ key: category, label });
      }
    });
    
    setCategories(dynamicCategories);
  }, []);

  // Filter albums based on selected category
  const filteredAlbums = selectedCategory === 'all'
    ? albums
    : albums.filter(album => album.category === selectedCategory);

  return (
    <div className="gallery">
      <div className="container">
        <div className="gallery-header">
          <h1>Galerie</h1>
          <p>Explorez mes collections photographiques organisées par thème</p>
        </div>

        {/* Filtres */}
        <div className="gallery-filters">
          {categories.map(category => (
            <button
              key={category.key}
              className={`filter-btn ${selectedCategory === category.key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Albums Grid */}
        <div className="albums-grid">
          {filteredAlbums.map(album => (
            <Link to={`/gallery/${album.id}`} key={album.id} className="album-card">
              <div className="album-image">
                <img src={album.coverImage} alt={album.title} />
                <div className="album-overlay">
                  <div className="album-info">
                    <h3>{album.title}</h3>
                    <p>{album.photoCount} photos</p>
                  </div>
                </div>
              </div>
              <div className="album-details">
                <h4>{album.title}</h4>
                <p>{album.description}</p>
                <span className="album-category">{album.category}</span>
              </div>
            </Link>
          ))}
        </div>

        {filteredAlbums.length === 0 && (
          <div className="no-albums">
            <p>Aucun album trouvé pour cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;