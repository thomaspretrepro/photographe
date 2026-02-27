import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAlbumById } from '../data/albums';
import './AlbumDetail.css';

const AlbumDetail = () => {
  const { albumId } = useParams();
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get album data from shared source
  const album = getAlbumById(albumId);

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
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [lightboxImage, currentImageIndex, album, nextImage, prevImage]);

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
            {/* <span className="album-category">{album.category}</span> */}
            <h1>{album.title}</h1>
            <p>{album.description}</p>
            {/* <div className="album-stats">
              <span>{album.photos.length} photos</span>
            </div> */}
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
              {(photo.title || photo.description) && (
                <div className="album-overlay">
                  {photo.title && <h3>{photo.title}</h3>}
                  {photo.description && <p>{photo.description}</p>}
                </div>
              )}
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
              
              {(lightboxImage.title || lightboxImage.description) && (
                <div className="lightbox-info">
                  {lightboxImage.title && <h3>{lightboxImage.title}</h3>}
                  {lightboxImage.description && <p>{lightboxImage.description}</p>}
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
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumDetail;
