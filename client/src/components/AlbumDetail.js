import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './AlbumDetail.css';

const AlbumDetail = () => {
  const { albumId } = useParams();
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Albums data
  const albums = {
    'portraits-elegants': {
      id: 'portraits-elegants',
      title: 'Portraits Élégants',
      description: 'Une série de portraits capturant l\'élégance et la personnalité unique de chaque sujet.',
      category: 'Portraits',
      coverImage: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1752831346/_DSC0660_eea9yl.jpg',
      photos: [
        {
          id: 1,
          src: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1752831346/_DSC0660_eea9yl.jpg',
          title: 'Portrait Élégant 1',
          description: 'Lumière naturelle douce'
        },
        {
          id: 2,
          src: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756200568/_MG_5517_1_nc7iy7.jpg',
          title: 'Portrait Élégant 2',
          description: 'Expression naturelle'
        },
        {
          id: 3,
          src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          title: 'Portrait Professionnel',
          description: 'Portrait corporate en studio'
        },
        {
          id: 4,
          src: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e6e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          title: 'Expression Naturelle',
          description: 'Authenticité capturée'
        }
      ]
    },

    'portraits-claire-cerceaux': {
      id: 'portraits-claire-cerceaux',
      title: 'Portraits Claire',
      description: 'Une série de portraits de Claire sur son cerceau.',
      category: 'Portraits',
      coverImage: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756200568/_MG_5517_1_nc7iy7.jpg',
      photos: [
        {
          id: 1,
          src: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756200568/_MG_5517_1_nc7iy7.jpg',
          title: 'Portrait Élégant 1',
          description: 'Lumière naturelle douce'
        },
        {
          id: 2,
          src: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756207920/_MG_5526_1_dsoiy1.jpg',
          title: 'Portrait Élégant 2',
          description: 'Expression naturelle'
        },
        {
          id: 3,
          src: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756200568/_MG_5517_1_nc7iy7.jpg',
          title: 'Portrait Professionnel',
          description: 'Portrait corporate en studio'
        },
        {
          id: 4,
          src: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756207919/_MG_5590_1_eentrq.jpg',
          title: 'Expression Naturelle',
          description: 'Authenticité capturée'
        },
          {
          id: 5,
          src: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756207919/_MG_5620_cm7tm3.jpg',
          title: 'Expression Naturelle',
          description: 'Authenticité capturée'
        },
          {
          id: 6,
          src: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756207919/_MG_5617_1_srh4uf.jpg',
          title: 'Expression Naturelle',
          description: 'Authenticité capturée'
        },
          {
          id: 7,
          src: 'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756207919/_MG_5517_1_zsedrf.jpg',
          title: 'Expression Naturelle',
          description: 'Authenticité capturée'
        },
        {
          id: 7,
          src:'https://res.cloudinary.com/dgcpwz1u4/image/upload/v1756208507/_MG_5620-2_nfdchj.jpg',
          title: 'Expression Naturelle',
          description: 'Authenticité capturée'
        },
      ]
    },
    'paysages-majestueux': {
      id: 'paysages-majestueux',
      title: 'Paysages Majestueux',
      description: 'Exploration de la beauté naturelle à travers des paysages époustouflants.',
      category: 'Paysages',
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      photos: [
        {
          id: 1,
          src: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          title: 'Montagne Majestueuse',
          description: 'Coucher de soleil sur les sommets'
        },
        {
          id: 2,
          src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          title: 'Lac Serein',
          description: 'Reflets parfaits sur l\'eau'
        },
        {
          id: 3,
          src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          title: 'Forêt Mystique',
          description: 'Lumière filtrée à travers les arbres'
        },
        {
          id: 4,
          src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          title: 'Forêt d\'Automne',
          description: 'Couleurs chaudes de l\'automne'
        }
      ]
    },
    'moments-precieux': {
      id: 'moments-precieux',
      title: 'Moments Précieux',
      description: 'Capture d\'instants uniques lors d\'événements et célébrations.',
      category: 'Événements',
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      photos: [
        {
          id: 1,
          src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
          title: 'Célébration',
          description: 'Moments de joie partagée'
        },
        {
          id: 2,
          src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          title: 'Mariage Romantique',
          description: 'Moments tendres d\'une cérémonie'
        },
        {
          id: 3,
          src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          title: 'Fête de Famille',
          description: 'Réunion familiale chaleureuse'
        },
        {
          id: 4,
          src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
          title: 'Événement Corporate',
          description: 'Professionnalisme et convivialité'
        }
      ]
    }
  };

  const album = albums[albumId];

  const openLightbox = (photo, index) => {
    setLightboxImage(photo);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    if (!album) return;
    const nextIndex = (currentImageIndex + 1) % album.photos.length;
    setCurrentImageIndex(nextIndex);
    setLightboxImage(album.photos[nextIndex]);
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    if (!album) return;
    const prevIndex = (currentImageIndex - 1 + album.photos.length) % album.photos.length;
    setCurrentImageIndex(prevIndex);
    setLightboxImage(album.photos[prevIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!lightboxImage || !album) return;
      
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    }, [currentImage, nextImage, prevImage]);

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [lightboxImage, currentImageIndex, album]);

  if (!album) {
    return (
      <div className="album-detail">
        <div className="container">
          <h1>Album non trouvé</h1>
          <Link to="/gallery" className="back-btn">Retour à la galerie</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="album-detail">
      <div className="container">
        {/* Header */}
        <div className="album-header">
          <Link to="/gallery" className="back-btn">
            ← Retour à la galerie
          </Link>
          <div className="album-info">
            <span className="album-category">{album.category}</span>
            <h1>{album.title}</h1>
            <p>{album.description}</p>
            <div className="album-stats">
              <span>{album.photos.length} photos</span>
            </div>
          </div>
        </div>

        {/* Photos Grid */}
        <div className="album-grid">
          {album.photos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="album-item"
              onClick={() => openLightbox(photo, index)}
            >
              <img src={photo.src} alt={photo.title} />
              <div className="album-overlay">
                <h3>{photo.title}</h3>
                <p>{photo.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div className="lightbox" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox}>×</button>
              
              {/* Navigation Buttons - More Visible */}
              {album.photos.length > 1 && (
                <>
                  <button
                    className="lightbox-nav prev"
                    onClick={prevImage}
                    title="Photo précédente (←)"
                  >
                    ‹
                  </button>
                  <button
                    className="lightbox-nav next"
                    onClick={nextImage}
                    title="Photo suivante (→)"
                  >
                    ›
                  </button>
                </>
              )}
              
              <img src={lightboxImage.src} alt={lightboxImage.title} />
              
              <div className="lightbox-info">
                <h3>{lightboxImage.title}</h3>
                <p>{lightboxImage.description}</p>
                <div className="lightbox-controls">
                  <span className="image-counter">
                    {currentImageIndex + 1} / {album.photos.length}
                  </span>
                  {album.photos.length > 1 && (
                    <span className="navigation-hint">
                      Utilisez ← → ou cliquez sur les flèches pour naviguer
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumDetail;
