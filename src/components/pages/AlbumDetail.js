import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { albumsAPI } from '../../services/api';
import './AlbumDetail.css';

const AlbumDetail = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadAlbum();
  }, [albumId]);

  const loadAlbum = async () => {
    try {
      setLoading(true);
      const response = await albumsAPI.getById(albumId);
      setAlbum(response.data);
    } catch (err) {
      setError('Album non trouvé');
      console.error('Error loading album:', err);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (photo, index) => {
    setLightboxImage(photo);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    if (!album?.photos) return;
    const nextIndex = (currentImageIndex + 1) % album.photos.length;
    setCurrentImageIndex(nextIndex);
    setLightboxImage(album.photos[nextIndex]);
  };

  const prevImage = () => {
    if (!album?.photos) return;
    const prevIndex = (currentImageIndex - 1 + album.photos.length) % album.photos.length;
    setCurrentImageIndex(prevIndex);
    setLightboxImage(album.photos[prevIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!lightboxImage) return;
      
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
  }, [lightboxImage, currentImageIndex]);

  if (loading) {
    return (
      <div className="album-detail">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Chargement de l'album...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="album-detail">
        <div className="container">
          <div className="error">
            <h1>Album non trouvé</h1>
            <p>{error}</p>
            <Link to="/gallery" className="btn">
              Retour à la galerie
            </Link>
          </div>
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
            <h1>{album.title}</h1>
            <p>{album.description}</p>
            <div className="album-meta">
              <span>{album.photos?.length || 0} photos</span>
            </div>
          </div>
        </div>

        {/* Photos Grid */}
        {album.photos && album.photos.length > 0 ? (
          <div className="photos-grid">
            {album.photos.map((photo, index) => (
              <div 
                key={photo.id} 
                className="photo-item"
                onClick={() => openLightbox(photo, index)}
              >
                <img src={photo.src} alt={photo.title || `Photo ${index + 1}`} />
                {(photo.title || photo.description) && (
                  <div className="photo-overlay">
                    {photo.title && <h3>{photo.title}</h3>}
                    {photo.description && <p>{photo.description}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-photos">
            <p>Aucune photo dans cet album.</p>
          </div>
        )}

        {/* Lightbox */}
        {lightboxImage && (
          <div className="lightbox" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox}>×</button>
              
              {/* Navigation Buttons */}
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