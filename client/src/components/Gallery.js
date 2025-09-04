import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGalleryAlbums } from '../data/albums';
import './Gallery.css';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  // Get albums data from shared source
  const albums = getGalleryAlbums();

  // Function to get dynamic categories from existing albums
  const getDynamicCategories = () => {
    const savedAlbums = JSON.parse(localStorage.getItem('albumsData') || '[]');
    const existingCategories = [...new Set(savedAlbums.map(album => album.category))];
    
    // Default category labels mapping
    const categoryLabels = {
      'portrait': 'Portraits',
      'landscape': 'Paysages',
      'concerts': 'Concerts',
      'essais': 'Essais',
      'event': 'Événements'
    };
    
    // Start with "All" category
    const dynamicCategories = [{ key: 'all', label: 'Tous les Albums' }];
    
    // Add existing categories with proper labels
    existingCategories.forEach(category => {
      if (category) {
        const label = categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1);
        dynamicCategories.push({ key: category, label });
      }
    });
    
    return dynamicCategories;
  };

  // Update categories when component mounts or albums change
  useEffect(() => {
    setCategories(getDynamicCategories());
  }, [albums]);

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

        {/* Grille d'albums */}
        <div className="gallery-grid">
          {filteredAlbums.map(album => (
            <Link
              key={album.id}
              to={`/gallery/${album.id}`}
              className="gallery-item album-card"
            >
              <img src={album.coverImage} alt={album.title} />
              <div className="gallery-overlay">
                <h3>{album.title}</h3>
                <p>{album.description}</p>
                <span className="photo-count">{album.photoCount} photos</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;