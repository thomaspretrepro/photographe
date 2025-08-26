import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Albums data
  const albums = [
    {
      id: 'portraits-elegants',
      title: 'Portraits Élégants',
      description: 'Une série de portraits capturant l\'élégance et la personnalité unique de chaque sujet.',
      category: 'portrait',
      coverImage: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1752831346/_DSC0660_eea9yl.jpg',
      photoCount: 4
    }, 
    {

      id: 'portraits-claire-cerceaux',
      title: 'Portraits Claire',
      description: 'Une série de portraits de femmes',
      category: 'portrait',
      coverImage: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756200568/_MG_5517_1_nc7iy7.jpg',
      photoCount: 4
    },
    {
      id: 'paysages-majestueux',
      title: 'Paysages Majestueux',
      description: 'Exploration de la beauté naturelle à travers des paysages époustouflants.',
      category: 'landscape',
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      photoCount: 4
    },
    {
      id: 'moments-precieux',
      title: 'Moments Précieux',
      description: 'Capture d\'instants uniques lors d\'événements et célébrations.',
      category: 'event',
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      photoCount: 4
    }
  ];

  const categories = [
    { key: 'all', label: 'Tous les Albums' },
    { key: 'portrait', label: 'Portraits' },
    { key: 'landscape', label: 'Paysages' },
    { key: 'event', label: 'Événements' }
  ];

  const filteredAlbums = selectedCategory === 'all'
    ? albums
    : albums.filter(album => album.category === selectedCategory);

  return (
    <div className="gallery">
      <div className="container">
        <div className="gallery-header">
          <h1>Albums Photo</h1>
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