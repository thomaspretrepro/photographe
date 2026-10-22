import React, { useState, useEffect } from 'react';
import instagramService from '../services/instagramService';
import './InstagramFeed.css';

const InstagramFeed = ({ 
  limit = 9, 
  showCaption = true, 
  showDate = false,
  gridColumns = 3,
  className = '' 
}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInstagramFeed();
  }, [limit]);

  const loadInstagramFeed = async () => {
    try {
      setLoading(true);
      setError(null);
      const feedData = await instagramService.getFeed(limit);
      setPosts(feedData);
    } catch (err) {
      console.error('Erreur lors du chargement du feed Instagram:', err);
      setError('Impossible de charger le feed Instagram');
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (permalink) => {
    window.open(permalink, '_blank', 'noopener,noreferrer');
  };

  const handleRefresh = () => {
    // Vider le cache et recharger
    localStorage.removeItem('instagram_feed_cache');
    loadInstagramFeed();
  };

  if (loading) {
    return (
      <div className={`instagram-feed ${className}`}>
        <div className="instagram-feed__header">
          <h3 className="instagram-feed__title">
            <i className="instagram-feed__icon">📸</i>
            Derniers posts Instagram
          </h3>
        </div>
        <div className="instagram-feed__loading">
          <div className="instagram-feed__spinner"></div>
          <p>Chargement du feed Instagram...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`instagram-feed ${className}`}>
        <div className="instagram-feed__header">
          <h3 className="instagram-feed__title">
            <i className="instagram-feed__icon">📸</i>
            Derniers posts Instagram
          </h3>
        </div>
        <div className="instagram-feed__error">
          <p>{error}</p>
          <button 
            onClick={handleRefresh}
            className="instagram-feed__retry-btn"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className={`instagram-feed ${className}`}>
        <div className="instagram-feed__header">
          <h3 className="instagram-feed__title">
            <i className="instagram-feed__icon">📸</i>
            Derniers posts Instagram
          </h3>
        </div>
        <div className="instagram-feed__empty">
          <p>Aucun post Instagram disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`instagram-feed ${className}`}>
      <div className="instagram-feed__header">
        <h3 className="instagram-feed__title">
          <i className="instagram-feed__icon">📸</i>
          Derniers posts Instagram
        </h3>
        <a 
          href="https://www.instagram.com/tom_p_pics/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="instagram-feed__follow-btn"
        >
          Suivre sur Instagram
        </a>
      </div>

      <div 
        className="instagram-feed__grid"
        style={{ '--grid-columns': gridColumns }}
      >
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="instagram-feed__post"
            onClick={() => handlePostClick(post.permalink)}
          >
            <div className="instagram-feed__image-container">
              <img 
                src={post.mediaUrl} 
                alt={instagramService.truncateCaption(post.caption, 50) || 'Post Instagram'}
                className="instagram-feed__image"
                loading="lazy"
              />
              <div className="instagram-feed__overlay">
                <div className="instagram-feed__overlay-content">
                  <i className="instagram-feed__instagram-icon">📷</i>
                  {post.mediaType === 'VIDEO' && (
                    <i className="instagram-feed__video-icon">▶️</i>
                  )}
                </div>
              </div>
            </div>
            
            {(showCaption || showDate) && (
              <div className="instagram-feed__content">
                {showCaption && post.caption && (
                  <p className="instagram-feed__caption">
                    {instagramService.truncateCaption(post.caption, 80)}
                  </p>
                )}
                {showDate && (
                  <span className="instagram-feed__date">
                    {instagramService.formatDate(post.timestamp)}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="instagram-feed__footer">
        <a 
          href="https://www.instagram.com/tom_p_pics/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="instagram-feed__view-more"
        >
          Voir plus sur Instagram →
        </a>
      </div>
    </div>
  );
};

export default InstagramFeed;